import React, { useState, useEffect } from "react";
import './products.css';
import { axiosInstance } from '../apis/config';
import { useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";
import './ProductsList.css';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6; // Number of items to display per page

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
  console.log(products);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter(product => {
    const categoryFilter =
      selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase();

    const titleFilter =
      query === '' || product.title.toLowerCase().includes(query.toLowerCase());

    return categoryFilter && titleFilter;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataPerPage = filteredProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };

  return (
    <div className="container">
      <p style={{ marginTop: "10px" }}><b>Welcome To Our Store, Start browsing...</b></p>
      <div className="row container">
      <input type="text" placeholder="Search and Explore.." className="col-10" 
      style={{borderRadius:'10px', padding:'3px' ,border:'1px solid #eee'}} onChange={event => setQuery(event.target.value)} />
   
      </div>

      <div className="category">
        <p className='cat' style={{paddingLeft:'10px'}}> <b>Categories</b> </p>
        <div className="buttons">
          <button className='but2' onClick={() => handleCategoryChange("All")}>All</button>
          <button className='but3' onClick={() => handleCategoryChange("Laptops")}>Laptops</button>
          <button className='but4' onClick={() => handleCategoryChange("fragrances")}>Fragrances</button>
          <button className='but5' onClick={() => handleCategoryChange("groceries")}>Groceries</button>
          <button className='but6' onClick={() => handleCategoryChange("skincare")}>SkinCare</button>
          <button className='but7' onClick={() => handleCategoryChange("smartphones")}>SmartPhone</button>
          <button className='but8' onClick={() => handleCategoryChange("home-decoration")}>Furniture</button>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {dataPerPage.map((product, id) => (
            <div className="col" key={product.id}>
              <div className="card">
                <img src={`https://cdn.dummyjson.com/product-images/${product.id}/thumbnail.jpg`} className="card-img-top" alt="{product.title}" style={{ height: "200px", width: "355px" }} />
                <div className="card-body">
                  <p className="card-text">
                    {product.stock > 0 ?
                      <span style={{ color: 'green' }}>In Stock</span> :
                      <span style={{ color: 'red' }}>Out of Stock</span>
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
            totalItemsCount={filteredProducts.length}
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

export default ProductsList;
