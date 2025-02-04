import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Content/Home";
import Tambah from "../Content/Tambah";

const Content = () => {
  return (
    <Fragment>
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tambah" element={<Tambah />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default Content;
