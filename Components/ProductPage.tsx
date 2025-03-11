
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';


interface product
{
    id:number;
    title:string;
    description:string;
    price:number;
    rating:number;
    images:string[];
}

const ProductPage = () => {

  const {id}=useParams<{id:string}>();
  const navigate= useNavigate()
  const [product,setProduct]=useState<product | null>(null)

  useEffect(()=>
  {
    if(id){
      axios.get<product>(`https://dummyjson.com/products/${id}`)
      .then(response =>{
        setProduct(response.data);
      }).catch((error)=>{console.log(`error fetching data:${error}`)});
    }
  },[id]);
  if(!product)
  {
    return <h1>Loading.....</h1>
  }

  return (
    <div className='p-5 w-[60%]'>
      <button onClick={()=>navigate(-1)}
        className='mb-5 px-4 py-2 bg-black text-white rounded'>
       Back
      </button>
      <img src={product.images[0]} alt={product.title} className="w-[50%] h-auto mb-5"/>
      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
      <div className="flex">
        <p>price:${product.price}</p>
        <p className='ml-10'>rating:{product.rating}</p>
      </div>
    </div>
  )
}

export default ProductPage