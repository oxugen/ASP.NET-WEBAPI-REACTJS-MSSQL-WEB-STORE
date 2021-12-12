import React, { SyntheticEvent, useState }  from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [FirstName,setName] = useState('');
    const [SecondName,setSecondName] = useState('');
    const [Mail,setEmail] = useState('');
    const [Pass,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);


    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:53803/api/auth/register',{
            method: 'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({
                FirstName,
                SecondName,
                Mail,
                Pass
            })
        });
        setRedirect(true);
    }
    if(redirect){
    return <Navigate to="/Login" />
    }
    return (

        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <input className="form-control" placeholder="First Name" required
            onChange={e => setName(e.target.value)}
        />
        <input className="form-control" placeholder="Second Name" required
            onChange={e => setSecondName(e.target.value)}
        />
        <input type="email" className="form-control" placeholder="Email address" required
            onChange={e => setEmail(e.target.value)}
        />
        <input type="password" className="form-control" placeholder="Password" required
            onChange={e => setPassword(e.target.value)}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;
