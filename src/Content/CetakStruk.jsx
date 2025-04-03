import { Fragment, useEffect, useState } from "react"
import { MEMBER_SERVICE_API } from "../Config/ConfigUrl";
import axios from "axios";
import Select from "react-select";


const CetakStruk = () => {
  const [memberOption, setMemberOption] = useState([]);
  const [selectedMember, setSelectedMember] = useState();
  const [memberDicetak, setMemberDicetak] = useState({  
    nama_pemilik: '',
    tanggal_masuk: '',
    tanggal_kadaluarsa: '',
    bulanan: '',
    tanggal_bayar: new Date().toISOString().split('T')[0],
    jangka_perpanjang: 0,
    jumlah_pembayaran: 0,
    keterangan: '',
    kadaluarsa_berikutnya: '',
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
  
  useEffect(() => {
    fetchMember();
  },[])

  const selectMemberHandler = (e) => {
    if(e){
      setSelectedMember(e)
      setMemberDicetak({
        nomor_pengganti: e.nomor_pengganti,
        nama_pemilik: e.nama_pemilik,
        tanggal_masuk: e.tanggal_masuk.split('T')[0],
        tanggal_kadaluarsa: e.tanggal_kadaluarsa.split('T')[0],
        bulanan: e.bulanan,
        tanggal_bayar: new Date().toISOString().split('T')[0],
        jangka_perpanjang: 0,
        jumlah_pembayaran: 0,
        keterangan: '',
        kadaluarsa_berikutnya: '',
      })
    }else{
      setSelectedMember()
      setMemberDicetak({
        nama_pemilik: '',
        tanggal_masuk: '',
        tanggal_kadaluarsa: '',
        bulanan: '',
        tanggal_bayar: new Date().toISOString.split('T')[0],
        jangka_perpanjang: 0,
        jumlah_pembayaran: 0,
        keterangan: '',
        kadaluarsa_berikutnya: '',
      })
    }
  }

  return (
    <Fragment>
      {/* Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row my-4 mx-1">
            <div className="col-sm-6 flex items-center">
              <h1 className="font-semibold text-3xl text-mainColor">Cetak Struk</h1>
            </div>
            <div className="col-sm-6 ">
              <ol className="breadcrumb float-sm-end text-end">
                <li className="breadcrumb-item text-mainColor">
                  <a href="/">Beranda</a>
                </li>
                <li className="breadcrumb-item active">Cetak Struk</li>
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
                <Select
                  className="mt-2 shadow-sm"
                  options={memberOption}
                  value={selectedMember}
                  placeholder="...Plat Nomor"
                  onChange={(e) => selectMemberHandler(e)}
                  isClearable
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Nama Pemilik
                </label>
                <input
                  value={memberDicetak.nama_pemilik}
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
                value={memberDicetak.tanggal_masuk}
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
                  value={memberDicetak.tanggal_kadaluarsa}
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
                  value={memberDicetak.bulanan}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="text"
                  placeholder="Masukkan Biaya Bulanan"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Tanggal Pembayaran
                </label>
                <input
                  value={memberDicetak.tanggal_bayar}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="date"
                  placeholder="Masukkan Nomor Pengganti"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-semibold text-mainColor">
                  Jangka Waktu Perpanjang
                </label>
                <div className="flex justify-start py-auto items-center ">

                  <p>Untuk: </p>

                  <input
                    value={memberDicetak.jangka_perpanjang}
                    onChange={(e) => {
                      const value = e.target.value;
                      setMemberDicetak({
                        ...memberDicetak,
                        jangka_perpanjang: value ? parseInt(value, 10) : 0
                      })
                      
                      if(value){
                        const currentDate = new Date(memberDicetak.tanggal_kadaluarsa);
                        console.log(currentDate.toISOString())
                        currentDate.setMonth(currentDate.getMonth() + parseInt(value));
                        setMemberDicetak({
                          ...memberDicetak,
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
                <label className="block text-lg font-semibold text-mainColor">
                  Jumlah Pembayaran
                </label>
                <input
                  value={memberDicetak.jumlah_pembayaran}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMemberDicetak({
                      ...memberDicetak,
                      jumlah_pembayaran: value ? parseInt(value, 10) : 0
                    })
                  }}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="text"
                  placeholder="Masukkan Biaya Bulanan"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Keterangan
                </label>
                <textarea
                  value={memberDicetak.keterangan}
                  onChange={(e)=>{
                    setMemberDicetak({
                      ...memberDicetak,
                      keterangan: e.target.value
                    })
                  }}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 min-h-8"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Kadaluarsa Berikutnya
                </label>
                <input
                  type="date"
                  value={memberDicetak.kadaluarsa_berikutnya ? memberDicetak.kadaluarsa_berikutnya.split('T')[0] : memberDicetak.tanggal_kadaluarsa}
                  onChange={(e) => {
                    setMemberDicetak({
                      ...memberDicetak,
                      kadaluarsa_berikutnya: e.target.value
                    })
                  }}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default CetakStruk