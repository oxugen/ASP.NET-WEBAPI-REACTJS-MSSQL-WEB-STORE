import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Details from './pages/Details';
import Cart from './components/Cart';
import Add from './pages/Add';
import Orders from './pages/Orders';

function App() {
  const [firstName,setName] = useState('');

  useEffect( () =>{
      (
          async () => {
              const response = await fetch('http://localhost:53803/api/auth/user',{
              headers:{'Content-type': 'application/json'},
              credentials: 'include'
    });
          const content = await response.json();
          if(content.firstName != null){
          setName(content.firstName)};
          }
      )();
  });

  /*
    /:productId обозначает, что ссылка может быть: /details/1 или /details/2 или /details/3 и тд
  */
  return (
    <div className="App">
      <BrowserRouter>
        <Nav firstName={firstName} setName={setName}></Nav>
        <main className="mainForm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/login"  element={<Login setName={setName}/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/details/:productId" element={<Details/>}/>
            <Route path="/Add" element={<Add/>}/>
          </Routes>
        </main>
      </BrowserRouter>
      <footer className="container">
      <p className="float-right"><a href="#">Back to top</a></p>
    <p>&copy; 2017-2019 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
  </footer>
    </div>
  );
}

export default App;
