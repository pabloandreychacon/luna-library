import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- Imports ---
import Button from './components/Button';
import Card from './components/Card';
import Anchor from './components/Anchor';
import Accordion from './components/Accordion';
import Spinner from './components/Spinner';
import DropDown from './components/DropDown';
import ProgressBar from './components/ProgressBar';
import Input from './components/Input';
import Typed from './components/Typed';
import Preloader from './components/Preloader';
import ScrollTop from './components/ScrollTop';
import WhatsApp from './components/WhatsApp';
import Modal from './components/Modal';
import DataTable from './components/DataTable';
import Toast from './components/Toast';
import type { ToastSeverity } from './types';
import MultiSelect from './components/MultiSelect';
import Popconfirm from './components/Popconfirm';
import QRCode from './components/QRCode';

// Examples
import ModalDataExample from './components/modalExamples/ModalDataExample';
import ApiExamples from './components/apiExamples/ApiExamples';
import UtilExamples from './components/utilExamples/UtilExamples';

// --- Sub-Components for Demo ---

const ToastExample = () => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<{ severity: ToastSeverity, summary: string, detail: string, life?: number }>({
    severity: 'info', summary: 'Info', detail: 'Message Content'
  });
  const showToast = (severity: ToastSeverity, summary: string, detail: string, life?: number) => {
    setConfig({ severity, summary, detail, life });
    setVisible(true);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          className="custom-button"
          variant="success"
          size="sm"
          onClick={() => showToast('success', 'Success', 'Done!', 3000)}
        >
          Success
        </Button>
        <Button
          className="custom-class"
          variant="info"
          size="sm"
          onClick={() => showToast('info', 'Info', 'Note this.', 3000)}
        >
          Info
        </Button>
        <Button
          className="custom-class"
          variant="warning"
          size="sm"
          onClick={() => showToast('warn', 'Warn', 'Careful!', 3000)}
        >
          Warn
        </Button>
        <Button
          className="custom-class"
          variant="danger"
          size="sm"
          onClick={() => showToast('error', 'Error', 'Failed!', 3000)}
        >
          Error
        </Button>
        <Button
          className="custom-class"
          variant="outline"
          size="sm"
          onClick={() => showToast('info', 'Sticky Toast', 'This will not close automatically.')}
        >
          Sticky
        </Button>
      </div>
      <Toast className="custom-toast" visible={visible} onClose={() => setVisible(false)} {...config} />
      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
        {'<Toast visible={v} severity="success" summary="Hi" life={3000} />'}
      </code>
    </div>
  );
};

const MultiSelectExample = () => {
  const [val1, setVal1] = useState<any[]>([]);
  const [val2, setVal2] = useState<any[]>([]);
  const options = [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }, { label: 'Option 3', value: 3 }];
  return (
    <div className="space-y-4">
      <MultiSelect
        id="ms-comma"
        options={options}
        value={val1}
        onChange={setVal1}
        placeholder="Comma mode"
        className="custom-multiselect"
      />
      <MultiSelect
        id="ms-chip"
        options={options}
        value={val2}
        onChange={setVal2}
        display="chip"
        filter
        placeholder="Chip + Filter"
        className="custom-class"
      />
      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
        {'<MultiSelect options={o} value={v} display="chip" filter />'}
      </code>
    </div>
  );
};

const QRCodeExample = () => {
  const [text, setText] = useState('Luna');
  return (
    <div className="space-y-4">
      <Input id="input-qr" value={text} onChange={setText} inputSize="sm" placeholder="Type to update QR" className="custom-class" />
      <div className="flex gap-4 items-end">
        <QRCode value={text} size={100} className="custom-qr" />
        <QRCode value="Blue" size={100} color="#2563eb" bordered={false} className="custom-class" />
      </div>
      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
        {`<QRCode value="${text}" size={100} color="#2563eb" />`}
      </code>
    </div>
  );
};

