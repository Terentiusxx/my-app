# Design System

## Color Palette

### Primary Brand Color
- **Red 600**: `#dc2626` (Tailwind: `red-600`)
  - Primary buttons and CTAs
  - Active states (filters, pagination, navigation)
  - Hover effects on interactive elements
  - Progress indicators (active state)
  - Links and primary actions
  - Focus rings

- **Red 700**: `#b91c1c` (Tailwind: `red-700`)
  - Hover state for solid red buttons
  - Pressed states

- **Red 500**: `#ef4444` (Tailwind: `red-500`)
  - Focus ring color
  - Lighter accent when needed

- **Red 50**: `#fef2f2` (Tailwind: `red-50`)
  - Tag backgrounds (research area tags)
  - Very subtle red backgrounds

### Neutral Palette (Grays)
- **Gray 900**: `#111827` (Tailwind: `gray-900`)
  - Primary text color
  - Dark borders (default button borders)
  - Headings

- **Gray 700**: `#374151` (Tailwind: `gray-700`)
  - Secondary text
  - Badge text
  - Subheadings

- **Gray 600**: `#4b5563` (Tailwind: `gray-600`)
  - Tertiary text
  - Placeholder text

- **Gray 500**: `#6b7280` (Tailwind: `gray-500`)
  - Muted text
  - Helper text

- **Gray 200**: `#e5e7eb` (Tailwind: `gray-200`)
  - Decorative icons (quote marks)
  - Light borders
  - Dividers

- **Gray 100**: `#f3f4f6` (Tailwind: `gray-100`)
  - Badge backgrounds (method tags, category badges)
  - Subtle section backgrounds
  - Card hover states

- **Gray 50**: `#f9fafb` (Tailwind: `gray-50`)
  - Very light backgrounds
  - Alternate row backgrounds

### Accent Colors
- **Green 700**: `#15803d` (Tailwind: `green-700`)
  - Open Access badge text
  
- **Green 50**: `#f0fdf4` (Tailwind: `green-50`)
  - Open Access badge background

### Base Colors
- **Black**: `#000000` (Tailwind: `black`)
  - Dark backgrounds (navbar: `black/80`)
  - Maximum contrast text
  
- **White**: `#ffffff` (Tailwind: `white`)
  - Page backgrounds
  - Text on dark backgrounds
  - Card backgrounds
  - Overlay backgrounds (`white/70`)

---

## Typography

### Font Weights
- **Bold**: `font-bold` - Headings, emphasis
- **Semibold**: `font-semibold` - Subheadings, button text
- **Medium**: `font-medium` - Card titles, labels
- **Normal**: `font-normal` - Body text

### Font Sizes (Desktop → Mobile)
- **Hero**: `text-6xl` → `text-4xl md:text-5xl lg:text-6xl`
- **Section Titles**: `text-5xl` → `text-4xl md:text-5xl lg:text-6xl`
- **Large Heading**: `text-4xl` → `text-3xl md:text-4xl`
- **Heading**: `text-3xl` → `text-2xl md:text-3xl`
- **Subheading**: `text-2xl` → `text-xl md:text-2xl`
- **Large Body**: `text-xl` → `text-lg md:text-xl`
- **Body**: `text-base`
- **Small**: `text-sm`
- **Extra Small**: `text-xs`

### Line Heights
- **Tight**: `leading-tight` - Headings
- **Snug**: `leading-snug` - Subheadings
- **Normal**: `leading-normal` - Body text
- **Relaxed**: `leading-relaxed` - Long-form content

### Text Colors
- **Primary**: `text-black` or `text-gray-900`
- **Secondary**: `text-gray-700`
- **Muted**: `text-gray-600` or `text-gray-500`
- **On Dark**: `text-white`
- **Brand**: `text-red-600` (use sparingly)

---

## Components

### Buttons

#### Base Styles
All buttons use: `rounded-full`

#### Variants

