# 🌙 Luna Components Library

A modern React component library built with TypeScript and Vite, designed for reusability and optimal performance.

## ✨ Features

- 🚀 **Built with Vite** - Fast development and optimized builds
- 📝 **TypeScript Support** - Full type safety and IntelliSense
- 🎨 **Modern Components** - Clean, accessible, and customizable UI components
- 🎯 **Zero Dependencies** - Components use a pure inline-style architecture for maximum portability
- 📦 **Tree-shakable** - Only bundle what you use
- 🔧 **Multiple Formats** - ES modules and UMD bundles
- 📚 **Type Declarations** - Complete TypeScript definitions included
- 🧩 **Centralized Design System** - All design tokens, variants, and shared styles live in `src/styles.ts` for consistency
- 🎭 **className Passthrough** - Every component accepts a `className` prop applied to the outermost element

## 📦 Installation

```bash
npm install luna-components-library
# or
yarn add luna-components-library
# or
pnpm add luna-components-library
```

**💡 No Setup Required:** 
Luna Library is fully standalone. All styles are encapsulated within the components using inline styles and dynamic CSS injection, meaning you do not need to install Tailwind CSS, PostCSS, Bootstrap, or any other styling framework to use it. Just install and import!

## 🚀 Quick Start

```jsx
import { useState } from 'react';
import { 
  Button, Input, Card, Typed, Accordion, ProgressBar, Spinner, 
  Preloader, ScrollTop, Modal, WhatsApp, DataTable
} from 'luna-components-library';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Basic Components */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Button 
          variant="primary" 
          onClick={() => setShowModal(true)}
        >
          Open Modal
        </Button>
        
        <Input 
          placeholder="Type something..." 
        />
      </div>

      {/* 2. Content Display */}
      <Card title="Luna Library" padding="md" shadow="sm">
        <Typed 
          strings={['Modern React Components', 'TypeScript Ready', 'Zero Dependencies']} 
        />
        <p style={{ marginTop: '0.5rem' }}>Building fast and beautiful interfaces.</p>
      </Card>

      {/* 3. Interactive Elements */}
      <Accordion 
        title="Click to expand" 
      >
        <p>This is the accordion content!</p>
      </Accordion>

      {/* 4. Feedback & Progress */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p>Loading Progress:</p>
        <ProgressBar progress={75} />
        <Spinner size="sm" type="dots" />
      </div>

      {/* 5. Communication & Navigation */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <WhatsApp phone="123456789" message="Hello!" />
        <Anchor href="https://github.com" variant="outline">GitHub Repo</Anchor>
      </div>

      {/* 6. Overlays (Modals & Preloaders) */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Quick Start Modal">
        <p>This is a modal from the library!</p>
      </Modal>

      <Preloader isLoading={isLoading} duration={2000} onComplete={() => setIsLoading(false)} />
      
      <ScrollTop />
    </div>
  );
}
```

### ⚓ Hooks & Utilities Quick Start

Luna Library also provides powerful hooks and utilities for common tasks:

```javascript
import { useFetch, useLocalStorage, httpClient, formatters, validators } from 'luna-components-library';

// 1. Data Fetching Hook
const { data, loading, error } = useFetch('https://api.example.com/data');

// 2. Direct HTTP Client
const postData = async () => {
  const result = await httpClient.post('/api/users', { name: 'New User' });
};

// 3. Local Storage Management
const [theme, setTheme] = useLocalStorage('app-theme', 'light');

// 4. Practical Utilities
const price = formatters.currency(1200.50); // "$1,200.50"
const isValid = validators.isEmail('user@luna.com'); // true
```


## 🧩 Components

All components use TypeScript with specific types for better type safety and IntelliSense. The library follows a minimal documentation approach with descriptive type names instead of extensive JSDoc comments.

### Button
A versatile button component with multiple variants, sizes, icons, and rounded style.

```jsx
// Basic
<Button variant="primary" size="md" onClick={handleClick}>Click Me</Button>

// Rounded (pill)
<Button variant="primary" rounded>Rounded</Button>

// With icon
<Button variant="primary" icon="🚀">Deploy</Button>
<Button variant="outline" icon="→" iconPosition="right">Next</Button>

// Icon only
<Button variant="danger" rounded icon="✕" />
```

