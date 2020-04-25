import React, {useState, useEffect} from 'react';


export default function SearchDate(props){
    const[datetime, setdatetime] = useState([]);
    const [selectdate, setSelectdate] = useState('');

    useEffect(()=>{
        setdatetime(props.dateTime)
    },[props.dateTime])

    const handleSelect = (e) => {
        e.preventDefault();
        setSelectdate(e.target.value,);
        
    }
    const handleClick = (e) => {
        props.select(selectdate)
    }
    return (<div className='SearchDate'>
        
        <select onChange={handleSelect}>
            {datetime.map( i => {
                return <option key={i.date}>{i.date}</option>
            })}
        </select>
        <button onClick={handleClick}>Search</button>
        </div>)
} 