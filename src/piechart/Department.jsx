
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
    color:'#8bc34a',  // لون
    },
    {
    label: 'Marketing',
    value: 0,
    color:'#5d7f36',  // لون
    },
    {
    label: 'Customer Support',
    value: 0,
    color:'#bbed84',  // لون
    },
    {
    label: 'Network',
    value: 0,
    color:'#314915',  // لون
    },
    {
    label: 'Sales',
    value: 0,
    color:'#b5ea78',  // لون
    },
    {
    label: 'HR',
    value: 0,
    color:'#4caf50',  // لون
    }])
  //1- 
  
    const [radius, setRadius] = React.useState(50);
    const [itemNb, setItemNb] = React.useState(desktopOs.length); //عدد الاقسام
    const [skipAnimation, setSkipAnimation] = React.useState(false);

    //2-
  //    const handleItemNbChange = (event, newValue) => {
  //   if (typeof newValue !== 'number') {
  //     return;
  //   }
  //   setItemNb(newValue);
  // };
  // const handleRadius = (event, newValue) => {
  //   if (typeof newValue !== 'number') {
  //     return;
  //   }
  //   setRadius(newValue);
  // };

  // status
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
    <h3 className='pb-5 text-secondary  text-start mb-5 ps-5'>{header}</h3>  
    <Box sx={{ width: '100%' ,fontSize:'12px',fontWeight:'bold'}}>
      <PieChart
        height={300}
        width={`${width<992?250:300}`}
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
        sx={{fontSize:'11px'}}
      />
      
    </Box>
    </div>
 </>
}
