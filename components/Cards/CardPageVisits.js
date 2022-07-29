import React, { useEffect, useState } from "react";
import DragAndDropFile from "components/DragAndDrop/DragAndDropFile";
import { useTranslation } from "react-i18next";

// components
export default function CardPageVisits(props) {

  const updateStatus = async (id) => {
    props.updateStatus(id)
  }

  

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-full">
        {/* <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Notification
              </h3>
            </div>
          </div>
        </div> */}
        <div className="block w-full" style={{height: '100%'}}>
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 " style={{height: '100%', justifyContent : 'center'}}>
              <div className="mb-3 mx-6 md:mx-10 py-20 md:py-8 px-6 md:px-30 rounded-md bg-white" >
                <DragAndDropFile handleClickbutton={updateStatus}/>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
