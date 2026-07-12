import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { MEMBER_SERVICE_API } from "../Config/ConfigUrl";
import MemberTable from "../Table/MemberTable";
import DateFormatter from "../Service/DateFormatter";

const LihatMember = () => {

  const [memberData, setMemberData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState(0);

  const fetchMember = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${MEMBER_SERVICE_API}?page=${page}&limit=${limit}`);
      const dateFields = ['tanggal_masuk', 'tanggal_kadaluarsa']; 
      
      const responseData = response.data.data || [];
      const totalCount = response.data.total || 0;

      // eslint-disable-next-line no-unused-vars
      const formattedData = DateFormatter(responseData, dateFields).map(({id, is_black_list, ...rest}) => rest);
      setMemberData(formattedData);
      setTotalData(totalCount);
      setIsLoading(false);
    } catch (error) {
      console.error(error)
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchMember()
  },[page, limit])

  return (
    <Fragment>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row my-4 mx-1">
                <div className="col-sm-6 flex items-center">
                  <h1 className="font-semibold text-3xl text-mainColor">Lihat Member</h1>
                </div>
                <div className="col-sm-6 ">
                  <ol className="breadcrumb float-sm-end text-end">
                    <li className="breadcrumb-item text-mainColor">
                      <a href="/">Beranda</a>
                    </li>
                    <li className="breadcrumb-item active">Lihat Member</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
    
          <section className="content">
            <MemberTable
              dataTable={memberData}
              isLoading={isLoading}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalData={totalData}
            />
            {/* <MenuModal
              isModalOpen={isModalOpen}
              menuToEdit={menuToEdit}
              setIsModalOpen={setIsModalOpen}
              fetchMenus={fetchMenus}
              menuToDelete={menuToDelete}
            /> */}
          </section>
        </Fragment>
  )
}


export default LihatMember