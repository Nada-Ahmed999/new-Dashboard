import { useContext, useEffect } from "react";
import { content } from "../context/DataApi";


//get count employees
//data from component Department (desktop)
 export function DataEmployees({mydata}){
  let {employees}=useContext(content)
     let countEmployees={'IT':0,
'Marketing':0,
'Customer Support':0,
'Network':0,
'Sales':0,
'HR':0
 }


   let desktop =[
    {
    label: 'IT',
    value: 0,
    color:'#0f6668',  // لون
    },
    {
    label: 'Marketing',
    value: 0,
    color:'#199497',  // لون
    },
    {
    label: 'Customer Support',
    value: 0,
    color:'#3bbabd',  // لون
    },
    {
    label: 'Network',
    value: 0,
    color:'#4ae2e5',  // لون
    },
    {
    label: 'Sales',
    value: 0,
    color:'#6fd2d4',  // لون
    },
    {
    label: 'HR',
    value: 0,
    color:'#79bcbd',  // لون
    },
  ]


   useEffect(()=>{
      if(employees){
        employees.map((item)=>{
          //place count
          countEmployees[item.department]=countEmployees[item.department]+1 
          //add in desc
          desktop.map((des)=>{
            des.label == item.department?des.value=countEmployees[item.department]:''
          })
          
        }) 
        mydata(desktop)
        
      } 
      
      
    },[employees])

    
    
    
  
 

}

