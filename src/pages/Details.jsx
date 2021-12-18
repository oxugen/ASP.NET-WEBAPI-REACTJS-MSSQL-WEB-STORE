import React , { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import {
  Navigate,
  useParams
} from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
  const { productId } = useParams();
  const apiURL = "http://localhost:53803/api/product/productById?id=" + productId;
  //const addCardURL  = "http://localhost:53803/api/product/addCart";
  const [paints,setPaint] =  useState();
  const [loading, setLoading] = useState(false);
  const [redirect,setRedirect] = useState(false);

  var oldProductsId = [localStorage.getItem('ProductId')];
 
  
  const loadPaints = async () => {
    const response = await axios.get(apiURL);
    setPaint(response.data);
    setLoading(true);
  }
  
  async function handleSubmit(event)  {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let CountOfProducts = formData.get("CountOfProducts");
    if (!CountOfProducts) return;
    localStorage.setItem('ProductId',productId);
    localStorage.setItem('CountOfProducts',CountOfProducts);
    // const response = await fetch(addCardURL,{
    //       method: 'POST',
    //       headers:{'Content-type': 'application/json'},
    //       credentials: 'include',
    //       body: JSON.stringify({
    //           productId,
    //           CountOfProducts
    //       })
    //   });
    // console.log(response.data);
    setRedirect(true);
  }

  const order = async() => {
    //this.setState({ arr: [oldProductsId, productId] });
    localStorage.setItem('ProductId', productId );

    setRedirect(true);
  }
  

  useEffect(() => {
    loadPaints();
  })

  if(redirect){
   return <Navigate to={'/Cart'} >
     
   </Navigate>
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
          <h5>{paints.description}</h5>
          <h3>Цена:</h3>
          <h2>{paints.price} руб.</h2>
          <p>Выберите количество товаров: </p>
          <form onSubmit={handleSubmit}>
          <input type={'number'} required name="CountOfProducts" min={0} max={paints.numberOfProducts}></input>
          <br></br>
          <button type="submit" className="btn btn-warning" >Добавить в корзину</button>
          </form>
          </div>
          </div>

        )}
        </div>
      </div>
    </>
  );
}
export default Cart;
