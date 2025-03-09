import { Fragment, useEffect, useState } from "react"
import DynamicTable from "../Table/DynamicTable"
import axios from "axios"
import { AUTH_SERVICE_USER } from "../Config/ConfigUrl"
import UserModal from "../Modal/UserModal/UserModal"

const DaftarPengguna = () => {
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({})
  const [userToDelete, setUserToDelete] = useState('')
  const namaTable = "Daftar Pengguna"

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${AUTH_SERVICE_USER}`);
      setUserData(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    fetchUsers()
  }, [])
    
  return (
   <Fragment>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row my-4 mx-1">
            <div className="col-sm-6 flex items-center">
              <h1 className="font-semibold text-3xl text-mainColor">Daftar Pengguna</h1>
            </div>
            <div className="col-sm-6 ">
              <ol className="breadcrumb float-sm-end text-end">
                <li className="breadcrumb-item text-mainColor">
                  <a href="/">Beranda</a>
                </li>
                <li className="breadcrumb-item active">Daftar Pengguna</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <DynamicTable
          tableName={namaTable}
          dataTable={userData}
          setDataToEdit={setUserToEdit}
          setDataToDelete={setUserToDelete}
          setIsUserModalOpen={setIsModalOpen}
        />
        <UserModal
          isModalOpen={isModalOpen}
          userToEdit={userToEdit}
          setIsModalOpen={setIsModalOpen}
          fetchUsers={fetchUsers}
          userToDelete={userToDelete}
        />
      </section>
    </Fragment>
  )
}

export default DaftarPengguna