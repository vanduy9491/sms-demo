import React, { useEffect, useState } from "react";
import axios from "axios";
// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";

const STATUS = {
  NOT_YET: 'Not yet',
  SENDED: 'Sended',
  COMPLETED: 'Completed'
}

const api = 'http://localhost:5000/files'

export default function Tables() {
  const [files, setFiles] = useState([]);
  const [member, setMember] = useState({})
  
  
  useEffect(async () => {
    loadList();
  })
  
  const loadList = async () => {
    const response = await axios.get(api);
    setFiles(response.data)
  }

  const setStatusMember = (index) => {
    const data = files[index];
    data['status'] = STATUS.SENDED;
    setMember(data);
  }

  const onClickSend = (index) => {
    setStatusMember(index)
    uploadFileHandler(index)
    sendSms(index)
  }

  const sendSms = (index) => {
    const data = files[index];
    alert(`http://localhost:3000/admin/Notification/${data.id}`)
  }

  const uploadFileHandler = async (index) => {
    const dataItem = files[index];
    dataItem['status'] = STATUS.SENDED;
    axios.put(`${api}/${dataItem.id}`, dataItem)
   
  };

 

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <CardTable files={files} onClickSend={onClickSend} />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
