import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';




export default function Chart(props){
    const [datetime, setDatetime]= useState([]);
    const [data, setData] = useState([]);
    let datelist = [];
    let closelist = [];
    useEffect(()=>{
        props.dateTime.map(i => {
            datelist.push(i.date)
            closelist.push(Number(i.close))
        })
        setDatetime(datelist.reverse());
        setData(closelist.reverse());
    },[props.dateTime])
    const state = {
        labels: datetime,
        datasets: [
          {
            label: 'Closing Price',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(50, 127, 168)',
            borderWidth: 2,
            data: data
          }
        ]
      }

    return (<div className='chart'>
    
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Closing Price',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>)
}