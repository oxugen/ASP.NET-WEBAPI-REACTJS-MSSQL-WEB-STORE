
import axios from 'axios';
import React , { useState,useEffect } from "react";
import { Navigate } from 'react-router-dom';

const Cart = () => {
    const productId = localStorage.getItem('ProductId');
    const CountOfProducts = localStorage.getItem('CountOfProducts');
    const [paints,setPaint] =  useState();
    const [UserId,setUserId] =  useState();
    const apiURL = "http://localhost:53803/api/product/productById?id=" + productId;
    const makeOrderURL = "http://localhost:53803/api/product/makeOrder"
    const [loading, setLoading] = useState(false);
    let PaymentId = 1;
    const [Price,setPrice] = useState();
    const loadPaints = async () => {
        if(localStorage.length != 0){
        const response = await axios.get(apiURL);
        setPaint(response.data);
        setLoading(true);
        setPrice(response.data.price * CountOfProducts);
        }
      }

      const  makeOrder = async (e) => {
        e.preventDefault();
        if(UserId == null){
         console.log("дадада");  
        }
        else{
        const response = await fetch(makeOrderURL,{
            method: 'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({
                UserId,
                PaymentId,
                Price,
                CountOfProducts,
                productId
            })
        });
        }
        //console.log(response);
        localStorage.clear()
        window.location.reload();
      }
      function removeCard(){
        localStorage.clear()
        window.location.reload();

      }
      
    useEffect(() => {
        if(localStorage.length != 0)
        loadPaints();

        (
        async() => {
            const response = await fetch('http://localhost:53803/api/auth/user',{
              headers:{'Content-type': 'application/json'},
              credentials:'include'
            });
            const content = await response.json();
            setUserId(content.userId);
            
        }
        )();
      })

    return(
        <><h1>
            Ваш заказ:
        </h1><div>
                {!loading && <div className="loading">Ваша корзина пуста</div>}
                {loading && (
                    <div className="order-div">
                        <div>
                            <h1>{paints.nameOfProduct}</h1>
                        </div>
                        <div>
                            <img width={100} height={100} src={`http://localhost:53803/api/product/image?id=${paints.productId}`}></img>
                        </div>
                        <div className='desc-div'>
                            <h3>Цена:</h3>
                            <h2>{paints.price * CountOfProducts} руб.</h2>
                            <h2>Количество товара: {localStorage.getItem('CountOfProducts')} </h2>
                        </div>
                        <div className='btn-div'>
                        <button className="btn btn-warning" onClick={makeOrder}>Сделать заказ</button>
                        <button  className='btn btn-danger' onClick={removeCard}>Очистить корзину</button>
                        </div>
                    </div>
                )}
            </div></>
    )
}

export default Cart;