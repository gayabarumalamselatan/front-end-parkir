import axios from "axios"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { AUTH_SERVICE_ROLE } from "../../Config/ConfigUrl"
import Swal from "sweetalert2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"


const RoleModal = ({isModalOpen, setIsModalOpen, roleToEdit, fetchRoles, roleToDelete}) => {

  const [newRoleData, setNewRoleData] = useState("")

  useEffect(() => {
    if(roleToEdit) {
      setNewRoleData(roleToEdit.role_name)
    } else {
      setNewRoleData("")
    }
  }, [roleToEdit])

  console.log('del', roleToDelete)

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${AUTH_SERVICE_ROLE}/${roleToDelete.id}`)
      if(response.status === 200) {
        Swal.fire({
          title: "Yes, Berhasil!",
          text: `Role ${roleToDelete.role_name} berhasil dihapus!`,
          icon: "success",
          confirmButtonText: "OK"
        });
        setIsModalOpen(false)
        fetchRoles()
      }
    } catch (error) {
      console.error("Error adding role:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ada yang salah nih!"
      });
    }
  }

  const handleSubmit = async () => {
    console.log(roleToEdit)
    const request = {
      role_name: newRoleData
    }
    try {
      let response;
      if(roleToEdit){
        const editRequest = {
          id: roleToEdit.id,
          role_name: newRoleData
        }
        response = await axios.put(`${AUTH_SERVICE_ROLE}`, editRequest)
      } else {
        response = await axios.post(`${AUTH_SERVICE_ROLE}`, request)
      }   
      if(response.status === 200) {
        Swal.fire({
          title: "Yes, Berhasil!",
          text: roleToEdit ? "Role berhasil diperbaharui." : "Role baru berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "Oke"
        });
        setIsModalOpen(false)
        fetchRoles()
      }
    } catch (error) {
      console.error("Error adding role:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan!"
      });
    }
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isModalOpen ? '':'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">{roleToDelete ? 'Hapus Role' : roleToEdit ? 'Edit Role' : 'Tambah Role'}</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </div>
        {/* Modal Body */}
        {
          roleToDelete ? 
          <div className="p-4">
            <div className="flex flex-grow">
              <div className="basis-full">
                Yakin mau hapus role {roleToDelete.role_name} ?
              </div>
            </div>
          </div>
          :
          <div className="p-4">
            <div className="flex flex-grow">
              <div className="basis-full">
              <label htmlFor="inputField" className="block text-sm font-medium text-gray-700 mb-2">
                  Role Name
                </label>
                <input
                  id="inputField"
                  type="text"
                  value={newRoleData}
                  onChange={(e) => setNewRoleData(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your text here"
                />
              </div>
            </div>
          </div>
        }
        
        {/* Modal Footer */}
        <div className="flex justify-end p-3 border-t">
          <button
            onClick={() => setIsModalOpen(false)}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          {
            roleToDelete ? 
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              Ya, Hapus
            </button>
            :
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          }
        </div>
      </div>
    </div>
  )
}

RoleModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  roleToEdit: PropTypes.object,
  fetchRoles: PropTypes.func,
  roleToDelete: PropTypes.string
}

export default RoleModal