import { Link } from "react-router-dom";
function Header() {
  return (
    <nav className="navbar bg-body-secondary ">
      <div className="container">
        <span className="navbar-brand ">
          <b>
            <h4>Products</h4>
          </b>
        </span>
        <Link className="navlink" to="/cart">
        <i
          class="fa-solid fa-cart-shopping"
          style={{ color:"black" ,cursor: "pointer" }}
        ></i>
        </Link>
        
      </div>
    </nav>
  );
}

export default Header;
