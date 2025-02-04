import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Nav from "../Layout/Nav";
import Sidebar from "../Layout/Sidebar";
import { useState } from "react";
import Content from "../Layout/Content";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if(!isLoggedIn) {
      navigate('/login')
    }
  },[])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  console.log('sidebar', sidebarOpen)

  return (
    <div className="app-wrapper">
      <Nav toggleSidebar={toggleSidebar}/>
      <Sidebar show={sidebarOpen}/>
      <Content/>
    </div>
  )
}

export default Dashboard