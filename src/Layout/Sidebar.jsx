import PropTypes from "prop-types";
import { Fragment } from "react";

const Sidebar = ({ show }) => {
  return (
    <Fragment>
      <aside
        className={`app-sidebar shadow ${show ? "" : "d-none"}`}
        style={{ overflowY: "hidden" }}
      >
        <div className={``}>
          <div className="user-panel py-3 d-flex justify-content-center align-items-center border-bottom">
            <p className="sidebar-logo  my-0">Parkirin Dong!</p>
          </div>

          {/* Menu */}
          <nav className="mt-4">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item mb-2" key="home">
                <a href="/" className="nav-link mx-4 align-items-center">
                  <p className="mb-0 py-1 sidebar-text">Beranda</p>
                </a>
              </li>
              <li className="nav-item mb-2" key="tambah">
                <a href="/tambah" className="nav-link mx-4 align-items-center">
                  <p className="mb-0 py-1 sidebar-text">Tambah Member</p>
                </a>
              </li>
              {/* {renderModuleItems(menuData)} */}
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
};

Sidebar.propTypes = {
  show: PropTypes.func.isRequired,
};

export default Sidebar;
