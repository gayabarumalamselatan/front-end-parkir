import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { AUTH_SERVICE_REGIST, AUTH_SERVICE_ROLE, AUTH_SERVICE_USER } from "../../Config/ConfigUrl"
import Swal from "sweetalert2"

const UserModal = ({
  isModalOpen,
  setIsModalOpen,
  userToDelete,
  userToEdit,
  fetchUsers
}) => {
  const initialUserData = {
    name: "",
    password: "",
    confirmPassword: "",
    role_id: 1,
    new_password: ""
  }
  const [userData, setUserData] = useState(initialUserData)
  const [roleData, setRoleData] = useState([])
  const [passwordError, setPasswordError] = useState('');
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [isDeletePasswordModalOpen, setIsDeletePasswordModalOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")

  const userId = parseInt(sessionStorage.getItem('userId'))

  useEffect(()=>{
    if(userToEdit){
      console.log('edit', userToEdit)
      setUserData({
        name: userToEdit.name,
        role_id: userToEdit.role_id
      })
    }
  },[userToEdit])
  

  const handleSubmit = async () => {
    if(!userToEdit){
      if (userData.password !== userData.confirmPassword) {
        console.log(userData.password, userData.confirmPassword)
        setPasswordError('Password tidak sesuai');
        return; 
      }
    } else if(userToEdit){
      if (userData.new_password !== userData.confirmPassword) {
        console.log(userData.password, userData.confirmPassword)
        setPasswordError('Password tidak sesuai');
        return; 
      }
    }
    
     const confirm = await Swal.fire({
        title: 'Yakin?',
        text: userToEdit ? `User ${userToEdit.name} akan diperbaharui` : "Pastikan data sudah terisi dengan benar.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: userToEdit ? 'Ya, Perbaharui!' : 'Kirim',
        reverseButtons: true
      })

      if(confirm.isConfirmed) {
        try {
          let response;
          if(userToEdit){
            let updatedUserData
            
            
            if(isChangePassword === true){
              console.log('ischange', isChangePassword)
              // eslint-disable-next-line no-unused-vars
              const { confirmPassword, ...dataToSubmit } = userData;
              updatedUserData = {
                ...dataToSubmit,
                id: userToEdit.id,
                is_change_password: true,
              }
            } else if(isChangePassword === false) {
              // eslint-disable-next-line no-unused-vars
              const { confirmPassword, new_password, password, ...dataToSubmit } = userData;
              updatedUserData = {
                ...dataToSubmit,
                id: userToEdit.id,
                is_change_password: false,
              }
            }
            
            response = await axios.put(`${AUTH_SERVICE_USER}`, updatedUserData)
          } else {
            // eslint-disable-next-line no-unused-vars
            const { confirmPassword, new_password, ...dataToSubmit } = userData;
            response = await axios.post(`${AUTH_SERVICE_REGIST}`, dataToSubmit)
          }

          if(response.status === 200) {
            Swal.fire({
              title: "Yes, Berhasil!",
              text: userToEdit ? `Pengguna ${userToEdit.name} berhasil diperbaharui.` : "Pengguna baru berhasil ditambahkan.",
              icon: "success",
              confirmButtonText: "OK"
            })
            setIsModalOpen(false)
            fetchUsers()
          }
        } catch (error) {
            console.error("Error adding menu:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ada yang salah nih!"
            });
        }
      }

  }

  const handleDelete = async () => {
    const dataToSend = {
      id: userToDelete.id,
      adminId: userId,
      password: deletePassword,
    }
    try {
      console.log('data', dataToSend)
      const response = await axios.delete(`${AUTH_SERVICE_USER}`, {data: dataToSend})
       if(response.status === 200) {
          Swal.fire({
            title: "Yes, Berhasil!",
            text: `Role ${userToDelete.name} berhasil dihapus!`,
            icon: "success",
            confirmButtonText: "OK"
          });
          setIsModalOpen(false)
          setIsDeletePasswordModalOpen(false)
          fetchUsers()
        }
    } catch (error) {
      console.error("Error Delete User:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ada yang salah nih!"
      });
    }
  }

  const fetchRoles = async () => {
    const response = await axios.get(`${AUTH_SERVICE_ROLE}`)
    setRoleData(response.data)
  }

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setUserData({
      ...userData,
      confirmPassword: value
    })
    console.log(value, userData.password)
    if(isChangePassword){
      if (value !== userData.new_password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    } else {
      if (value !== userData.password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  }

  useEffect(() => {
    fetchRoles()
  },[])

  useEffect(() => {
    if (!isModalOpen) {
      setUserData(initialUserData);
      setIsChangePassword(false)
      setPasswordError(''); 
    }
  }, [isModalOpen]);
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isModalOpen ? '':'hidden'}`}>
      <div className={`bg-white rounded-lg shadow-lg ${userToDelete? "w-1/3" : "w-1/2"}`}>
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">{userToDelete ? 'Hapus Pengguna' : userToEdit ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </div>
        {/* Modal Body */}
        {
          userToDelete ? 
          <div className="p-4">
            <div className="flex flex-grow">
              <div className="basis-full">
                Yakin mau hapus user {userToDelete.name}?
              </div>
            </div>
          </div>
          :
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                  User Name
                </label>
                <input
                  id="userName"
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({
                    ...userData,
                    name: e.target.value,
                  })}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your text here"
                />
              </div>
              {
                userToEdit ? 
                  isChangePassword ? 
                  <>
                    <div className="col-span-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password Lama
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={userData.password}
                        onChange={(e) => setUserData({
                          ...userData,
                          password: e.target.value,
                        })}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Enter your text here"
                      />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password Baru
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={userData.new_password}
                        onChange={(e) => setUserData({
                          ...userData,
                          new_password: e.target.value,
                        })}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Enter your text here"
                      />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={userData.confirmPassword}
                        onChange={(e) => setUserData({
                          ...userData,
                          confirmPassword: e.target.value,
                        })}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Enter your text here"
                      />
                    </div>
                  </>
                  :
                  <>
                  </>
                :
                <>
                  <div className="col-span-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={userData.password}
                      onChange={(e) => setUserData({
                        ...userData,
                        password: e.target.value,
                      })}
                      className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                      placeholder="Enter your text here"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Konfirmasi Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={userData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                      placeholder="Enter your text here"
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                  </div>
                </>
              }

              <div className="col-span-1">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={userData.role_id}
                  onChange={(e) => setUserData({
                    ...userData,
                    role_id: parseInt(e.target.value) || userData.role_id
                  })}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  <option value="" disabled>Select User</option>
                  {roleData.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        }
        
        {/* Modal Footer */}
        <div className="flex justify-end p-3 border-t">
          <button
            onClick={() => setIsModalOpen(false)}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          { 
          userToEdit && !userToDelete?  
          isChangePassword ? 
          <>
            <button 
              className="px-4 h-12 py-2 mr-2 bg-mainColor text-white rounded hover:bg-blue-950"
              onClick={() => setIsChangePassword(false)}
            >
              Batal ubah Password
            </button>
          </>
            :
            <>
              <button 
                className="px-4 h-12 py-2 mr-2 bg-mainColor text-white rounded hover:bg-blue-950"
                onClick={() => setIsChangePassword(true)}
              >
                Ubah password
              </button>
            </>
            :
            <></>
          }
          
          {
            userToDelete ? 
            <button
              onClick={() => setIsDeletePasswordModalOpen(true)}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              Ya, Hapus
            </button>
            :
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          }
        </div>
      </div>

      {isDeletePasswordModalOpen && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}>
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="text-lg font-semibold">Hapus Pengguna</h2>
              <button onClick={() => setIsDeletePasswordModalOpen(false)} className="text-gray-600 hover:text-gray-800">
                <FontAwesomeIcon icon={faTimes}/>
              </button>
            </div>
            <div className="p-4">
              <label>Masukkan password untuk menghapus pangguna {userToDelete.name}</label>
              <input
                type="password"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 mt-4"
                placeholder="Masukkan password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end p-3 border-t">
              <button
                onClick={() => setIsDeletePasswordModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

UserModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.bool,
  userToDelete: PropTypes.object,
  userToEdit: PropTypes.object,
  fetchUsers: PropTypes.func
}

export default UserModal