import { Fragment, useEffect, useState } from "react"
import DynamicTable from "../Table/DynamicTable"
import axios from "axios"
import { MENU_SERVICE_MENU, MENU_SERVICE_MODULE } from "../Config/ConfigUrl"
import MenuModal from "../Modal/MenuModal/MenuModal"

const ManajemenMenu = () => {
  const [menuData, setMenuData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuToEdit, setMenuToEdit] = useState({});
  const [menuToDelete, setMenuToDelete] = useState({})
  const namaTable = "Daftar Menu"

  const fetchMenus = async () => {
    let modules;
    try {
      const response = await axios.get(`${MENU_SERVICE_MODULE}`);
      modules = response.data
      console.log('liyane',response.data)
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(`${MENU_SERVICE_MENU}`);
      const menus = response.data;

      const updatedMenus = menus.map(menu => {
        const module = modules.find(mod => mod.id === menu.module_id);
        
        return {
          ...menu,
          module_id: module ? module.module_name : "Unknown Module"
        };
      });

      setMenuData(updatedMenus);
    } catch (error) { 
      console.error(error);
    }
  };
  console.log('menu', menuData)
  useEffect(() => {
    fetchMenus()
  }, []);

  return (
   <Fragment>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row my-4 mx-1">
            <div className="col-sm-6 flex items-center">
              <h1 className="font-semibold text-3xl text-mainColor">Manajemen Menu</h1>
            </div>
            <div className="col-sm-6 ">
              <ol className="breadcrumb float-sm-end text-end">
                <li className="breadcrumb-item text-mainColor">
                  <a href="/">Beranda</a>
                </li>
                <li className="breadcrumb-item active">Manajemen Menu</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <DynamicTable
          tableName={namaTable}
          dataTable={menuData}
          setDataToEdit={setMenuToEdit}
          setIsMenuModalOpen={setIsModalOpen}
          setDataToDelete={setMenuToDelete}
        />
        <MenuModal
          isModalOpen={isModalOpen}
          menuToEdit={menuToEdit}
          setIsModalOpen={setIsModalOpen}
          fetchMenus={fetchMenus}
          menuToDelete={menuToDelete}
        />
      </section>
    </Fragment>
  )
}

export default ManajemenMenu