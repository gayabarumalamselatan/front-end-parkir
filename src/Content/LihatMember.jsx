import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { MEMBER_SERVICE_API } from "../Config/ConfigUrl";
import MemberTable from "../Table/MemberTable";
import DateFormatter from "../Service/DateFormatter";

const LihatMember = () => {

  const [memberData, setMemberData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchMember = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${MEMBER_SERVICE_API}`);
      const dateFields = ['tanggal_masuk', 'tanggal_kadaluarsa']; 
      // eslint-disable-next-line no-unused-vars
      const formattedData = DateFormatter(response.data, dateFields).map(({id, is_black_list, ...rest}) => rest);
      setMemberData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error)
      setIsLoading(false);
    }
  }
  console.log(memberData)
  useEffect(() => {
    fetchMember()
  },[])

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
              // setDataToEdit={setMenuToEdit}
              // setIsMenuModalOpen={setIsModalOpen}
              // setDataToDelete={setMenuToDelete}
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