**Props:**
- `children?: React.ReactNode` - Button content (optional when using icon only)
- `variant?: ButtonVariant` - Button style (default: 'primary')
- `size?: ButtonSize` - Button size (default: 'sm')
- `rounded?: boolean` - Pill/circle shape (default: false)
- `icon?: React.ReactNode` - Icon element, emoji, or any ReactNode
- `iconPosition?: 'left' | 'right'` - Icon placement (default: 'left')
- `onClick?: React.MouseEventHandler<HTMLButtonElement>` - Click handler
- `disabled?: boolean` - Disable button (default: false)
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Custom inline styles
- `...props`: any - Additional HTML button attributes

**Types:**
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';
```

**Variants:**
- `primary` - Blue background
- `secondary` - Gray background
- `outline` - Transparent with border
- `success` - Green background
- `danger` - Red background
- `warning` - Yellow background
- `info` - Cyan background
- `dark` - Dark gray background
- `light` - Light gray background
- `link` - Blue text link with hover effects

### Card
A flexible card component for displaying content with various padding and shadow options.

```jsx
<Card 
  title="Card Title"
  padding="md"
  shadow="lg"
  className="bg-white border border-gray-200 rounded-lg shadow-lg"
>
  <p className="text-gray-700">Card content goes here</p>
</Card>
```

**Props:**
- `children`: React.ReactNode - Card content
- `title?: string` - Card title (optional)
- `className?: string` - Additional CSS classes
- `padding?: CardPadding` - Internal padding (default: 'md')
- `shadow?: CardShadow` - Shadow depth (default: 'md')
- `style?: React.CSSProperties` - Custom inline styles
- `...props`: any - Additional HTML div attributes (spreads all native div props)

**Types:**
```typescript
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardShadow = 'none' | 'sm' | 'md' | 'lg';
```

### Anchor
A styled link component that opens in a new tab with customizable variants and sizes.

```jsx
<Anchor 
  href="https://example.com"
  variant="primary"
  size="sm"
  className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
>
  Link Text
</Anchor>
```

**Props:**
- `children?: React.ReactNode` - Link content (default: "Pablo Andrey Chacon Luna")
- `variant?: AnchorVariant` - Link style (default: 'primary')
- `size?: AnchorSize` - Link size (default: 'sm')
- `href?: string` - URL to link to (default: 'https://andreychaconresumereact.netlify.app/')
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Custom inline styles
- `...props`: any - Additional HTML a attributes (spreads all native a props)

**Types:**
```typescript
type AnchorVariant = 'none' | 'primary' | 'secondary' | 'outline';
type AnchorSize = 'sm' | 'md' | 'lg';
```

### Accordion
A collapsible content component with customizable header and animation.

```jsx
<Accordion 
  title="Click to expand"
  className="custom-class"
  styles={{
    header: { backgroundColor: '#f3f4f6' },
    content: { padding: '1rem' },
    arrow: { color: '#6b7280' },
    container: { marginBottom: '0.5rem' },
    innerContent: { fontSize: '0.875rem' },
  }}
>
  <p>Accordion content goes here.</p>
</Accordion>
```

**Props:**
- `title: React.ReactNode` - Header title content
- `children: React.ReactNode` - Content to show when expanded
- `defaultActive?: boolean` - Whether expanded by default (default: false)
- `active?: boolean` - Controlled active state
- `onClick?: () => void` - Toggle click handler
- `styles?: Styles<'container' | 'header' | 'content' | 'arrow' | 'innerContent'>` - Custom inline styles per element
- `className?: string` - Additional CSS classes

### Spinner
A loading spinner component with customizable types and animations.

```jsx
<Spinner 
  size="md" 
  type="circle" 
  color="#2563eb"
  className="custom-class"
  style={{ margin: '1rem' }}
