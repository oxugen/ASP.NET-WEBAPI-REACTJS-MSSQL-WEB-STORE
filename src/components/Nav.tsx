import React, { PureComponent, SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';
import axios from 'axios';

const Nav = (props: {firstName:string, setName: (firstName:string) => void}) => {
  const [nameOfProduct,setName] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [role,setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e:SyntheticEvent) => {
    e.preventDefault();
    if(nameOfProduct != null){
      
    setRedirect(true)
  }
}
    useEffect( () => {
      (
      async() => {
        const response = await fetch('http://localhost:53803/api/auth/user',{
          headers:{'Content-type': 'application/json'},
          credentials:'include'
        });
        const content = await response.json();

        setRole(content.roleOfUser);
        console.log(role);
        if(role === 'Manager'){
          setLoading(true);
        }
        
      }
      )();
    })

    const logout = async () => {
      await fetch('http://localhost:53803/api/auth/logout',{
        method: 'GET',
        headers:{'Content-type': 'application/json'},
        credentials: 'include',
    });
    props.setName('');

    }
    let menu;
    // if(redirect == true){
    
    //     <Link to={'details/1'}></Link>
      
    // }
    if(props.firstName === ''){
      menu = (
        <>
         <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/Login" className="navbar-brand" aria-disabled="true" >Войти</Link>
          </li>
          <li className="nav-item">
            <Link to="/Register" className="navbar-brand" aria-disabled="true">Регистрация</Link>
          </li>
        </ul>
        </div></>
      )
    }
    else{
      menu = (
        <>
         <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link to="/Login" className="nav-link" aria-disabled="true" onClick={logout}>Выйти</Link>
          </li>
          <li className="nav-item">
            {loading && <Link to="/Add" className="nav-link" aria-disabled="true" >Добавить товар</Link> }
          </li>
        </ul>
        <form className="form-inline mt-2 mt-md-0">
        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" 
           onChange={e => setName(e.target.value)}
        />
        <button className="btn btn-warning" type="submit" onClick={submit}>Search</button>
      </form>
        </div>
        <Link to="/Cart" className="ml-auto mt-2 mt-md-0" >
            <button type="button" className="btn btn-warning">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
          </svg>
                Cart
              </button>
            </Link>      
        </>
      )
     
    }
    return (
        <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <Link to="/" className="navbar-brand" >Автоэмали</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
   
      {menu}
    
    </nav>
        </div>
    );
};

export default Nav;