import React, { useState,useEffect } from "react";
import axios from 'axios';
import { Link , useSearchParams} from "react-router-dom";
import styled from 'styled-components';
import { Navigate } from "react-router-dom";
import Details from '../components/Details';
import Heading from "../components/Heading";

const Home = () => {
  const [paints, setPaints] =  useState();
  const [loading, setLoading] = useState(false);
  const [redirect,setRedirect] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const productListURL = "http://localhost:53803/api/product/";
  const productFilterURL = "http://localhost:53803/api/product/getbyname/"
  let [productData, setProductData] = useState();
  const [x, setX] = useState(false);

  let productNameFilter = searchParams.get("nameOfProduct");  
  const loadPaints = async () => {
    let resp;
    if (productNameFilter) {
      resp = await axios.get(productFilterURL, {
        params: {
          nameOfProduct: productNameFilter,
        },
      });
    } else {
      resp = await axios.get(productListURL);
    }
    console.log(resp.data);
    setPaints(resp.data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    loadPaints();
    
  })

  const soldCheckbox = ({ target: { checked } }) => {
    setX(checked);
  };


  return (
      
      <>
      <div className="headHome"><h1>Добро пожаловать!</h1>
      <Heading></Heading>
      <h1>Список наших товаров</h1><div class="home">
      
      <input className="form-check-input" type="checkbox" checked={x} onChange={soldCheckbox} /> 
      <label class="form-check-label" for="flexCheckDefault">Наличие на складе</label>  
      </div>
      {!loading && <div className="loading">Loading...</div>}
      {loading && (
        <div className="home-cont">
          {x && 
          paints?.filter( paint => paint.numberOfProducts > 0).map((paint) => (
            <Details
              id={paint.productId}
              src={`http://localhost:53803/api/product/image?id=${paint.productId}`}
              nameOfProduct={paint.nameOfProduct}
              url={`/details/${paint.productId}`}
              numberOfProducts={paint.numberOfProducts}
              description={paint.description} 
              price={paint.price}/>
          ))}
          {!x && 
           paints?.map((paint) => (
            <Details
              id={paint.productId}
              src={`http://localhost:53803/api/product/image?id=${paint.productId}`}
              nameOfProduct={paint.nameOfProduct}
              url={`/details/${paint.productId}`}
              numberOfProducts={paint.numberOfProducts}
              description={paint.description} 
              price={paint.price}/>
          ))}
        </div>
      )}
    </div></>
    );
};
export default Home;
