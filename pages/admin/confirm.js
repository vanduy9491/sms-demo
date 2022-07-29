import React, { useEffect, useState } from "react";
import  Router  from 'next/router';

// components

// layout for page

import Admin from "layouts/Admin.js";

export default function Confirm() {
  const color = "light";

  const [path, setPath] = useState();
  const [id, setId] = useState();
  
  // clear url file when chose other File
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async () => {
    const files = await getAllFileHandler();
    setId(Router.query.id);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      if (element.id == id) {
        setPath(element.path);
        break;
      }
    }
  }, [id])

  async function getAllFileHandler() {
    try {
      const response = await fetch('/api/getAll');
      const data = await response.json();
      const body = await JSON.stringify(data.files);
      const json1 = JSON.parse(body);
      if (!response.ok) {
        throw data;
      } else {
        return json1;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function  confirmHandler() {
    try {
        const response = await fetch('/api/confirm/' + id +  '/ConfirmUser0001', {
          method: 'POST',
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
}; 

  const confirm = async () => {
    const confirm = await confirmHandler();
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
              (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-blueGray-700" : "text-white")
                    }
                  >
                    Confirm
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <div className="relative flex flex-col min-w-0  items-center break-words bg-white w-full mb-6 shadow-lg rounded">
                  <iframe src={path} height="1130px" width="850px"/>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right mb-6">
                    <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-2 rounded outline-none
                      focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150" onClick={confirm}>confirm</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Confirm.layout = Admin;
