import { Fragment, useEffect, useState } from "react"
import DynamicTable from "../Table/DynamicTable"
import axios from "axios";
import { MENU_SERVICE_PERMISSON } from "../Config/ConfigUrl";
import PermissionModal from "../Modal/PermissionModal/PermissionModal";


const Permission = () => {

  const [permissionData, setPermissionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState({});
  const [permissionToDelete, setPermissionToDelete] = useState('');
  
  const namaTable = "Daftar Permission";

  const fetchPermissionData = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_PERMISSON}`);
      setPermissionData(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPermissionData()
  },[]);

  return (
    <Fragment>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row my-4 mx-1">
            <div className="col-sm-6 flex items-center">
              <h1 className="font-semibold text-3xl text-mainColor">Permission</h1>
            </div>
            <div className="col-sm-6 ">
              <ol className="breadcrumb float-sm-end text-end">
                <li className="breadcrumb-item text-mainColor">
                  <a href="/">Beranda</a>
                </li>
                <li className="breadcrumb-item active">Permission</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <DynamicTable
          tableName={namaTable}
          dataTable={permissionData}
          setDataToEdit={setPermissionToEdit}
          setIsPermissionModalOpen={setIsModalOpen}
          setDataToDelete={setPermissionToDelete}
        />
        <PermissionModal
          isModalOpen={isModalOpen}
          permissionToEdit={permissionToEdit}
          setIsModalOpen={setIsModalOpen}
          fetchPermissionData={fetchPermissionData}
          permissionToDelete={permissionToDelete}
        />
      </section>
    </Fragment>
  )
}

export default Permission