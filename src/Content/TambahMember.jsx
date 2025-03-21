import axios from "axios";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { MEMBER_SERVICE_API } from "../Config/ConfigUrl";

const TambahMember = () => {

  const [errors, setErrors] = useState({});
  const [datamember, setDataMember] = useState({
    nomor_polisi: '',
    nomor_pengganti: '',
    nama_pemilik: '',
    nomor_hp: '',
    tanggal_masuk: new Date().toISOString().split('T')[0],
    bulanan: 0,
    keterangan: ''
  })

  const requiredFields = [
    { key: 'nomor_polisi', label: 'Nomor Polisi' },
    { key: 'nama_pemilik', label: 'Nama Pemilik' },
    { key: 'nomor_hp', label: 'Nomor HP' },
    { key: 'tanggal_masuk', label: 'Tanggal Masuk' },
    { key: 'bulanan', label: 'Biaya Bulanan' },
  ];

  console.log(datamember)

  const handleSubmit = async () => {
    const newErrors = {};

    if (!datamember.nomor_polisi || !datamember.nama_pemilik || !datamember.nomor_hp || !datamember.tanggal_masuk || !datamember.bulanan ) {
      const req = await Swal.fire({
        title: "Peringatan!",
        text: "Semua field harus diisi.",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      if(req.isConfirmed){
        requiredFields.forEach(field => {
          if (!datamember[field.key]) {
            newErrors[field.key] = `${field.label} harus diisi.`;
          }
        });
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        }
        return; 
      }
    }

    const confirm = await Swal.fire({
      title: "Yakin?",
      text: "Pastikan data sudah terisi dengan benar.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Kirim',
      reverseButtons: true
    })

    if(confirm.isConfirmed){
      console.log('hello')
      setErrors({})
      try {
        const response = await axios.post(`${MEMBER_SERVICE_API}`, datamember)
        if(response.status === 200) {
          Swal.fire({
            title: "Yes, Berhasil!",
            text: "Member baru berhasil ditambahkan.",
            icon: 'success',
            confirmButtonText: "OK"
          })
        }
      } catch (error) {
        console.error("Error adding member",error);
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
              <h1 className="font-semibold text-3xl text-mainColor">Tambah Member</h1>
            </div>
            <div className="col-sm-6 ">
              <ol className="breadcrumb float-sm-end text-end">
                <li className="breadcrumb-item text-mainColor">
                  <a href="/">Beranda</a>
                </li>
                <li className="breadcrumb-item active">Tambah Member</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className=" mx-4 mb-4 border-0 rounded-mainCard shadow-cardShadow bg-white">
        <div className="card-header border-none">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Nomor Polisi
                </label>
                <input
                  onChange={(e) => setDataMember({
                    ...datamember,
                    nomor_polisi: e.target.value
                  })}
                  value={datamember.nomor_polisi}
                  type="text"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
                {errors.nomor_polisi && <p className="text-red-500 text-sm">{errors.nomor_polisi}</p>}
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Nomor Ganti
                </label>
                <input
                  onChange={(e) => setDataMember({
                    ...datamember,
                    nomor_pengganti: e.target.value
                  })}
                  type="text"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Nama Pemilik
                </label>
                <input
                  onChange={(e)=>setDataMember({
                    ...datamember,
                    nama_pemilik: e.target.value
                  })}
                  value={datamember.nama_pemilik}
                  type="text"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
                {errors.nama_pemilik && <p className="text-red-500 text-sm">{errors.nama_pemilik}</p>}
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  No. Hp
                </label>
                <input
                  onChange={(e)=>setDataMember({
                    ...datamember,
                    nomor_hp: e.target.value
                  })}
                  value={datamember.nomor_hp}
                  type="text"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
                {errors.nomor_hp && <p className="text-red-500 text-sm">{errors.nomor_hp}</p>}
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Tanggal Masuk
                </label>
                <input
                  onChange={(e)=>setDataMember({
                    ...datamember,
                    tanggal_masuk: e.target.value
                  })}
                  value={datamember.tanggal_masuk}
                  type="date"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Biaya Bulanan
                </label>
                <input
                  onChange={(e)=>{ 
                    const value = e.target.value
                    setDataMember({
                      ...datamember,
                      bulanan: value ? parseInt(value, 10) : 0 
                    })}
                  }
                  value={datamember.bulanan}
                  type="text"
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
                {errors.bulanan && <p className="text-red-500 text-sm">{errors.bulanan}</p>}
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Keterangan
                </label>
                <textarea
                  onChange={(e)=>setDataMember({
                    ...datamember,
                    keterangan: e.target.value
                  })}
                  value={datamember.keterangan}
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 min-h-8"
                  placeholder="Enter value"
                />
              </div>

              <div className="flex justify-end col-span-2">
                <button 
                  className="flex justify-end bg-mainColor rounded-xl text-white px-3 py-2"
                  onClick={handleSubmit}
                >
                  Tambah Member
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TambahMember;
