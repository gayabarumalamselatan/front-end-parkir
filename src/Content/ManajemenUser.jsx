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
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState(0);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem("accessToken")
    try {
      const response = await axios.get(`${AUTH_SERVICE_USER}?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data.data || [])
      setTotalData(response.data.total || 0)
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    fetchUsers()
  }, [page, limit])
    
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
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalData={totalData}
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