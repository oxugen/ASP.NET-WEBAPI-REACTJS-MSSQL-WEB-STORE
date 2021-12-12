import React, { SyntheticEvent, useState }  from "react";
import { Navigate } from "react-router-dom";

const Login = (props: {setName: (firstName:string) => void}) => {
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);

    const submit = async (e:SyntheticEvent) => {
      e.preventDefault();
      
      const response = await fetch('http://localhost:53803/api/auth/login',{
          method: 'POST',
          headers:{'Content-type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
              Email,
              Password
          })
      });

      const content = await response.json();
      setRedirect(true);
      props.setName(content.firstName);
      
      
  }
  if(redirect){
    return <Navigate to="/" />
    }

    return (
        <div>
        <form action="" onSubmit={submit}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus
            onChange= {e => setEmail(e.target.value)}
          />
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
            onChange= {e => setPassword(e.target.value)}
          />
          <input type="checkbox" value="remember-me"/> Remember me

          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
    );
};

export default Login;