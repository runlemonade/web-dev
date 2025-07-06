# RunLemonade Website - Modular Structure

This website has been restructured to use a modular approach with shared CSS and components across multiple pages.

## File Structure

```
git:web-dev/
├── css/
│   ├── common.css          # Shared styles, variables, and utilities
│   ├── header.css          # Header-specific styles
│   ├── footer.css          # Footer-specific styles
│   ├── homepage.css        # Homepage-specific styles
│   └── extension.css       # Extension page-specific styles
├── components/
│   ├── header.html         # Shared header component
│   └── footer.html         # Shared footer component
├── js/
│   └── components.js       # Component utilities and common functionality
├── extensions/
│   └── FORM_extension.html # Extension detail page
├── index.html              # Main homepage
└── README.md               # This file
```

## CSS Architecture

### 1. Common CSS (`css/common.css`)
- CSS custom properties (variables) for consistent theming
- Base styles and resets
- Utility classes (grids, flexbox, spacing, etc.)
- Common components (buttons, cards, etc.)
- Responsive utilities

### 2. Component-Specific CSS
- **Header CSS** (`css/header.css`): Navigation and header styles
- **Footer CSS** (`css/footer.css`): Footer styles
- **Homepage CSS** (`css/homepage.css`): Landing page specific styles
- **Extension CSS** (`css/extension.css`): Extension detail page styles

## CSS Variables

The design system uses CSS custom properties for consistency:

```css
:root {
    /* Colors */
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --primary-color: #667eea;
    --text-primary: #1a1a1a;
    --text-muted: #8e8e93;
    
    /* Spacing */
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 20px;
    
    /* Typography */
    --font-size-base: 16px;
    --font-size-lg: 18px;
    
    /* Border Radius */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 16px;
}
```

## Usage

### Adding CSS to a Page

Include the required CSS files in your HTML:

```html
<!-- For homepage -->
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/footer.css">
<link rel="stylesheet" href="css/homepage.css">

<!-- For extension pages -->
<link rel="stylesheet" href="../css/common.css">
<link rel="stylesheet" href="../css/header.css">
<link rel="stylesheet" href="../css/footer.css">
<link rel="stylesheet" href="../css/extension.css">
```

### Using Shared Components

You can include shared components using the JavaScript utility:

```html
<!-- Include header -->
<div id="header-placeholder"></div>
<script>
    includeHTML('header-placeholder', 'components/header.html');
</script>

<!-- Include footer -->
<div id="footer-placeholder"></div>
<script>
    includeHTML('footer-placeholder', 'components/footer.html');
</script>
```

Or copy the HTML directly from the component files.

## Benefits of This Structure

1. **Consistency**: Shared CSS variables ensure consistent styling across pages
2. **Maintainability**: Changes to common elements only need to be made in one place
3. **Scalability**: Easy to add new pages with consistent styling
4. **Performance**: CSS is modular and only loads what's needed
5. **Reusability**: Components can be reused across different pages

## Adding New Pages

To add a new page:

1. Create the HTML file
2. Include the required CSS files:
   - `common.css` (always required)
   - `header.css` and `footer.css` (if using shared components)
   - Page-specific CSS file
3. Use the shared component HTML or include via JavaScript
4. Follow the established naming conventions

## Browser Support

The CSS uses modern features like:
- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox
- Backdrop filters
- Modern CSS selectors

For older browser support, consider adding appropriate fallbacks or polyfills.

## Development Workflow

1. **Global Changes**: Edit `css/common.css` for site-wide changes
2. **Component Changes**: Edit specific component CSS files
3. **Page-Specific Changes**: Edit page-specific CSS files
4. **New Components**: Create new CSS files and include them as needed

## Future Enhancements

- Add CSS preprocessor (Sass/SCSS) for better organization
- Implement CSS-in-JS for dynamic theming
- Add build process for CSS optimization
- Create component library documentation 