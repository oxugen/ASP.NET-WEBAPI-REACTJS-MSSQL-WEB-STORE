import React, { Component ,useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
import axios from 'axios';
const Add  = () => {
    const [NameOfProduct,setName] = useState('');
    const [NumberOfProducts,setNumberOfProduct] = useState('');
    const [Description,setDescription] = useState('');
    const [imageFile,setFile] = useState();
    const [fileName,setFileName] = useState();
    const [Price,setPrice] = useState('');
    const [CategoryId,setCategory] = useState('');
    const [redirect,setRedirect] = useState('');
    const [role,setRole] = useState('');
    useEffect( () => {
        (
        async() => {
          const response = await fetch('http://localhost:53803/api/auth/user',{
            headers:{'Content-type': 'application/json'},
            credentials:'include'
          });
          const content = await response.json();
  
          setRole(content.roleOfUser);

          
        }
        )();
      })
  
      
    
    const saveFile = async (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    const submit = async (e) => {
        try{
            e.preventDefault();
            await fetch('http://localhost:53803/api/product/create',{
             method: 'POST',
             headers:{'Content-type': 'application/json'},
             body: JSON.stringify({
                 NameOfProduct,
                 NumberOfProducts,
                 Price,
                 Description,
                 //imageFile,
                 CategoryId
             })
        });
            setRedirect(true);
        }
        catch(ex){
            console.log(ex);
        }
        // await fetch('http://localhost:53803/api/product/create',{
        //     method: 'POST',
        //     headers:{'Content-type': 'application/json'},
        //     body: JSON.stringify({
        //         NameOfProduct,
        //         NumberOfProducts,
        //         Price,
        //         Description,
        //         imageFile,
        //         CategoryId
        //     })
        //});
       
    }
    const addImage = async(e) => {
        e.preventDefault();
        const formData = new FormData()
       // formData.append('nameOfProduct',NameOfProduct)
       // formData.append('numberOfProducts',NumberOfProducts)
       // formData.append('price',Price)
       // formData.append('description',Description)
        formData.append('formFile',imageFile)
        formData.append('fileName',fileName)
        try{
            const res = await axios.post('http://localhost:53803/api/product/createImage',formData)
            console.log(res);
        }
        catch(ex){
            console.log(ex);
        }
    }
    
    if(redirect){
    return <Navigate to="/" />
    }
    {
        if(role == "Manager"){
        return (
          
                <form onSubmit={submit} className='addForm'> 
                <h1 className="h3 mb-3 fw-normal">?????????????? ???????????????? ????????????:</h1>
                <input className="form-control" placeholder="???????????????? ????????????" required
                onChange={e => setName(e.target.value)} />
                <input className="form-control" type={'number'} placeholder="???????????????????? ????????????" required
                    onChange={e => setNumberOfProduct(e.target.value)} />
                <input className="form-control" type={'number'} placeholder="????????" required
                    onChange={e => setPrice(e.target.value)} />
                <input  className="form-control" placeholder="???????????????? ????????????" required
                        onChange={e => setDescription(e.target.value)} />
                <input type="file" accept='image/*' onChange={saveFile} className="form-control" placeholder="????????????????" required
                             />
                <button className="btn btn-warning" type="submit" onClick={addImage}>???????????????? ????????????????</button>             
                <input className="form-control" placeholder="?????????????????? ????????????" type={'number'} required
                            onChange={e => setCategory(e.target.value)} />
                <button className="btn btn-warning" type="submit">????????????????</button>
                </form>
            
        )
        }
        else{
            return(
                <div>???? ???? ?????????????????? ????????????????????!</div>
            )
        }
    }
}

export default Add;