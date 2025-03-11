import { useEffect, useState } from 'react';

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const Topseller = () => {
  const [Authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();

        const AuthorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(AuthorsData);
      } catch (error) {
        console.error(`Error fetching authors: ${error}`);
      }
    };
    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 w-full max-w-md mx-5 mt-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-5">🌟 Top Sellers</h2>
      <ul>
        {Authors.map((author, index) => (
          <li key={index} className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg shadow-md text-black">
            <section className="flex items-center">
              <img src={author.image} alt={author.name} className="w-12 h-12 rounded-full border-2 border-gray-300" />
              <span className="ml-4 font-medium">{author.name}</span>
            </section>

            <button
              onClick={() => handleFollowClick(index)}
              className={`py-1 px-3 rounded transition-all ${
                author.isFollowing ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'
              }`}
            >
              {author.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topseller;
