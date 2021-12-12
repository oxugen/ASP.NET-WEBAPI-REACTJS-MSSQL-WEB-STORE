import React , { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import {
  Navigate,
  useParams
} from "react-router-dom";
import { Link } from "react-router-dom";

//тк когда мы создали роутер и указали шаблон строки /details/:productId
//то теперь можем достучаться до productId через хук useParams
const Cart = () => {
  const { productId } = useParams();
  const apiURL = "http://localhost:53803/api/product/productById?id=" + productId;
  const [paints , setPaint] =  useState();
  const [loading, setLoading] = useState(false);
  const [redirect,setRedirect] = useState(false);

  const loadPaints = async () => {
    const response = await axios.get(apiURL);
    setPaint(response.data);
    setLoading(true);
  }
  
  const order = async() => {
    setRedirect(true);
  }
  

  useEffect(() => {
    loadPaints();
  })

  if(redirect){
   return <Link to={'/Cart'} >
     
   </Link>
  }
  return (
    <>
      <div>

        <div>
        {!loading && <div className="loading">Loading...</div>}
        {loading && (
          <div className="details-container">
          <div><h1>{paints.nameOfProduct}</h1>
          <img width={300} height={400} src={`http://localhost:53803/api/product/image?id=${paints.productId}`}></img>
          </div>
          <div className="desc-container">
          <h3>Описание:</h3>  
          <p>{paints.description}</p>
          <p>Выберите количество товаров: </p>
          <input type={'number'} max={paints.numberOfProducts}></input>
          <br></br>
          <button className="btn btn-warning" onClick={order}>Заказать товар</button>
          </div>
          </div>

        )}
        </div>
      </div>
    </>
  );
}
export default Cart;
