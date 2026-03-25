---
name: tailwind-css
description: Expert in Tailwind CSS utility-first styling, responsive design, and modern UI patterns. Use when building or styling frontend interfaces, creating responsive layouts, or applying consistent design systems.
---

# Tailwind CSS Skill

## Expertise Areas

This skill provides comprehensive knowledge of Tailwind CSS for building modern, responsive web interfaces using utility-first CSS classes.

## Core Principles

### 1. Utility-First Approach
- Apply styles directly in HTML using utility classes
- Compose complex designs from simple utilities
- Avoid writing custom CSS when possible
- Use Tailwind's built-in classes for consistency

### 2. Responsive Design
- **Mobile-first**: Default styles apply to all screen sizes
- **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Example: `class="text-sm md:text-base lg:text-lg"`
- Stack modifiers: `sm:flex md:grid lg:block`

### 3. Design System
- **Colors**: Use Tailwind's color palette (blue-500, purple-600, etc.)
- **Spacing**: Consistent scale (p-4, m-8, gap-6, space-y-4)
- **Typography**: text-sm, font-bold, leading-relaxed
- **Shadows**: shadow-sm, shadow-md, shadow-lg, shadow-xl

## Common Patterns

### Layout & Structure

```html
<!-- Container -->
<div class="container mx-auto px-4 max-w-7xl">

<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
<div class="flex flex-col space-y-4">

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Centering -->
<div class="flex items-center justify-center min-h-screen">
```

### Typography

```html
<!-- Headings -->
<h1 class="text-4xl font-bold text-gray-900">
<h2 class="text-2xl font-semibold text-gray-800">
<p class="text-base text-gray-600 leading-relaxed">

<!-- Text Utilities -->
<span class="text-sm text-gray-500 uppercase tracking-wide">
<p class="text-lg font-medium line-clamp-2">
```

### Colors & Backgrounds

```html
<!-- Solid Colors -->
<div class="bg-blue-500 text-white">
<div class="bg-gray-100 text-gray-900">

<!-- Gradients -->
<div class="bg-gradient-to-r from-purple-500 to-pink-500">
<div class="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">

<!-- Opacity -->
<div class="bg-black bg-opacity-50">
<div class="text-white text-opacity-75">
```

### Buttons

```html
<!-- Primary Button -->
<button class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">

<!-- Secondary Button -->
<button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">

<!-- Outline Button -->
<button class="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">

<!-- Small Button -->
<button class="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600">
```

### Cards

```html
<!-- Basic Card -->
<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-bold mb-2">Card Title</h3>
  <p class="text-gray-600">Card content...</p>
</div>

<!-- Card with Border -->
<div class="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 transition-colors">

<!-- Card with Hover Effect -->
<div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
```

### Forms

```html
<!-- Input Field -->
<input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">

<!-- Textarea -->
<textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>

<!-- Select -->
<select class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">

<!-- Label -->
<label class="block text-sm font-medium text-gray-700 mb-2">
```

### Navigation

```html
<!-- Navbar -->
<nav class="bg-white shadow-sm">
  <div class="container mx-auto px-4 py-4 flex items-center justify-between">
    <h1 class="text-2xl font-bold text-gray-900">Logo</h1>
    <div class="flex items-center gap-4">
      <a href="#" class="text-gray-600 hover:text-gray-900">Link</a>
    </div>
  </div>
</nav>

<!-- Tabs -->
<div class="border-b border-gray-200">
  <nav class="flex space-x-8">
    <a href="#" class="border-b-2 border-blue-500 text-blue-600 py-4 px-1 font-medium">Active</a>
    <a href="#" class="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-4 px-1">Tab</a>
  </nav>
</div>
```

### State & Interaction

```html
<!-- Hover States -->
<div class="hover:bg-gray-100 hover:scale-105 transition-all">

<!-- Focus States -->
<input class="focus:outline-none focus:ring-2 focus:ring-blue-500">

<!-- Active/Disabled States -->
<button class="active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">

<!-- Group Hover -->
<div class="group">
  <span class="group-hover:text-blue-500">Hover parent to change</span>
</div>
```

### Responsive Utilities

