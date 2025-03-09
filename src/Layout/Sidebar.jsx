import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = ({ show, menuData }) => {
  const location = useLocation();
  const [openModules, setOpenModules] = useState({});
  const [activeItems, setActiveItems] = useState({
    menuId: null
  });

  useEffect(() => {
    if (location.pathname !== "/") {
      if (Array.isArray(menuData)) {
        menuData.forEach(module => {
          if (Array.isArray(module.menus)) {
            module.menus.forEach(menu => {
              if (menu.url === location.pathname) {
                setActiveItems({ menuId: menu.id });
                setOpenModules(prevState => ({ ...prevState, [module.id]: true }));
              }
            });
          }
        });
      }
    } else {
      setActiveItems({ menuId: null });
    }
  }, [location.pathname, menuData]);

  const toggleModule = (module) => {
    console.log('module', module)
    if (module.menus) {
      setOpenModules(prevState => ({
        ...prevState,
        [module.id]: !prevState[module.id]
      }));
    }
  };

  const handleMenuClick = (menu) => {
    setActiveItems({ menuId: menu.id });
  };

  const renderModuleItems = (modules) => {
    if (!Array.isArray(modules)) {
      return null;
    }
    // return modules.map(module => (
    //   <li className={`nav-item ${activeItems.moduleId === module.id ? 'bg-sidebarBg' : ''}`} key={module.id}>
    //     <a 
    //       href={module.module_url || '#'} 
    //       className="nav-link nav-link mx-4 align-items-center" 
    //       onClick={() => toggleModule(module)}
    //     >
    //       <p className="mb-0 py-1 sidebar-text">{module.module_name}</p>
    //     </a>
    //     {openModules[module.id] && module.menus && module.menus.length > 0 && (
    //       <ul className="nav nav-treeview">
    //         {module.menus.map(menu => (
    //           <li className="nav-item w-100" key={menu.id}>
    //             <a
    //               href={menu.url || '#'}
    //               className={`nav-link mx-4 align-items-center ${activeItems.menuId === menu.id ? 'bg-sidebarBg' : ''}`}
    //               onClick={() => handleMenuClick(menu)}
    //             >
    //               <p className="mb-0 py-1 sidebar-text">{menu.menu_name}</p>
    //             </a>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </li>
    // ));

    return modules.map(module => {
      const isModuleOpen = openModules[module.id]; // Check if the module is open
  
      return (
        <li className={`nav-item mx-4 ${isModuleOpen? 'sidebar-active' : ''}`} key={module.id}>
          <a 
            href={module.module_url || '#'} 
            className= {`nav-link nav-link align-items-center ${isModuleOpen ? 'bg-sidebarBg' : ''}`}
            onClick={() => toggleModule(module)}
          >
            <p className="mb-0 py-1 sidebar-text">{module.module_name}</p>
          </a>
          {isModuleOpen && module.menus && module.menus.length > 0 && (
            <ul className="nav nav-treeview">
              {module.menus.map(menu => (
                <li className="nav-item w-100" key={menu.id}>
                  <a
                    href={menu.url || '#'}
                    className={`nav-link align-items-center ${activeItems.menuId === menu.id ? 'sidebar-active' : ''}`}
                    onClick={() => handleMenuClick(menu)}
                  >
                    <p className="mb-0 py-1 sidebar-text">{menu.menu_name}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <Fragment>
      <aside
        className={`app-sidebar shadow ${show ? "" : "d-none"}`}
        style={{ overflowY: "hidden" }}
      >
        <div>
          <div className="user-panel py-3 d-flex justify-content-center align-items-center border-bottom">
            <p className="sidebar-logo my-0">Parkirin Dong!</p>
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
                <a href="/" className={`nav-link mx-4 align-items-center`}>
                  <p className="mb-0 py-1 sidebar-text">Beranda</p>
                </a>
              </li>
              {renderModuleItems(menuData)}
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
};

Sidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  menuData: PropTypes.array.isRequired
};

export default Sidebar;
