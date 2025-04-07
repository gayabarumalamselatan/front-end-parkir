import { useNavigate } from "react-router-dom";
import Nav from "../Layout/Nav";
import Sidebar from "../Layout/Sidebar";
import { useEffect, useState } from "react";
import Content from "../Layout/Content";
import axios from "axios";
import { MENU_SERVICE_MODULE_WITH_MENU } from "../Config/ConfigUrl";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [menuData, setMenuData] = useState([])
  const navigate = useNavigate()
  const userId = sessionStorage.getItem("userId")
  const [isLoading, setIsLoading] = useState(true);

  const fetchModuleService = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${MENU_SERVICE_MODULE_WITH_MENU}?id=${userId}`)
      setMenuData(response.data)
    } catch (error) {
      console.error(error)
      setMenuData([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if(!isLoggedIn) {
      navigate('/login')
    };
  },[])

  useEffect(() => {
    fetchModuleService()
  },[])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-wrapper">
      <Nav toggleSidebar={toggleSidebar}/>
      <Sidebar show={sidebarOpen} menuData={menuData}/>
      {isLoading ? (
        <div className="loading-indicator">Loading </div> // Loading indicator
      ) : (
        <Content menuData={menuData} />
      )}
    </div>
  )
}

export default Dashboard