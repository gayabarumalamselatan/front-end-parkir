import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import PropTypes from "prop-types"
import { MENU_SERVICE_ALL_MODULE_MENU, MENU_SERVICE_MENU, MENU_SERVICE_MODULE, MENU_SERVICE_PERMISSON } from "../../Config/ConfigUrl"
import { useEffect, useState } from "react"


const RolePermissionModal = ({
  isModalOpen,
  setIsModalOpen,
  roleToEdit
}) => {

  const [permissionData, setPermissionData] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [menuData, setMenudata] = useState([]);
  const [moduleMenuData, setModuleMenuData] = useState({})
  // const [permissionArray, setPermissionArray] = useState({
  //   role_id: sessionStorage.getItem('roleId'),
  //   module_id: 0,
  //   menu_id: 0
  // });

  const [permissionArray, setPermissionArray] = useState([]);

  const fetchPermission = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_PERMISSON}`)
      setPermissionData(response.data);
      console.log(permissionData)
    } catch (error) {
      console.error(error);
    }
  }

  const fetchModule = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_MODULE}`);
      setModuleData(response.data);
      console.log(moduleData)
    } catch (error) {
      console.error(error);      
    }
  }

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_MENU}`);
      setMenudata(response.data);
      console.log(menuData)
    } catch (error) {
      console.error(error);
    }
  }

  const fecthAllModuleMenu = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_ALL_MODULE_MENU}`);
      setModuleMenuData(response.data);
      console.log(moduleMenuData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPermission();
    fetchModule();
    fetchMenu();
    fecthAllModuleMenu();
  },[])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPermissionArray([])
  }


  const permissionHandler = (moduleId, menuId) => {
    const newPermission = {
      role_id: roleToEdit.id,  
      module_id: moduleId,
      menu_id: menuId
    }

    const exist = permissionArray.some(
      (perm) => perm.module_id === moduleId && perm.menu_id === menuId
    );

    if(!exist){
      setPermissionArray((prev) => 
        [
          ...prev,
          newPermission
        ]
      )
    } else {
      setPermissionArray((prev) => 
        prev.filter(perm => !(perm.module_id === moduleId && perm.menu_id === menuId))
      );
    }
  }

  console.log('permissionarray',permissionArray)
  console.log('permissionDATA',permissionData)
  console.log('permissionEdit',roleToEdit)

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isModalOpen ? '':'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">Role Permission </h2>
          <button onClick={handleCloseModal} className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </div>
        {/* Modal Body */}
        
        <div className="p-6">
          {/* Header Section */}
          <div className="grid grid-cols-2 border-b pb-2 mb-4 font-semibold text-lg">
            <div>Head</div>
            <div>Permit</div>
          </div>

          {/* Data Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Module Names & Menus */}
            <div>
              {Array.isArray(moduleMenuData) &&
                moduleMenuData.map((module) => (
                  <div key={module.id} className="mb-2">
                    {/* Module Name */}
                    <p className="font-medium text-gray-800">{module.module_name}</p>

                    {/* Menus (Indented) */}
                    {module.menus && Array.isArray(module.menus) && module.menus.length > 0 && (
                      <div className="pl-6 text-gray-600">
                        {module.menus.map((menu) => (
                          <p key={menu.id} className="text-sm">{menu.menu_name}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Permission Checkboxes */}
            <div>
              {Array.isArray(moduleMenuData) &&
                moduleMenuData.map((module) => (
                  <div key={module.id} className="mb-2">
                    {/* Module Checkbox */}
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        disabled
                        checked={
                          roleToEdit
                            ? permissionArray.some(
                                (perm) => perm.module_id === module.id && perm.menu_id === null
                              ) ||
                              permissionData.find(
                                (i) => i.role_id === roleToEdit.id && i.module_id === module.id
                              )
                            : false 
                        }
                        onChange={() => permissionHandler(module.id, null)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-800 font-medium">{module.module_name}</span>
                    </label>

                    {/* Menus Checkboxes */}
                    {module.menus && Array.isArray(module.menus) && module.menus.length > 0 && (
                      <div className="pl-6">
                        {module.menus.map((menu) => (
                          <label key={menu.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              disabled
                              checked={
                                roleToEdit
                                  ? permissionArray.some(
                                      (perm) => perm.module_id === module.id && perm.menu_id === menu.id
                                    ) ||
                                    permissionData.find(
                                      (i) => i.role_id === roleToEdit.id && i.menu_id === menu.id
                                    )
                                  : false
                              }
                              onChange={() => permissionHandler(module.id, menu.id)}
                              className="w-4 h-4 accent-blue-600"
                            />
                            <span className="text-gray-600 text-sm">{menu.menu_name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        
        {/* Modal Footer */}
        <div className="flex justify-end p-3 border-t">
          <button
            onClick={handleCloseModal}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Tutup
          </button>
          
        </div>
      </div>
    </div>
  )
}

RolePermissionModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  roleToEdit: PropTypes.object
}

export default RolePermissionModal