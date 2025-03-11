import { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import axios from 'axios';
import { Tally3 } from 'lucide-react';
import BookCard from './BookCard';

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [currentpage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentpage - 1) * itemsPerPage}`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentpage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case 'Expensive':
        return filteredProducts.sort((a, b) => b.price - a.price);
      case 'cheap':
        return filteredProducts.sort((a, b) => a.price - b.price);
      case 'popular':
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentpage - 2);
    let endPage = Math.min(totalPages, currentpage + 2);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="max-w-6xl mx-auto p-5 bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg rounded-xl">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button className="border px-4 py-2 rounded-full flex items-center bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 shadow-md" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <Tally3 className="mr-2" />
              {filter === 'all' ? 'Filter' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white border-gray-200 shadow-xl rounded mt-2 w-full sm:w-40 animate-fade-in">
                <button onClick={() => setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-yellow-300">
                  Cheap
                </button>
                <button onClick={() => setFilter('Expensive')} className="block px-4 py-2 w-full text-left hover:bg-yellow-300">
                  Expensive
                </button>
                <button onClick={() => setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-yellow-300">
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <BookCard key={product.id} id={product.id} title={product.title} image={product.thumbnail} price={product.price} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button onClick={() => handlePageChange(currentpage - 1)} disabled={currentpage === 1} className="border px-4 py-2 mx-2 rounded-full bg-red-500 text-white hover:bg-red-400 transition-all duration-300 shadow-md">
            Previous
          </button>

          <div className="flex flex-wrap justify-center">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${page === currentpage ? 'bg-black text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button onClick={() => handlePageChange(currentpage + 1)} disabled={currentpage === totalPages} className="border px-4 py-2 mx-2 rounded-full bg-green-500 text-white hover:bg-green-400 transition-all duration-300 shadow-md">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;