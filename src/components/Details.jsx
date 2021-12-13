import React from "react"
import { Link } from "react-router-dom";

const Cart = ({ url, src, id, nameOfProduct, numberOfProducts ,description,price}) => {
    return(
      <Link className="btn btn-outline-warning" to={url}>
        <div class="card" key={id} >
          <div class="card-img">
            <img width="100px" height="100px" src={src} alt="product" className="" />
          </div>
          <h3>{nameOfProduct}</h3>
          <p>Цена: {price} руб.</p>
          <p>Количество товаров: {numberOfProducts}</p>
        </div>
      </Link>
    )
}

export default Cart;
