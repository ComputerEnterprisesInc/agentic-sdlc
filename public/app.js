// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// State Management
let authToken = localStorage.getItem('authToken') || null;
let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
let tasks = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
});

function initializeApp() {
  if (authToken && currentUser) {
    showTasksScreen();
    loadTasks();
  } else {
    showAuthScreen();
  }
}

// Screen Management
function showAuthScreen() {
  document.getElementById('auth-screen').classList.add('active', 'flex');
  document.getElementById('auth-screen').classList.remove('hidden');
  document.getElementById('tasks-screen').classList.add('hidden');
  document.getElementById('tasks-screen').classList.remove('active');
}

function showTasksScreen() {
  document.getElementById('auth-screen').classList.remove('active', 'flex');
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('tasks-screen').classList.remove('hidden');
  document.getElementById('tasks-screen').classList.add('active');
  document.getElementById('user-name').textContent = currentUser?.name || 'User';
}

// Event Listeners
function setupEventListeners() {
  // Auth form toggles
  document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('active');
  });

  document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('active');
  });

  // Auth forms
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('registerForm').addEventListener('submit', handleRegister);
  document.getElementById('logout-btn').addEventListener('click', handleLogout);

  // Task forms
  document.getElementById('addTaskForm').addEventListener('submit', handleAddTask);
  document.getElementById('editTaskForm').addEventListener('submit', handleEditTask);

  // Modal controls
  document.querySelectorAll('.close-modal').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  document.getElementById('edit-modal').addEventListener('click', (e) => {
    if (e.target.id === 'edit-modal') {
      closeModal();
    }
  });
}

// Authentication
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle validation errors
      if (data.errors && data.errors.length > 0) {
        throw new Error(data.errors[0].msg);
      }
      throw new Error(data.error || 'Login failed');
    }

    authToken = data.token;
    currentUser = data.user;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showToast('Login successful!', 'success');
    showTasksScreen();
    loadTasks();

    // Reset form
    e.target.reset();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle validation errors
      if (data.errors && data.errors.length > 0) {
        throw new Error(data.errors[0].msg);
      }
      throw new Error(data.error || 'Registration failed');
    }

    authToken = data.token;
    currentUser = data.user;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showToast('Registration successful!', 'success');
    showTasksScreen();
    loadTasks();

    // Reset form
    e.target.reset();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function handleLogout() {
  authToken = null;
  currentUser = null;
  tasks = [];
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  showToast('Logged out successfully', 'success');
  showAuthScreen();
}

// Task Operations
async function loadTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        handleLogout();
        throw new Error('Session expired. Please login again.');
      }
      throw new Error('Failed to load tasks');
    }

    tasks = await response.json();
    renderTasks();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function handleAddTask(e) {
  e.preventDefault();
  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();

  if (!title) {
    showToast('Please enter a task title', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const newTask = await response.json();
    tasks.unshift(newTask);
    renderTasks();
    showToast('Task added successfully!', 'success');

    // Reset form
    e.target.reset();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function handleEditTask(e) {
  e.preventDefault();
  const id = document.getElementById('edit-task-id').value;
  const title = document.getElementById('edit-task-title').value.trim();
  const description = document.getElementById('edit-task-description').value.trim();
  const status = document.getElementById('edit-task-status').value;

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, status })
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const updatedTask = await response.json();
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
      tasks[index] = updatedTask;
    }
    renderTasks();
    closeModal();
    showToast('Task updated successfully!', 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    showToast('Task deleted successfully!', 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function toggleTaskStatus(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newStatus = task.status === 'completed' ? 'pending' : 'completed';

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (!response.ok) {
      throw new Error('Failed to update task status');
    }

    const updatedTask = await response.json();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = updatedTask;
    }
    renderTasks();
    showToast(`Task marked as ${newStatus}!`, 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// UI Rendering
function renderTasks() {
  const tasksList = document.getElementById('tasks-list');
  const emptyState = document.getElementById('empty-state');
  const tasksCount = document.getElementById('tasks-count');

  // Update count
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  tasksCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''} (${completedCount} completed)`;

  // Show/hide empty state
  if (tasks.length === 0) {
    tasksList.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  tasksList.style.display = 'flex';
  emptyState.style.display = 'none';

  // Render tasks with Tailwind classes
  tasksList.innerHTML = tasks.map(task => `
    <div class="bg-gray-50 rounded-lg border-2 transition-all p-4 ${task.status === 'completed' ? 'border-green-300 opacity-70 bg-green-50' : 'border-gray-200 hover:border-purple-300 hover:shadow-md'}">
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-lg font-semibold flex-1 mr-2 ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}">
          ${escapeHtml(task.title)}
        </h3>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
          ${task.status}
        </span>
      </div>
      ${task.description ? `<p class="text-gray-600 text-sm mb-4 leading-relaxed">${escapeHtml(task.description)}</p>` : ''}
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span class="text-xs text-gray-500">
          Created: ${formatDate(task.created_at)}
        </span>
        <div class="flex gap-2 w-full sm:w-auto">
          <button class="flex-1 sm:flex-none px-3 py-1.5 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-medium" onclick="toggleTaskStatus(${task.id})">
            ${task.status === 'completed' ? 'Mark Pending' : 'Complete'}
          </button>
          <button class="flex-1 sm:flex-none px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium" onclick="openEditModal(${task.id})">
            Edit
          </button>
          <button class="flex-1 sm:flex-none px-3 py-1.5 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium" onclick="deleteTask(${task.id})">
            Delete
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Modal Management
function openEditModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById('edit-task-id').value = task.id;
  document.getElementById('edit-task-title').value = task.title;
  document.getElementById('edit-task-description').value = task.description || '';
  document.getElementById('edit-task-status').value = task.status;

  const modal = document.getElementById('edit-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  const modal = document.getElementById('edit-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  
  // Set color based on type
  if (type === 'success') {
    toast.classList.remove('bg-red-500');
    toast.classList.add('bg-green-500');
  } else if (type === 'error') {
    toast.classList.remove('bg-green-500');
    toast.classList.add('bg-red-500');
  } else {
    toast.classList.remove('bg-green-500', 'bg-red-500');
    toast.classList.add('bg-gray-800');
  }

  // Animate in
  setTimeout(() => {
    toast.classList.remove('opacity-0', 'translate-y-5');
    toast.classList.add('opacity-100', 'translate-y-0');
  }, 10);

  // Animate out
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-5');
    toast.classList.remove('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 3000);
}

// Utility Functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Make functions globally available
window.deleteTask = deleteTask;
window.toggleTaskStatus = toggleTaskStatus;
window.openEditModal = openEditModal;
