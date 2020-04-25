import React,{useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import SearchDate from './SearchDate';
import Chart from './Chart';

const table = {
    columns:[
      {headerName:'Date',field:'date'},
      {headerName:'Open',field:'open'},
      {headerName:'High',field:'high'},
      {headerName:'Low',field:'low'},
      {headerName:'Close',field:'close'},
      {headerName:'Volumes',field:'volumes'},
    ],
  }

const dateFormat = (date) => {
    return `${String(date).slice(8,10)}/${String(date).slice(5,7)}/${String(date).slice(0,4)}`
}



export default function Stock(){
    let { stockid } = useParams();
    const [stockInfo, setstockInfo] = useState([]);
    const [sourcestock, setsourcestock] = useState([]);
    const [companyName, setcompanyName] = useState('');
    const [chartToggle, setChartToggle] = useState(false);
    useEffect(()=>{
        fetch(`http://131.181.190.87:3001/history?symbol=${stockid}`)
        .then(res => res.json())
        .then(data => {
            setcompanyName(data[0].name)
            let rawdata = [];
             data.map(i => {
                rawdata.push(
                    {
                        date:dateFormat(i.timestamp),
                        open:i.open,
                        high:i.high,
                        low:i.low,
                        close:i.close,
                        volumes:i.volumes,
                    }
                ) 
            })
            return rawdata
        })
        .then(stock => {
            setstockInfo(stock)
            setsourcestock(stock)
        })
    },[])

    const handleSelect = (value) => {
        let _datelist = [...sourcestock]
        _datelist = _datelist.filter(i => {
            console.log(i);
            const finalday = new Date(`${i.date.slice(6,10)}-${i.date.slice(3,5)}-${i.date.slice(0,2)}`)
            const selectedvalue = new Date(`${value.slice(6,10)}-${value.slice(3,5)}-${value.slice(0,2)}`)
            return (selectedvalue<=finalday);
        })
        console.log(_datelist);
        setstockInfo(_datelist);
        setChartToggle(true);
    }

    return (<div >
        <SearchDate dateTime={sourcestock} select={handleSelect} />
        
        <div 
        className='ag-theme-balham'
        style={{
            height:'300px',
            width:'1200px',
        }}
        >
        <div className='stockCompany'>Showing stocks for the {companyName} Company</div>
        <AgGridReact
                columnDefs={table.columns}
                rowData={stockInfo}
                pagination={true}
                paginationPageSize={8}
               
            />
        </div>
        {chartToggle? <Chart dateTime={stockInfo}/>:''}
       
    </div>)
}