```html
<!-- Hide/Show by Breakpoint -->
<div class="hidden md:block">Desktop only</div>
<div class="block md:hidden">Mobile only</div>

<!-- Responsive Sizing -->
<div class="w-full md:w-1/2 lg:w-1/3">
<div class="text-sm md:text-base lg:text-lg">

<!-- Responsive Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### Spacing Scale

```
p-0  = 0px         m-0  = 0px
p-1  = 0.25rem     m-1  = 0.25rem
p-2  = 0.5rem      m-2  = 0.5rem
p-3  = 0.75rem     m-3  = 0.75rem
p-4  = 1rem        m-4  = 1rem
p-5  = 1.25rem     m-5  = 1.25rem
p-6  = 1.5rem      m-6  = 1.5rem
p-8  = 2rem        m-8  = 2rem
p-10 = 2.5rem      m-10 = 2.5rem
p-12 = 3rem        m-12 = 3rem
p-16 = 4rem        m-16 = 4rem
```

### Color Palette

**Gray Shades**: gray-50, gray-100, gray-200, ..., gray-900
**Primary Colors**: blue-500, purple-600, pink-500, green-500, red-500, yellow-500
**Use consistent colors throughout the app**

## Application-Specific Patterns

### Brand Colors
- **Primary**: purple-600, indigo-600 (gradient combinations)
- **Secondary**: gray-100, gray-200 for backgrounds
- **Success**: green-500, green-600
- **Error**: red-500, red-600
- **Warning**: yellow-500, yellow-600

### Common Components

#### Modal
```html
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
    <div class="p-6">
      <!-- Modal content -->
    </div>
  </div>
</div>
```

#### Toast Notification
```html
<div class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg">
  Success message!
</div>
```

#### Badge
```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Completed
</span>
```

#### Loading Spinner
```html
<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
```

## Best Practices

### 1. Composition Over Repetition
- Extract repeated patterns into components (React, Vue, etc.)
- Use `@apply` in CSS for repeated utility combinations (when necessary)
- Keep HTML readable with logical grouping

### 2. Responsive Design
- Always design mobile-first
- Test at all breakpoints (320px, 768px, 1024px, 1280px)
- Use responsive utilities extensively

### 3. Performance
- Tailwind purges unused CSS in production
- Use CDN for prototypes, build process for production
- Minimize custom CSS

### 4. Accessibility
- Use semantic HTML with Tailwind classes
- Include proper focus states: `focus:ring-2 focus:ring-blue-500`
- Ensure color contrast ratios meet WCAG standards
- Add `sr-only` for screen reader text

### 5. Consistency
- Stick to Tailwind's spacing scale
- Use consistent color shades across the app
- Follow established patterns for similar components

## Common Workflows

### Creating a New Page Layout
1. Start with container: `<div class="container mx-auto px-4">`
2. Add responsive grid: `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`
3. Style individual sections with cards/boxes
4. Add responsive typography and spacing
5. Test at all breakpoints

### Styling Forms
1. Wrap in form element with spacing
2. Group labels and inputs: `<div class="mb-4">`
3. Add consistent input styling with focus states
4. Include validation states (border-red-500 for errors)
5. Style buttons with hover/active states

### Building Navigation
1. Create fixed/sticky navbar with shadow
2. Use flexbox for layout: `flex items-center justify-between`
3. Add mobile menu with responsive utilities
4. Include active states for current page
5. Ensure z-index is appropriate (z-50 for navbars)

## Tailwind CDN Setup

For quick prototyping, use the CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

For production, use the CLI or PostCSS setup to enable purging and optimization.

## Resources

- **Docs**: https://tailwindcss.com/docs
- **Components**: https://tailwindui.com (official components)
- **Cheat Sheet**: https://nerdcave.com/tailwind-cheat-sheet
- **Color Reference**: https://tailwindcss.com/docs/customizing-colors

## When to Use This Skill

- Building new UI components or pages
- Styling forms, buttons, cards, modals
- Creating responsive layouts
- Applying consistent design system
- Converting existing CSS to Tailwind
- Implementing design mockups
- Adding hover/focus/active states
- Creating loading states and animations

## Example: Complete Component

```html
<!-- Task Card Component -->
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border-l-4 border-blue-500">
  <div class="flex items-start justify-between mb-3">
    <h3 class="text-lg font-semibold text-gray-900 flex-1 mr-2">
      Task Title
    </h3>
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      Pending
    </span>
  </div>
  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
    Task description goes here...
  </p>
  <div class="flex items-center justify-between">
    <span class="text-xs text-gray-500">
      Created 2 days ago
    </span>
    <div class="flex gap-2">
      <button class="px-3 py-1.5 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
        Complete
      </button>
      <button class="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
        Edit
      </button>
    </div>
  </div>
</div>
```

Use this skill whenever working with frontend styling, UI components, or layout design to ensure consistent, responsive, and maintainable code using Tailwind CSS best practices.
