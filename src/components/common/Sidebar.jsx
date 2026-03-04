import { Link, useLocation } from "react-router-dom";
import { FaUser, FaShoppingCart, FaTachometerAlt } from "react-icons/fa";
import AdminDashboard from "../../pages/user/AdminDashboard";

const Sidebar = () => {
  
  const location = useLocation(); // For active link highlighting

  const menuItems = [
    { name: "Profile", path: "/user/profile", icon: <FaUser /> },
    { name: "Orders", path: "/user/orders", icon: <FaShoppingCart /> },
    { name: "Settings", path: "/user/settings", icon: <FaShoppingCart /> },
    { name: "AdminDashboard", path: "/user/admin", icon: <FaTachometerAlt /> },
    { name: "Order History", path: "/user/orderhistory", icon: <FaTachometerAlt /> }
  ];
  

  return (
    <aside className="w-64 bg-white shadow-2xl rounded-2xl p-6 flex flex-col space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <nav className="flex flex-col space-y-3">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 font-medium
              ${location.pathname === item.path 
                ? "bg-orange-500 text-white shadow-lg" 
                : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"}`}
          >
            {item.icon}
            {item.name}
           
          </Link>
          
        ))}
        
      </nav>
    </aside>
  );
};

export default Sidebar;