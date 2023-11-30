import React from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboarda() {
const navigate = useNavigate();

const adduser = ()=>{
  navigate("/createaccount")
}
  return (
    <>
    this is the admain dashboard
    <br />
    <button onClick={adduser}>Add user</button>
    </>
  )
}

export default Dashboarda;