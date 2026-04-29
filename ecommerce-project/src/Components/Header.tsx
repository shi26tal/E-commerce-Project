import React, { useState } from "react";
import "./Header.css";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";

//Binding element 'cart' implicitly has an 'any' type.ts(7031)
//(parameter) cart: any 
//this means : ts doesnot have enough information to figure out the type.so we have to set the type manually.

type HeaderProps = {
  cart: {
    productId: string;
    quantity: number;
    deliveryOptionId: string;
  }[];
}

//this is called type alias = works like a variable, but for types

const Header = ({ cart }: HeaderProps ) => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchText = searchParams.get('search');

  const [search, setSearch] = useState(searchText || '');

  

  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={LogoWhite} />
            <img className="mobile-logo" src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchBar}
          />

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink to="/orders" className="orders-link header-link">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink to="/checkout" className="cart-link header-link">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
