import React,{useEffect, useState} from 'react';
import ToolBox from './ToolBox'

const Products = () => {
    const [product, setProduct] = useState([]);
    useEffect(()=>{
    fetch('http://131.181.190.87:3001/all')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setProduct(data)})
    },[])

    const searchSymbol = () => {
        console.log('search')
    }

    return (<div>
        <ToolBox props={searchSymbol}/>
        {product.map(i=>{
           return  <div key={i.symbol}>{i.name}</div>
        })}
        </div>)
}

export default Products ;