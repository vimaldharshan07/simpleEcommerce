import { Link } from "react-router-dom";
import React from "react";

interface bookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<bookCardProps> = ({ id, title, image, price }) => {
  console.log("Image URL:", image); // Log the image URL to debug
  console.log(title);

  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover mb-2"
          onError={() => console.error(`Failed to load image: ${image}`)} // Log if the image fails to load
        />
        <h2 className="font-extrabold">{title}</h2>
        <p className="font-mono">${price}</p>
      </Link>
    </div>
  );
};

export default BookCard;
