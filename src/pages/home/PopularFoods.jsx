import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch, FaStar, FaFireAlt, FaThLarge } from "react-icons/fa";

const popularFoods = [
  // Pizza
  { id: 1, name: "Margherita Pizza", price: 12, rating: 4.8, badge: "Best Seller", image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 2, name: "Pepperoni Pizza", price: 14, rating: 4.7, badge: "Hot", image: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 3, name: "BBQ Chicken Pizza", price: 15, rating: 4.6, badge: "Trending", image: "https://images.pexels.com/photos/845811/pexels-photo-845811.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // Burgers
  { id: 4, name: "Cheeseburger", price: 8, rating: 4.7, badge: "Top Rated", image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 5, name: "Double Beef Burger", price: 11, rating: 4.6, badge: "Best Value", image: "https://images.pexels.com/photos/4109234/pexels-photo-4109234.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 6, name: "Crispy Chicken Burger", price: 10, rating: 4.5, badge: "Popular", image: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // Pasta
  { id: 7, name: "Spaghetti Carbonara", price: 10, rating: 4.6, badge: "Chef’s Pick", image: "https://images.pexels.com/photos/1435892/pexels-photo-1435892.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 8, name: "Penne Alfredo", price: 11, rating: 4.5, badge: "Creamy", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 9, name: "Lasagna", price: 13, rating: 4.6, badge: "Classic", image: "https://images.pexels.com/photos/4079520/pexels-photo-4079520.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // Sushi
  { id: 10, name: "California Roll", price: 15, rating: 4.5, badge: "Trending", image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 11, name: "Salmon Nigiri", price: 16, rating: 4.7, badge: "Fresh", image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 12, name: "Dragon Roll", price: 18, rating: 4.6, badge: "Premium", image: "https://images.pexels.com/photos/590477/pexels-photo-590477.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // Desserts
  { id: 13, name: "Chocolate Cake", price: 7, rating: 4.7, badge: "Sweet", image: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 14, name: "Ice Cream Sundae", price: 6, rating: 4.6, badge: "Chilled", image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 15, name: "Strawberry Cheesecake", price: 8, rating: 4.8, badge: "Best Seller", image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // Salads & Drinks
  { id: 16, name: "Caesar Salad", price: 9, rating: 4.4, badge: "Fresh", image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 17, name: "Greek Salad", price: 9, rating: 4.5, badge: "Light", image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 18, name: "Fresh Lemonade", price: 4, rating: 4.6, badge: "Refreshing", image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 19, name: "Iced Coffee", price: 5, rating: 4.5, badge: "Energy", image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // Breakfast / Snacks
  { id: 20, name: "Pancake Stack", price: 7, rating: 4.6, badge: "Breakfast", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 21, name: "French Toast", price: 8, rating: 4.5, badge: "Classic", image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 22, name: "Loaded Fries", price: 6, rating: 4.6, badge: "Snack", image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 23, name: "Chicken Wings", price: 12, rating: 4.6, badge: "BBQ", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 24, name: "Nachos", price: 9, rating: 4.5, badge: "Party", image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1600" },
];

const PopularFoods = () => {
  const [q, setQ] = useState("");
  const [view, setView] = useState("grid"); // grid | compact

  const filteredFoods = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return popularFoods;
    return popularFoods.filter((f) => f.name.toLowerCase().includes(t));
  }, [q]);

  return (
    <section className="py-14 bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 shadow-sm">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                  <FaFireAlt className="text-orange-500" />
                  <span className="text-sm font-semibold text-slate-700">
                    Updated popular list
                  </span>
                </div>

                <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Popular{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                    Foods
                  </span>
                </h2>

                <p className="mt-2 text-slate-600 max-w-xl">
                  More items, better cards, smoother effects — clean and modern UI.
                </p>
              </div>

              <div className="w-full lg:max-w-xl flex flex-col sm:flex-row gap-3 sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search popular foods..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300
                               shadow-sm"
                  />
                </div>

                {/* View toggle */}
                <button
                  type="button"
                  onClick={() => setView((v) => (v === "grid" ? "compact" : "grid"))}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl
                             bg-slate-900 text-white font-extrabold shadow-md hover:bg-slate-800 transition"
                  aria-label="Toggle view"
                >
                  <FaThLarge />
                  {view === "grid" ? "Compact" : "Grid"}
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Showing <span className="font-bold">{filteredFoods.length}</span> item(s)
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10">
          {filteredFoods.length === 0 ? (
            <div className="rounded-3xl bg-white border border-slate-200 p-10 text-center shadow-sm">
              <p className="text-slate-800 font-semibold">No results found.</p>
              <p className="text-slate-500 text-sm mt-1">Try a different keyword.</p>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              }
            >
              {filteredFoods.map((food) => (
                <Link
                  key={food.id}
                  to={`/menu/food/${food.id}`}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200
                             shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={food.image}
                      alt={food.name}
                      className={
                        view === "grid"
                          ? "w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                          : "w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                      }
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                    {/* badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-white/90 border border-white/60 text-slate-900">
                        {food.badge}
                      </span>
                    </div>

                    {/* rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 border border-white/60 text-xs font-extrabold text-slate-900">
                      <FaStar className="text-amber-500" />
                      {food.rating}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={view === "grid" ? "p-5" : "p-4"}>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                      {food.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-orange-600 font-extrabold text-xl">
                        ${food.price}
                      </p>

                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white
                                   bg-gradient-to-r from-orange-500 to-amber-400
                                   shadow-md shadow-orange-500/25
                                   group-hover:translate-x-1 transition"
                        aria-hidden="true"
                      >
                        <FaArrowRight />
                      </div>
                    </div>

                    {/* Hover CTA */}
                    <button
                      className="mt-4 w-full py-3 rounded-2xl text-sm font-extrabold text-white
                                 bg-slate-900 hover:bg-slate-800 transition
                                 opacity-0 group-hover:opacity-100"
                      type="button"
                      onClick={(e) => e.preventDefault()}
                    >
                      View Details
                    </button>
                  </div>

                  {/* shine */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularFoods;