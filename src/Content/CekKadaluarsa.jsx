import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import Select from "react-select"
import { MEMBER_SERVICE_API } from "../Config/ConfigUrl"

const CekKadaluarsa = () => {
  const [memberOption, setMemberOption] = useState([]);
  const [selectedMember, setSelectedMember] = useState();
  const [showingMember, setShowingMember]= useState({
    nomor_pengganti: '',
    nama_pemilik: '',
    tanggal_masuk: '',
    tanggal_kadaluarsa: '',
    bulanan: ''
  })


  const fetchMember = async  () => {
    try {
      const response = await axios.get(`${MEMBER_SERVICE_API}`);
      const mappedOption = response.data.map(item =>({
        id: item.id,
        value: item.nomor_polisi,
        label: item.nomor_polisi,
        nomor_pengganti: item.nomor_pengganti,
        nama_pemilik: item.nama_pemilik,
        tanggal_masuk: item.tanggal_masuk,
        tanggal_kadaluarsa: item.tanggal_kadaluarsa,
        bulanan: item.bulanan
      }))
      console.log('mapped', mappedOption)
      setMemberOption(mappedOption)
      
    } catch (error) {
      console.error(error);
    }
  }

  const selectMemberhandler = (e) => {

    if(e){
      setSelectedMember(e)
      setShowingMember({
        nomor_pengganti: e.nomor_pengganti,
        nama_pemilik: e.nama_pemilik,
        tanggal_masuk: e.tanggal_masuk.split('T')[0],
        tanggal_kadaluarsa: e.tanggal_kadaluarsa.split('T')[0],
        bulanan: e.bulanan
      })
    } else {
      setSelectedMember()
      setShowingMember({
        nomor_pengganti: '',
        nama_pemilik: '',
        tanggal_masuk: '',
        tanggal_kadaluarsa: '',
        bulanan: ''
      })
    }
  }

  useEffect(() => {
    fetchMember();
  },[])

  return (
    <Fragment>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row my-4 mx-1">
            <div className="col-sm-6 flex items-center">
              <h1 className="font-semibold text-3xl text-mainColor">Cek Kadaluarsa</h1>
            </div>
            <div className="col-sm-6 ">
              <ol className="breadcrumb float-sm-end text-end">
                <li className="breadcrumb-item text-mainColor">
                  <a href="/">Beranda</a>
                </li>
                <li className="breadcrumb-item active">Cek Kadaluarsa</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 mb-4 border-0 rounded-mainCard shadow-cardShadow bg-white">
        <div className="card-header border-none">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Nomor Polisi
                </label>
                <Select
                  className="mt-2 shadow-sm"
                  options={memberOption}
                  value={selectedMember}
                  placeholder="...Plat Nomor"
                  onChange={(e) => selectMemberhandler(e)}
                  isClearable
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Nomor Pengganti
                </label>
                <input
                  value={showingMember.nomor_pengganti}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="text"
                  placeholder="Masukkan Nomor Pengganti"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Nama Pemilik
                </label>
                <input
                  value={showingMember.nama_pemilik}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="text"
                  placeholder="Masukkan Nama Pemilik"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Tanggal Masuk
                </label>
                <input
                value={showingMember.tanggal_masuk}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="date"
                  placeholder="Masukkan Nomor Pengganti"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Tanggal Kadaluarsa
                </label>
                <input
                  value={showingMember.tanggal_kadaluarsa}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="date"
                  placeholder="Masukkan Nomor Pengganti"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Biaya Bulanan
                </label>
                <input
                  value={showingMember.bulanan}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="text"
                  placeholder="Masukkan Biaya Bulanan"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

    </Fragment>
  )
}

export default CekKadaluarsa