const DataTableComplexExample = () => {
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'role', label: 'Rol', sortable: true },
    { key: 'status', label: 'Estado' },
    { key: 'date', label: 'Fecha Registro' },
  ];

  const data = [
    { id: 1, name: 'Pablo Chacon', role: 'Admin', status: 'Activo', date: '2023-01-15' },
    { id: 2, name: 'Maria Lopez', role: 'Editor', status: 'Inactivo', date: '2023-02-20' },
    { id: 3, name: 'Juan Perez', role: 'User', status: 'Activo', date: '2023-03-10' },
    { id: 4, name: 'Ana Gomez', role: 'User', status: 'Pendiente', date: '2023-04-05' },
    { id: 5, name: 'Luis Torres', role: 'Editor', status: 'Activo', date: '2023-05-12' },
    { id: 6, name: 'Elena Rivas', role: 'User', status: 'Inactivo', date: '2023-06-18' },
    { id: 7, name: 'Carlos Ruiz', role: 'Admin', status: 'Activo', date: '2023-07-22' },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      pageSize={5}
      className="custom-class"
    />
  );
};

const DataTableMasterExample = () => {
  const [selected, setSelected] = useState<any[]>([]);

  const columns = [
    {
      key: 'avatar',
      label: '',
      render: (val: string) => (
        <img
          src={val}
          alt="Avatar"
          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
        />
      )
    },
    { key: 'name', label: 'User', sortable: true },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' }
      ],
      render: (val: string) => (
        <span style={{
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          backgroundColor: val === 'Active' ? '#dcfce7' : '#fee2e2',
          color: val === 'Active' ? '#166534' : '#991b1b'
        }}>
          {val}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="outline" onClick={() => alert(`Editing ${row.name}`)} className="custom-class">✎</Button>
          <Popconfirm title="Delete user?" onConfirm={() => alert('Deleted')} className="custom-class">
            <Button size="sm" variant="danger" className="custom-class">✖</Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Mike Ross', email: 'mike@example.com', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Rachel Zane', email: 'rachel@example.com', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Harvey Specter', email: 'harvey@example.com', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=5' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-2">Selected: {selected.length} users</div>
      <DataTable
        columns={columns}
        data={data}
        selectable
        searchable
        pagination
        pageSize={3}
        onSelectionChange={setSelected}
        onRowClick={(row) => console.log('Row Click:', row)}
        onRowDoubleClick={(row) => alert(`Double Click: ${row.name}`)}
        className="custom-class"
      />
    </div>
  );
};


// --- Sidebar Navigation ---

