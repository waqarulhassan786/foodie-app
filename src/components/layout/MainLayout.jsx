import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const MenuLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default MenuLayout;