/>
```

**Props:**
- `size?: SpinnerSize` - Spinner size (default: 'md')
- `type?: SpinnerType` - Spinner animation type (default: 'circle')
- `color?: string` - Spinner color (default: '#2563eb')
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Custom inline styles

**Types:**
```typescript
type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerType = 'circle' | 'dots' | 'pulse' | 'bars';
```

### DropDown
A dropdown menu component with customizable toggle and options.

```jsx
<DropDown 
  options={['Option 1', 'Option 2', 'Option 3']}
  value={selectedOption}
  onChange={setSelectedOption}
  placeholder="Select an option"
  className="custom-dropdown"
/>
```

**Props:**
- `options: (string | number | DropDownOption)[]` - Array of options
- `value?: string | number | React.ReactNode` - Currently selected value
- `onChange: (value: any) => void` - Selection change handler
- `placeholder?: string` - Placeholder text (default: 'Select an option')
- `toggle?: React.ReactNode` - Custom toggle element
- `classNames?: DropDownClassNames` - Custom class names for sub-elements
- `styles?: DropDownStyles` - Custom inline styles per element
- `disabled?: boolean` - Disable the dropdown (default: false)
- `className?: string` - Additional CSS classes for container

**DropDownOption Interface:**
```typescript
interface DropDownOption {
  value: string | number;
  label: React.ReactNode;
}
```

### ProgressBar
A progress bar component with customizable progress values, variants, and accessibility.

```jsx
<ProgressBar 
  progress={75}
  variant="primary"
  showPercentage
  className="custom-class"
/>
```

**Props:**
- `progress: number` - Current progress value
- `max?: number` - Maximum progress value (default: 100)
- `min?: number` - Minimum progress value (default: 0)
- `variant?: ProgressBarVariant` - Color variant (default: 'primary')
- `showPercentage?: boolean` - Show percentage text (default: true)
- `className?: string` - Additional CSS classes
- `styles?: { container?: React.CSSProperties; bar?: React.CSSProperties; text?: React.CSSProperties }` - Custom inline styles
- `aria-label?: string` - Accessibility label

**Types:**
```typescript
type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';
```

### Preloader
A fullscreen overlay preloader component with customizable spinner and auto-hide functionality.

```jsx
<Preloader 
  isLoading={isLoading}
  duration={2000}
  backgroundColor="rgba(0,0,0,0.8)"
  accentColor="#00ff88"
  size={90}
  borderWidth={6}
  onComplete={() => setIsLoading(false)}
/>
```

**Props:**
- `isLoading?: boolean` - Whether the preloader should be visible (if not provided, uses internal state)
- `duration?: number` - Duration in milliseconds before auto-hide (default: 2000)
- `backgroundColor?: string` - Background color of the overlay (default: CSS variable)
- `accentColor?: string` - Color of the spinner (default: CSS variable)
- `size?: number` - Size of the spinner in pixels (default: 60)
- `borderWidth?: number` - Border width of the spinner (default: 6)
- `className?: string` - Additional CSS classes for the overlay
- `spinnerClassName?: string` - Additional CSS classes for the spinner
- `zIndex?: number` - Z-index of the overlay (default: 999999)
- `onComplete?: () => void` - Callback when preloader finishes
- `styles?: { overlay?: React.CSSProperties; spinner?: React.CSSProperties; }` - Custom inline styles

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
  className="custom-class"
/>
```

**Props:**
- `threshold?: number` - Scroll position threshold in pixels (default: 100)
- `className?: string` - Additional CSS classes
- `children?: React.ReactNode` - Custom icon/content (default: arrow up SVG)
- `position?: CornerPosition` - Button position (default: 'bottom-right')
- `size?: number` - Button size in pixels (default: 48)
- `scrollBehavior?: 'auto' | 'smooth'` - Scroll behavior (default: 'smooth')
- `styles?: React.CSSProperties` - Custom inline styles

**Position Options:**
- `bottom-right` - Fixed bottom right
- `bottom-left` - Fixed bottom left
- `top-right` - Fixed top right
- `top-left` - Fixed top left

### Typed
A typing animation component that types and deletes text in sequence.

