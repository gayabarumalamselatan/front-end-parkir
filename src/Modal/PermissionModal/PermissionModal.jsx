import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { AUTH_SERVICE_ROLE, MENU_SERVICE_MENU, MENU_SERVICE_MODULE, MENU_SERVICE_PERMISSON } from "../../Config/ConfigUrl"
import Swal from "sweetalert2"


const PermissionModal = ({
  setIsModalOpen,
  isModalOpen,
  permissionToEdit,
  permissionToDelete,
  fetchPermissionData
}) => {

  const [newPermissiondata, setNewPermissionData] = useState({
    role_id: '',
    module_id: null,
    menu_id: null
  });

  const [roleOptions, setRoleOptions] = useState([]);
  const [moduleOptions, setModuleOptions] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${AUTH_SERVICE_ROLE}`);
      setRoleOptions(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const fetchModules = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_MODULE}`);
      setModuleOptions(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_MENU}`)
      setMenuOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(permissionToEdit){
      setNewPermissionData({
        role_id: permissionToEdit.role_id,
        module_id: permissionToEdit.module_id,
        menu_id: permissionToEdit.menu_id
      })
    } else {
      setNewPermissionData({
        role_id: '',
        module_id: null,
        menu_id: null,
      })
    }
  },[permissionToEdit]);

  useEffect(()=>{
    fetchRoles();
    fetchModules();
    fetchMenu();
  },[])

  const handleSubmit = async () => {
    const confirmation = await Swal.fire({
      title: "Yakin?",
      text: permissionToEdit ? "Anda akan memperbaharui permission" : "Anda akan menambahkan permission baru",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: permissionToEdit ? "Ya, Perbaharui!" : "Ya, Tambahkan!",
      reverseButtons: true
    });

    if(confirmation.isConfirmed) {
      try {
        let response;
        if(permissionToEdit){
          const updatedPermissionData = {
            ...newPermissiondata,
            id: permissionToEdit.id
          }
          response = await axios.put(`${MENU_SERVICE_PERMISSON}`, updatedPermissionData)
        } else {
          response = await axios.post(`${MENU_SERVICE_PERMISSON}`, newPermissiondata);
        }

        if(response.status === 200){
          Swal.fire({
            title: "Yes, Berhasil!",
            text: permissionToEdit ? "Permission berhasil diperbaharui" : "Permission baru berhasil ditambahkan.",
            icon: 'success',
            confirmButtonText: "OK"
          });
          setIsModalOpen(false);
          fetchPermissionData();
          setNewPermissionData({
            role_id: '',
            module_id: null,
            menu_id: null
          })
        }
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ada yang salah nih!'
        })
      }
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${MENU_SERVICE_PERMISSON}/${permissionToDelete.id}`);
      if(response.status === 200) {
        Swal.fire({
          title: 'Yes, Berhasil!',
          text: 'Permission berhasil dihapus.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setIsModalOpen(false);
        fetchPermissionData()
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: "error",
      title: "Oops...",
      text: "Ada yang salah nih!"
      })        
    }
  }

  return (
     <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isModalOpen ? '':'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">{permissionToDelete ? 'Hapus Permission' : permissionToEdit ? 'Edit Permission' : 'Tambah Permission'}</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </div>
        {/* Modal Body */}
        {
          permissionToDelete ? 
          <div className="p-4">
            <div className="flex flex-grow">
              <div className="basis-full">
                Anda yakin mau hapus Permission?
              </div>
            </div>
          </div>
          :
          <div className="p-4">
            
            <div className="col-span-1">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                value={newPermissiondata.role_id}
                onChange={(e) => setNewPermissionData({
                  ...newPermissiondata,
                  role_id: parseInt(e.target.value) || newPermissiondata.role_id
                })}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="" disabled>Select Role</option>
                {roleOptions.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Module Name
              </label>
              <select
                id="role"
                value={newPermissiondata.module_id || "null"}
                onChange={(e) => setNewPermissionData({
                  ...newPermissiondata,
                  module_id: parseInt(e.target.value) || newPermissiondata.module_id
                })}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="null" disabled>Select Module</option>
                {moduleOptions.map(module => (
                  <option key={module.id} value={module.id}>
                    {module.module_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Menu Name
              </label>
              <select
                id="role"
                value={newPermissiondata.menu_id || "null"}
                onChange={(e) => setNewPermissionData({
                  ...newPermissiondata,
                  menu_id: parseInt(e.target.value) || newPermissiondata.menu_id
                })}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="null" disabled>Select Menu</option>
                {menuOptions.map(menu => (
                  <option key={menu.id} value={menu.id}>
                    {menu.menu_name}
                  </option>
                ))}
              </select>
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
            permissionToDelete ? 
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

PermissionModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  permissionToEdit: PropTypes.object,
  permissionToDelete: PropTypes.string,
  fetchPermissionData: PropTypes.func
}

export default PermissionModal