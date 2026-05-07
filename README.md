# 🌙 Luna Components Library

A modern React component library built with TypeScript and Vite, designed for reusability and optimal performance.

## ✨ Features

- 🚀 **Built with Vite** - Fast development and optimized builds
- 📝 **TypeScript Support** - Full type safety and IntelliSense
- 🎨 **Modern Components** - Clean, accessible, and customizable UI components
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

## 🚀 Quick Start

```jsx
import { Button, Card } from 'luna-components-library';

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Author

Created and maintained by [Pablo Andre Chacon](https://andreychaconresumereact.netlify.app)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/luna-components-library)
- [GitHub Repository](https://github.com/your-username/luna-components-library)
- [Author's Portfolio](https://andreychaconresumereact.netlify.app)
