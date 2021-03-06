
import axios from 'axios';
import React , { useState,useEffect } from "react";
import { Navigate } from 'react-router-dom';

const Cart = () => {
    const productId = localStorage.getItem('ProductId');
    const CountOfProducts = localStorage.getItem('CountOfProducts');
    const [paints,setPaint] =  useState();
    const [UserId,setUserId] =  useState();
    const apiURL = "http://localhost:53803/api/product/cart";
    const clearCartURL = "http://localhost:53803/api/product/removeCart";
    const makeOrderURL = "http://localhost:53803/api/product/makeOrder";
    const [loading, setLoading] = useState(false);
    let PaymentId = 1;
    const [Price,setPrice] = useState();
    const loadPaints = async () => {
       
        const response = await axios.get(apiURL);
        setPaint(response.data);
        //console.log(paints);
        setLoading(true);
        //setPrice(response.data.price * CountOfProducts);
        
      }
     
      const  makeOrder = async (e) => {
        e.preventDefault();
        
        const response = await fetch(makeOrderURL + "?UserId=" + UserId,{
            method: 'POST',
            headers:{'Content-type': 'application/json'},
        });
        
        //console.log(response);
        window.location.reload();
      }
      async function removeCard(){
        const response = await fetch(clearCartURL + "?UserId=" + UserId,{
            method: 'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({
                UserId
            })
        });
       
        window.location.reload();

      }
      
    useEffect(() => {
        loadPaints();
        
        (
        async() => {
            const response = await fetch('http://localhost:53803/api/auth/user',{
              headers:{'Content-type': 'application/json'},
              credentials:'include'
            });
            const content = await response.json();
            setUserId(content.userId);
            //console.log(UserId);
        }
        )();
      })

    return(
        <><h1>
            ?????? ??????????:
        </h1><div>
                {!loading && <div className="loading">???????? ?????????????? ??????????</div>}
                {loading && paints?.filter(paint => paint.userId == UserId).map((paint) => (
                   <><div className="order-div">
                        <div>
                            <h1>{paint.nameOfProduct}</h1>
                        </div>
                        <div>
                            <img width={100} height={100} src={`http://localhost:53803/api/product/image?id=${paint.productId}`}></img>
                        </div>
                        <div className='desc-div'>
                            <h3>????????:</h3>
                            <h2>{paint.price} ??????.</h2>
                            <h2>???????????????????? ????????????: {paint.countOfProducts} </h2>
                        </div>
                    </div></>
          ))}
                    
                    <div className='btn-div'>
                            <button className="btn btn-warning" onClick={makeOrder}>?????????????? ??????????</button>
                            <button className='btn btn-danger' onClick={removeCard}>???????????????? ??????????????</button>
                        </div>
                
               
            </div></>
    )
}

export default Cart;