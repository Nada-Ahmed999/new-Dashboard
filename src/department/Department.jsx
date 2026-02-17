import { PieChart } from '@mui/x-charts/PieChart';
import { useContext, useEffect, useState } from 'react';
import { content } from '../context/DataApi';
import { stateAr } from '../language/Ar';
import { stateEn } from '../language/En';

export default function Department({open}) {
  let {projects,project,setProject,tasks,setValueTask,setColor}=useContext(content)
 let x={
  'IT':0,
'Marketing':0,
'Customer Support':0,
'Network':0,
'Sales':0,
'HR':0
 }

  let countTask={
  'IT':0,
'Marketing':0,
'Customer Support':0,
'Network':0,
'Sales':0,
'HR':0
 }

 let department=Object.keys(x);
 let [value,setValue]=useState(x)
 
 
 
  

  const data = [
  { label: 'IT', value: value['IT'] ,color:'#0093ff'},
  { label: 'Marketing', value: value['Marketing'] ,color:'#2d82c0'},
  { label: 'Customer Support', value: value['Customer Support'] ,color:'#0d5c97'},
  { label: 'Network', value: value['Network'] ,color:'#063f6a'},
  { label: 'Sales', value: value['Sales'] ,color:'#032036'},
  { label: 'HR', value: value['HR'] ,color:'#99c2e2'},
];



 
 
 
 useEffect(()=>{
    projects?projects.map((pro)=>{
      data.map((data)=>{
        pro.department == data.label?x[pro.department]=x[pro.department]+1:x[pro.department]
        
      })
     
      setColor(data[0].color)
    }):''

   tasks?tasks.map((task)=>{
      Object.keys(x).map((depart)=>{
        task['department'] == depart?countTask[depart]=countTask[depart]+1:''
        
      })
      
    }) :''   
    setValue(x)
    setValueTask(countTask)
    
    

  },[projects])

  


  return <>
  <div className='m-auto'>
   <h3 className='fw-bold mb-5'>{open ? stateAr.projectDepartment : stateEn.projectDepartment}</h3>

<div className='' >
    <PieChart
      series={[
        {
          startAngle: -90,
          endAngle: 90,
          data,
        },
      ]}
      height={200}
      width={200}
      onClick={(e)=>{
        //color from click
        setColor(e.target.getAttribute('fill'))
        data.map((data)=>{
          //change department ==>project
          e.target.getAttribute('fill') == data.color?setProject(data.label):""
        })
        
      }}
      style={{cursor:'pointer'}}
      />

</div>
  </div>
  </>
}
