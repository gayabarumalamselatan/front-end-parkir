import {  faAdd, faCaretLeft, faCaretRight, faEdit, faLock } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types"

const DynamicTable = ({
  tableName, 
  dataTable, 
  setIsRoleModalOpen,
  setDataToEdit,
  setDataToDelete,
  setIsModuleModalOpen,
  setIsMenuModalOpen,
  setIsUserModalOpen,
  setIsPermissionModalOpen,
  setIsRolePermissionModalOpen
}) => {

  if (!Array.isArray(dataTable) || dataTable.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  console.log(dataTable)
  const headers = dataTable.length > 0 ? Object.keys(dataTable[0]) : [];
  console.log(headers)

  const AddButtonNaming = (tableName) => {
    if(tableName === 'Daftar Pengguna') {
      return "Tambah Pengguna"
    } else if(tableName === 'Daftar Modul'){
      return "Tambah Modul"
    } else if(tableName === "Daftar Menu") {
      return "Tambah Menu"
    } else if(tableName === "Daftar Role") {
      return "Tambah Role"
    } else if(tableName === "Daftar Permission"){
      return "Tambah Permission"
    }else {
      return "Tambah"
    }
  }
  
  const modalHandler = (tableName, id, isDelete) => {
    console.log(tableName);
  
    const modalStateMap = {
      "Daftar Role": setIsRoleModalOpen,
      "Daftar Modul": setIsModuleModalOpen,
      "Daftar Menu": setIsMenuModalOpen,
      "Daftar Pengguna": setIsUserModalOpen,
      "Daftar Permission": setIsPermissionModalOpen,
    };
  
    const setModalOpen = modalStateMap[tableName];
    if (setModalOpen) {
      setModalOpen(true);
      setDataToEdit(id || null);
      setDataToDelete(isDelete ? id : null);
    }
  };

  const rolePermissionHandler = (id) => {
    setIsRolePermissionModalOpen(true)
    setDataToEdit(id)
    console.log('datatoedit', id)
  }
  
  return (
    <>
      <div className="card card-default mx-4 mb-4 rounded-mainCard">
        <div className="card-header border-none">
          <div className="flex items-center justify-between"> 
            <div className="flex items-center">
              <div className="row-per-page-label font-semibold text-mainColor" style={{ whiteSpace: "nowrap" }}>
                Baris per halaman:
              </div>
              <select
                style={{ margin: "5px" }}
                id="pageSizeSelect"
                // value={pageSize}
                // onChange={handlePageSizeChange}
                className="form-form-select form-select-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div>
              <button 
                className="rounded-xl bg-mainColor px-3 py-1 text-cyan-50 flex items-center justify-center"
                onClick={() => modalHandler(tableName)}
              > 
                <FontAwesomeIcon icon={faAdd} className="mr-2"/> {AddButtonNaming(tableName)}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-mainCard overflow-hidden mx-4">
        <div className="bg-mainColor text-white px-4 py-2 font-semibold">{tableName}</div>
          <div className="overflow-x-auto m-7">
            <table className="w-full text-sm text-left border border-gray-200 min-w-max">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-3 py-2 border">Aksi</th>
                  {headers.map((header) => (
                    <th key={header} className="px-3 py-2 border">
                      {header.replace(/_/g, ' ').toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {dataTable.map((row, index) => (
                <tr key={index} className="border">
                  <td className="px-3 py-2 text-start">
                    <button 
                      className="bg-mainColor w-10 h-10 rounded text-white hover:bg-blue-900"
                      onClick={() => modalHandler(tableName, row)}
                    >
                      <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    <button 
                      className="bg-red-700 w-10 h-10 rounded text-white hover:bg-red-800 ml-2"
                      onClick={() => modalHandler(tableName, row, true)}
                    >
                      <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    {
                      tableName === "Daftar Role" ? 
                      <button
                        className="bg-mainColor w-10 h-10 rounded text-white hover:bg-blue-900 ms-2"
                        onClick={()=>
                          rolePermissionHandler(row)
                        }
                      >
                        <FontAwesomeIcon icon={faLock}/>
                      </button>
                      :
                      <></>
                    }
                  </td>
                  {headers.map((header) => (
                    <td key={header} className="px-3 py-2 border">
                      {row[header] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
        </div>
        <div className="flex justify-between border-t items-center px-4 py-2 text-sm text-gray-600">
            <span className="font-semibold text-mainColor">Menampilkan 1 - 4 dari 8 data</span>
            <div className="flex space-x-1">
                <button className="px-2 py-1 border rounded hover:bg-gray-100"><FontAwesomeIcon icon={faCaretLeft}/></button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
                <button className="px-2 py-1 border rounded hover:bg-gray-100"><FontAwesomeIcon icon={faCaretRight}/></button>
            </div>
        </div>
      </div>
    </>
  )
}

DynamicTable.propTypes = {
  tableName: PropTypes.any.isRequired,
  dataTable: PropTypes.arrayOf(PropTypes.object),
  setIsRoleModalOpen: PropTypes.any,
  setDataToEdit: PropTypes.func,
  setDataToDelete: PropTypes.func,

  setIsModuleModalOpen: PropTypes.any,
  setIsMenuModalOpen: PropTypes.any,
  setIsUserModalOpen: PropTypes.any,
  setIsPermissionModalOpen: PropTypes.any,
  setIsRolePermissionModalOpen: PropTypes.bool
}



export default DynamicTable