```jsx
<Typed 
  strings={['Hello', 'World', 'React']}
  typeSpeed={50}
  backSpeed={30}
  loop={true}
  className="custom-class"
  style={{ fontSize: '1.25rem' }}
/>
```

**Props:**
- `strings: string[]` - Array of strings to type in sequence
- `typeSpeed?: number` - Typing speed in ms per character (default: 50)
- `backSpeed?: number` - Backspacing speed in ms per character (default: 30)
- `backDelay?: number` - Delay before backspacing in ms (default: 500)
- `startDelay?: number` - Delay before typing starts in ms (default: 0)
- `loop?: boolean` - Loop through strings (default: true)
- `showCursor?: boolean` - Show blinking cursor (default: true)
- `className?: string` - Additional CSS classes
- `style?: CSSProperties & { animation?: string; animationDelay?: string }` - Custom inline styles
- `cursorStyle?: React.CSSProperties` - Custom styles for cursor element

### WhatsApp
A WhatsApp button component for quick contact integration.

```jsx
<WhatsApp 
  phone="1234567890"
  message="Hello! I need help."
  position="bottom-right"
  size="md"
  className="custom-class"
/>
```

**Props:**
- `phone?: string` - Phone number (with country code, without + or spaces)
- `message?: string` - Default message (default: 'Hi!')
- `position?: CornerPosition` - Button position (default: 'bottom-right')
- `size?: Size` - Button size (default: 'md')
- `showTooltip?: boolean` - Show tooltip on hover (default: true)
- `tooltipText?: string` - Tooltip text (default: 'Need help?')
- `className?: string` - Additional CSS classes
- `styles?: { button?: React.CSSProperties; tooltip?: React.CSSProperties }` - Custom inline styles
- `onClick?: () => void` - Click callback
- `zIndex?: number` - Z-index (default: 1000)

### Modal
A flexible modal component for displaying dialogs, forms, and overlays.

```jsx
<Modal 
  show={showModal}
  onHide={() => setShowModal(false)}
  title="Modal Title"
  size="lg"
  centered
  className="bg-white rounded-lg shadow-xl"
  contentClassName="p-6"
  headerClassName="border-b border-gray-200 px-6 py-4"
>
  <p className="text-gray-700">Modal content goes here.</p>
  <div className="mt-4 flex gap-2">
    <Button variant="secondary" onClick={() => setShowModal(false)} className="border-gray-300">
      Close
    </Button>
    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
      Save Changes
    </Button>
  </div>
</Modal>
```

**Props:**
- `show: boolean` - Whether the modal is visible
- `onHide: () => void` - Callback when modal is closed
- `size?: ModalSize` - Modal size (default: 'md')
- `centered?: boolean` - Whether to center the modal vertically (default: false)
- `backdrop?: boolean | 'static'` - Backdrop overlay behavior (default: true)
- `backdropClose?: boolean` - Whether clicking backdrop closes modal (default: true)
- `keyboard?: boolean` - Whether ESC key closes modal (default: true)
- `animation?: boolean` - Whether to show animations (default: true)
- `title?: React.ReactNode` - Modal title
- `header?: React.ReactNode` - Custom header content
- `children: React.ReactNode` - Modal body content
- `footer?: React.ReactNode` - Custom footer content
- `closeButton?: boolean` - Whether to show close button (default: true)
- `className?: string` - Additional CSS classes for the modal
- `dialogClassName?: string` - CSS classes for the modal dialog (default: 'luna-modal-dialog')
- `contentClassName?: string` - CSS classes for the modal content (default: 'luna-modal-content')
- `headerClassName?: string` - CSS classes for the modal header (default: 'luna-modal-header')
- `bodyClassName?: string` - CSS classes for the modal body (default: 'luna-modal-body')
- `footerClassName?: string` - CSS classes for the modal footer (default: 'luna-modal-footer')
- `style?: React.CSSProperties` - Custom inline styles


**Types:**
```typescript
type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
```

