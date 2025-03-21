import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { MEMBER_SERVICE_API } from "../Config/ConfigUrl";
import MemberTable from "../Table/MemberTable";


const LihatMember = () => {

  const [memberData, setMemberData] = useState([]);

  const fetchMember = async () => {
    try {
      const response = await axios.get(`${MEMBER_SERVICE_API}`);
      setMemberData(response.data);
    } catch (error) {
      console.error(error)
    }
  }

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