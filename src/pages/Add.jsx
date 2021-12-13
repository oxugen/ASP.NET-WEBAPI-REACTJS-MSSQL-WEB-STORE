import React, { Component ,useState} from 'react'
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
        return (
                <form onSubmit={submit}> 
                <h1 className="h3 mb-3 fw-normal">Введите описание товара:</h1>
                <input className="form-control" placeholder="Название товара" required
                onChange={e => setName(e.target.value)} />
                <input className="form-control" placeholder="Количество товара" required
                    onChange={e => setNumberOfProduct(e.target.value)} />
                <input className="form-control" placeholder="Цена" required
                    onChange={e => setPrice(e.target.value)} />
                <input  className="form-control" placeholder="Описание товара" required
                        onChange={e => setDescription(e.target.value)} />
                <input type="file" accept='image/*' onChange={saveFile} className="form-control" placeholder="Картинка" required
                             />
                <button className="btn btn-warning" type="submit" onClick={addImage}>Добавить картинку</button>             
                <input className="form-control" placeholder="Категория товара" required
                            onChange={e => setCategory(e.target.value)} />
                <button className="btn btn-warning" type="submit">Добавить</button>
                </form>
              
        )
    }
}

export default Add;