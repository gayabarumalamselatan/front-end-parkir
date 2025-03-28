import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { MEMBER_SERVICE_API } from "../Config/ConfigUrl"


const PerpanjangMember = () => {

  const [memberData, setMemberData] = useState([])
  const [perpanjangData, setPerpanjangData] = useState({
    nomor_polisi: '',
    nama_pemilik: '',
    tanggal_masuk: new Date().toISOString().split('T')[0],
    tanggal_kadaluarsa: '',
    bulanan: 0,
    jangka_perpanjang: 0,
    jumlah_pembayaran: 0,
    kadaluarsa_berikutnya: '',
    keterangan: ''
  });

  const fetchMember = async () => {
    try {
      const response = await axios.get(`${MEMBER_SERVICE_API}`);
      setMemberData(response.data) 
      console.log(memberData)
    } catch (error) {
      console.error(error)
    }
  }

  const autofillMember = (data) => {
    console.log("auto", data)
    setPerpanjangData({
      nomor_polisi: data.nomor_polisi,
      tanggal_masuk: data.tanggal_masuk,
      tanggal_kadaluarsa: data.tanggal_kadaluarsa,
      bulanan: data.bulanan,
    })
  }

  useEffect(() => {
    fetchMember()
  },[])

  return (
    <Fragment>
      {/* Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row my-4 mx-1">
            <div className="col-sm-6 flex items-center">
              <h1 className="font-semibold text-3xl text-mainColor">Perpanjang Member</h1>
            </div>
            <div className="col-sm-6 ">
              <ol className="breadcrumb float-sm-end text-end">
                <li className="breadcrumb-item text-mainColor">
                  <a href="/">Beranda</a>
                </li>
                <li className="breadcrumb-item active">Perpanjang Member</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-4 mb-4 border-0 rounded-mainCard shadow-cardShadow bg-white">
        <div className="card-header border-none">
          <div className="p-4"> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Nomor Polisi
                </label>
                <input
                  onChange={(e) => setPerpanjangData({
                    ...perpanjangData,
                    nomor_polisi: e.target.value
                  })}
                  value={perpanjangData.nomor_polisi}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="text"
                  placeholder="Masukkan Plat Nomor"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Nama Pemilik
                </label>
                <select
                  onChange={(e)=>{
                    const selectedMember = memberData.find(item => item.nama_pemilik === e.target.value)
                    autofillMember(selectedMember)
                  }}
                  className="mt-2 block w-full ps-3  p-2 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Masukkan Plat Nomor"
                >
                  <option value="null">Pilih Nama Pemilik</option>
                  {
                    memberData.map(item => (
                      <option key={item.id} value={item.nama_pemilik}>
                        {item.nama_pemilik}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                  value={perpanjangData.tanggal_masuk.split('T')[0]}
                  onChange={(e)=>{
                    setPerpanjangData({
                      ...perpanjangData,
                      tanggal_masuk: e.target.value
                    })
                  }}
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Tanggal Kadaluarsa
                </label>
                <input
                  type="date"
                  value={perpanjangData.tanggal_kadaluarsa.split('T')[0]}
                  onChange={(e)=>{setPerpanjangData({
                    ...perpanjangData,
                    tanggal_kadaluarsa: e.target.value
                  })}}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label className="block font-semibold text-mainColor text-lg">Biaya Bulanan</label>
                <input
                  type="text"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  onChange={(e)=>{setPerpanjangData({
                    ...perpanjangData,
                    bulanan: e.target.value
                  })}}
                  value={perpanjangData.bulanan}
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Jangka Waktu Perpanjang
                </label>
                <div className="flex justify-start py-auto items-center ">

                  <p>Untuk: </p>

                  <input

                  onChange={(e) => {
                    const value = e.target.value;
                    setPerpanjangData({
                      ...perpanjangData,
                      jangka_perpanjang: value
                    })
                    // const currentDate = perpanjangData.tanggal_kadaluarsa;
                    
                    if(value){
                      const currentDate = new Date(perpanjangData.tanggal_kadaluarsa);
                      console.log(currentDate.toISOString())
                      currentDate.setMonth(currentDate.getMonth() + parseInt(value));
                      setPerpanjangData({
                        ...perpanjangData,
                        kadaluarsa_berikutnya: currentDate.toISOString() || new Date().toISOString().split('T')[0]
                      })
                    }                    
                  }}
                    type="text"
                    className="mt-2 mx-2 block  ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  />

                  <p>bulan</p>

                </div>
              </div>

              <div className="col-span-1">
                <label className="block font-semibold text-mainColor text-lg">Jumlah Pembayaran</label>
                <input
                  type="text"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Kadaluarsa Berikutnya
                </label>
                <input
                  type="date"
                  value={perpanjangData.kadaluarsa_berikutnya ? perpanjangData.kadaluarsa_berikutnya.split('T')[0] : perpanjangData.tanggal_kadaluarsa}
                  onChange={(e) => {
                    setPerpanjangData({
                      ...perpanjangData,
                      kadaluarsa_berikutnya: e.target.value
                    })
                  }}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Keterangan
                </label>
                <textarea
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 min-h-8"
                  placeholder="Enter value"
                />
              </div>

            </div>

            <div className="flex justify-end pt-2">
              <button className="flex justify-end bg-mainColor rounded-xl px-3 py-2 text-white">
                Perpanjang Member
              </button>
            </div>

          </div>
          
        </div>
      </section>
    </Fragment>
  )
}

export default PerpanjangMember