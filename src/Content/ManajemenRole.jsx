import axios from "axios"
import DynamicTable from "../Table/DynamicTable"
import { Fragment, useEffect, useState } from "react"
import { AUTH_SERVICE_ROLE } from "../Config/ConfigUrl"
import RoleModal from "../Modal/Role/RoleModal"

const ManajemenRole = () => {

  const [roleData, setRoleData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState({})
  const [roleToDelete, setRoleToDelete] = useState('')
  const namaTable = "Daftar Role"

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${AUTH_SERVICE_ROLE}`);
      setRoleData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchRoles()
  },[])

  return (
   <Fragment>
         <section className="content-header">
           <div className="container-fluid">
             <div className="row my-4 mx-1">
               <div className="col-sm-6 flex items-center">
                 <h1 className="font-semibold text-3xl text-mainColor">Manajemen Role</h1>
               </div>
               <div className="col-sm-6 ">
                 <ol className="breadcrumb float-sm-end text-end">
                   <li className="breadcrumb-item text-mainColor">
                     <a href="/">Beranda</a>
                   </li>
                   <li className="breadcrumb-item active">Manajemen Role</li>
                 </ol>
               </div>
             </div>
           </div>
         </section>
   
         <section className="content">
           <DynamicTable
             tableName={namaTable}
             dataTable={roleData}
             setDataToEdit={setRoleToEdit}
             setIsRoleModalOpen={setIsModalOpen}
             setDataToDelete={setRoleToDelete}
           />
           <RoleModal
            isModalOpen={isModalOpen}
            roleToEdit={roleToEdit}
            setIsModalOpen={setIsModalOpen}
            fetchRoles={fetchRoles}
            roleToDelete={roleToDelete}
           />
         </section>
       </Fragment>
  )
}

export default ManajemenRole