import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import './Style/Style.css'
import TokenRefresh from "./Service/RefreshToken"
import SessionTimeout from "./Config/SessionTimeout"
import GenerateRefreshToken from "./Service/GenerateRefreshToken"

function App() {

  return (
    <BrowserRouter>
      <SessionTimeout/>
      <GenerateRefreshToken/>
      <TokenRefresh/>
      <Routes>
        <Route>
          <Route exact path="*" element={<Dashboard/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
