import React, { Component } from 'react'

export default class Heading extends Component {
    render() {
        return (
            <>
                <div class="row">
                <div class="col-lg-4">
                <img src='/image/card.png' width={270} height={180}></img>   
                    <h2>Оплата</h2>
                    <p>У нас доступны все види оплаты.Оплачивайте любым удобным для вас способом!</p>
                </div>
                <div class="col-lg-4">
                <img src='/image/truck.png' width={250} height={180}></img>
                    <h2>Доставка</h2>
                    <p>Доставка в пункты выдачи наших магазинов или до двери.Мы находимся рядом с заправкой на выезде из Минска (после МКАДа в сторону Шабанов</p>
                </div>
                <div class="col-lg-4">
                    <img src='/image/paint.png' width={270} height={180}></img> 
                    <h2>Выбор</h2>
                    <p>В нашем магазине широкий ассортимент товаров.У нас вы найдёте краску на любой вкус и цвет. :)</p>
                </div>
            </div></>
        )
    }
}

