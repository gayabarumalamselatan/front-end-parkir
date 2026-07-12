import { Fragment, lazy, Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Content/Home";
import PageNotFound from "../Content/PageNotFound";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import loadingScreen from '../animation/general-loading-anim.json'

const Content = ({menuData}) => {

  const loadComponent = (elementString) => {
    const Component = lazy(() => 
      import(`../Content/${elementString}.jsx`).catch(() => {
        return import('../Content/PageNotFound');
      })
    );
  
    return (
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen"> 
          <Lottie 
            animationData={loadingScreen}
            style={{
              width: "150px",
              height:"auto"
            }}  
          />
        </div>
      }>
        <Component />
      </Suspense>
    );
  };

const dynamicRoutes = useMemo(() => {
  const menuReturn = menuData ? menuData.flatMap(module => {
    if (module.menus && module.menus.length > 0) {
      return module.menus
        .filter(menu => menu.url && menu.element)
        .map(menu => ({
          path: menu.url,
          element: loadComponent(menu.element)
        }));
    } else {
      return [{
        path: module.module_url,
        element: loadComponent(module.module_element) 
      }];
    }
  }) : [];
  
  return menuReturn;
}, [menuData]); // Add menuData as a dependency



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