**Examples:**
```jsx
// Basic modal
<Modal show={show} onHide={handleClose}>
  <p>Simple modal content</p>
</Modal>

// Large centered modal with custom footer
<Modal 
  show={show} 
  onHide={handleClose}
  size="lg"
  centered
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
  <div className="mt-4">
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </div>
</Modal>

// Static backdrop (can't close by clicking outside)
<Modal 
  show={show} 
  onHide={handleClose}
  backdrop="static"
  backdropClose={false}
>
  <p>This modal requires explicit action to close.</p>
</Modal>

// Custom styled modal
<Modal 
  show={show} 
  onHide={handleClose}
  contentClassName="bg-dark text-white"
  headerClassName="bg-secondary"
>
  <p>Dark themed modal</p>
</Modal>

// Modal with data flow (parent to child and child to parent)
interface FormData {
  name: string;
  email: string;
  message: string;
}

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  // Pass data to modal
  const openEditModal = (data: FormData) => {
    setFormData(data);
    setShowModal(true);
  };

  // Receive data from modal
  const handleSubmit = (data: FormData) => {
    console.log('Data from modal:', data);
    // Process data (API call, etc.)
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} title="Edit Data">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}>
        <input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Message"
          className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowModal(false)} className="border-gray-300 hover:border-gray-400">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(formData)} className="bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
```

### Input
A versatile input component with multiple variants, sizes, masks, currency formatting, icons, and required indicator.

```jsx
// Basic
<Input variant="primary" placeholder="Enter text">Label</Input>

// With icon
<Input icon="🔍" placeholder="Search...">Search</Input>
<Input icon="🔒" iconPosition="right" variant="danger" placeholder="Password">Password</Input>

// Required indicator
<Input isRequired variant="primary" placeholder="Email">Email</Input>

// Currency
<Input useCurrency currency="USD" locale="en-US" placeholder="$0.00">Price</Input>

// Mask
<Input mask="(999) 999-9999" placeholder="(555) 000-0000">Phone</Input>
```

**Props:**
- `children?: React.ReactNode` - Label content
- `variant?: InputVariant` - Border color variant (default: 'none')
- `inputSize?: InputSize` - Input size (default: 'md')
- `type?: InputType` - HTML input type (default: 'text')
- `placeholder?: string` - Placeholder text
- `value?: string` - Controlled value
- `onChange?: (value: string) => void` - Change handler
- `onFocus?: () => void` - Focus handler
- `onBlur?: () => void` - Blur handler
- `disabled?: boolean` - Disable input (default: false)
- `required?: boolean` - HTML required attribute (default: false)
- `isRequired?: boolean` - Shows a red `*` next to the label (default: false)
- `readOnly?: boolean` - Read-only input (default: false)
- `icon?: React.ReactNode` - Icon inside the input (emoji, SVG, component)
- `iconPosition?: 'left' | 'right'` - Icon placement (default: 'left')
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Custom inline styles
- `id?: string` - HTML id for label association
- `name?: string` - HTML name attribute
- `classNames?: InputClassNames` - Custom class names per sub-element
- `styles?: InputStyles` - Custom inline styles per sub-element
- `mask?: string` - Input mask pattern (e.g. `"(999) 999-9999"`)
- `maskChar?: string` - Mask placeholder character (default: `'_'`)
- `useCurrency?: boolean` - Enable currency formatting
- `currency?: string` - Currency code (e.g. `"USD"`, `"CRC"`)
- `locale?: string` - Locale for formatting (e.g. `"en-US"`, `"es-CR"`)
- `minFractionDigits?: number` - Minimum fraction digits (default: 0)
- `maxFractionDigits?: number` - Maximum fraction digits (default: 2)
- `aria-label?: string` - ARIA label
- `aria-labelledby?: string` - ARIA labelledby
- `...props`: any - Additional HTML input attributes

**Types:**
```typescript
type InputVariant = 'none' | 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'warning' | 'info' | 'dark' | 'light' | 'link';
type InputSize = 'sm' | 'md' | 'lg' | 'xl';
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'file' | 'hidden' | 'image' | 'range' | 'reset' | 'submit';
```

**Focus behavior:** Border increases from `1px` to `2px` on focus, using the variant color. On blur it returns to `1px` with the same variant color.

