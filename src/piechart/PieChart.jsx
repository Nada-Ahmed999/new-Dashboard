import { stateAr } from '../language/Ar.jsx'
import { stateEn } from '../language/En.jsx'
import DepartmentEmp from './Department.jsx'
import Pie from './Employees.jsx'

 
 
  
export default function PieChart({open}) {
  


 
  return <>
  <div className='d-lg-flex  mt-5 text-center justify-content-around fw-bold' style={{color:'#199497'}}>
    <div>
      <DepartmentEmp  header={open ? stateAr.employees : stateEn.employees}/>
    </div>
    <div>
  <Pie open={open}/>
    </div>
  </div>
  
  </>
  
}


