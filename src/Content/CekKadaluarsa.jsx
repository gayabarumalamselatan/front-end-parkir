import { Fragment } from "react"

const CekKadaluarsa = () => {
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
                <input
                 
                  className="mt-2 block w-full ps-3 p-2 border border-gray-300 rounded-lg shadow-sm"
                  type="text"
                  placeholder="Masukkan Plat Nomor"
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