import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import './Style/Style.css'

function App() {

  return (
    <BrowserRouter>
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
