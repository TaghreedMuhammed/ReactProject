import { useState, useEffect } from "react";
import './products.css';
import { axiosInstance } from '../apis/config';
import { useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";
import './ProductsList.css';

function Labtops() {
  const [products, setProducts] = useState([]);
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
console.log(products);

  useEffect(() => {
    axiosInstance
      .get('/products')
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  


  //search
  const filteredProducts = products.filter(product => {
    if (query === '') {
      return true;
    } else if (product.title && product.title.toLowerCase().includes(query.toLowerCase())) {
      return true; 
    } else {
      return false;
    }
  });
//pagination
  const itemsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataPerPage = filteredProducts.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <p style={{ marginTop: "10px" }}><b>Welcome To Our Store, Start browsing...</b></p>
      <input type="text" placeholder="Search and Explore.." className="search"  onChange={event => setQuery(event.target.value)}/>
      <button className="but1">Search</button>

      <div className="category">
        <p className='cat'> <b>Categories</b> </p>
        <div className="buttons">
          <button className='but2' onClick={handleallproduct}>All</button>
          <button className='but3'>Laptops</button>
          <button className='but4'>Furniture</button>
          <button className='but5'>Groceries</button>
          <button className='but6'>SkinCare</button>
          <button className='but7'>SmartPhone</button>
          <button className='but8'>SunGlasses</button>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {dataPerPage.map((product,id) => (
            <div className="col" key={product.id}>
            <div className="card">
              <img src={`https://cdn.dummyjson.com/product-images/${product.id}/thumbnail.jpg`} className="card-img-top" alt="{product.title}" style={{height:"200px",width:"355px"}} />
              <div className="card-body">
                <p className="card-text">
                  {product.stock > 0 ? 
                    <span style={{color: 'green'}}>In Stock</span> : 
                    <span style={{color: 'red'}}>Out of Stock</span>
                  }
                </p>
                <p className="card-title"><b>{product.title}</b></p>
                <p className="card-text">Price: {product.price}$</p>
                <p className="card-text"><b>Rating: {product.rating}</b></p>

                <button onClick={() => navigate(`/ProductDetails/${product.id}`)}>ProductDetails</button>
                <button className="cart">Add To Cart</button>
              </div>
            </div>
          </div>
          ))}
     
        </div>

        <div className="pagination-container">
      <Pagination 
        activePage={currentPage} 
        itemsCountPerPage={itemsPerPage} 
        totalItemsCount={products.length} 
        pageRangeDisplayed={5} 
        onChange={handlePageChange} 
        itemClass="pagination-item"
        linkClass="pagination-link"
        activeLinkClass="pagination-link active" 
      />
    </div>
      </div>
    </div>
  );
}

export default Labtops;