import React, { useState, useEffect } from 'react';
import { useLocalStorage, useDebounce } from '../../hooks';
import { formatters, validators, logger, storage } from '../../utilities';
import Button from '../Button';
import Card from '../Card';
import Input from '../Input';

const UtilExamples = () => {
  // 1. useLocalStorage Example
  const [count, setCount] = useLocalStorage<number>('demo-count', 0);

  // 2. useDebounce Example
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 1000);

  // 3. Validators state
  const [email, setEmail] = useState('');
  const isEmailValid = validators.isEmail(email);

  // 4. Storage preview state
  const [previewValue, setPreviewValue] = useState<string | null>(() => localStorage.getItem('luna-test'));

  useEffect(() => {
    if (debouncedSearch) {
      logger.info(`Performing search for: ${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  const handleTestLogger = () => {
    logger.success('Testing successful log!');
    logger.warn('This is a warning log.');
    logger.error('This is an error log.');
  };

  return (
    <div className="p-4 space-y-8">
      {/* Hooks Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🎣 Hooks Examples</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* useLocalStorage */}
          <Card title="useLocalStorage" className="bg-white border">
            <p className="text-sm text-gray-600 mb-4">
              Value persists even after page reload:
            </p>
            <code className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
              {`const [count, setCount] = useLocalStorage('demo-count', 0);`}
            </code>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-blue-600">{count}</span>
              <Button size="sm" onClick={() => setCount(count + 1)}>Increment</Button>
              <Button size="sm" variant="outline" onClick={() => setCount(0)}>Reset</Button>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
              storedValue: {JSON.stringify(count)}
            </div>
          </Card>

          {/* useDebounce */}
          <Card title="useDebounce" className="bg-white border">
            <p className="text-sm text-gray-600 mb-4">
              Value updates 1 second after you stop typing (check console):
            </p>
            <code className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
              {`const debouncedSearch = useDebounce(searchTerm, 1000);`}
            </code>
            <Input
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />
            <div className="mt-2 text-sm">
              <strong>Debounced Value:</strong> <span className="text-purple-600">{debouncedSearch || '...'}</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Utilities Section */}
      <section className="pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🛠️ Utilities Examples</h2>

        <div className="space-y-6">
          {/* Formatters */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Formatters" className="bg-white border">
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Currency:</strong> {formatters.currency(1250.50, 'es-CR', 'CRC')}
                  <code className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
                    {`const currency = formatters.currency(1250.50, 'es-CR', 'CRC');`}
                  </code>
                </li>
                <li>
                  <strong>Date:</strong> {formatters.date(new Date(), 'es-CR')}
                  <code className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
                    {`const date = formatters.date(new Date(), 'es-CR');`}
                  </code>
                </li>
                <li>
                  <strong>Truncate:</strong> {formatters.truncate('This is a very long text that will be truncated', 20)}
                  <code className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
                    {`const truncate = formatters.truncate('This is a very long text that will be truncated', 20);`}
                  </code>
                </li>
              </ul>
            </Card>

            {/* Validators */}
            <Card title="Validators" className="bg-white border">
              <div className="space-y-4">
                <code className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
                  {`const isEmailValid = validators.isEmail(email);`}
                </code>
                <Input
                  placeholder="Test email validation"
                  value={email}
                  onChange={(val) => setEmail(val)}
                  variant={email ? (isEmailValid ? 'success' : 'danger') : 'none'}
                />
                <p className="text-xs">
                  {email ? (
                    isEmailValid
                      ? '✅ Valid email format'
                      : '❌ Invalid email format'
                  ) : 'Enter an email to validate'}
                </p>
                <code className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
                  {`const isPhoneValid = validators.isPhone('88888888', 'es-CR');`}
                </code>
                <p className="text-xs">
                  {validators.isPhone('88888888', 'es-CR') ? (
                    '✅ Valid phone format'
                  ) : '❌ Invalid phone format'}
                </p>
              </div>
            </Card>
          </div>

          {/* Logger */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Logger" className="bg-white border">
              <p className="text-sm text-gray-600 mb-4">
                Open the browser console (F12) to see the styled logs:
              </p>
              <Button variant="info" onClick={handleTestLogger}>
                Test Styled Logger
              </Button>
              <div className="mt-4 space-y-2">
                <code className='bg-gray-100 p-4 rounded-lg block text-xs'>
                  {`logger.success('Testing successful log!');`}
                </code>
                <code className='bg-gray-100 p-4 rounded-lg block text-xs'>
                  {`logger.warn('This is a warning log.');`}
                </code>
                <code className='bg-gray-100 p-4 rounded-lg block text-xs'>
                  {`logger.error('This is an error log.');`}
                </code>
              </div>
            </Card>

            {/* Storage */}
            <Card title="Storage Utility" className="bg-white border">
              <p className="text-sm text-gray-600 mb-4">
                Safe and direct interaction with localStorage:
              </p>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      const data = { date: new Date().toLocaleTimeString(), status: 'OK' };
                      storage.set('luna-test', data);
                      setPreviewValue(JSON.stringify(data));
                    }}
                  >
                    Set Object
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      storage.remove('luna-test');
                      setPreviewValue(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <code className='bg-gray-100 p-4 rounded-lg block text-xs'>
                    {`storage.set('key', { data: 'value' });`}
                  </code>
                  <code className='bg-gray-100 p-4 rounded-lg block text-xs'>
                    {`const val = storage.get('key', default);`}
                  </code>
                </div>

                <div className="p-3 bg-gray-50 rounded border text-xs font-mono">
                  <strong>Current Value in localStorage:</strong><br />
                  {previewValue || 'null (empty)'}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UtilExamples;
