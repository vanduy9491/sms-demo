import React from "react";
import axios from "axios";
// components
import CardPageVisits from "components/Cards/CardPageVisits.js";
import 'font-awesome/css/font-awesome.min.css';
// layout for page

import Admin from "layouts/Admin.js";

const api = 'http://localhost:5000/files'

export default function Notification() {
  const updateStatus = (id) =>{
    uploadFileHandler(id)
  }

  const uploadFileHandler = async (id) => {
    debugger
    const response = await axios.get(api);
    
    const dataItem = await response.data.find((i)=> i.id == id);
    dataItem['status'] = 'Completed';
    axios.put(`${api}/${id}`, dataItem)
    
  };
  return (
    <>
      <div className=" flex flex-wrap mt-4 h-full" style={{height:'100vh'}} >
        <div className="w-full h-full" >
          <CardPageVisits updateStatus={updateStatus}/>
        </div>
      </div>
    </>
  );
}

// Notification.layout = Auth;
