import axios from "axios"
import DynamicTable from "../Table/DynamicTable"
import { Fragment, useEffect, useState } from "react"
import { MENU_SERVICE_MODULE } from "../Config/ConfigUrl"
import ModuleModal from "../Modal/ModulModal/ModuleModal"

const ManajemenModul = () => {

  const [moduleData, setModuleData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState({})
  const [moduleToDelete, setModuleToDelete] = useState('')
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState(0);

  const namaTable = "Daftar Modul"

  const fetchModule = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_MODULE}?page=${page}&limit=${limit}`);
      setModuleData(response.data.data || [])
      setTotalData(response.data.total || 0)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchModule()
  },[page, limit])

  return (
   <Fragment>
         <section className="content-header">
           <div className="container-fluid">
             <div className="row my-4 mx-1">
               <div className="col-sm-6 flex items-center">
                 <h1 className="font-semibold text-3xl text-mainColor">Manajemen Modul</h1>
               </div>
               <div className="col-sm-6 ">
                 <ol className="breadcrumb float-sm-end text-end">
                   <li className="breadcrumb-item text-mainColor">
                     <a href="/">Beranda</a>
                   </li>
                   <li className="breadcrumb-item active">Manajemen Modul</li>
                 </ol>
               </div>
             </div>
           </div>
         </section>
   
         <section className="content">
           <DynamicTable
             tableName={namaTable}
             dataTable={moduleData}
             page={page}
             setPage={setPage}
             limit={limit}
             setLimit={setLimit}
             totalData={totalData}
             setDataToEdit={setModuleToEdit}
             setIsModuleModalOpen={setIsModalOpen}
             setDataToDelete={setModuleToDelete}
           />
           <ModuleModal
            isModalOpen={isModalOpen}
            moduleToEdit={moduleToEdit}
            setIsModalOpen={setIsModalOpen}
            fetchModule={fetchModule}
            moduleToDelete={moduleToDelete}
           />
         </section>
       </Fragment>
  )
}

export default ManajemenModul