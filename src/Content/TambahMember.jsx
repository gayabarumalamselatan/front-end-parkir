import { Fragment } from "react";

const TambahMember = () => {
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
                  type="text"
                  id="input1"
                  className="mt-2 block w-full ps-2 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Nama Pemilik
                </label>
                <input
                  type="text"
                  id="input1"
                  className="mt-2 block w-full ps-2 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  No. Hp
                </label>
                <input
                  type="text"
                  id="input1"
                  className="mt-2 block w-full ps-2 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Tanggal Masuk
                </label>
                <input
                  type="text"
                  id="input1"
                  className="mt-2 block w-full ps-2 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Biaya Bulanan
                </label>
                <input
                  type="text"
                  id="input1"
                  className="mt-2 block w-full ps-2 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="input1" className="block text-lg font-semibold text-mainColor">
                  Keterangan
                </label>
                <textarea
                  id="input1"
                  className="mt-2 block w-full ps-2 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 min-h-8"
                  placeholder="Enter value"
                />
              </div>

              <div className="flex justify-end col-span-2">
                <button className="flex justify-end bg-mainColor rounded-xl text-white px-3 py-2">
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
