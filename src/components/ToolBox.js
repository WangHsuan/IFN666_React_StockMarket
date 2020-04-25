import React, {useState,useEffect} from 'react';

const ToolBox = (props) =>{
    const [stock, setStock] = useState('');
    const [industry, setIndustry] = useState('');
    const handleChange = (e) => {
            e.target.name === 'Selectstock'?setStock(e.target.value):setIndustry(e.target.value);   
    }

    //hook does not support second argument;
    useEffect(()=>{
        if(industry!==''){
           props.change(industry);
        }
    },[industry])
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(industry);
        const value = {
            stock:stock
        }
        props.search(value)
    }
    return (<div className='ToolContainer'>
                <div className="ToolItem">
                    <div>Selectstock</div>
                    <input type="text" onChange={handleChange} name='Selectstock'/>
                </div>
                <div className="ToolItem">
                    <button onClick={handleSubmit}>Search</button>
                </div>
                <div className="ToolItem">
                    <div>Industry</div>
                    <select value={industry} onChange={handleChange} name='Industry'>
                        <option value="clear"></option>
                        <option value="Health">Health Care</option>
                        <option value="Industrials">Industrials</option>
                        <option value="Discretionary">Consumer Discretionary</option>
                        <option value="Information">Information Technology</option>
                        <option value="Staples">Consumer Staples</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Financials">Financials</option>
                        <option value="Estate">Real Estate</option>
                        <option value="Energy">Energy</option>
                        <option value="Telecommunication">Telecommunication Services</option>
                    </select>
                </div>
        
            </div>)
}

export default ToolBox;