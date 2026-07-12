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
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState(0);

  const namaTable = "Daftar Permission";

  const fetchPermissionData = async () => {
    try {
      const response = await axios.get(`${MENU_SERVICE_PERMISSON}?page=${page}&limit=${limit}`);
      
      const responseData = response.data.data || [];
      const totalCount = response.data.total || 0;

      const mappedData = responseData.map(item => ({
        id: item.id,
        role_id: item.role_id,
        module_id: item.module_id,
        menu_id: item.menu_id,
        role_name: item.role ? item.role.role_name : '-',
        module_name: item.module ? item.module.module_name : '-',
        menu_name: item.menu ? item.menu.menu_name : '-'
      }));
      setPermissionData(mappedData);
      setTotalData(totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPermissionData();
  }, [page, limit]);

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
          hiddenColumns={['role_id', 'module_id', 'menu_id']}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalData={totalData}
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