**Variants:** Each variant applies a distinct border color — `primary` (blue), `secondary` (gray), `danger` (red), `success` (green), `warning` (yellow), `info` (cyan), `dark`, `light`, `outline` (default gray), `none` (default gray).

**Size Options:**
- `sm` - Small padding and text
- `md` - Medium padding and text
- `lg` - Large padding and text
- `xl` - Extra large padding and text
### Form
A form component with built-in state management, validation, and layout control. Works together with the `useForm` hook.

```jsx
import { Form, Input, Button, useForm } from 'luna-components-library';

const MyForm = () => {
  const form = useForm({
    name:  { value: '', rules: [{ required: true, message: 'Name is required' }] },
    email: { value: '', rules: [{ required: true }, { type: 'email', message: 'Invalid email' }] },
    password: { value: '', rules: [
      { required: true },
      { minLength: 6, message: 'Min 6 characters' },
      { validator: (v) => !validators.isStrongPassword(v) ? 'Must have letters and numbers' : undefined }
    ]},
    birthdate: { value: '', rules: [{ type: 'date' }, { maxDate: '2025-12-31' }] },
    agree: { value: false, rules: [{ required: true, message: 'You must accept the terms' }] },
  });

  return (
    <Form form={form} layout="vertical" onFinish={(values) => console.log(values)}>
      <Form.Item name="name" label="Full Name" required>
        <Input placeholder="John Doe" />
      </Form.Item>
      <Form.Item name="email" label="Email" required>
        <Input type="email" placeholder="john@example.com" />
      </Form.Item>
      <Form.Item name="password" label="Password" required>
        <Input type="password" placeholder="Min 6 chars" />
      </Form.Item>
      <Form.Item name="birthdate" label="Birth Date" required>
        <Input type="date" />
      </Form.Item>
      <Form.Item name="agree">
        <label>
          <input type="checkbox" checked={form.values.agree} onChange={(e) => form.setValue('agree', e.target.checked)} />
          I accept the terms
        </label>
      </Form.Item>
      <Button type="submit">Submit</Button>
      <Button type="button" variant="outline" onClick={form.reset}>Reset</Button>
    </Form>
  );
};
```

**Form Props:**
- `form: FormInstance` - Form instance from `useForm` hook
- `onFinish?: (values) => void` - Called on valid submit
- `onFinishFailed?: (errors) => void` - Called on invalid submit
- `layout?: FormLayout` - Layout mode (default: `'vertical'`)
- `children: React.ReactNode` - Form fields
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Custom inline styles

**Form.Item Props:**
- `name?: string` - Field name, connects to form context
- `label?: React.ReactNode` - Field label
- `children: React.ReactElement` - Input component (auto-receives `value` and `onChange`)
- `required?: boolean` - Shows `*` on label
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Custom inline styles

**Types:**
```typescript
type FormLayout = 'vertical' | 'horizontal' | 'inline';
```

**Behavior:**
- `Form.Item` automatically injects `value`, `onChange`, and `variant="danger"` into the child when there's an error
- Supports Luna `Input` and native HTML inputs (checkbox, etc.)
- Error messages appear below the field in red

### DataTable

A powerful and customizable data grid with support for filtering, sorting, pagination, selection, and search.

```jsx
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true, filterable: true },
    { key: 'email', label: 'Email' },
    { 
      key: 'status', 
      label: 'Status', 
      filterable: true,
      filterOptions: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' }
      ],
      render: (val) => <span className={val === 'Active' ? 'text-green-600' : 'text-red-600'}>{val}</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
          Edit
        </Button>
      )
    }
  ]}
  data={myData}
  pagination
  pageSize={5}
  selectable
  searchable
  onRowClick={(row) => console.log('Clicked:', row)}
  onSelectionChange={(selectedRows) => console.log('Selected:', selectedRows)}
  className="custom-datatable"
/>
```

