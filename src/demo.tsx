import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Button from './components/Button';
import Card from './components/Card';
import Anchor from './components/Anchor';
import Accordion from './components/Accordion';
import Spinner from './components/Spinner';
import DropDown from './components/DropDown';
import ProgressBar from './components/ProgressBar';
import Typed from './components/Typed';
import Preloader from './components/Preloader';

const DemoApp = () => {
  const [accordionActive, setAccordionActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [progress, setProgress] = useState(50);
  const [showDefaultPreloader, setShowDefaultPreloader] = useState(false);
  const [showCustomPreloader, setShowCustomPreloader] = useState(false);

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌙 Luna Components Library
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Visual Demo & Testing Page
          </p>
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              This page allows you to test all components visually before publishing.
              Each component is interactive and demonstrates different props and states.
            </p>
          </div>
        </header>

        <div className="space-y-12">
          {/* Button Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">🔘 Button Component</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Primary Variants</h3>
                  <div className="space-y-2">
                    <Button variant="primary" size="sm">Small Primary</Button>
                    <Button variant="primary" size="md">Medium Primary</Button>
                    <Button variant="primary" size="lg">Large Primary</Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Secondary Variants</h3>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm">Small Secondary</Button>
                    <Button variant="secondary" size="md">Medium Secondary</Button>
                    <Button variant="secondary" size="lg">Large Secondary</Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Outline Variants</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">Small Outline</Button>
                    <Button variant="outline" size="md">Medium Outline</Button>
                    <Button variant="outline" size="lg">Large Outline</Button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">States</h3>
                <div className="flex gap-4">
                  <Button variant="primary" disabled>Disabled Button</Button>
                  <Button variant="outline" onClick={() => alert('Button clicked!')}>
                    Click Me!
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Card Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">🃏 Card Component</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Basic Card" padding="sm" shadow="sm">
                <p className="text-gray-600">Small padding with light shadow.</p>
              </Card>
              <Card title="Default Card" padding="md" shadow="md">
                <p className="text-gray-600">Medium padding with medium shadow.</p>
                <Button variant="outline" size="sm" className="mt-2">Learn More</Button>
              </Card>
              <Card title="Large Card" padding="lg" shadow="lg">
                <p className="text-gray-600">Large padding with large shadow.</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="primary" size="sm">Accept</Button>
                  <Button variant="outline" size="sm">Decline</Button>
                </div>
              </Card>
            </div>
          </section>

          {/* Anchor Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">🔗 Anchor Component</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Primary Anchors</h3>
                  <div className="space-y-2">
                    <Anchor variant="primary" size="sm">Small Link</Anchor>
                    <Anchor variant="primary" size="md">Medium Link</Anchor>
                    <Anchor variant="primary" size="lg">Large Link</Anchor>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Secondary Anchors</h3>
                  <div className="space-y-2">
                    <Anchor variant="secondary" size="sm">Small Link</Anchor>
                    <Anchor variant="secondary" size="md">Medium Link</Anchor>
                    <Anchor variant="secondary" size="lg">Large Link</Anchor>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Outline Anchors</h3>
                  <div className="space-y-2">
                    <Anchor variant="outline" size="sm">Small Link</Anchor>
                    <Anchor variant="outline" size="md">Medium Link</Anchor>
                    <Anchor variant="outline" size="lg">Large Link</Anchor>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Content</h3>
                <div className="flex gap-4">
                  <Anchor href="https://github.com" variant="primary">
                    🚀 Visit GitHub
                  </Anchor>
                  <Anchor href="https://google.com" variant="outline">
                    🔍 Google Search
                  </Anchor>
                </div>
              </div>
            </div>
          </section>

          {/* Accordion Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">📁 Accordion Component</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Accordion
                key="demo-accordion"
                active={accordionActive}
                onClick={() => setAccordionActive(!accordionActive)}
                header={
                  <h3 className="font-medium">Click to {accordionActive ? 'Collapse' : 'Expand'}</h3>
                }
                content={
                  <div>
                    <h4 className="font-medium mb-2">Accordion Content</h4>
                    <p className="text-gray-600 mb-4">
                      This is the content that appears when the accordion is expanded.
                      You can put any React components here.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm">Action 1</Button>
                      <Button variant="outline" size="sm">Action 2</Button>
                    </div>
                  </div>
                }
              />
            </div>
          </section>

          {/* Spinner Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">⏳ Spinner Component</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Circle Spinner</h3>
                  <Spinner size="md" type="circle" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Dots Spinner</h3>
                  <Spinner size="md" type="dots" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Pulse Spinner</h3>
                  <Spinner size="md" type="pulse" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Bars Spinner</h3>
                  <Spinner size="md" type="bars" />
                </div>
              </div>
            </div>
          </section>

          {/* DropDown Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">📋 DropDown Component</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Dropdown</h3>
                  <DropDown
                    toggle={<Button variant="outline">Select Option</Button>}
                    options={options}
                    selected={selectedOption}
                    onChange={(value) => setSelectedOption(value as string)}
                  />
                  <p className="mt-2 text-sm text-gray-600">Selected: {selectedOption}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Toggle</h3>
                  <DropDown
                    toggle={
                      <div className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer hover:bg-purple-700">
                        🎨 Choose Color
                      </div>
                    }
                    options={['Red', 'Blue', 'Green', 'Yellow']}
                    selected="Blue"
                    onChange={(value) => alert(`Selected: ${value}`)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ProgressBar Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">📊 ProgressBar Component</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Static Progress Bars</h3>
                  <div className="space-y-4">
                    <ProgressBar progress={25} max={100} min={0} aria-label="Upload progress" />
                    <ProgressBar progress={50} max={100} min={0} aria-label="Processing progress" />
                    <ProgressBar progress={75} max={100} min={0} aria-label="Completion progress" />
                    <ProgressBar progress={100} max={100} min={0} aria-label="Complete progress" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Interactive Progress Bar</h3>
                  <div className="space-y-4">
                    <ProgressBar
                      progress={progress}
                      max={100}
                      min={0}
                      aria-label="Interactive progress"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                        -10%
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                        +10%
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => setProgress(0)}>
                        Reset
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">Current progress: {progress}%</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Combined Example */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">🎨 Combined Example</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Card title="Interactive Demo Card" padding="lg" shadow="lg">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    This card demonstrates multiple components working together.
                  </p>

                  <div className="flex items-center gap-4">
                    <Spinner />
                    <span className="text-sm text-gray-600">Loading data...</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => setProgress(Math.min(100, progress + 5))}>
                      Increase Progress
                    </Button>
                    <Anchor variant="outline" size="sm" href="https://github.com">
                      View Source
                    </Anchor>
                  </div>

                  <ProgressBar
                    progress={progress}
                    max={100}
                    min={0}
                    aria-label="Demo progress"
                  />

                  <Accordion
                    key="combined-accordion"
                    active={accordionActive}
                    onClick={() => setAccordionActive(!accordionActive)}
                    header={
                      <div className="flex justify-between items-center p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                        <span className="font-medium">Advanced Options</span>
                        <span>{accordionActive ? '▼' : '▶'}</span>
                      </div>
                    }
                    content={
                      <div className="p-3 bg-gray-50 rounded mt-2">
                        <DropDown
                          toggle={<Button variant="outline" size="sm">Settings</Button>}
                          options={['Option A', 'Option B', 'Option C']}
                          selected="Option A"
                          onChange={(value) => alert(`Setting changed to: ${value}`)}
                        />
                      </div>
                    }
                  />
                </div>
              </Card>
            </div>
          </section>

          {/* Dark Theme Example */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">🌙 Dark Theme Example</h2>
            <div className="bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="text-white text-lg font-medium mb-4">ProgressBar on Dark Background</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-sm mb-2">Default ProgressBar (not visible):</p>
                  <ProgressBar progress={60} max={100} min={0} aria-label="Default on dark" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-2">Light variant:</p>
                  <ProgressBar progress={60} max={100} min={0} aria-label="Light variant" variant="light" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-2">Dark variant:</p>
                  <ProgressBar progress={60} max={100} min={0} aria-label="Dark variant" variant="dark" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-2">Custom styling (recommended):</p>
                  <ProgressBar
                    progress={60}
                    max={100}
                    min={0}
                    aria-label="Custom styling"
                    className={{ backgroundColor: '#374151', color: '#ffffff' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Typed Component Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">⌨️ Typed Component</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Basic Typing Animation</h3>
                  <p className="text-gray-600 mb-4">
                    <Typed
                      strings={["I'm a Freelancer", "I'm a Developer", "I'm a Designer"]}
                      typeSpeed={100}
                      backSpeed={50}
                      loop={true}
                    />
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Custom Speed</h3>
                  <p className="text-gray-600 mb-4">
                    <Typed
                      strings={["Fast typing", "Medium typing", "Slow typing"]}
                      typeSpeed={50}
                      backSpeed={30}
                      backDelay={1000}
                      loop={true}
                    />
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Cursor</h3>
                  <p className="text-gray-600 mb-4">
                    <Typed
                      strings={["Clean typing animation"]}
                      typeSpeed={80}
                      showCursor={false}
                      loop={false}
                    />
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">With Start Delay</h3>
                  <p className="text-gray-600 mb-4">
                    <Typed
                      strings={["Starting in 2 seconds..."]}
                      startDelay={2000}
                      typeSpeed={60}
                      loop={false}
                    />
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Preloader Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">⏳ Preloader Component</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Controlled Preloader</h3>
                  <div className="">
                    <Button
                      variant="outline"
                      onClick={() => setShowDefaultPreloader(true)}
                      disabled={showDefaultPreloader}
                    >
                      Show Preloader (2 seconds)
                    </Button>
                    <Preloader
                      isLoading={showDefaultPreloader}
                      duration={2000}
                      onComplete={() => setShowDefaultPreloader(false)}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
                  <div className="">
                    <Button
                      variant="outline"
                      onClick={() => setShowCustomPreloader(true)}
                      disabled={showCustomPreloader}
                    >
                      Show Custom Preloader
                    </Button>
                    <Preloader
                      isLoading={showCustomPreloader}
                      backgroundColor="#1a1a1a"
                      accentColor="#00ff88"
                      size={90}
                      duration={2000}
                      onComplete={() => setShowCustomPreloader(false)}
                      borderWidth={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        <footer className="mt-16 text-center text-gray-600">
          <p className="mb-2">
            🌙 Luna Components Library - Visual Demo
          </p>
          <p className="text-sm">
            Test all components before publishing to ensure they work correctly.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DemoApp;

// Render the demo app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<DemoApp />);
}
