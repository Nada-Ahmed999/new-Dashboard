

 import { BarChart } from '@mui/x-charts/BarChart';
// import { dataset, valueFormatter } from './Dataset.jsx';
import { valueFormatter } from './Dataset.jsx';
import { useContext, useEffect, useState } from 'react';
import {content} from '../context/DataApi.jsx'
import { stateAr } from '../language/Ar.jsx';
import { stateEn } from '../language/En.jsx';


const chartSetting = {
  xAxis: [{ label: 'Number of tasks per month'}],
  height: 300,
  margin: { left: 0 },
};

let dataset ;

export default function BarCharts({open}) {
  //project from click department
 let {project,tasks,color}=useContext(content);
 let [datatask,setDataTask]=useState(null)
 let [width,setWidth]=useState(window.innerWidth);

 

   
        
    useEffect(()=>{
       dataset =  
  [ {tasks: 2, month: 'Feb'},{tasks: 1, month: 'Mar'}, {tasks: 1, month: 'Jan'}]
     let tasksByMonth= tasks?tasks.filter((t)=>t['department'] == project):''     

     // object for task:month
    let x= tasksByMonth? tasksByMonth.reduce((acc, task) => {
  const date = new Date(task.dueDate);
  
  const month = date.toLocaleString("en-US", { month: "short" });
  
  acc[month] = (acc[month] || 0) + 1;
   
  
  // x= all task for object in month
  return acc;
}, {}) :''

  let set =[];

 x?Object.keys(x).map((e)=>{
   //task in month
   set=[...set,e]
     
   set.length ==1? dataset=[] :''
   
   dataset=[...dataset, {tasks: x[e],month: e}]
   

  }):''
  setDataTask(dataset)
  
   },[project])

   

  return <>
  <div className={`mt-4 ${width<992?'w-100':'w-50'}`}   >
  <h5 className='ms-4 mt-5 fw-bold'>{open ? stateAr.taskByProject : stateEn.taskByProject}</h5>
    <BarChart
      dataset={datatask||[]}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'tasks', label: project||'IT', valueFormatter ,color:color}]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  </div>
  </>
}
