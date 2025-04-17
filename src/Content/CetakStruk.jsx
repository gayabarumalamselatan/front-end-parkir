import { Fragment, useEffect, useState } from "react"
import { STRUK_SERVICE_API } from "../Config/ConfigUrl";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import { use } from "react";


const CetakStruk = () => {
  const [memberOption, setMemberOption] = useState([]);
  const [selectedMember, setSelectedMember] = useState();
  const [error, setError] = useState();
  const initialData = {
    nama_pemilik: '',
    tanggal_masuk: '',
    tanggal_kadaluarsa: '',
    bulanan: '',
    tanggal_bayar: new Date().toISOString().split('T')[0],
    jangka_perpanjang: 0,
    jumlah_pembayaran: 0,
    keterangan: '',
    kadaluarsa_berikutnya: '',
    nomor_polisi: '',
  }
  const [memberDicetak, setMemberDicetak] = useState(initialData);

  const fetchMember = async  () => {
    try {
      const response = await axios.get(`${STRUK_SERVICE_API}`);
      

      const latestStruk = {};

      response.data.data.forEach(item => {
        const {nomor_polisi, id} = item;

        // Yen nomor_polisi durung ana ing peta utawa id sing saiki luwih gedhe, engkas diowahi petane.
        if(!latestStruk[nomor_polisi] || id > latestStruk[nomor_polisi].id){
          latestStruk[nomor_polisi] = item;
        }
      })
      console.log('mapped', latestStruk)
      const mappedOption = Object.values(latestStruk).filter(item => !item.has_printed).map(item =>({
        id: item.id,
        value: item.nomor_polisi,
        label: item.nomor_polisi,
        nomor_polisi: item.nomor_polisi,
        nama_pemilik: item.nama_pemilik,
        tanggal_masuk: item.tanggal_masuk,
        tanggal_kadaluarsa: item.tanggal_kadaluarsa,
        bulanan: item.bulanan,
        tanggal_bayar: item.tanggal_bayar,
        jangka_perpanjang: item.untuk,
        jumlah_pembayaran: item.jumlah_pembayaran,
        keterangan: item.keterangan,
        kadaluarsa_berikutnya: item.kadaluarsa_berikutnya
      }))
      
      setMemberOption(mappedOption)
      
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchMember();
  },[])

  console.log('memberdicetak', memberDicetak)
  const selectMemberHandler = (e) => {
    if(e){
      setSelectedMember(e)
      setMemberDicetak({
        id: e.id,
        nomor_polisi: e.nomor_polisi,
        nama_pemilik: e.nama_pemilik,
        tanggal_masuk: e.tanggal_masuk.split('T')[0],
        tanggal_kadaluarsa: e.tanggal_kadaluarsa.split('T')[0],
        bulanan: e.bulanan,
        tanggal_bayar: new Date().toISOString().split('T')[0],
        jangka_perpanjang: e.jangka_perpanjang,
        jumlah_pembayaran: e.jumlah_pembayaran,
        keterangan: e.keterangan,
        kadaluarsa_berikutnya: e.kadaluarsa_berikutnya.split('T')[0],
      })
      setError()
    }else{
      setSelectedMember()
      setMemberDicetak(initialData)
    }
  }

  const submitCetak = async () => {
    if(!selectedMember) {
      const warn = await Swal.fire({
        title: 'Peringatan!',
        text: 'Harap pilih plat nomor terlebih dahulu.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })
      if(warn.isConfirmed) {
        setError('Isi plat nomor terlebih dahulu');
        return;
      }
    }

    const confirmCetak = await Swal.fire({
      title: 'Yakin?',
      text: 'Pastikan data sudah terisi dengan benar.',
      icon:'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonColor: '#004BA0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cetak',
      reverseButtons: true
    })

    if(confirmCetak.isConfirmed){
      setError();
      const dataToUpdate = {
        id: memberDicetak.id,
        has_printed: true,
      }
      
      try {
        const result = await axios.put(`${STRUK_SERVICE_API}`, dataToUpdate);
        if(result.status === 200) {
          Swal.fire({
            title: 'Yes, Berhasil!', 
            text: `${memberDicetak.nama_pemilik} berhasil dicetak.`,
            icon: 'success',
            confirmButtonText: 'OK'
          })
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
                {error && 
                  <p className="text-red-500">{error}</p>
                }
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

            <div className="flex justify-end mt-4">
              <button 
                onClick={submitCetak}
                className="bg-mainColor rounded-xl px-4 py-2 text-white">
                Cetak
              </button>
            </div>

          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default CetakStruk