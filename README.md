# 🌙 Luna Components Library

A modern React component library built with TypeScript and Vite, designed for reusability and optimal performance.

## ✨ Features

- 🚀 **Built with Vite** - Fast development and optimized builds
- 📝 **TypeScript Support** - Full type safety and IntelliSense
- 🎨 **Modern Components** - Clean, accessible, and customizable UI components
- 🎯 **Tailwind CSS Styled** - Components use Tailwind CSS utility classes for styling
- 📦 **Tree-shakable** - Only bundle what you use
- 🔧 **Multiple Formats** - ES modules and UMD bundles
- 📚 **Type Declarations** - Complete TypeScript definitions included

## 📦 Installation

```bash
npm install luna-components-library
# or
yarn add luna-components-library
# or
pnpm add luna-components-library
```

**⚠️ Important:** This library uses **Tailwind CSS** for styling. Make sure you have Tailwind CSS configured in your project:

```bash
npm install tailwindcss
npx tailwindcss init -p
```

Then add the library's components to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/luna-components-library/dist/**/*.{js,ts,jsx,tsx}"
  ],
  // ... rest of your config
}
```

## 🚀 Quick Start

```jsx
import { Button, Card, Anchor, Accordion, Spinner, DropDown, ProgressBar, Preloader, ScrollTop } from 'luna-components-library';

function App() {
  return (
    <div className="p-4 space-y-4">
      <Button 
        variant="primary" 
        size="lg"
        onClick={() => console.log('Clicked!')}
      >
        Click me
      </Button>
      
      <Card 
        title="Example Card" 
        padding="md" 
        shadow="lg"
        className="max-w-md"
      >
        <p>This is a card component from Luna Components Library.</p>
        <Button variant="outline" size="sm">
          Learn More
        </Button>
      </Card>

      <Anchor href="https://example.com" variant="secondary">
        Visit Example
      </Anchor>

      <Accordion 
        key="demo"
        active={false}
        onClick={() => console.log('Toggle')}
        header={<h3>Click to expand</h3>}
        content={<p>This is the accordion content!</p>}
      />

      <Spinner />

      <DropDown 
        toggle={<button>Select Option</button>}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]}
        selected="option1"
        onChange={(value) => console.log('Selected:', value)}
      />

      <ProgressBar 
        progress={60}
        max={100}
        min={0}
        aria-label="Upload progress"
      />

      <Preloader 
        isLoading={isLoading}
        duration={2000}
        onComplete={() => setIsLoading(false)}
      />

      <ScrollTop 
        threshold={200}
        position="bottom-right"
        size="md"
        className="bg-blue-600 hover:bg-blue-700"
      />
    </div>
  );
}
```

## 🧩 Components

### Button
A versatile button component with multiple variants and sizes.

```jsx
<Button 
  variant="primary" 
  size="md"
  onClick={handleClick}
  disabled={false}
  className="custom-class"
>
  Button Text
</Button>
```

**Props:**
- `children`: React.ReactNode - Button content
- `variant?: 'primary' | 'secondary' | 'outline'` - Button style (default: 'primary')
- `size?: 'sm' | 'md' | 'lg'` - Button size (default: 'md')
- `onClick?: () => void` - Click handler
- `disabled?: boolean` - Disable button (default: false)
- `className?: string` - Additional CSS classes

**Variants:**
- `primary` - Blue background button
- `secondary` - Gray background button  
- `outline` - Transparent with border

### Card
A flexible card component for displaying content with various padding and shadow options.

```jsx
<Card 
  title="Card Title"
  padding="md"
  shadow="lg"
  className="custom-card"
>
  <p>Card content goes here</p>
</Card>
```

**Props:**
- `children`: React.ReactNode - Card content
- `title?: string` - Card title (optional)
- `className?: string` - Additional CSS classes
- `padding?: 'none' | 'sm' | 'md' | 'lg'` - Internal padding (default: 'md')
- `shadow?: 'none' | 'sm' | 'md' | 'lg'` - Shadow depth (default: 'md')

### Anchor
A styled link component that opens in a new tab with customizable variants and sizes.

```jsx
<Anchor 
  href="https://example.com"
  variant="primary"
  size="sm"
  className="custom-anchor"
>
  Link Text
