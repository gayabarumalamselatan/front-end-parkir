import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { MENU_SERVICE_MODULE } from "../../Config/ConfigUrl"
import Swal from "sweetalert2"

const ModuleModal = ({
  isModalOpen,
  setIsModalOpen,
  moduleToDelete,
  moduleToEdit,
  fetchModule
}) => {

  const [newModuleData, setNewModuleData] = useState({
    module_name: '',
    url: '',
    element: '',
  })

  useEffect(() => {
    if(moduleToEdit) {
      setNewModuleData({
        module_name: moduleToEdit.module_name,
        url: moduleToEdit.url,
        element: moduleToEdit.element
      })
    } else {
      setNewModuleData({
        module_name: '',
        url: '',
        element: '',
      })
    }
  }, [moduleToEdit])
  
  console.log(newModuleData)

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: 'Yakin?',
      text: moduleToEdit? `Modul ${moduleToEdit.module_name} akan diperbaharui` : "Anda akan menambahkan modul baru.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: moduleToEdit ? 'Ya, Perbaharui!' : 'Ya, Tambahkan!',
      reverseButtons: true
    });

    if(result.isConfirmed){
      try {
        let response
        if(moduleToEdit){
          const updateModuleData = {
            ...newModuleData,
            id: moduleToEdit.id
          }
          response = await axios.put(`${MENU_SERVICE_MODULE}`, updateModuleData)
        } else {
          response = await axios.post(`${MENU_SERVICE_MODULE}`, newModuleData)
        }
        if(response.status === 200) {
          Swal.fire({
            title: "Yes, Berhasil!",
            text: moduleToEdit? `Modul ${moduleToEdit.module_name} berhasil diperbaharui.` : "Modul baru berhasil ditambahkan.",
            icon: "success",
            confirmButtonText: "OK"
          });
          setIsModalOpen(false)
          fetchModule()
        }
      } catch (error) {
        console.error("Error adding module:", error);
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
      const response = await axios.delete(`${MENU_SERVICE_MODULE}/${moduleToDelete.id}`)
      if(response.status === 200) {
        Swal.fire({
          title: "Success",
          text: `Modul ${moduleToDelete.module_name} berhasil dihapus!`,
          icon: "success",
          confirmButtonText: "OK"
        })
        setIsModalOpen(false);
        fetchModule()
      }
    } catch (error) {
      console.error(error)
      Swal({
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
          <h2 className="text-lg font-semibold">{moduleToDelete ? 'Hapus Modul' : moduleToEdit ? 'Edit Modul' : 'Tambah Modul'}</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </div>
        {/* Modal Body */}
        {
          moduleToDelete ? 
          <div className="p-4">
            <div className="flex flex-grow">
              <div className="basis-full">
                Yakin mau hapus modul {moduleToDelete.module_name}?
              </div>
            </div>
          </div>
          :
          <div className="p-4">
            <div className="flex flex-grow">
              <div className="basis-full">
                <label htmlFor="inputField" className="block text-sm font-medium text-gray-700 mb-2">
                  Module Name
                </label>
                <input
                  id="inputField"
                  type="text"
                  value={newModuleData.module_name}
                  onChange={(e) => setNewModuleData({
                    module_name: e.target.value,
                    url: newModuleData.url,
                    element: newModuleData.element
                  })}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your text here"
                />
              </div>
            </div>
            <div className="flex flex-grow mt-4">
              <div className="basis-full">
                <label htmlFor="inputField" className="block text-sm font-medium text-gray-700 mb-2">
                  Module Url
                </label>
                <input
                  id="inputField"
                  type="text"
                  value={newModuleData.url}
                  onChange={(e) => setNewModuleData({
                    module_name: newModuleData.module_name,
                    url: e.target.value,
                    element: newModuleData.element
                  })}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your text here"
                />
              </div>
            </div>
            <div className="flex flex-grow mt-4">
              <div className="basis-full">
                <label htmlFor="inputField" className="block text-sm font-medium text-gray-700 mb-2">
                  Module Element
                </label>
                <input
                  id="inputField"
                  type="text"
                  value={newModuleData.element}
                  onChange={(e) => setNewModuleData({
                    module_name: newModuleData.module_name,
                    url: newModuleData.url,
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
            moduleToDelete ? 
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              Ya, hapus
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

ModuleModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.any,
  moduleToDelete: PropTypes.string,
  moduleToEdit: PropTypes.object,
  fetchModule: PropTypes.func
}

export default ModuleModal