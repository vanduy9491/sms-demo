import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'



export default function DragAndDropFile(props) {

    const [isClick, setIsClick] = React.useState(false)

    const onClickBtn = () => {
        setIsClick(true)
        console.log(isClick)
        const curentUrl = window.location.pathname
        const userId = [...curentUrl].splice([...curentUrl].lastIndexOf('/') + 1, [...curentUrl].length)
        props.handleClickbutton(userId.join(''))
    }
    return (
        <>
        {
           isClick ?   <div
           className="drag-area-file"
       >
           <h2 className="text-xl md:text-2xl  font-medium text-center">Successfully  !!!!!!!!</h2>
           
       </div> : <div
                className="drag-area-file"
            >
                <h2 className="text-xl md:text-2xl  font-medium text-center">Please click on the link below</h2>
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                <label className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-2 rounded outline-none
                   focus:outline-none mt-1 mr-1 mb-1 ease-linear transition-all duration-150"
                    style={{ cursor: 'pointer' }}
                    onClick={onClickBtn}>
                    Click me
                </label>
            </div>
        }

            {/* <div
                className="drag-area-file"
            >
                <h2 className="text-xl md:text-2xl  font-medium text-center">Please click on the link below</h2>
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                <label className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-2 rounded outline-none
                   focus:outline-none mt-1 mr-1 mb-1 ease-linear transition-all duration-150"
                    style={{ cursor: 'pointer' }}
                    onClick={onClickBtn}>
                    Click me
                </label>
            </div>
            <div
                className="drag-area-file"
            >
                <h2 className="text-xl md:text-2xl  font-medium text-center">Successfully  !!!!!!!!</h2>
                
            </div> */}
        </>
    );
}

