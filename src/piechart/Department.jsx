
import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataEmployees } from './Data.jsx';





export default function DepartmentEmp({header}) {
 
  let [width,setWidth]=React.useState(window.innerWidth);
  let[desktopOs,setdesktopOs]=React.useState([
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
    }])
  
  //1- 
  
    const [radius, setRadius] = React.useState(50);
    const [itemNb, setItemNb] = React.useState(desktopOs.length); //عدد الاقسام
    const [skipAnimation, setSkipAnimation] = React.useState(false);

   
//  format from mui

  //1-
   const platforms = [
  {
    label: 'Mobile',
    value: 59.12,
  },
  {
    label: 'Desktop',
    value: 40.88,
  },
];

  //2-
  const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2))
 
  //3-
  const mobileAndDesktopOS = [
  
    ...desktopOs.map((v) => ({
      ...v,
      label: v.label === 'Other' ? 'Other (Desktop)' : `${v.label} (${v.value})`,
      value: normalize(v.value, platforms[1].value),
    })),
  ];

  //4-
  const valueFormatter = (item) => ``;

return <>
<DataEmployees  mydata={setdesktopOs}/>

  <div className='mt-5'>
    <h3 className='pb-5   text-start mb-5 ps-5'>{header}</h3>  
    <Box sx={{ width: '100%' ,fontSize:'12px',fontWeight:'bold'}}>
      <PieChart
        height={300}
        width={300}
        series={[
          {
            data: mobileAndDesktopOS.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 20,
            valueFormatter,
            
          },
        ]}
        skipAnimation={skipAnimation}
        sx={{fontSize:'12px',display:'flex',flexDirection:'row-reverse'}}
      />
      
    </Box>
    </div>
 </>
}
