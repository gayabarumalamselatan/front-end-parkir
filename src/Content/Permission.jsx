import { Fragment, useEffect, useState } from "react"
import DynamicTable from "../Table/DynamicTable"
import axios from "axios";
import { MENU_SERVICE_PERMISSON } from "../Config/ConfigUrl";


const Permission = () => {

  const [permissionData, setPermissionData] = useState([])
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
          // setDataToEdit={setRoleToEdit}
          // setIsRoleModalOpen={setIsModalOpen}
          // setDataToDelete={setRoleToDelete}
        />
        {/* <RoleModal
        isModalOpen={isModalOpen}
        roleToEdit={roleToEdit}
        setIsModalOpen={setIsModalOpen}
        fetchRoles={fetchRoles}
        roleToDelete={roleToDelete}
        /> */}
      </section>
    </Fragment>
  )
}

export default Permission