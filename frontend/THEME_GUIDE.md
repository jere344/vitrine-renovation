# Premium Theme - Design System

## Color Palette

### Primary Colors
- **Primary**: `#1A1A2E` - Deep Navy Blue (sophisticated and professional)
- **Primary Light**: `#2D2D44`
- **Primary Dark**: `#0F0F1E`

### Secondary Colors  
- **Secondary**: `#D4AF37` - Luxurious Gold (premium and elegant)
- **Secondary Light**: `#E5C965`
- **Secondary Dark**: `#B8941F`

### Accent
- **Accent**: `#16213E` - Complementary Dark Blue

### Backgrounds
- **Background Default**: `#F8F9FA` - Soft Off-White
- **Background Paper**: `#FFFFFF`
- **Background Dark**: `#1A1A2E`

### Text
- **Text Primary**: `#1A1A2E`
- **Text Secondary**: `#5A5A6E`
- **Text Disabled**: `#9E9EB0`

## Typography

### Font Family
- Primary: **Inter** (from Google Fonts)
- Fallback: Roboto, Helvetica Neue, Arial, sans-serif

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700
- Extra-Bold: 800
- Black: 900

### Heading Sizes
- **H1**: 3.5rem (56px) - Extra Bold (800)
- **H2**: 2.75rem (44px) - Bold (700)
- **H3**: 2.25rem (36px) - Bold (700)
- **H4**: 1.75rem (28px) - Semi-Bold (600)
- **H5**: 1.375rem (22px) - Semi-Bold (600)
- **H6**: 1.125rem (18px) - Semi-Bold (600)

## Shadows

Premium shadow system with 24 levels:
- Subtle elevation: `0px 2px 4px rgba(26, 26, 46, 0.04)`
- Medium elevation: `0px 8px 16px rgba(26, 26, 46, 0.08)`
- High elevation: `0px 16px 32px rgba(26, 26, 46, 0.16)`

## Border Radius
- Default: `12px`
- Cards: `16px`
- Buttons: `12px`
- Chips: `8px`

## Components

### Buttons
- Premium gradient backgrounds
- Smooth hover transitions with lift effect
- Size variants: small, medium, large
- Enhanced shadows on hover

### Cards
- Rounded corners (16px)
- Premium hover effects
- Gradient shine animation on hover
- Subtle shadow elevation

### Inputs
- Rounded corners (12px)
- Hover shadow effect
- Focus state with gold glow
- Smooth transitions

## Custom CSS Classes

### Gradients
- `.gradient-primary` - Primary gradient background
- `.gradient-secondary` - Secondary gradient background
- `.text-gradient` - Gradient text effect

### Effects
- `.accent-line` - Gold accent line (60px × 4px)
- `.shadow-premium` - Premium box shadow
- `.premium-card` - Card with shine effect on hover
- `.hover-glow` - Glow effect on hover
- `.glass` - Glass morphism effect
- `.pulse-animation` - Pulse animation for CTA buttons

### Animations
- `.fade-in` - Fade in animation
- `.float-animation` - Floating animation
- `.gold-shine` - Animated gold shine effect
- `.shimmer` - Shimmer loading effect

## Animation Timings

All transitions use: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, professional animations
- Default duration: `0.3s`
- Longer animations: `0.5s` - `0.6s`

## Usage Examples

### Premium Button
```jsx
<Button
  variant="contained"
  color="secondary"
  className="pulse-animation"
  sx={{ px: 4, py: 1.5 }}
>
  Get Started
</Button>
```

### Premium Card
```jsx
<Card className="premium-card shadow-premium-hover">
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Section Header
```jsx
<Box sx={{ textAlign: 'center', mb: 8 }}>
  <Box className="accent-line accent-line-center" />
  <Typography variant="h2">Section Title</Typography>
  <Typography variant="h6" color="text.secondary">
    Subtitle text
  </Typography>
</Box>
```

### Gradient Background
```jsx
<Box
  sx={{
    background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
    color: 'white',
    py: { xs: 10, md: 15 },
  }}
>
  {/* Content */}
</Box>
```

## Accessibility

- All interactive elements have focus-visible states with gold outline
- Sufficient color contrast ratios (WCAG AA compliant)
- Smooth scroll behavior
- Proper heading hierarchy
- ARIA labels where needed

## Responsive Breakpoints

- **xs**: 0px - 600px (Mobile)
- **sm**: 600px - 900px (Tablet)
- **md**: 900px - 1200px (Desktop)
- **lg**: 1200px - 1536px (Large Desktop)
- **xl**: 1536px+ (Extra Large)

## Performance Optimizations

- Font preloading
- CSS transitions use GPU-accelerated properties
- Efficient gradient implementations
- Optimized shadow calculations
- Lazy loading for images

## Brand Guidelines

### When to Use Gold
- Primary CTAs
- Accents and highlights
- Hover states
- Success indicators
- Premium features

### When to Use Navy
- Headers and footers
- Text content
- Backgrounds
- Containment elements
- Professional areas

## Tips for Maintaining Consistency

1. Always use theme values from `theme.js`
2. Use CSS variables for custom implementations
3. Apply premium class names for consistent effects
4. Follow the shadow hierarchy
5. Maintain animation timing consistency
6. Use the accent line for section breaks
7. Apply hover effects consistently
