import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { MENU_SERVICE_MENU, MENU_SERVICE_MODULE } from "../../Config/ConfigUrl"
import Swal from "sweetalert2"

const MenuModal = ({
  menuToDelete,
  menuToEdit,
  setIsModalOpen,
  isModalOpen,
  fetchMenus
}) => {
  const [moduleData, setModuleData] = useState([])
  const [menuData, setMenuData] = useState({
    module_id: 1,
    menu_name: "",
    url: "",
    element: ""
  })

  const fetchModule = async () => {
    const response = await axios.get(`${MENU_SERVICE_MODULE}`)
    console.log(response.data)
    setModuleData(response.data.filter(module => module.url === "#"))
  }

  useEffect(() => {
    fetchModule()
  },[])

  useEffect(() => {
    if(menuToEdit){
      const findModuleId = moduleData.find(module => module.module_name === menuToEdit.module_id)
      if(findModuleId){
        console.log('test',findModuleId.id)
        setMenuData({
          module_id: findModuleId ? findModuleId.id : 1,
          menu_name: menuToEdit.menu_name,
          url: menuToEdit.url,
          element: menuToEdit.element
        })
      }
    }else{
      setMenuData({
        module_id: 1,
        menu_name: "",
        url: "",
        element: ""
      })
    }

  },[menuToEdit])

  console.log('test2',menuToEdit)

  const handleSubmit = async () => {
    const confirm = await Swal.fire({
      title: 'Yakin?',
      text: menuToEdit? `Modul ${menuToEdit.menu_name} akan diperbaharui` : "Anda akan menambahkan menu baru.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: menuToEdit ? 'Ya, Perbaharui!' : 'Ya, Tambahkan!',
      reverseButtons: true
    })
    if(confirm.isConfirmed){
      try {
        let response;
        if(menuToEdit){
          const updatedMenuData = {
            ...menuData,
            id: menuToEdit.id
          }
          response = await axios.put(`${MENU_SERVICE_MENU}`, updatedMenuData)
        } else {
          response = await axios.post(`${MENU_SERVICE_MENU}`, menuData)
        }
        if(response.status === 200) {
          Swal.fire({
            title: "Yes, Berhasil!",
            text: menuToEdit ? `Menu ${menuToEdit.menu_name} berhasil diperbaharui.` : "Menu baru berhasil ditambahkan.",
            icon: "success",
            confirmButtonText: "OK"
          })
          setIsModalOpen(false);
          fetchMenus()
        }
      } catch (error) {
        console.error("Error adding menu:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ada yang salah nih!"
        });
      }
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${MENU_SERVICE_MENU}/${menuToDelete.id}`)
      if(response.status === 200) {
        Swal.fire({
          title: "Yes, Berhasil!",
          text: `Menu ${menuToDelete.menu_name} berhasil dihapus!`,
          icon: "success",
          confirmButtonText: "OK"
        });
        setIsModalOpen(false)
        fetchMenus()
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

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isModalOpen ? '':'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">{menuToDelete ? 'Hapus Menu' : menuToEdit ? 'Edit Menu' : 'Tambah Menu'}</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </div>
        {/* Modal Body */}
        {
          menuToDelete ? 
          <div className="p-4">
            <div className="flex flex-grow">
              <div className="basis-full">
                Yakin mau hapus menu {menuToDelete.menu_name}?
              </div>
            </div>
          </div>
          :
          <div className="p-4">
            <div className="flex flex-grow">
              <div className="basis-full">
                <label htmlFor="inputField" className="block text-sm font-medium text-gray-700 mb-2">
                  Module Id
                </label>
                <select
                  id="inputField"
                  value={menuData.module_id}
                  onChange={(e) => setMenuData({
                    ...menuData,
                    module_id: parseInt(e.target.value) || menuData.module_id
                  })}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your text here"
                >
                  <option value="" disabled>Select  module</option> 
                  {moduleData.map(module => (
                    <option key={module.id} value={module.id}>
                      {module.module_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-grow mt-4">
              <div className="basis-full">
                <label htmlFor="inputField" className="block text-sm font-medium text-gray-700 mb-2">
                  Menu Name
                </label>
                <input
                  id="inputField"
                  type="text"
                  value={menuData.menu_name}
                  onChange={(e) => setMenuData({
                    ...menuData,
                    menu_name: e.target.value,
                  })}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your text here"
                />
              </div>
            </div>
            <div className="flex flex-grow mt-4">
              <div className="basis-full">
                <label htmlFor="inputField" className="block text-sm font-medium text-gray-700 mb-2">
                  Menu Url
                </label>
                <input
                  id="inputField"
                  type="text"
                  value={menuData.url}
                  onChange={(e) => setMenuData({
                    ...menuData,
                    url: e.target.value,
                  })}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your text here"
                />
              </div>
            </div>
            <div className="flex flex-grow mt-4">
              <div className="basis-full">
                <label htmlFor="inputField" className="block text-sm font-medium text-gray-700 mb-2">
                  Menu Element
                </label>
                <input
                  id="inputField"
                  type="text"
                  value={menuData.element}
                  onChange={(e) => setMenuData({
                    ...menuData,
                    element: e.target.value
                  })}
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
            menuToDelete ? 
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

MenuModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.bool,
  menuToDelete: PropTypes.object,
  menuToEdit: PropTypes.object,
  fetchMenus: PropTypes.func
}

export default MenuModal