import { Link, useLocation } from "react-router-dom";
import { FaUser, FaShoppingCart, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Profile", path: "/user/profile", icon: <FaUser /> },
    { name: "Orders", path: "/user/orders", icon: <FaShoppingCart /> },
    { name: "Settings", path: "/user/settings", icon: <FaShoppingCart /> },
    { name: "AdminDashboard", path: "/user/admin", icon: <FaTachometerAlt /> },
    { name: "Order History", path: "/user/orderhistory", icon: <FaTachometerAlt /> },
  ];

  return (
    // ✅ Responsive: bottom nav on mobile, sidebar on md+
    <aside
      className="
        fixed md:sticky z-50
        bottom-0 left-0 md:top-0
        w-full md:w-64
        bg-white/95 backdrop-blur
        border-t md:border-t-0 md:border-r border-slate-200
        shadow-[0_-8px_30px_-20px_rgba(0,0,0,0.35)] md:shadow-2xl
        md:rounded-2xl
        px-3 py-2 md:p-6
      "
    >
      {/* ✅ Hide title on mobile, show on desktop */}
      <h2 className="hidden md:block text-2xl font-bold text-gray-800 mb-6">
        Dashboard
      </h2>

      {/* ✅ Mobile: horizontal scroll nav | Desktop: vertical nav */}
      <nav className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
        {menuItems.map((item, idx) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={idx}
              to={item.path}
              className={[
                "flex items-center gap-2 md:gap-3",
                "px-3 py-2.5 md:p-3",
                "rounded-xl transition-all duration-300 font-medium",
                "shrink-0", // important for horizontal scroll
                active
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-100 hover:text-orange-500",
              ].join(" ")}
            >
              <span className="text-lg">{item.icon}</span>

              {/* ✅ Mobile: show labels, but keep them compact */}
              <span className="text-sm md:text-base whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;