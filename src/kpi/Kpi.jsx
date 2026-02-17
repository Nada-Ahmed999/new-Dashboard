import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  faFileCircleCheck,
  faHourglassEnd,
  faLaptopCode,
  faListCheck,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { content } from "../context/DataApi";
import { stateEn } from "../language/En";
import { stateAr } from "../language/Ar";


export default function Kpi({open}) {
  let { employees, client, projects, tasks } = useContext(content);
  let[state,setState]=useState(stateEn)
  
 useEffect(()=>{
  open ? setState(stateAr) : setState(stateEn);
  },[open])
  function overdueTasks() {
    let last = tasks.filter((task) => task["status"] !== "Done");
    return last.length;
  }

  function Rate() {
    let completedTasks = tasks.filter((t) => t.status === "Done").length;
    let completionRate = Math.round((completedTasks / tasks.length) * 100);

    return completionRate;
  }

  const color = [
    "#5b345b",
    "#412b72",
    "#750d61",
    "#02917e",
    "#034ab2",
    "#1c4f3e",
  ];
  const partment = [
    "Total Employees",
    "Total Clients",
    "Active Projects",
    "Total Tasks",
    "Overdue Tasks",
    "Completion Rate",
  ];
  const data = {
    "Total Employees": employees ? employees.length : 0,
    "Total Clients": client ? client.length : 0,
    "Active Projects": projects ? projects.length : 0,
    "Total Tasks": tasks ? tasks.length : 0,
    "Overdue Tasks": tasks ? overdueTasks() : 0,
    "Completion Rate": tasks ? `${Rate()}%` : 0,
  };
  const icon = [
    faUserTie,
    faUsers,
    faLaptopCode,
    faListCheck,
    faFileCircleCheck,
    faHourglassEnd,
  ];

  

  return (
    <>
      <div className="d-lg-flex justify-content-around  container-lg  ">
        {state.partment.map((part, index) => {
         
          return (
            <div
              key={index}
              className=" m-1 py-2  fw-bold w-100 text-center rounded-5"
              style={{
                backgroundColor: `#0f6668`,
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              {part}
              <h1 className="text-center text-light  py-2 my-4" style={{backgroundColor:'#95919161'}}>{data[stateEn.partment[index]]}</h1>

              <FontAwesomeIcon
                icon={icon[index]}
                className="fs-1 "
                style={{ color: "#ffffff" }}
              ></FontAwesomeIcon>
            </div>
          );
        })}
      </div>
    </>
  );
}
