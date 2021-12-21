import React, { Component ,useState,useEffect } from 'react'
 
import { Navigate } from "react-router-dom";
import axios from 'axios';
const Orders  = () => {
  const [orders, setOrders] =  useState();
  const [loading, setLoading] = useState(false);
  const orderListURL = "http://localhost:53803/api/product/orders";
  const loadOrders = async () => {
    let resp;
      resp = await axios.get(orderListURL);
    
    //console.log(resp.data);
    setOrders(resp.data);
  }

  useEffect(() => {
    loadOrders();
  })
    
    return(
        <div>
        { orders?.map((order) => (
            <div className="order-container">
            <h5>Номер заказа</h5>
            <p class="text-justify">{order.orderId}</p>  
            <h5>Почта пользователя</h5>  
            <p class="text-justify">{order.mail}</p>
            <h5 >Дата заказа</h5>
            <p class="text-justify">{order.orderDate}</p>
            <h5>Название товара</h5>
            <p class="text-justify">{order.nameOfProduct}</p>
            <h5>Количество заказанного товара</h5>
            <p class="text-justify">{order.countOfProducts}</p>
            </div>
    ))}
    </div>
    )
}

export default Orders;