**1. Outline (Primary Style)**
```tsx
<Button 
  variant="outline" 
  className="rounded-full border-2 border-gray-900 hover:border-red-600 hover:text-red-600 hover:bg-transparent"
>
  Button Text
</Button>
```

**2. Solid Red (Call-to-Action)**
```tsx
<Button 
  className="rounded-full bg-red-600 text-white hover:bg-red-700"
>
  Primary Action
</Button>
```

**3. Ghost (Subtle Actions)**
```tsx
<Button 
  variant="ghost" 
  className="rounded-full hover:bg-gray-100 hover:text-red-600"
>
  Secondary Action
</Button>
```

**4. Icon Buttons (Navigation - Solid)**
```tsx
<Button
  size="icon"
  className="rounded-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
  disabled={atFirstItem}
>
  <ChevronLeft className="w-5 h-5" />
</Button>
```

**5. Icon Buttons (Navigation - Outline)**
```tsx
<Button
  size="icon"
  variant="outline"
  className="rounded-full border-2 border-gray-900 hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:border-gray-300"
  disabled={atFirstItem}
>
  <ChevronLeft className="w-5 h-5" />
</Button>
```

#### Button States
- **Default**: Border and text in gray-900
- **Hover**: Border and text change to red-600
- **Active**: Background red-600, text white
- **Disabled**: `opacity-50 cursor-not-allowed`
- **Focus**: `focus:ring-2 focus:ring-red-500 focus:ring-offset-2`

### Borders & Dividers
- **Default Border**: `border border-gray-200`
- **Strong Border**: `border-2 border-gray-900`
- **Hover Border**: `hover:border-red-600`
- **Active Border**: `border-red-600`
- **Divider**: `border-t border-gray-200`

### Cards
```tsx
<div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-200 transition-colors">
  {/* Card content */}
</div>
```

### Badges

**Category/Tag Badges (Neutral)**
```tsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
  Category
</span>
```

**Multi-Color Tags (Colorful Variants)**
Use different pastel colors to visually distinguish tag types:

```tsx
// Red variant (primary/brand)
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
  Research Area
</span>

// Blue variant (methods/technical)
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
  Quantitative
</span>

// Green variant (status/success)
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
  Open Access
</span>

// Purple variant (categories)
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
  Category
</span>

// Yellow variant (highlights)
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
  Featured
</span>

// Indigo variant (topics)
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
  Topic
</span>
```

### Form Inputs
```tsx
<input
  type="text"
  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
```

### Backgrounds

**Page Background**: `bg-white`

**Section Backgrounds**: 
- Subtle contrast: `bg-gray-50`
- White sections: `bg-white`

**Overlays**:
- Semi-transparent: `bg-white/70 backdrop-blur-sm`
- Dark overlay: `bg-black/80 backdrop-blur-md`

**Navbar**: `bg-black/80 backdrop-blur-md text-white`

---

## Usage Guidelines

### ✅ Use RED for:
- Primary action buttons (solid red background)
- Active states (selected filters, pagination, tabs)
- Navigation controls (next/previous arrows)
- Hover states on interactive elements
- Progress indicators (active dots)
- Focus rings on form inputs
- Links in body text (use sparingly)

### ✅ Use GRAY for:
- Decorative elements (quote icons, shapes)
- Non-interactive badges (categories, sources)
- Body text and secondary text
- Borders on non-active elements
- Section backgrounds (subtle gray-50)
- Tag backgrounds (gray-100)

### ❌ Avoid:
- Using red on non-interactive decorative elements
- Red text for large blocks of body copy
- Mixing red with other brand colors (blue, purple, etc.)
- Overusing red badges or tags
- Red backgrounds for informational content

### Color Distribution Rule
In any given screen:
- **Red elements**: 5-10% (interactive elements only)
- **Gray/Neutral**: 80-90% (text, backgrounds, decorative)
- **White space**: Generous use for breathing room

