
const Prank = () => {
  return (
    <>
       <h1 className="text-center font-bold text-5xl mt-4">Manajemen Akuntansi</h1>
      <div className="flex items-center justify-center mt-9">
        <div className="grid grid-cols-3 gap-2"> {/* Change to 3 columns for horizontal layout */}
          <div className="col-span-1">
            <div className="group">
              <img
                src="../../public/dist/assets/img/prank1.jpg"
                alt=""
                className="w-72 h-auto object-cover filter grayscale group-hover:grayscale-0 transition duration-300"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="group">
              <img
                src="../../public/dist/assets/img/prank2.jpg"
                alt=""
                className="w-72 h-auto object-cover filter grayscale group-hover:grayscale-0 transition duration-300"
              />
            </div>
          </div>
            <div className="col-span-1">
              <div className="group">
                <img
                  src="./../public/dist/assets/img/prank3.jpg"
                  alt=""
                  className="w-72 h-auto object-cover filter grayscale group-hover:grayscale-0 transition duration-300"
                />
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Prank