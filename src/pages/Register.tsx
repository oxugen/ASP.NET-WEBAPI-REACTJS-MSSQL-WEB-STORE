import React, { SyntheticEvent, useState }  from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [FirstName,setName] = useState('');
    const [SecondName,setSecondName] = useState('');
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);


    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:53803/api/auth/register',{
            method: 'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({
                FirstName,
                SecondName,
                Email,
                Password
            })
        });
        setRedirect(true);
    }
    if(redirect){
    return <Navigate to="/Login" />
    }
    return (
        <div className="login-div">
        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Пожалуйста, зарегестрируйтесь</h1>
        <input className="form-control" placeholder="First Name" required
            onChange={e => setName(e.target.value)}
        />
        <input className="form-control" placeholder="Second Name" required
            onChange={e => setSecondName(e.target.value)}
        />
        <input type="email" className="form-control" placeholder="Email address" required
            onChange={e => setEmail(e.target.value)}
        />
        <input type="password" className="form-control" minLength={8} placeholder="Password" required
            onChange={e => setPassword(e.target.value)}
        />
        <button className="w-100 btn btn-lg btn-warning" type="submit">Зарегестрироваться</button>
        </form>
        </div>
    );
};

export default Register;