---

## Spacing Scale

Following Tailwind's spacing scale:
- `gap-2` = 0.5rem (8px) - Tight spacing
- `gap-4` = 1rem (16px) - Default spacing
- `gap-6` = 1.5rem (24px) - Comfortable spacing
- `gap-8` = 2rem (32px) - Section spacing
- `gap-12` = 3rem (48px) - Large section spacing
- `gap-16` = 4rem (64px) - Major section breaks

### Padding Scale
- Cards: `p-6` or `p-8`
- Buttons: `px-6 py-3` (medium), `px-8 py-4` (large)
- Sections: `py-16` or `py-20`

---

## Animation & Transitions

### Transition Duration
- **Fast**: `duration-150` - Hover effects, small changes
- **Normal**: `duration-200` or `duration-300` - Default transitions
- **Slow**: `duration-500` - Page transitions, overlays

### Common Transitions
```tsx
// Hover effects
className="transition-colors duration-200"

// Transform animations
className="transition-transform duration-300"

// Multiple properties
className="transition-all duration-200"
```

### Accessibility
Always include: `motion-reduce:transition-none` for users who prefer reduced motion

---

## Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Common Patterns
```tsx
// Desktop 3 columns, tablet 2, mobile 1
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Responsive text sizes
className="text-2xl md:text-3xl lg:text-4xl"

// Responsive spacing
className="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16"
```

---

## Accessibility Standards

### Focus States
All interactive elements must have visible focus states:
```tsx
className="focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
```

### ARIA Labels
Use descriptive ARIA labels for icon buttons and navigation:
```tsx
<button aria-label="Next testimonial">
  <ChevronRight />
</button>
```

### Color Contrast
- Text on white: Minimum gray-700 (4.5:1 ratio)
- White text on red-600: Passes WCAG AA (4.5:1 ratio)
- Interactive elements: Minimum 3:1 contrast with background

### Keyboard Navigation
- All interactive elements accessible via Tab
- Enter/Space activates buttons
- Arrow keys for navigation where appropriate

---

## Common Patterns

### Two-Column Layout
```tsx
<div className="container mx-auto px-4 lg:px-8">
  <div className="flex flex-col lg:flex-row gap-8">
    {/* Sticky Sidebar */}
    <aside className="lg:w-80 lg:sticky lg:top-6 lg:self-start">
      {/* Filters */}
    </aside>
    
    {/* Main Content */}
    <main className="flex-1">
      {/* Grid */}
    </main>
  </div>
</div>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-200 transition-colors">
      {/* Card content */}
    </div>
  ))}
</div>
```

### Filter Pills
```tsx
<button
  onClick={() => setFilter(value)}
  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
    selectedFilter === value
      ? 'bg-red-600 text-white'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  }`}
>
  {label}
</button>
```

---

## Quick Reference

### Most Common Class Combinations

**Container**: `container mx-auto px-4 lg:px-8 py-16`

**Section**: `py-16 md:py-20 lg:py-24`

**Card**: `bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-200 transition-colors`

**Button (Outline)**: `rounded-full border-2 border-gray-900 hover:border-red-600 hover:text-red-600 hover:bg-transparent px-6 py-3`

**Button (Solid)**: `rounded-full bg-red-600 text-white hover:bg-red-700 px-6 py-3`

**Badge**: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700`

**Input**: `w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`

**Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## Implementation Notes

- Always use `rounded-full` for buttons (not `rounded-lg` or `rounded-md`)
- Use `border-2` for primary buttons to make them more prominent
- Prefer `backdrop-blur-md` with semi-transparent backgrounds for modern glass effects
- Keep red usage to ~5-10% of visual elements (interactive only)
- Use generous white space - don't be afraid of `gap-8` or `gap-12`
- All hover states should use `transition-colors duration-200`
- Test color contrast for accessibility (use browser DevTools)

---

*Last updated: January 15, 2026*