const Sidebar = () => {
  const categories = [
    {
      id: 'forms', label: 'Inputs & Forms', icon: '📝',
      items: [
        { id: 'comp-button', label: 'Button' },
        { id: 'comp-input', label: 'Input (Masks)' },
        { id: 'comp-multiselect', label: 'MultiSelect' },
        { id: 'comp-dropdown', label: 'DropDown' }
      ]
    },
    {
      id: 'data', label: 'Data & Visuals', icon: '📊',
      items: [
        { id: 'comp-datatable', label: 'DataTable' },
        { id: 'comp-qrcode', label: 'QRCode' }
      ]
    },
    {
      id: 'feedback', label: 'Feedback & Overlays', icon: '🔔',
      items: [
        { id: 'comp-toast', label: 'Toast' },
        { id: 'comp-popconfirm', label: 'Popconfirm' },
        { id: 'comp-modal', label: 'Modal' }
      ]
    },
    {
      id: 'status', label: 'Progress & Status', icon: '⏳',
      items: [
        { id: 'comp-spinner', label: 'Spinner' },
        { id: 'comp-progress', label: 'ProgressBar' },
        { id: 'comp-preloader', label: 'Preloader' }
      ]
    },
    {
      id: 'layout', label: 'Layout & Content', icon: '🧩',
      items: [
        { id: 'comp-card', label: 'Card' },
        { id: 'comp-accordion', label: 'Accordion' },
        { id: 'comp-nav', label: 'Anchor' },
        { id: 'comp-typed', label: 'Typed' },
        { id: 'comp-scroll', label: 'ScrollTop' },
        { id: 'comp-whatsapp', label: 'WhatsApp' }
      ]
    },
    {
      id: 'utils', label: 'API & Utilities', icon: '⚙️',
      items: [
        { id: 'comp-api', label: 'HTTP Client' },
        { id: 'comp-hooks', label: 'Custom Hooks' }
      ]
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="hidden md:block w-72 bg-white border-r h-screen sticky top-0 p-6 overflow-y-auto shrink-0">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          🌙 Luna Library
        </h2>
        <p className="text-xs text-gray-500 mt-1">Component Documentation</p>
      </div>
      <nav className="space-y-6">
        {categories.map(cat => (
          <div key={cat.id}>
            <button
              onClick={() => scrollTo(cat.id)}
              className="w-full text-left font-bold text-xs text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors mb-2"
            >
              {cat.icon} {cat.label}
            </button>
            <ul className="space-y-1 ml-4 border-l pl-4">
              {cat.items.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors py-1 block w-full text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-10 pt-10 border-t">
        <Anchor href="https://github.com/pabloandreychacon/luna-library" target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-blue-600">GitHub Repository</Anchor>
      </div>
    </aside>
  );
};

// --- Main Demo App ---

const DemoApp = () => {
  const [progress, setProgress] = useState(65);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showCustomPreloader, setShowCustomPreloader] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 pb-40 overflow-x-hidden">
        <div className="max-w-5xl mx-auto p-8 md:p-12 space-y-32">

          <header className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">Showcase</h1>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl">
              Modern UI library for React.
              Zero dependencies. Full control. Zero Tailwind coupling.
            </p>
          </header>

          {/* 1. INPUTS & FORMS */}
          <section id="forms" className="scroll-mt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-xl text-2xl">📝</span>
              Inputs & Forms
            </h2>
            <div className="space-y-12">
              <div id="comp-button">
                <Card title="Button Component" className="custom-class">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Primary & Secondary */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Primary & Secondary</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button className='my-custom-class' variant="primary" size="sm">Small Primary</Button>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Button variant="primary" size="sm">Small Primary</Button>'}
                      </code>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="secondary" size="sm" className="custom-class">Secondary</Button>
                      </div>
                    </div>

                    {/* Success & Danger */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Success & Danger</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="success" size="sm" className="custom-class">Small Success</Button>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Button variant="success" size="sm">Small Success</Button>'}
                      </code>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="danger" size="sm" className="custom-class">Danger</Button>
                      </div>
                    </div>

                    {/* Warning & Info */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Warning & Info</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="warning" size="sm" className="custom-class">Small Warning</Button>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Button variant="warning" size="sm">Small Warning</Button>'}
                      </code>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="info" size="sm" className="custom-class">Info</Button>
                      </div>
                    </div>

                    {/* Dark & Light */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Dark & Light</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="dark" size="sm" className="custom-class">Small Dark</Button>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Button variant="dark" size="sm">Small Dark</Button>'}
                      </code>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="light" size="sm" className="custom-class">Light</Button>
                      </div>
                    </div>

                    {/* Outline & Link */}
                    <div className="space-y-4 md:col-span-2">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Outline & Link</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="outline" size="sm" className="custom-class">Small Outline</Button>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 max-w-md">
                        {'<Button variant="outline" size="sm">Small Outline</Button>'}
                      </code>
                      <div className="flex flex-wrap gap-2 items-center mt-4">
                        <Button variant="link" size="sm" className="custom-class">Link Button</Button>
                      </div>
                    </div>

                    {/* Rounded */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Rounded (Pill)</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="primary" size="sm" rounded>Rounded Primary</Button>
                        <Button variant="outline" size="sm" rounded>Rounded Outline</Button>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Button variant="primary" rounded>Rounded Primary</Button>'}
                      </code>
                    </div>

                    {/* Icon left / right */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Icon Left & Right</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="primary" size="sm" icon="🚀">Deploy</Button>
                        <Button variant="outline" size="sm" icon="→" iconPosition="right">Next</Button>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Button icon="🚀">Deploy</Button>\n<Button icon="→" iconPosition="right">Next</Button>'}
                      </code>
                    </div>

                    {/* Icon only rounded */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Icon Only + Rounded</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Button variant="primary" size="sm" rounded icon="✕" />
                        <Button variant="success" size="sm" rounded icon="✓" />
                        <Button variant="danger" size="sm" rounded icon="🗑" />
                        <Button variant="outline" size="md" rounded icon="⚙" />
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Button variant="primary" rounded icon="✕" />'}
                      </code>
                    </div>
                  </div>
                </Card>
              </div>
              <div id="comp-input">
                <Card title="Input Component" className="custom-class">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Inputs */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-semibold text-gray-500 border-b pb-2">Basic Inputs</h3>
                      <div>
                        <Input
                          id="input-sm"
                          className="my-custom-class"
                          inputSize="sm"
                          placeholder="Small input"
                        >
                          Default Input
                        </Input>
                        <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                          {'<Input inputSize="sm" placeholder="Small input">Default Input</Input>'}
                        </code>
                      </div>
                    </div>

                    {/* Variant Inputs */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-semibold text-gray-500 border-b pb-2">Variant Inputs</h3>
                      <div>
                        <Input
                          id="input-primary"
                          className="my-custom-class"
                          inputSize="sm"
                          variant="primary"
                          placeholder="Primary input"
                        >
                          Primary Variant
                        </Input>
                        <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                          {'<Input variant="primary" placeholder="Primary input">Primary Variant</Input>'}
                        </code>
                      </div>
                      <div>
                        <Input
                          id="input-secondary"
                          className="my-custom-class"
                          inputSize="sm"
                          variant="secondary"
                          placeholder="Secondary input"
                        >
                          Secondary Variant
                        </Input>
                      </div>
                      <div>
                        <Input
                          id="input-success"
                          className="my-custom-class"
                          inputSize="sm"
                          variant="success"
                          placeholder="Success input"
                        >
                          Success Variant
                        </Input>
                      </div>
                      {/* danger variant */}
                      <div>
                        <Input
                          id="input-danger"
                          className="my-custom-class"
                          inputSize="sm"
                          variant="danger"
                          placeholder="Danger input"
                        >
                          Danger Variant
                        </Input>
                      </div>
                    </div>

                    {/* States & Types */}
                    <div className="lg:col-span-2 space-y-6">
                      <h3 className="text-sm font-semibold text-gray-500 border-b pb-2">States & Types</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                          <Input
                            id="input-disabled"
                            className="my-custom-class"
                            disabled
                            placeholder="Disabled input"
                          >
                            Disabled
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input disabled />'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-readonly"
                            className="my-custom-class"
                            readOnly
                            value="Read only value"
                          >
                            Read Only
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input readOnly />'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-password"
                            className="my-custom-class"
                            type="password"
                            placeholder="Password"
                          >
                            Password
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input type="password" />'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-email"
                            className="my-custom-class"
                            type="email"
                            placeholder="email@example.com"
                          >
                            Email
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input type="email" />'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-number"
                            className="my-custom-class"
                            type="number"
                            placeholder="12345"
                          >
                            Number
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input type="number" />'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-tel"
                            className="my-custom-class"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                          >
                            Telephone
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input type="tel" />'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-range"
                            className="my-custom-class"
                            type="range"
                            min="0"
                            max="100"
                          >
                            Range: 50
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input type="range" />'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-date"
                            className="my-custom-class"
                            type="date"
                          >
                            Date
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input type="date" />'}
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* Icon Inputs */}
                    <div className="lg:col-span-2 space-y-6 pt-6 mt-4">
                      <h3 className="text-sm font-semibold text-gray-500 border-b pb-2">Icon Inputs</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                          <Input id="input-icon-search" icon="🔍" placeholder="Search..." inputSize="sm">Search</Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input icon="🔍">Search</Input>'}
                          </code>
                        </div>
                        <div>
                          <Input id="input-icon-email" icon="📧" variant="primary" type='email' placeholder="Email" inputSize="sm">Email</Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input icon="📧" variant="primary">Email</Input>'}
                          </code>
                        </div>
                        <div>
                          <Input id="input-icon-right" type="password" icon="🔒" iconPosition="right" variant="danger" placeholder="Password" inputSize="sm">Password</Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input icon="🔒" iconPosition="right" variant="danger">Password</Input>'}
                          </code>
                        </div>
                        <div>
                          <Input id="input-icon-required" icon="👤" variant="success" placeholder="Username" inputSize="sm" isRequired>Username</Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input icon="👤" variant="success" isRequired>Username</Input>'}
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* Masks & Currency (Legacy) */}
                    <div className="lg:col-span-2 space-y-6 pt-6 mt-4">
                      <h3 className="text-sm font-semibold text-gray-500 border-b pb-2">Masks & Currency</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <Input
                            id="input-phone"
                            className="my-custom-class"
                            mask="(999) 999-9999"
                            placeholder="(506) 8888-8888"
                          >
                            Phone Number
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input mask="(999) 999-9999" placeholder="(506) 8888-8888">Phone Number</Input>'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-dob"
                            className="my-custom-class"
                            mask="99/99/9999"
                            placeholder="DD/MM/YYYY"
                          >
                            Date of Birth
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input mask="99/99/9999" placeholder="DD/MM/YYYY">Date of Birth</Input>'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-usd"
                            className="my-custom-class"
                            useCurrency
                            currency="USD"
                            locale="en-US"
                            placeholder="$0.00"
                          >
                            Price (USD)
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input useCurrency currency="USD" locale="en-US" placeholder="$0.00">Price (USD)</Input>'}
                          </code>
                        </div>
                        <div>
                          <Input
                            id="input-crc"
                            className="my-custom-class"
                            useCurrency
                            currency="CRC"
                            locale="es-CR"
                            placeholder="₡0,00"
                          >
                            Precio (CRC)
                          </Input>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-2">
                            {'<Input useCurrency currency="CRC" locale="es-CR" placeholder="₡0,00">Precio (CRC)</Input>'}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div id="comp-multiselect">
                <Card title="MultiSelect" className="custom-class">
                  <MultiSelectExample />
                </Card>
              </div>
              <div id="comp-dropdown" className="md:col-span-2">
                <Card title="DropDown Component" className="custom-class">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">Basic Dropdown</h4>
                      <div className="max-w-xs space-y-4">
                        <DropDown
                          options={[{ value: 'Value Option 1', label: 'Label Option 1' }, { value: 'Value Option 2', label: 'Label Option 2' }, { value: 'Value Option 3', label: 'Label Option 3' }]}
                          value={selectedOption}
                          onChange={setSelectedOption}
                          placeholder="Select Option"
                          className="custom-dropdown"
                        />
                        <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                          {'<DropDown options={["Option 1", "Option 2"]} value={selectedOption} onChange={setSelectedOption} />'}
                        </code>
                        <p className="text-sm text-gray-600">Selected: {selectedOption || 'None'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">Custom Toggle</h4>
                      <div className="max-w-xs space-y-4">
                        <DropDown
                          options={['Red', 'Blue', 'Green']}
                          className="custom-class"
                          onChange={(val) => alert('Color selected: ' + val)}
                          toggle={<div style={{ padding: '0.5rem 1rem', backgroundColor: '#9333ea', color: 'white', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🎨 Choose Color</div>}
                        />
                        <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                          {'<DropDown toggle={<div style={{...}}>🎨 Choose Color</div>} options={...} />'}
                        </code>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* 2. DATA & VISUALS */}
          <section id="data" className="scroll-mt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl text-2xl">📊</span>
              Data & Visualization
            </h2>
            <div className="space-y-12">
              <div id="comp-datatable">
                <Card title="Simple DataTable" className="custom-class">
                  <DataTable
                    columns={[{ key: 'id', label: 'ID' }, { key: 'task', label: 'Task', sortable: true }]}
                    data={[{ id: 1, task: 'Fix CSS' }, { id: 2, task: 'Deploy' }]}
                    pagination pageSize={2}
                    className="custom-datatable"
                  />
                  <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                    {'<DataTable columns={columns} data={data} pagination pageSize={2} />'}
                  </code>
                </Card>
                <div className="mt-8">
                  <Card title="Complex DataTable (Spanish I18n)" className="custom-class">
                    <DataTableComplexExample />
                    <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                      {'<DataTable columns={columns} data={data} pagination translations={{...}} />'}
                    </code>
                  </Card>
                </div>
                <div className="mt-8">
                  <Card title="Master DataTable (Search, Select, Render)" className="custom-class">
                    <DataTableMasterExample />
                    <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                      {'<DataTable columns={columns} data={data} selectable searchable pagination onSelectionChange={...} />'}
                    </code>
                  </Card>
                </div>
              </div>
              <div id="comp-qrcode">
                <Card title="QRCode Generator" className="custom-class">
                  <QRCodeExample />
                </Card>
              </div>
            </div>
          </section>

          {/* 3. FEEDBACK & OVERLAYS */}
          <section id="feedback" className="scroll-mt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
              <span className="bg-red-100 text-red-600 p-2 rounded-xl text-2xl">🔔</span>
              Feedback & Overlays
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div id="comp-toast">
                <Card title="Toast Notifications" className="custom-class">
                  <ToastExample />
                </Card>
              </div>
              <div id="comp-popconfirm">
                <Card title="Popconfirm" className="custom-class">
                  <Popconfirm title="Confirm Delete?" description="This is permanent" onConfirm={() => { }} className="custom-class">
                    <Button variant="danger" size="sm" className="custom-class">Delete Record</Button>
                  </Popconfirm>
                  <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                    {'<Popconfirm title="Sure?" />'}
                  </code>
                </Card>
              </div>
              <div id="comp-modal" className="md:col-span-2">
                <Card title="Modals" className="custom-class">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">Simple Modal</h4>
                      <Button size="sm" onClick={() => setShowModal('basic')} className="custom-class">Open Simple Modal</Button>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                        {'<Modal isOpen={isOpen} onClose={close} title="Modal Title">\n  Content...\n</Modal>'}
                      </code>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">Complex Modal</h4>
                      <ModalDataExample />
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                        {'<Modal isOpen={isOpen} maxWidth="lg">\n  <ComplexContent />\n</Modal>'}
                      </code>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* 4. PROGRESS & STATUS */}
          <section id="status" className="scroll-mt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
              <span className="bg-yellow-100 text-yellow-600 p-2 rounded-xl text-2xl">⏳</span>
              Progress & Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div id="comp-spinner" className="md:col-span-3">
                <Card title="Spinner Component" className="custom-class">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <h4 className="text-sm font-semibold text-gray-500">Circle Spinner</h4>
                      <Spinner size="md" type="circle" className="custom-class" />
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 w-full text-center">
                        {'<Spinner size="md" type="circle" />'}
                      </code>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <h4 className="text-sm font-semibold text-gray-500">Dots Spinner</h4>
                      <Spinner size="md" type="dots" className="custom-class" />
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 w-full text-center">
                        {'<Spinner size="md" type="dots" />'}
                      </code>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <h4 className="text-sm font-semibold text-gray-500">Pulse Spinner</h4>
                      <Spinner size="md" type="pulse" className="custom-class" />
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 w-full text-center">
                        {'<Spinner size="md" type="pulse" />'}
                      </code>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <h4 className="text-sm font-semibold text-gray-500">Bars Spinner</h4>
                      <Spinner size="md" type="bars" className="custom-class" />
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 w-full text-center">
                        {'<Spinner size="md" type="bars" />'}
                      </code>
                    </div>
                  </div>
                </Card>
              </div>
              <div id="comp-progress">
                <Card title="ProgressBar" className="custom-class">
                  <ProgressBar progress={progress} className="custom-class" />
                  <input type="range" className="w-full mt-4" value={progress} onChange={(e) => setProgress(Number(e.target.value))} />
                  <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                    {`<ProgressBar progress={${progress}} />`}
                  </code>
                </Card>
              </div>
              <div id="comp-preloader" className="md:col-span-2">
                <Card title="Preloader Component" className="custom-class">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">Controlled Preloader</h4>
                      <Button size="sm" variant="outline" onClick={() => { setShowPreloader(true); setTimeout(() => setShowPreloader(false), 2000); }} className="custom-class">Show Preloader (2 seconds)</Button>
                      <Preloader isLoading={showPreloader} className="custom-class" />
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                        {'<Preloader isLoading={showDefaultPreloader} duration={2000} onComplete={() => setShowDefaultPreloader(false)} />'}
                      </code>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">Custom Colors</h4>
                      <Button size="sm" variant="outline" onClick={() => { setShowCustomPreloader(true); setTimeout(() => setShowCustomPreloader(false), 2000); }} className="custom-class">Show Custom Preloader</Button>
                      <Preloader isLoading={showCustomPreloader} backgroundColor="#1a1a1a" accentColor="#00ff88" size={90} borderWidth={3} className="custom-class" />
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                        {'<Preloader isLoading={showCustomPreloader} backgroundColor="#1a1a1a" accentColor="#00ff88" size={90} duration={2000} onComplete={() => setShowCustomPreloader(false)} borderWidth={3} />'}
                      </code>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* 5. LAYOUT & CONTENT */}
          <section id="layout" className="scroll-mt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-2 rounded-xl text-2xl">🧩</span>
              Layout & Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div id="comp-card" className="md:col-span-2">
                <Card title="Card Component" padding="lg" shadow="none" className="custom-class">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card title="Basic Card" padding="sm" shadow="sm" className="custom-class">
                      <p className="text-gray-600 text-sm">Small padding with light shadow.</p>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                        {'<Card title="Basic Card" padding="sm" shadow="sm">'}
                      </code>
                    </Card>
                    <Card title="Elevated Card" padding="lg" shadow="lg" className="custom-class">
                      <p className="text-gray-600 text-sm">Large padding with prominent shadow.</p>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                        {'<Card title="Elevated Card" padding="lg" shadow="lg">'}
                      </code>
                    </Card>
                  </div>
                </Card>
              </div>
              <div id="comp-accordion">
                <Card title="Accordion" className="custom-class">
                  <Accordion
                    title="Expansion Panel"
                    className='custom-accordion'
                  >
                    <div>
                      <p>Details here...</p>
                    </div>
                  </Accordion>
                  <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                    {'<Accordion title="Label">Content</Accordion>'}
                  </code>
                </Card>
              </div>
              <div id="comp-nav" className="md:col-span-2">
                <Card title="Anchor Component" className="custom-class">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Primary Anchors */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Primary Anchors</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Anchor variant="primary" size="sm" className="custom-class">Small Link</Anchor>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Anchor variant="primary" size="sm">Small Link</Anchor>'}
                      </code>
                    </div>

                    {/* Secondary Anchors */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Secondary Anchors</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Anchor variant="secondary" size="sm" className="custom-class">Small Link</Anchor>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Anchor variant="secondary" size="sm">Small Link</Anchor>'}
                      </code>
                    </div>

                    {/* Outline Anchors */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Outline Anchors</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Anchor variant="outline" size="sm" className="custom-class">Small Link</Anchor>
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Anchor variant="outline" size="sm">Small Link</Anchor>'}
                      </code>
                    </div>

                    {/* Custom Content */}
                    <div className="space-y-4 md:col-span-3 pt-4 border-t">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Custom Content & Pure Link</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div className="flex gap-4 items-center">
                            <Anchor href="https://github.com" variant="primary" className="custom-class">🚀 Visit GitHub</Anchor>
                            <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 flex-1">
                              {'<Anchor href="https://github.com" variant="primary">🚀 Visit GitHub</Anchor>'}
                            </code>
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-4 items-center">
                            <Anchor href="https://google.com" variant="outline" className="custom-class">🔍 Google Search</Anchor>
                            <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 flex-1">
                              {'<Anchor href="https://google.com" variant="outline">🔍 Google Search</Anchor>'}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pure Link */}
                    <div className="space-y-4 md:col-span-3 pt-4 border-t">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Pure link examples (no button styling):</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="flex gap-4 items-center">
                          <Anchor
                            href="https://www.wikipedia.org"
                            variant="none"
                            style={{ padding: '0.25rem 0.5rem' }}
                            className="custom-class"
                          >
                            Wikipedia
                          </Anchor>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 flex-1">
                            {'<Anchor href="https://www.wikipedia.org" variant="none">Wikipedia</Anchor>'}
                          </code>
                        </div>
                        <div className="flex gap-4 items-center">
                          <Anchor
                            href="https://developer.mozilla.org"
                            variant="none"
                            style={{ color: '#4b5563', textDecoration: 'underline' }}
                            className="custom-class"
                          >
                            MDN Web Docs
                          </Anchor>
                          <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 flex-1">
                            {'<Anchor href="https://developer.mozilla.org" variant="none" style={{ color: "#4b5563", textDecoration: "underline" }}>MDN Web Docs</Anchor>'}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div id="comp-typed" className="md:col-span-2">
                <Card title="Typed Component" className="custom-class">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">Basic Typing Animation</h4>
                      <div className="mb-4 text-gray-800 text-lg flex items-center">
                        I'm&nbsp;                        <Typed strings={['a Freelancer', 'a Developer', 'a Designer']} typeSpeed={100} backSpeed={50} loop={true} className="custom-class" />
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Typed strings={["I\'m a Freelancer", "I\'m a Developer", "I\'m a Designer"]} typeSpeed={100} backSpeed={50} loop={true} />'}
                      </code>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">Custom Speed</h4>
                      <div className="mb-4 text-gray-800 text-lg flex items-center">
                        <Typed strings={['Fast typing', 'Medium typing', 'Slow typing']} typeSpeed={50} backSpeed={30} backDelay={1000} loop={true} className="custom-class" />
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Typed strings={["Fast typing", "Medium typing", "Slow typing"]} typeSpeed={50} backSpeed={30} backDelay={1000} loop={true} />'}
                      </code>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">No Cursor</h4>
                      <div className="mb-4 text-gray-800 text-lg flex items-center">
                        <Typed strings={['Clean typing animation']} typeSpeed={80} showCursor={false} loop={false} className="custom-class" />
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Typed strings={["Clean typing animation"]} typeSpeed={80} showCursor={false} loop={false} />'}
                      </code>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-4">With Start Delay</h4>
                      <div className="mb-4 text-gray-800 text-lg flex items-center">
                        <Typed strings={['Starting in 2 seconds...']} startDelay={2000} typeSpeed={60} loop={false} className="custom-class" />
                      </div>
                      <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                        {'<Typed strings={["Starting in 2 seconds..."]} startDelay={2000} typeSpeed={60} loop={false} />'}
                      </code>
                    </div>
                  </div>
                </Card>
              </div>
              <div id="comp-scroll" className="md:col-span-2">
                <Card title="ScrollTop Utility" className="custom-class">
                  <p className="text-sm text-gray-500 mb-4 italic">A floating button will appear in the bottom-right corner as you scroll down this page.</p>
                  <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600">
                    {'<ScrollTop threshold={150} />'}
                  </code>
                </Card>
              </div>
              <div id="comp-whatsapp" className="md:col-span-2">
                <Card title="WhatsApp" className="custom-class">
                  <WhatsApp phone="+1234567890" message="How can I help you?" size="md" position="bottom-left" tooltipText="Chat with us" className="custom-class" />
                  <code className="bg-gray-100 p-2 rounded block text-[10px] text-gray-600 mt-4">
                    {'<WhatsApp phone="+1234567890" message="How can I help you?" size="md" position="bottom-left" tooltipText="Chat with us" />'}
                  </code>
                </Card>
              </div>
            </div>
          </section>

          {/* 6. API & UTILITIES */}
          <section id="utils" className="scroll-mt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
              <span className="bg-gray-200 text-gray-600 p-2 rounded-xl text-2xl">⚙️</span>
              API & Utilities
            </h2>
            <div id="comp-api">
              <Card title="HTTP Client" className="custom-class">
                <ApiExamples />
              </Card>
            </div>
            <div id="comp-hooks" className="mt-8">
              <Card title="Custom Hooks" className="custom-class">
                <UtilExamples />
              </Card>
            </div>
          </section>

        </div>
      </main>

      <Modal show={showModal === 'basic'} onHide={() => setShowModal(null)} title="Luna Modal" className="custom-class">
        <p className="text-gray-600">This is a portable modal window with zero external CSS dependencies.</p>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setShowModal(null)} className="custom-class">Close</Button>
        </div>
      </Modal>
      <ScrollTop className="custom-class" />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<DemoApp />);
