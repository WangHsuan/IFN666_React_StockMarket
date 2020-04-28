import React, {useState,useEffect} from 'react';

const ToolBox = (props) =>{
    const [stock, setStock] = useState('');
    const [industry, setIndustry] = useState('');
    const [industrylist, setIndustrylist] = useState([]);
    let valuelist = [];
    const handleChange = (e) => {
            e.target.name === 'Selectstock'?setStock(e.target.value):setIndustry(e.target.value);
            if(e.target.name !== 'Selectstock'){
                props.change(e.target.value);
             }   
    }
    

    //hook does not support second argument;
    useEffect(()=>{
        
        setIndustrylist(
            props.industry.map(i => {  
                    if(valuelist.indexOf(i.industry)===-1){
                        valuelist.push(i.industry);
                        return i.industry
                    }
                    return null;
            })
        )
       
    },[industry,props.industry])
    

    const handleSubmit = (e) =>{
        e.preventDefault();
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
                    <select name='Industry' value={industry} onChange={handleChange} >
                    <option key='clear' ></option>
                    {industrylist.map(i => {
                        if(i!==null){
                            return <option key={i} value={i}>{i}</option>
                        }
                    })}
                    </select>
                </div>
        
            </div>)
}

export default ToolBox;
