import {  faAdd, faCaretLeft, faCaretRight, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types"

const DynamicTable = ({
  tableName, 
  dataTable, 
  hiddenColumns = [],
  page = 1,
  setPage = () => {},
  limit = 10,
  setLimit = () => {},
  totalData = 0,
  setIsRoleModalOpen,
  setDataToEdit,
  setDataToDelete,
  setIsModuleModalOpen,
  setIsMenuModalOpen,
  setIsUserModalOpen,
  setIsPermissionModalOpen,
  setIsRolePermissionModalOpen
}) => {

  // eslint-disable-next-line no-unused-vars
  const formattedData = dataTable.map((row) => {
    const newRow = { ...row };
    delete newRow.id;
    hiddenColumns.forEach(col => delete newRow[col]);
    return newRow;
  });

  const totalPages = Math.ceil(totalData / limit) || 1;
  const startData = (page - 1) * limit + 1;
  const endData = Math.min(page * limit, totalData);

  const handlePageSizeChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Reset to first page when limit changes
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (!Array.isArray(dataTable) || dataTable.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  const headers = formattedData.length > 0 ? Object.keys(formattedData[0]) : [];

  const AddButtonNaming = (tableName) => {
    if(tableName === 'Daftar Pengguna') return "Tambah Pengguna";
    if(tableName === 'Daftar Modul') return "Tambah Modul";
    if(tableName === "Daftar Menu") return "Tambah Menu";
    if(tableName === "Daftar Role") return "Tambah Role";
    if(tableName === "Daftar Permission") return "Tambah Permission";
    return "Tambah";
  };
  
  const modalHandler = (tableName, id, isDelete) => {
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
                value={limit}
                onChange={handlePageSizeChange}
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
            <table className="w-full text-sm text-left min-w-max">
              <thead className="text-gray-700">
                <tr>
                  <th className="px-3 py-2 border-b-2 border-slate-300 border-e-2 last:border-e-0">No</th>
                  {headers.map((header) => (
                    <th key={header} className="px-3 py-2 border-b-2 border-slate-300 border-e-2 last:border-e-0">
                      {header.replace(/_/g, ' ').toUpperCase()}
                    </th>
                  ))}
                  <th className="px-3 py-2 border-b-2 border-slate-300 border-e-2 last:border-e-0">Aksi</th>
                </tr>
              </thead>
              <tbody>
              {formattedData.map((row, index) => (
                <tr key={index} className="even:bg-slate-100">
                  <td className="px-3 py-2 border-e-2 border-slate-300 last:border-e-0">
                    {(page - 1) * limit + index + 1}
                  </td>
                  {headers.map((header) => (
                    <td key={header} className="px-3 py-2 border-e-2 border-slate-300 last:border-e-0">
                      {row[header] ?? "-"}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-start border-e-2 border-slate-300 last:border-e-0">
                    <button 
                      className="bg-mainColor w-10 h-10 rounded text-white hover:bg-blue-900"
                      onClick={() => modalHandler(tableName, dataTable[index])}
                    >
                      <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    <button 
                      className="bg-red-700 w-10 h-10 rounded text-white hover:bg-red-800 ml-2"
                      onClick={() => modalHandler(tableName, dataTable[index], true)}
                    >
                      <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    {
                      tableName === "Daftar Role" ? 
                      <button
                        className="bg-mainColor w-10 h-10 rounded text-white hover:bg-blue-900 ms-2"
                        onClick={()=>
                          rolePermissionHandler(dataTable[index])
                        }
                      >
                        <FontAwesomeIcon icon={faEye}/>
                      </button>
                      :
                      <></>
                    }
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
        </div>
        <div className="flex justify-between border-t items-center px-4 py-2 text-sm text-gray-600">
            <span className="font-semibold text-mainColor">
              Menampilkan {totalData > 0 ? startData : 0} - {endData} dari {totalData} data
            </span>
            <div className="flex space-x-1">
                <button 
                  className={`px-2 py-1 border rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  <FontAwesomeIcon icon={faCaretLeft}/>
                </button>
                
                {/* Simple pagination buttons - showing current, prev, next */}
                {page > 1 && (
                  <button className="px-3 py-1 border rounded hover:bg-gray-100" onClick={() => setPage(page - 1)}>{page - 1}</button>
                )}
                <button className="px-3 py-1 bg-blue-600 text-white rounded">{page}</button>
                {page < totalPages && (
                  <button className="px-3 py-1 border rounded hover:bg-gray-100" onClick={() => setPage(page + 1)}>{page + 1}</button>
                )}

                <button 
                  className={`px-2 py-1 border rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  <FontAwesomeIcon icon={faCaretRight}/>
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

DynamicTable.propTypes = {
  tableName: PropTypes.any.isRequired,
  dataTable: PropTypes.arrayOf(PropTypes.object),
  hiddenColumns: PropTypes.array,
  page: PropTypes.number,
  setPage: PropTypes.func,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  totalData: PropTypes.number,
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