**Props:**
- `columns: DataTableColumn[]` - Array of column definitions
- `data: any[]` - Array of data objects
- `pagination?: boolean` - Enable pagination (default: false)
- `pageSize?: number` - Rows per page (default: 10)
- `selectable?: boolean` - Show selection checkboxes (default: false)
- `searchable?: boolean` - Show search filter (default: false)
- `onSelectionChange?: (selectedRows: any[]) => void` - Selection change handler
- `onRowClick?: (row: any) => void` - Row click handler
- `onRowDoubleClick?: (row: any) => void` - Row double click handler
- `texts?: DataTableTexts` - Custom text labels for i18n
- `classNames?: DataTableClassNames` - Custom class names per element
- `styles?: DataTableStyles` - Custom inline styles per element
- `className?: string` - Additional CSS classes

**Column Interface:**
```typescript
interface DataTableColumn {
  key: string;
  label: React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: { label: string; value: any }[];
  render?: (value: any, row: any) => React.ReactNode;
}
```





## 🛠️ Utilities & Hooks

Luna Library now includes generic utilities and hooks to streamline API communication and state management.

### httpClient
A generic HTTP client wrapper for the Fetch API with support for standard HTTP methods. It automatically handles JSON stringification for POST/PUT requests and sets appropriate headers. Calls apiFetch internally.

```javascript
import { httpClient } from 'luna-components-library';

// GET request
const data = await httpClient.get('https://api.example.com/data');

// POST request
const response = await httpClient.post('https://api.example.com/posts', {
  title: 'New Post',
  body: 'Content here'
});

// httpClient.delete(url, options)
```

### apiFetch
A low-level wrapper for the native `fetch` API that includes automatic response parsing and error handling for non-OK HTTP statuses.

```javascript
import { apiFetch } from 'luna-components-library';

try {
  const data = await apiFetch('https://api.example.com/resource');
  console.log(data);
} catch (error) {
  console.error('Fetch failed:', error.message);
}
```


### storage
A wrapper for `localStorage` with safety checks and automatic JSON parsing.

```javascript
import { storage } from 'luna-components-library';

storage.set('user-theme', 'dark');
const theme = storage.get('user-theme', 'light'); // 'dark'
storage.remove('user-theme');
storage.clear();
```

### formatters
Useful functions for data presentation.

```javascript
import { formatters } from 'luna-components-library';

const price = formatters.currency(1500.50); // "$1,500.50"
const date = formatters.date(new Date()); // "May 14, 2026"
const text = formatters.truncate('Long text here...', 10); // "Long text..."
```

### validators
Common validation functions, shared internally with `useForm`.

```javascript
import { validators } from 'luna-components-library';

validators.isEmail('test@example.com');        // true
validators.isUrl('https://example.com');       // true
validators.isEmpty('   ');                     // true
validators.isEmpty(null);                      // true
validators.isEmpty(false);                     // true
validators.isNumber('42');                     // true
validators.isStrongPassword('Pass1234');       // true (8+ chars, letter + number)
validators.isPhone('88888888', 'es-CR');       // true
validators.minLength('hello', 3);             // true
validators.maxLength('hello', 10);            // true
validators.matchesPattern('ABC123', /^[A-Z]{3}\d{3}$/); // true
validators.isDate('2025-01-15');              // true
validators.isDateBefore('2024-01-01', '2025-01-01'); // true
validators.isDateAfter('2025-01-01', '2024-01-01');  // true
```

### logger
Styled console logging for better debugging in development.

```javascript
import { logger } from 'luna-components-library';

logger.info('App started');
logger.success('User logged in');
logger.warn('Low disk space');
logger.error('API failed', error);
```

### useFetch
A powerful custom hook for performing data fetching. It manages `data`, `error`, and `loading` states automatically and includes built-in `AbortController` support to prevent memory leaks and race conditions.

**Options:**
- `delay?: number` - Optional delay in milliseconds before performing the fetch (useful for simulating slow networks or testing loading states).

```javascript
import { useFetch, Spinner } from 'luna-components-library';

function UserList() {
  // Fetch with an artificial delay of 2 seconds
  const { data, error, loading } = useFetch('https://api.example.com/users', { delay: 2000 });

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### useForm
Manages form state and validation. Returns a `FormInstance` used by the `Form` component.

```javascript
import { useForm } from 'luna-components-library';

