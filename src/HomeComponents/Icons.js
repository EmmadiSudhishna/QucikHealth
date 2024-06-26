import React from 'react'
import {IconContext} from 'react-icons/lib';

import {FaFacebook, Facebook} from  "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import '../App.css';
export default function Icons() {
  return (
    <div>
      <IconContext.Provider value={{className:"top-react-icons", color:"blue"}}>
        <FaFacebook/>
        &nbsp;&nbsp;
      </IconContext.Provider>

      <IconContext.Provider value={{className:"top-react-icons", color:"pink"}}>
        <BsInstagram/>
        &nbsp;&nbsp;
      </IconContext.Provider>

      <IconContext.Provider value={{className:"top-react-icons", color:"black"}}>
        <BsTwitterX/>
        
      </IconContext.Provider>
    </div>
  )
}
