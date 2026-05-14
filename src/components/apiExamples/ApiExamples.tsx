import React, { useState } from 'react';
import { useFetch } from '../../hooks';
import { httpClient, apiFetch } from '../../utilities';
import Button from '../Button';
import Card from '../Card';
import Spinner from '../Spinner';

interface Post {
  id: number;
  title: string;
  body: string;
}

const ApiExamples = () => {
  const [postResponse, setPostResponse] = useState<any>(null);
  const [apiFetchResponse, setApiFetchResponse] = useState<any>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Example 1: Using useFetch hook with 2s delay
  const { data, error, loading } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=3', { delay: 2000 });

  // Example 2: Using httpClient manually
  const handleCreatePost = async () => {
    setIsPosting(true);
    setPostResponse(null); // Reset previous response

    // Artificial delay of 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const newPost = await httpClient.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'New Post via Luna',
        body: 'This is a test post using httpClient.util',
        userId: 1,
      });
      setPostResponse(newPost);
      console.log('Created post:', newPost);
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post.');
    } finally {
      setIsPosting(false);
    }
  };

  // Example 3: Using apiFetch manually
  const handleApiFetch = async () => {
    setIsFetching(true);
    setApiFetchResponse(null);

    try {
      const result = await apiFetch('https://jsonplaceholder.typicode.com/posts/1');
      setApiFetchResponse(result);
      console.log('apiFetch result:', result);
    } catch (err) {
      console.error('apiFetch error:', err);
      alert('apiFetch failed.');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🎣 useFetch Hook Example</h2>
        <code className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
          {`const { data, error, loading } = useFetch<Post[]>('https://api.example.com/posts', { delay: 2000 });`}
        </code>
        <p className="text-gray-600 mb-4">Fetching posts automatically on mount:</p>

        {loading && (
          <div className="flex justify-center p-8">
            <Spinner size="lg" type="circle" className="text-blue-600" />
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            <strong>Error:</strong> {typeof error === 'string' ? error : error?.message || String(error)}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {data?.map(post => (
            <Card
              key={post.id}
              title={post.title}
              shadow="md"
              className="bg-white border border-gray-100"
            >
              <p className="text-sm text-gray-600 line-clamp-3">{post.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🛠️ httpClient Utility Example</h2>
        <p className="text-gray-600 mb-4">Performing manual HTTP requests. Call apiFetch() inside the httpClient.utils</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <pre className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
            {`const newPost = await httpClient.post('https://jsonplaceholder.typicode.com/posts', 
            {
                title: 'New Post via Luna',
                body: 'This is a test post using httpClient.util',
                userId: 1,
            });`}</pre>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="success"
            onClick={handleCreatePost}
            disabled={isPosting}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50 mt-4"
          >
            {isPosting ? 'Sending...' : 'Send POST Request'}
          </Button>

          {isPosting && <Spinner size="sm" type="circle" className="text-green-600" />}
        </div>

        {postResponse && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-semibold text-green-800 mb-2">✅ Server Response:</h3>
            <pre className="text-xs text-green-700 overflow-auto bg-white p-3 rounded border border-green-100">
              {JSON.stringify(postResponse, null, 2)}
            </pre>
          </div>
        )}
      </section>

      <section className="pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🌐 apiFetch Utility Example</h2>
        <p className="text-gray-600 mb-4">Low-level fetch wrapper with error handling:</p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 block text-xs">
          {`A generic wrapper for the fetch API with error handling and response parsing.
          @param url - The URL to fetch
          @param options - Fetch options (method, headers, body, signal, etc.)          
          @returns Parsed JSON response
          `}
        </pre>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <pre className='bg-gray-100 p-4 rounded-lg mb-4 block text-xs'>
            {`try {
  const data = await apiFetch('https://jsonplaceholder.typicode.com/posts/1');
  console.log(data);
} catch (error) {
  console.error(error.message);
}`}</pre>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            onClick={handleApiFetch}
            disabled={isFetching}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50 mt-4"
          >
            {isFetching ? 'Fetching...' : 'Send GET Request (apiFetch)'}
          </Button>

          {isFetching && <Spinner size="sm" type="circle" className="text-blue-600" />}
        </div>

        {apiFetchResponse && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">✅ apiFetch Response:</h3>
            <pre className="text-xs text-blue-700 overflow-auto bg-white p-3 rounded border border-blue-100">
              {JSON.stringify(apiFetchResponse, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
};


export default ApiExamples;
