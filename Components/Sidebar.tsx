import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>(["apple", "watch", "fashion", "trend", "shirt"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6 mt-4 text-center">Vimal Store</h1>

      {/* Search Input */}
      <input
        type="text"
        className="w-full border-2 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
        placeholder="Search Product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Price Range */}
      <div className="flex items-center gap-2 mb-5">
        <input
          type="number"
          className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="Min Price"
          value={minPrice ?? ""}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="Max Price"
          value={maxPrice ?? ""}
          onChange={handleMaxPriceChange}
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <div>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2 text-gray-700">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                className="mr-2"
                onChange={() => handleCategoryChange(category)}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Keywords</h2>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => handleKeywordClick(keyword)}
              className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-300 transition duration-200"
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleResetFilters}
        className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-200"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;
