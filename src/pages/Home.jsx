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
  const [name,setName] = useState();
  const productListURL = "http://localhost:53803/api/product/";
  const productFilterURL = "http://localhost:53803/api/product/getbyname/"
  let [productData, setProductData] = useState();
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  const [z, setZ] = useState(false);

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
    //console.log(resp.data);
    setPaints(resp.data);
    setLoading(false);
  }

  useEffect(() => {
    (
      async() => {
        const response = await fetch('http://localhost:53803/api/auth/user',{
          headers:{'Content-type': 'application/json'},
          credentials:'include'
        });
        const content = await response.json();

        setName(content.firstName);
        
      }
      )();
    setLoading(true);
    loadPaints();
    
  })

  const xCheckbox = ({ target: { checked } }) => {
    setX(checked);
  };
  const yCheckbox = ({ target: { checked } }) => {
    setY(checked);
  };
  const zCheckbox = ({ target: { checked } }) => {
    setZ(checked);
  };



  return (
      <>
      <div className="headHome"><h1>Добро пожаловать,{name}!</h1>
      <Heading></Heading>
      <h1>Список наших товаров</h1>
      <div className="input-div"> 
      <div>
      <input className="form-check-input" type="checkbox" checked={x} onChange={xCheckbox} /> 
      <label class="form-check-label" for="flexCheckDefault">Наличие на складе</label>  
      </div>
      <div>
      <input className="form-check-input" type="checkbox" checked={y} onChange={yCheckbox} /> 
      <label class="form-check-label" for="flexCheckDefault">Краски</label>  
      </div>
      <div>
      <input className="form-check-input" type="checkbox" checked={z} onChange={zCheckbox} /> 
      <label class="form-check-label" for="flexCheckDefault">Растворители</label>  
      </div>
      </div>
      {!loading && <div className="loading">Loading...</div>}
      {loading && (
        <div className="home-cont">
          {z &&
          paints?.filter(paint => paint.categoryId == 4).map((paint) => (
            <Details
              id={paint.productId}
              src={`http://localhost:53803/api/product/image?id=${paint.productId}`}
              nameOfProduct={paint.nameOfProduct}
              url={`/details/${paint.productId}`}
              numberOfProducts={paint.numberOfProducts}
              description={paint.description} 
              price={paint.price}/>
          ))}
            {y &&
          paints?.filter(paint => paint.categoryId == 1).map((paint) => (
            <Details
              id={paint.productId}
              src={`http://localhost:53803/api/product/image?id=${paint.productId}`}
              nameOfProduct={paint.nameOfProduct}
              url={`/details/${paint.productId}`}
              numberOfProducts={paint.numberOfProducts}
              description={paint.description} 
              price={paint.price}/>
          ))}
          {x && 
           paints?.filter(paint => paint.numberOfProducts > 0).map((paint) => (
            <Details
              id={paint.productId}
              src={`http://localhost:53803/api/product/image?id=${paint.productId}`}
              nameOfProduct={paint.nameOfProduct}
              url={`/details/${paint.productId}`}
              numberOfProducts={paint.numberOfProducts}
              description={paint.description} 
              price={paint.price}/>
          ))}
          {!x && !y && !z &&
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
