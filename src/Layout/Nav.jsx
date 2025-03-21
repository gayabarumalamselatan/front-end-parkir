import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AUTH_SERVICE_LOGOUT } from "../Config/ConfigUrl";

const Nav = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const userId = parseInt(sessionStorage.getItem('userId'))

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${AUTH_SERVICE_LOGOUT}`, {
        userId
      })
      console.log(response)
      
    } catch (error) {
      console.error(error)
    }
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
    window.location.reload()
  };

  const showLogoutConfirm = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Anda yakin mau log out?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonColor: "red",
      confirmButtonText: "Logout",
      cancelButtonText: "Batal",
      reverseButtons:true
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  return (
    <Fragment>
      <nav className="app-header navbar navbar-expand bg-body h-16 shadow border-0">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon className="text-white" icon={faBars} />
              </a>
            </li>
          </ul>
          {/* <ul className='navbar-nav my-auto'>
          <li className='nav-item'>
            <span className='nav-link'>
              <Form.Check
                type="switch"
                id="custom-switch"
                onChange={setDarkmode}
                checked={isDarkmode}
              />
            </span>
          </li>
        </ul> */}
          {/* <ul className='navbar-nav my-auto'>
          <li className='nav-item'>
            
            <Form.Select
              className='py-auto my-auto'
              id='panjangdinamis'
              onChange={handleThemeChange}
            >
              <option value="">Pilih Tema</option>
              <option value="biru">Biru</option>
              <option value="merah">Merah</option>
            </Form.Select>
            
          </li>
        </ul> */}
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
            <span className="nav-link">
              {userName ? `${userName}` : ''} | Date: {currentBusinessDate}
            </span>
          </li> */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                role="button"
                onClick={showLogoutConfirm}
              >
                <FontAwesomeIcon className="text-white" icon={faSignOutAlt} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

Nav.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Nav;
