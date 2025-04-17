import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { MEMBER_SERVICE_API, STRUK_SERVICE_API } from "../Config/ConfigUrl"
import Swal from "sweetalert2"


const PerpanjangMember = () => {

  const [memberData, setMemberData] = useState([])
  const [errors, setErrors] = useState({})

  const initData = {
    id: 0,
    nomor_polisi: '',
    nama_pemilik: '',
    tanggal_masuk: new Date().toISOString().split('T')[0],
    tanggal_kadaluarsa: '',
    bulanan: 0,
    jangka_perpanjang: 0,
    jumlah_pembayaran: 0,
    kadaluarsa_berikutnya: '',
    keterangan: ''
  }

  const [perpanjangData, setPerpanjangData] = useState(initData);

  const requiredFields = [
    {key: 'jangka_perpanjang', label: 'Jangka Waktu Perpanjang'},
    {key: 'jumlah_pembayaran', label: 'Jumlah Pembayaran'}
  ]

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
      id: data.id,
      nama_pemilik: data.nama_pemilik,
      nomor_polisi: data.nomor_polisi,
      tanggal_masuk: data.tanggal_masuk.split('T')[0],
      tanggal_kadaluarsa: data.tanggal_kadaluarsa.split('T')[0],
      bulanan: data.bulanan,
      keterangan: data.keterangan
    })
    if(!data){
      setPerpanjangData(initData)
    }
  }

  const submitPerpanjang = async () => {
    const newErrors = {}
    
    if(!perpanjangData.jangka_perpanjang || !perpanjangData.jumlah_pembayaran){
      const req = await Swal.fire({
        title: "Peringatan!",
        text: "Semua field harus diisi.",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })
      if(req.isConfirmed){
        requiredFields.forEach(field => {
          if(!perpanjangData[field.key]){
            newErrors[field.key] = `${field.label} harus diisi.`
          }
        });
        if(Object.keys(newErrors).length > 0){
          setErrors(newErrors)
        }
        return;
      };
    }

    const confirmSubmit = await Swal.fire({
      title: 'Yakin?',
      text: 'Pastikan data sudah terisi dengan benar.',
      icon:'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonColor: '#004BA0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Perpanjang',
      reverseButtons: true
    })

    if(confirmSubmit.isConfirmed) {
      setErrors({});
      const dataToUpdate = {
        id: perpanjangData.id,
        tanggal_kadaluarsa: perpanjangData.kadaluarsa_berikutnya.split('T')[0],
      }
      console.log('send it', dataToUpdate)

      const dataToCreate = {
        nomor_polisi: perpanjangData.nomor_polisi,
        nama_pemilik: perpanjangData.nama_pemilik,
        tanggal_masuk: perpanjangData.tanggal_masuk,
        tanggal_kadaluarsa: perpanjangData.tanggal_kadaluarsa,
        bulanan: perpanjangData.bulanan,
        tanggal_bayar: new Date().toISOString().split('T')[0],
        untuk: perpanjangData.jangka_perpanjang,
        jumlah_pembayaran: parseInt(perpanjangData.jumlah_pembayaran),
        keterangan: perpanjangData.keterangan,
        kadaluarsa_berikutnya: perpanjangData.kadaluarsa_berikutnya,
      }

      try {
        const [updateMember, createStruk] = await Promise.all([
          await axios.put(`${MEMBER_SERVICE_API}`, dataToUpdate),
          await axios.post(`${STRUK_SERVICE_API}`, dataToCreate)
        ])

        if(updateMember.status === 200 && createStruk.status === 200){
          Swal.fire({
            title: 'Yes, Berhasil!', 
            text: `${perpanjangData.nama_pemilik} berhasil diperpanjang.`,
            icon: 'success',
            confirmButtonText: 'OK'
          })
          setPerpanjangData(initData);
        }
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ada yang salah nih!"
        })
      }
    }
  } 


  useEffect(() => {
    fetchMember()
  },[])

  console.log(perpanjangData)
  console.log('error', errors)

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
                    setPerpanjangData(initData)
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
                    const value = parseInt(e.target.value);

                    if(value){
                      const currentDate = new Date(perpanjangData.tanggal_kadaluarsa);
                      console.log(currentDate.toISOString())
                      currentDate.setMonth(currentDate.getMonth() + value);
                      setPerpanjangData({
                        ...perpanjangData,
                        jangka_perpanjang: value,
                        // tanggal_kadaluarsa: currentDate.toISOString() || new Date().toISOString().split('T')[0],
                        kadaluarsa_berikutnya: currentDate.toISOString() || new Date().toISOString().split('T')[0]
                      })
                    }                    
                  }}
                    type="text"
                    className="mt-2 mx-2 block  ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  />
                  <p>bulan</p>
                </div>

                {errors.jangka_perpanjang &&
                  <p className="text-red-500 text-sm">
                    {errors.jangka_perpanjang}
                  </p>
                } 

              </div>

              <div className="col-span-1">
                <label className="block font-semibold text-mainColor text-lg">Jumlah Pembayaran</label>
                <input
                  type="text"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  onChange={(e) => {
                    setPerpanjangData({
                      ...perpanjangData,
                      jumlah_pembayaran: e.target.value
                    })
                  }}
                />
                {errors.jumlah_pembayaran &&
                  <p className="text-red-500 text-sm">
                    {errors.jumlah_pembayaran}
                  </p>
                } 
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
                  value={perpanjangData.keterangan}
                  onChange={(e) => {
                    setPerpanjangData({
                      ...perpanjangData,
                      keterangan: e.target.value
                    })
                  }}
                />
              </div>

            </div>

            <div className="flex justify-end pt-2">
              <button 
                className="flex justify-end bg-mainColor rounded-xl px-3 py-2 text-white"
                onClick={submitPerpanjang}
              >
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