</Anchor>
```

**Props:**
- `children?: React.ReactNode` - Link content (default: "Pablo Andrey Chacon Luna")
- `variant?: 'primary' | 'secondary' | 'outline'` - Link style (default: 'primary')
- `size?: 'sm' | 'md' | 'lg'` - Link size (default: 'sm')
- `href?: string` - URL to link to (default: 'https://andreychaconresumereact.netlify.app/')
- `className?: string` - Additional CSS classes

### Accordion
A collapsible content component with customizable header and content sections.

```jsx
<Accordion 
  key="accordion-1"
  active={isActive}
  onClick={() => setIsActive(!isActive)}
  header={<h3>Accordion Title</h3>}
  content={<p>Accordion content goes here</p>}
/>
```

**Props:**
- `key: string` - Unique identifier for the accordion
- `active: boolean` - Whether the accordion is expanded
- `onClick: () => void` - Toggle function
- `header: React.ReactNode` - Header content
- `content: React.ReactNode` - Content to show when expanded

### Spinner
A loading spinner component with customizable styling.

```jsx
<Spinner className="custom-spinner" />
```

**Props:**
- `className?: string` - Additional CSS classes (default: "spinner-border")

### DropDown
A dropdown menu component with customizable toggle and options.

```jsx
<DropDown 
  toggle={<button>Menu</button>}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  selected="option1"
  onChange={(value) => console.log('Selected:', value)}
/>
```

**Props:**
- `toggle: React.ReactNode` - Toggle button/element
- `options: DropDownOption[]` - Array of option objects with `value` and `label` properties
- `selected: string | number` - Currently selected option value
- `onChange: (value: string | number) => void` - Selection change handler

**DropDownOption Interface:**
```typescript
interface DropDownOption {
  value: string | number;
  label: React.ReactNode;
}
```

### ProgressBar
A progress bar component with customizable progress values and accessibility.

```jsx
<ProgressBar 
  progress={75}
  max={100}
  min={0}
  aria-label="Loading progress"
/>
```

**Props:**
- `progress: number` - Current progress value
- `max: number` - Maximum progress value
- `min: number` - Minimum progress value
- `aria-label: string` - Accessibility label

### Preloader
A fullscreen overlay preloader component with customizable spinner and auto-hide functionality.

```jsx
<Preloader 
  isLoading={isLoading}
  duration={2000}
  backgroundColor="#1a1a1a"
  accentColor="#00ff88"
  size={90}
  borderWidth={6}
  onComplete={() => setIsLoading(false)}
/>
```

**Props:**
- `isLoading?: boolean` - Whether the preloader should be visible (if not provided, uses internal state)
- `duration?: number` - Duration in milliseconds before auto-hide (default: 1000)
- `backgroundColor?: string` - Background color of the overlay (default: CSS variable)
- `accentColor?: string` - Color of the spinner (default: CSS variable)
- `size?: number` - Size of the spinner in pixels (default: 60)
- `borderWidth?: number` - Border width of the spinner (default: 6)
- `className?: string` - Additional CSS classes for the overlay
- `spinnerClassName?: string` - Additional CSS classes for the spinner
- `zIndex?: number` - Z-index of the overlay (default: 999999)
- `onComplete?: () => void` - Callback when preloader finishes

**Usage Modes:**
- **Controlled:** Use `isLoading` prop to control visibility externally
- **Auto-hide:** Omit `isLoading` prop to auto-hide after `duration`

**Examples:**
```jsx
// Controlled mode
const [loading, setLoading] = useState(false);
<Preloader isLoading={loading} onComplete={() => setLoading(false)} />

// Auto-hide mode
<Preloader duration={3000} />

// Custom styling
<Preloader 
  isLoading={true}
  backgroundColor="rgba(0,0,0,0.8)"
  accentColor="#ff6b6b"
  size={120}
  borderWidth={8}
/>
```

### ScrollTop
A floating scroll-to-top button that appears when the user scrolls down the page.

```jsx
<ScrollTop 
  threshold={200}
  position="bottom-right"
  size="md"
  className="bg-blue-600 hover:bg-blue-700"
