import { MessageCircle, ThumbsUp } from 'lucide-react';

const Popular = () => {
  const Blogs = [
    {
      title: 'My Amazing Blog Title 1',
      author: 'Vimal',
      likes: 4560,
      comments: 143,
    },
    {
      title: 'My Amazing Blog Title 2',
      author: 'Vengat',
      likes: 560,
      comments: 13,
    },
    {
      title: 'My Amazing Blog Title 3',
      author: 'Vicky',
      likes: 900,
      comments: 87,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 w-full max-w-md mt-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🔥 Popular Blogs</h2>
      <ul>
        {Blogs.map((blog, index) => (
          <li key={index} className="mb-4 bg-white p-4 rounded-lg shadow-md text-black">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{blog.title}</span>
            </div>
            <span className="text-gray-700">🖊️ Published by {blog.author}</span>
            <div className="flex items-center mt-2">
              <MessageCircle size={16} className="text-indigo-500" />
              <span className="text-gray-600 mx-2">{blog.likes}</span>
              <ThumbsUp size={16} className="text-green-500" />
              <span className="text-gray-600 mx-2">{blog.comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popular;
