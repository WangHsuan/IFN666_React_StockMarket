import React ,{useEffect,useState}from 'react';
import ToolBox from './ToolBox';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useHistory } from "react-router-dom";


const table = {
    columns:[
      {headerName:'Symbol',field:'symbol'},
      {headerName:'Name',field:'name'},
      {headerName:'Industry',field:'industry',sortable:true,filter:'true'},
    ],
  }

export default function Stocks({ match, location }){
    const [stock, setStock] = useState([]);
    const [sourcestock, setSourcestock] = useState([]);
    const [searchText,setSearchText] = useState('');
    const [rowSelection, setrowSelection] = useState('single');
    const [gridApi, setGridApi] = useState('');
    const [gridColumnApi , setgridColumnApi] = useState('');
     let history = useHistory();

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
        if(value.stock === ''){
            setStock([...sourcestock])
            setSearchText(value.stock)
        }
        else{
            let _stocks = [...stock];
            _stocks = _stocks.filter(i => {
                const matchArray = i.symbol.match(new RegExp(value.stock,'gi'));
                return !!matchArray;
            })
            setStock(_stocks)
            setSearchText(value.stock)
        }
        
    }

    const industryfilter = (value) =>{
        if(value === 'clear'){
            setStock([...sourcestock])
        }else{
            let _stocks =[];
            console.log(searchText)
            searchText ===''?_stocks = [...sourcestock]:_stocks = [...stock];
            _stocks =  _stocks.filter(i=>{
                const matchFilter = i.industry.match(new RegExp(value,'gi'))
                return !!matchFilter;
            });
            setStock(_stocks)
        }
       
    }

    const onGridReady = params => {
        setGridApi(params.api);
        setgridColumnApi(params.columnApi);
    }

    const onSelectionChanged = () => {
        var selectedRows = gridApi.getSelectedRows();
        console.log(selectedRows[0].symbol);
        history.push(`/stock/${selectedRows[0].symbol}`);
      };
      

    return(<div>
        <ToolBox search={searchSymbol} change={industryfilter} industry={stock}/>
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
                onGridReady={onGridReady}
                onSelectionChanged={onSelectionChanged}
                rowSelection={rowSelection}
            />
        </div>
        </div>)
}