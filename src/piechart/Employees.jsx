
import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { content } from '../context/DataApi';
import { stateAr } from '../language/Ar';
import { stateEn } from '../language/En';


const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 15,
  fontWeight: 600,
  
  
}));
//label center
function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}


export default function TasksPieChart({open}) {
  const [task, setTask] = React.useState([]);
  const [view, setView] = React.useState('status');
  let {tasks}= React.useContext(content)
 


  React.useEffect(() => {
      tasks?setTask(tasks):'';
    }, [tasks]);
    
    //total tasks
  const totalTasks = task.length;
  
  //  Colors  for status
  const statusColors = {
    Todo: '#92dfee',
    'In Progress': '#96c6dc',
    Done: '#bce2d5',
  };

  const departmentColors = {
    IT: '#9dc9e6',
    HR: '#5cabe0',
    Network: '#2b8fd3',
    Sales: '#1173b6',
    Marketing: '#9cb7c9',
    'Customer Support': '#0c8ee6',
  };

  const statusData = Object.values(
    task.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || {
        id: task.status,
        label: task.status,
        value: 0,
        color: statusColors[task.status],
      };
      acc[task.status].value += 1;
      return acc;
    }, {})
  ).map(item => ({
    ...item,
    //rate %
    percentage: totalTasks ? (item.value / totalTasks) * 100 : 0,
  }));

  const departmentData = Object.values(
    task.reduce((acc, task) => {
      acc[task.department] = acc[task.department] || {
        id: task.department,
        label: task.department,
        value: 0,
        color: departmentColors[task.department] || '#90a4ae',
      };
      acc[task.department].value += 1;
      return acc;
    }, {})
  ).map(item => ({
    ...item,
    //rate % department
    percentage: totalTasks ? (item.value / totalTasks) * 100 : 0,
  }));

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <>
    <Box sx={{ width: '100%', textAlign: 'center' }} >
      <Typography variant="h5" gutterBottom className=' fw-bold mt-5 '>
        {open ? stateAr.projectStatus : stateEn.projectStatus}
      </Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        size="small"
        onChange={handleViewChange}
        // sx={{ mb: 2 }}
      >
        <ToggleButton value="status" className='fs-6 fw-bold'>{open ? stateAr.byStatus : stateEn.byStatus}</ToggleButton>
        <ToggleButton value="department" className='fs-6 fw-bold'>{open ? stateAr.byDepartment : stateEn.byDepartment}</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', justifyContent: 'center', height: 420 ,marginTop:0,paddingTop:0}}>
        <PieChart
        style={{cursor:'pointer'}}
          series={[
            {
              // innerRadius: 60,
              innerRadius: 53,
              // outerRadius: 130,
              outerRadius: 155,
              data: view === 'status' ? statusData : departmentData,
              arcLabel: (item) =>
                `${item.label}${item.percentage.toFixed(0)}%`,
              valueFormatter: ({ value }) =>
                `${value} tasks out of ${totalTasks}`,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlighted: { additionalRadius: 4 },
              cornerRadius: 7,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontSize: '10px',
              fontWeight:'bold',

            },
          }}
          hideLegend
        >
          <PieCenterLabel >
            {view === 'status' ? 'Tasks' : 'Departments'}
          </PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
    </>
  );
}
