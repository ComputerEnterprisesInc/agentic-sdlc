# Frontend User Guide

## Task Management Web Interface

This is a simple, user-friendly web interface for the Task Management API demo application.

## Features

### 🔐 Authentication
- **User Registration**: Create a new account with name, email, and password
- **User Login**: Access your tasks with email and password
- **Persistent Sessions**: Stay logged in across browser sessions
- **Secure Logout**: Clear session and return to login screen

### ✅ Task Management
- **Create Tasks**: Add new tasks with title and optional description
- **View Tasks**: See all your tasks with status indicators
- **Edit Tasks**: Update task title, description, and status
- **Delete Tasks**: Remove tasks you no longer need
- **Toggle Status**: Quickly mark tasks as pending or completed
- **Task Statistics**: View total tasks and completion count

### 🎨 User Interface
- **Clean Design**: Modern, gradient-based interface
- **Responsive Layout**: Works on desktop and mobile devices
- **Status Badges**: Visual indicators for pending/completed tasks
- **Toast Notifications**: Instant feedback for all actions
- **Modal Editing**: In-place task editing without page navigation
- **Empty State**: Helpful message when no tasks exist

## How to Use

### Getting Started

1. **Start the Server**
   ```bash
   npm start
   ```

2. **Open Your Browser**
   Navigate to: `http://localhost:3000`

3. **Create an Account**
   - Click "Register" on the login screen
   - Enter your name, email, and password (min 6 characters)
   - Click "Register" to create your account

4. **Log In**
   - Enter your email and password
   - Click "Login" to access your tasks

### Managing Tasks

#### Add a New Task
1. Enter task title in the "Task title" field
2. (Optional) Add a description
3. Click "Add Task" button
4. Task appears at the top of your list

#### Complete a Task
- Click the "Complete" button on any pending task
- Task is marked as completed with visual strikethrough
- Status badge changes to green "Completed"

#### Edit a Task
1. Click "Edit" button on any task
2. Modify the title, description, or status in the modal
3. Click "Save Changes"
4. Modal closes and task is updated

#### Delete a Task
1. Click "Delete" button on any task
2. Confirm deletion in the popup
3. Task is removed from your list

#### Mark Task as Pending
- Click "Mark Pending" on any completed task
- Task returns to pending status

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`:

- **POST /api/auth/register** - Create new user account
- **POST /api/auth/login** - Authenticate user
- **GET /api/tasks** - Fetch all user tasks
- **POST /api/tasks** - Create new task
- **PUT /api/tasks/:id** - Update task
- **DELETE /api/tasks/:id** - Delete task

All task operations require authentication via JWT token stored in localStorage.

## Technical Details

### Files
- **index.html** - Main HTML structure
- **styles.css** - Complete styling and responsive design
- **app.js** - Frontend logic and API integration

### Technologies
- **Vanilla JavaScript** - No framework dependencies
- **Fetch API** - Modern HTTP requests
- **LocalStorage** - Client-side session persistence
- **CSS Grid/Flexbox** - Responsive layout
- **CSS Gradients** - Modern visual design

### Security Features
- Password minimum length validation
- JWT token authentication
- Automatic session expiration handling
- XSS protection via HTML escaping
- Secure token storage

## Customization

### Change API URL
Edit `API_BASE_URL` in [app.js](../public/app.js):
```javascript
const API_BASE_URL = 'http://your-api-url.com/api';
```

### Modify Colors
Edit CSS variables in [styles.css](../public/styles.css):
```css
/* Change primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change button colors */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adjust Layout
Modify `.container` max-width in [styles.css](../public/styles.css):
```css
.container {
  max-width: 900px; /* Change to your preferred width */
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Login Not Working
- Check that the server is running on port 3000
- Verify your email and password are correct
- Check browser console for error messages

### Tasks Not Loading
- Ensure you're logged in
- Check browser console for API errors
- Verify backend server is running
- Check that JWT token is valid

### Session Expired
- If you see "Session expired" message, log in again
- Token is stored in localStorage for persistence

### Can't Create Tasks
- Ensure task title is not empty
- Check that you're authenticated
- Verify API endpoint is accessible

## Demo Accounts

For testing, you can create any accounts you want. The application uses a local SQLite database.

Example test account:
- **Email**: demo@example.com
- **Password**: demo123
- **Name**: Demo User

(Register this account first before logging in)

## Next Steps

- Try all task operations (create, edit, complete, delete)
- Test the responsive design on mobile
- Check the browser console to see API requests
- Review the code to understand the implementation
- Customize the styling to match your preferences

Enjoy managing your tasks! 🎉