/>
```

**Props:**
- `threshold?: number` - Scroll position threshold to show the button in pixels (default: 100)
- `className?: string` - Additional CSS classes for the button
- `children?: React.ReactNode` - Custom icon/content for the button (default: arrow up)
- `position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center'` - Button position (default: 'bottom-right')
- `size?: 'sm' | 'md' | 'lg'` - Button size (default: 'md')
- `shape?: 'circle' | 'square' | 'rounded'` - Button shape (default: 'circle')
- `showInitially?: boolean` - Whether to show the button initially (default: false)
- `scrollBehavior?: 'auto' | 'smooth'` - Scroll behavior (default: 'smooth')
- `style?: React.CSSProperties` - Custom styles
- `onClick?: () => void` - Callback when button is clicked
- `onVisibilityChange?: (isVisible: boolean) => void` - Callback when visibility changes
- `targetElement?: string` - Element ID or selector to check visibility for showing the button
- `scrollPercentage?: number` - Percentage of page scroll to show the button (0-100)

**Position Options:**
- `bottom-right` - Fixed bottom right
- `bottom-left` - Fixed bottom left
- `bottom-center` - Fixed bottom center
- `top-right` - Fixed top right
- `top-left` - Fixed top left
- `top-center` - Fixed top center

**Size Options:**
- `sm` - Small (32x32px)
- `md` - Medium (48x48px)
- `lg` - Large (64x64px)

**Shape Options:**
- `circle` - Fully rounded
- `square` - Square corners
- `rounded` - Slightly rounded

**Examples:**
```jsx
// Default usage with target element
<ScrollTop targetElement="#default-target" />

// Custom position and size
<ScrollTop 
  position="bottom-left"
  size="lg"
  targetElement="#custom-target"
  className="bg-purple-600 hover:bg-purple-700"
/>

// Top position with small size
<ScrollTop 
  position="top-right"
  size="sm"
  targetElement="#top-target"
  className="bg-green-600 hover:bg-green-700"
/>

// Center position with custom color
<ScrollTop 
  position="top-center"
  size="sm"
  targetElement="#center-target"
  className="bg-blue-600 hover:bg-blue-700"
/>

// Percentage-based triggering
<ScrollTop 
  position="bottom-center"
  size="lg"
  scrollPercentage={99}
  className="bg-indigo-600 hover:bg-indigo-700"
>
  <span className="text-white font-bold">Top</span>
</ScrollTop>

// Custom icon with callbacks
<ScrollTop 
  targetElement="#footer"
  onVisibilityChange={(visible) => console.log('Visible:', visible)}
  onClick={() => console.log('Scrolled to top!')}
>
  <span className="text-white font-bold">↑</span>
</ScrollTop>
```

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd luna-library

# Install dependencies
npm install

# Start development with watch mode
npm run dev

# Build the library
npm run build

# Clean build directory
npm run clean
```

### Project Structure

```
luna-library/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Anchor.tsx
│   │   ├── Accordion.tsx
│   │   ├── Spinner.tsx
│   │   ├── DropDown.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Preloader.tsx
│   │   ├── ScrollTop.tsx
│   │   └── index.ts
│   └── index.ts
├── dist/                 # Build output
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📦 Build & Publishing

### Build Process

The library uses Vite for building with the following outputs:

```bash
npm run build
```

**Generated Files:**
- `dist/luna-components-library.es.js` - ES Module bundle
- `dist/luna-components-library.umd.js` - UMD bundle
- `dist/index.d.ts` - TypeScript declarations
- Source maps for debugging

### Publishing to NPM

```bash
# Login to NPM
npm login

# Build and publish
npm publish
```

The `prepublishOnly` script automatically builds the library before publishing.

## 🔧 Configuration

### TypeScript Configuration

The library is configured with:
- Strict type checking enabled
- React JSX support
- Declaration file generation
- Modern ES2020 target

### Vite Configuration

- Library mode with ES and UMD outputs
- External React dependencies (peer dependencies)
- TypeScript declaration generation with `vite-plugin-dts`
- Source maps for debugging

## 📋 Dependencies

### Peer Dependencies
- `react: >=16.8.0`
- `react-dom: >=16.8.0`

### Dev Dependencies
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React plugin for Vite
- `typescript` - TypeScript compiler
- `vite-plugin-dts` - TypeScript declaration generation
- `rimraf` - Cross-platform file removal

### Styling
This library is built with **Tailwind CSS** utility classes. Components use predefined Tailwind classes for consistent styling and are fully customizable through the `className` prop.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Author

Created and maintained by [Pablo Andrey Chacon](https://andreychaconresumereact.netlify.app)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/luna-components-library)
- [Live Demo](https://luna-components-demo.netlify.app)
- [GitHub Repository](https://github.com/pabloandreychacon/luna-library)
- [Author's Portfolio](https://andreychaconresumereact.netlify.app/portfolio)
