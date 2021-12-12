import React, { useState,useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Navigate } from "react-router-dom";
import Details from '../components/Details';
import Heading from "../components/Heading";

const Home = () => {
  const [paints, setPaints] =  useState();
  const [loading, setLoading] = useState(false);
  const [redirect,setRedirect] = useState(false);
  const apiURL = "http://localhost:53803/api/product";

  const loadPaints = async () => {
   
    const response = await axios.get(apiURL)
    setPaints(response.data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    loadPaints();
    
  })


  return (
      
      <>
      <div className="headHome"><h1>Добро пожаловать!</h1>
      <Heading></Heading>
      <h1>Список наших товаров</h1><div class="home">
      </div>
      {!loading && <div className="loading">Loading...</div>}
      {loading && (
        <div className="home-cont">
          {paints?.map((paint) => (
            <Details
              id={paint.productId}
              src={`http://localhost:53803/api/product/image?id=${paint.productId}`}
              nameOfProduct={paint.nameOfProduct}
              url={`/details/${paint.productId}`}
              numberOfProducts={paint.numberOfProducts}
              description={paint.description} />
          ))}
        </div>
      )}
    </div></>
    );
};
export default Home;