const form = useForm({
  email: {
    value: '',
    rules: [
      { required: true, message: 'Email is required' },
      { type: 'email', message: 'Invalid email' },
    ]
  },
  age: {
    value: '',
    rules: [
      { type: 'number', message: 'Must be a number' },
    ]
  },
  website: {
    value: '',
    rules: [{ type: 'url', message: 'Invalid URL' }]
  },
  birthdate: {
    value: '',
    rules: [
      { type: 'date', message: 'Invalid date' },
      { minDate: '1900-01-01', message: 'Too old' },
      { maxDate: '2025-12-31', message: 'Cannot be in the future' },
    ]
  },
  bio: {
    value: '',
    rules: [
      { minLength: 10, message: 'Min 10 characters' },
      { maxLength: 200, message: 'Max 200 characters' },
    ]
  },
  code: {
    value: '',
    rules: [{ pattern: /^[A-Z]{3}\d{3}$/, message: 'Format: ABC123' }]
  },
  custom: {
    value: '',
    rules: [{ validator: (v) => v !== 'forbidden' ? undefined : 'This value is not allowed' }]
  },
});

// FormInstance API
form.values;                    // { email: '', age: '', ... }
form.errors;                    // { email: 'Email is required', ... }
form.setValue('email', 'a@b.c'); // update + validate field
form.validate();                 // validate all, returns boolean
form.reset();                    // restore initial values
form.setError('email', 'Taken'); // set error manually
form.clearError('email');        // clear error manually
```

**FieldRule options:**
```typescript
type FieldRule = {
  required?: boolean;       // field must not be empty
  message?: string;         // custom error message
  type?: 'email' | 'url' | 'number' | 'date'; // format validation
  minLength?: number;       // minimum string length
  maxLength?: number;       // maximum string length
  minDate?: string;         // minimum date (ISO string)
  maxDate?: string;         // maximum date (ISO string)
  pattern?: RegExp;         // regex pattern
  validator?: (value: any) => string | undefined; // custom validator
};
```

### useLocalStorage
Syncs state with `localStorage` automatically.

```javascript
import { useLocalStorage } from 'luna-components-library';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme}</button>;
}
```

### useDebounce
Delays value updates until a specified time has passed.

```javascript
import { useDebounce } from 'luna-components-library';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  
  useEffect(() => {
    // Perform search only when user stops typing
  }, [debouncedQuery]);
}
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
│   │   ├── apiExamples/          # Examples for API utilities
│   │   ├── modalExamples/        # Examples for Modal component
│   │   ├── utilExamples/         # Examples for hooks and extra utilities
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── DataTable.tsx
│   │   ├── ... (Other UI Components)

│   │   └── index.ts
│   ├── styles.ts                 # Design tokens and shared style functions
│   ├── types.ts                  # Shared TypeScript types
│   ├── hooks/
│   │   ├── useFetch.hook.ts
│   │   ├── useLocalStorage.hook.ts
│   │   ├── useDebounce.hook.ts
│   │   └── index.ts
│   ├── utilities/
│   │   ├── apiFetch.util.ts
│   │   ├── httpClient.util.ts
│   │   ├── storage.util.ts
│   │   ├── formatters.util.ts
│   │   ├── validators.util.ts
│   │   ├── logger.util.ts
│   │   └── index.ts
│   ├── demo.tsx                  # Main visual demo page
│   └── index.ts                  # Library entry point
├── dist/                         # Build output
├── package.json
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
This library uses a **pure inline-style architecture** with a centralized design system. All design tokens (`colors`, `radii`, `fontSizes`, `shadows`, `transitions`, etc.) and shared style objects (`commonStyles`, `variantStyles`, `sizeStyles`) are defined in `src/styles.ts`. Components consume these tokens and generate inline styles, class name strings, or both depending on the component.

**No CSS framework required** - you don't need Tailwind CSS, PostCSS, or any other styling tool to use this library. Each component accepts `className` (for CSS classes) and `style` (for inline style overrides) props for customization.

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
