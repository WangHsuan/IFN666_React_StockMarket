import React ,{useEffect,useState}from 'react';
import ToolBox from './ToolBox';
import Stock from './Stock';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const table = {
    columns:[
      {headerName:'Symbol',field:'symbol'},
      {headerName:'Name',field:'name'},
      {headerName:'Industry',field:'industry',sortable:true,filter:'true'},
    ],
  }

export default function Stocks(){
    const [stock, setStock] = useState([]);
    const [sourcestock, setSourcestock] = useState([]);
    useEffect(()=>{
        fetch(`http://131.181.190.87:3001/all`)
        .then(res => res.json())
        .then(data => {
            let rawdata = [];
             data.map(i => {
                rawdata.push(
                    {
                        symbol:i.symbol,
                        name:i.name,
                        industry:i.industry
                    }
                ) 
            })
            return rawdata
        })
        .then(stock => {
            setStock(stock);
            setSourcestock(stock);
        })  
    },[])

    const searchSymbol = (value) => {
        console.log(value)
        let _stocks = [...sourcestock];
        _stocks = _stocks.filter(i => {
            const matchArray = i.symbol.match(new RegExp(value.stock,'gi'));
            return !!matchArray;
        })
        setStock(_stocks)
    }

    return(<div>
        <ToolBox search={searchSymbol}/>
        <div 
        className='ag-theme-balham'
        style={{
            height:'300px',
            width:'600px',
        }}
        >
            <AgGridReact
                columnDefs={table.columns}
                rowData={stock}
                pagination={true}
                paginationPageSize={7}
            />
        </div>
        </div>)
}