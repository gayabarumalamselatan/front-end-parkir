import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import LoadingTable from "../animation/Loading-text-anim.json"

const MemberTable = ({
  dataTable, 
  isLoading,
  page = 1,
  setPage = () => {},
  limit = 10,
  setLimit = () => {},
  totalData = 0
}) => {

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

  const headers = dataTable.length > 0 ? Object.keys(dataTable[0]) : [];

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
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-mainCard overflow-hidden mx-4">
        <div className="bg-mainColor text-white px-4 py-2 font-semibold">Daftar Member</div>
        <div className="overflow-x-auto m-7" style={{scrollbarWidth: "none"}}>

          <table className="w-full text-sm text-left  min-w-max">
            {
              isLoading ? 
              <div>
                <Lottie 
                  animationData={LoadingTable}
                  style={{
                    height: "200px"
                  }}
                />
              </div> :
                !Array.isArray(dataTable) || dataTable.length === 0 ?
                <p className="text-center text-gray-500">No data available</p>
                :
              <>
                <thead className=" text-gray-700">
                  <tr>
                    <th className="border-e-2 border-b-2 border-slate-300 px-3">No</th>
                    {headers.map((header) => (
                      <th key={header} className="px-3 py-2 border-b-2 border-slate-300 border-e-2 last:border-e-0">
                        {header.replace(/_/g, ' ').toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {dataTable.map((row, index) => (
                  <tr key={index} className="even:bg-slate-100">
                    <td className="border-e-2 border-slate-300 px-3">
                      {(page - 1) * limit + index + 1}
                    </td>
                    {headers.map((header) => (
                      <td key={header} className='px-3 py-2 border-e-2 border-slate-300 last:border-e-0'>
                        {row[header] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
                </tbody>
              </>
            }
            
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

MemberTable.propTypes = {
  dataTable: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  totalData: PropTypes.number
}

export default MemberTable