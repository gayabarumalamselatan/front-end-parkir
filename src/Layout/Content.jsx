import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Content/Home";
import PageNotFound from "../Content/PageNotFound";
import PropTypes from "prop-types";


const Content = ({menuData}) => {

  const loadComponent = (elementString) => {
    const Component = lazy(() => 
      import(`../Content/${elementString}.jsx`).catch(() => {
        return import('../Content/PageNotFound');
      })
    );
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    );
  };
  

  const getDynamicRoutes = () => {
    const menuReturn = menuData ? menuData.flatMap(module => {
      // Check if the module has menus
      if (module.menus && module.menus.length > 0) {
        console.log("asdd",module.menus)
        return module.menus
        .filter(menu => menu.url && menu.element)
        .map(menu => ({
            path: menu.url,
            element: loadComponent(menu.element)
        }));
      } else {
        console.log(menuData)
        return [{
          path: module.module_url,
          element: loadComponent(module.module_element) 
        }];
      }
   }) : [];
    return menuReturn
  };

  const dynamicRoutes = getDynamicRoutes()

  console.log('syn', menuData)

  return (
    <Fragment>
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          {dynamicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Fragment>
  );
};

Content.propTypes = {
  menuData: PropTypes.array.isRequired
};

export default Content;
