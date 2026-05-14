import React, { useState } from 'react';
import { useFetch } from '../../hooks';
import { httpClient } from '../../utilities';
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
  const [isPosting, setIsPosting] = useState(false);
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
        <p className="text-gray-600 mb-4">Performing manual HTTP requests:</p>
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
    </div>
  );
};

export default ApiExamples;
