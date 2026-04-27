import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import Header from "../../Components/Header";
import ProductsGrid from "./ProductsGrid";
import { useSearchParams } from "react-router";

const HomePage = ({ cart, loadCart }) => {
  //to fetch data from backend its builtin feature
  // fetch('http://localhost:3000/api/products')
  //   .then((response)=>{
  //     return response.json()
  //   }).then((data)=>{
  //         console.log(data)
  //     })

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [products, setProducts] = useState([]);

  // useEffect(()=>{
  //   axios.get('/api/products')
  //     .then((response)=>{
  //       setProducts(response.data)
  //     })
  // },[])

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
};

export default HomePage;
