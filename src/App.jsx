import "@mui/material";
import "@emotion/styled";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/react-fontawesome";
import BarChart from "./barchart/BarChart.jsx";
import Department from "./department/Department.jsx";
import Pie from "./piechart/PieChart.jsx";
import DataApi from "./context/DataApi.jsx";
import Kpi from "./kpi/Kpi.jsx"
import { useState } from "react";
import "./App.css"
import { stateAr } from "./language/Ar.jsx";
import { stateEn } from "./language/En.jsx";

function App() {
  let[width,setWidth]=useState(window.innerWidth);
  let[open,setOPen]=useState(false);

  

  return (
    <>
    {/* provider context */}
      <DataApi>
        {/* review on company by nada-ahmed*/}
        <div className=" " style={{ backgroundColor: "#0f6668"}}>

          {/* language */}
          <div className="px-5 d-flex justify-content-end">
          <button onClick={()=>setOPen(true)} className={`${open?"":"text-light"}  fw-bold rounded-start-5 p-1 my-2`} style={{backgroundColor:`${open?'':'#005f73'}`,color:`${open?'#005f73':'#ffff'}`}}>عربي</button>
          <button onClick={()=>setOPen(false)} className={`${open?"text-light":''}  fw-bold rounded-end-5 p-1 my-2`} style={{backgroundColor:`${open?'#005f73':""}`,color:`${open?'#ffff':'#005f73'}`}}>English</button>
          </div>
         

          <h1 className={`ms-3 p-3 ps-5 fonts ${open?"d-flex justify-content-end":""}`} style={{fontSize:`${width<992?'17px':''}`}}>
            {open ? stateAr.companyoverview : stateEn.companyoverview}
          </h1>

          <div className="container  rounded-3 " style={{backgroundColor:'#bce0e0'}}>

            {/* kpi */}
            {/* key performance indicator */}
            <div className="py-4">
              <Kpi open={open}/>
            </div>

            <div className="d-lg-flex rounded-5 " style={{backgroundColor:'#ffffff6e',color:'#2d82c0'}}>
              <BarChart open={open} />
              <Department open={open} />
            </div>

            {/* piechart */}
            <div className=" rounded-5 " style={{backgroundColor:'#ffffff6e'}}>
            <Pie open={open} />
            </div>
          </div>
        </div>
      </DataApi>
    </>
  );
}

export default App;
