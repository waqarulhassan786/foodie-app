import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaSearch,
  FaStar,
  FaFilter,
  FaTags,
  FaLeaf,
  FaFireAlt,
  FaCrown,
} from "react-icons/fa";

/**
 * ✅ Bigger dataset + modern UI
 * - Search
 * - Category chips
 * - Price range filter
 * - Sort (popular/rating/price)
 * - Modern premium cards + smooth hover
 */

const menuFoods = [
  // PIZZA
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 12, rating: 4.8, badge: "Best Seller", icon: "crown", image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 14, rating: 4.7, badge: "Hot", icon: "fire", image: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 3, name: "BBQ Chicken Pizza", category: "Pizza", price: 15, rating: 4.6, badge: "Trending", icon: "fire", image: "https://images.pexels.com/photos/845811/pexels-photo-845811.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 4, name: "Veggie Delight Pizza", category: "Pizza", price: 13, rating: 4.6, badge: "Fresh", icon: "leaf", image: "https://images.pexels.com/photos/4109084/pexels-photo-4109084.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 5, name: "Four Cheese Pizza", category: "Pizza", price: 16, rating: 4.7, badge: "Premium", icon: "crown", image: "https://images.pexels.com/photos/1596888/pexels-photo-1596888.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // BURGERS
  { id: 6, name: "Cheeseburger", category: "Burgers", price: 8, rating: 4.7, badge: "Top Rated", icon: "crown", image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 7, name: "Double Beef Burger", category: "Burgers", price: 11, rating: 4.6, badge: "Best Value", icon: "tags", image: "https://images.pexels.com/photos/4109234/pexels-photo-4109234.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 8, name: "Crispy Chicken Burger", category: "Burgers", price: 10, rating: 4.5, badge: "Popular", icon: "fire", image: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 9, name: "Smoky BBQ Burger", category: "Burgers", price: 12, rating: 4.6, badge: "BBQ", icon: "fire", image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 10, name: "Veggie Burger", category: "Burgers", price: 9, rating: 4.4, badge: "Light", icon: "leaf", image: "https://images.pexels.com/photos/4109235/pexels-photo-4109235.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // PASTA
  { id: 11, name: "Spaghetti Carbonara", category: "Pasta", price: 10, rating: 4.6, badge: "Chef’s Pick", icon: "crown", image: "https://images.pexels.com/photos/1435892/pexels-photo-1435892.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 12, name: "Penne Alfredo", category: "Pasta", price: 11, rating: 4.5, badge: "Creamy", icon: "tags", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 13, name: "Classic Lasagna", category: "Pasta", price: 13, rating: 4.6, badge: "Classic", icon: "crown", image: "https://images.pexels.com/photos/4079520/pexels-photo-4079520.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 14, name: "Arrabbiata Pasta", category: "Pasta", price: 11, rating: 4.5, badge: "Spicy", icon: "fire", image: "https://images.pexels.com/photos/6287526/pexels-photo-6287526.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 15, name: "Pesto Pasta Bowl", category: "Pasta", price: 12, rating: 4.4, badge: "Fresh", icon: "leaf", image: "https://images.pexels.com/photos/4057733/pexels-photo-4057733.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // SUSHI
  { id: 16, name: "California Roll", category: "Sushi", price: 15, rating: 4.5, badge: "Trending", icon: "fire", image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 17, name: "Salmon Nigiri", category: "Sushi", price: 16, rating: 4.7, badge: "Fresh", icon: "leaf", image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 18, name: "Dragon Roll", category: "Sushi", price: 18, rating: 4.6, badge: "Premium", icon: "crown", image: "https://images.pexels.com/photos/590477/pexels-photo-590477.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 19, name: "Tuna Roll", category: "Sushi", price: 14, rating: 4.5, badge: "Popular", icon: "tags", image: "https://images.pexels.com/photos/8951199/pexels-photo-8951199.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 20, name: "Sashimi Platter", category: "Sushi", price: 22, rating: 4.7, badge: "Premium", icon: "crown", image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // DESSERTS
  { id: 21, name: "Chocolate Cake", category: "Desserts", price: 7, rating: 4.7, badge: "Sweet", icon: "tags", image: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 22, name: "Strawberry Cheesecake", category: "Desserts", price: 8, rating: 4.8, badge: "Best Seller", icon: "crown", image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 23, name: "Ice Cream Sundae", category: "Desserts", price: 6, rating: 4.6, badge: "Chilled", icon: "tags", image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 24, name: "Chocolate Brownie", category: "Desserts", price: 6, rating: 4.6, badge: "Warm", icon: "fire", image: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 25, name: "Fruit Parfait", category: "Desserts", price: 7, rating: 4.5, badge: "Light", icon: "leaf", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // SALADS
  { id: 26, name: "Caesar Salad", category: "Salads", price: 9, rating: 4.4, badge: "Fresh", icon: "leaf", image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 27, name: "Greek Salad", category: "Salads", price: 9, rating: 4.5, badge: "Light", icon: "leaf", image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 28, name: "Avocado Salad", category: "Salads", price: 10, rating: 4.6, badge: "Healthy", icon: "leaf", image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 29, name: "Chicken Salad Bowl", category: "Salads", price: 12, rating: 4.5, badge: "Protein", icon: "tags", image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // DRINKS
  { id: 30, name: "Fresh Lemonade", category: "Drinks", price: 4, rating: 4.6, badge: "Refreshing", icon: "leaf", image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 31, name: "Iced Coffee", category: "Drinks", price: 5, rating: 4.5, badge: "Energy", icon: "fire", image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 32, name: "Berry Smoothie", category: "Drinks", price: 6, rating: 4.6, badge: "Healthy", icon: "leaf", image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 33, name: "Mojito Mocktail", category: "Drinks", price: 7, rating: 4.6, badge: "Fresh", icon: "leaf", image: "https://images.pexels.com/photos/1615196/pexels-photo-1615196.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // SEAFOOD
  { id: 34, name: "Grilled Salmon", category: "Seafood", price: 19, rating: 4.6, badge: "Premium", icon: "crown", image: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 35, name: "Shrimp Platter", category: "Seafood", price: 17, rating: 4.5, badge: "Popular", icon: "tags", image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 36, name: "Fish & Chips", category: "Seafood", price: 14, rating: 4.4, badge: "Classic", icon: "tags", image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // BREAKFAST
  { id: 37, name: "Pancake Stack", category: "Breakfast", price: 7, rating: 4.6, badge: "Breakfast", icon: "tags", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 38, name: "French Toast", category: "Breakfast", price: 8, rating: 4.5, badge: "Classic", icon: "tags", image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 39, name: "Omelette Plate", category: "Breakfast", price: 9, rating: 4.5, badge: "Fresh", icon: "leaf", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600" },

  // SNACKS
  { id: 40, name: "Chicken Wings", category: "Snacks", price: 12, rating: 4.6, badge: "BBQ", icon: "fire", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 41, name: "Loaded Fries", category: "Snacks", price: 6, rating: 4.6, badge: "Snack", icon: "tags", image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 42, name: "Nachos", category: "Snacks", price: 9, rating: 4.5, badge: "Party", icon: "tags", image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1600" },
];

const iconFor = (key) => {
  const base = "text-white";
  if (key === "crown") return <FaCrown className={base} />;
  if (key === "leaf") return <FaLeaf className={base} />;
  if (key === "fire") return <FaFireAlt className={base} />;
  return <FaTags className={base} />;
};

const Menu = () => {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [sortBy, setSortBy] = useState("popular"); // popular | rating | priceLow | priceHigh
  const [maxPrice, setMaxPrice] = useState(25);

  const categories = useMemo(() => {
    const set = new Set(menuFoods.map((f) => f.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    let list = menuFoods;

    if (activeCat !== "All") list = list.filter((f) => f.category === activeCat);
    if (t) list = list.filter((f) => f.name.toLowerCase().includes(t));
    list = list.filter((f) => f.price <= maxPrice);

    const sorted = [...list];
    if (sortBy === "rating") sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sortBy === "priceLow") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [q, activeCat, sortBy, maxPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium header */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
          {/* subtle blobs */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                  <span className="text-sm font-semibold text-slate-700">
                    Premium Menu • Modern UI
                  </span>
                </div>

                <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Explore Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                    Menu
                  </span>
                </h2>

                <p className="mt-2 text-slate-600 max-w-xl">
                  Bigger menu list + search + category chips + sort + price slider.
                </p>
              </div>

              {/* Search + Sort */}
              <div className="w-full lg:max-w-xl flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search menu items..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300
                               shadow-sm"
                  />
                </div>

                <div className="relative">
                  <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300
                               shadow-sm text-sm font-semibold text-slate-700"
                  >
                    <option value="popular">Sort: Popular</option>
                    <option value="rating">Sort: Rating</option>
                    <option value="priceLow">Sort: Price (Low)</option>
                    <option value="priceHigh">Sort: Price (High)</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ▾
                  </span>
                </div>
              </div>
            </div>

            {/* Category chips */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((c) => {
                const active = c === activeCat;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCat(c)}
                    className={[
                      "whitespace-nowrap px-4 py-2 rounded-full text-sm font-extrabold transition",
                      active
                        ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md shadow-orange-500/20"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {/* Price slider */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:items-center">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-700">Max Price:</span>
                <span className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 font-extrabold border border-orange-100">
                  ${maxPrice}
                </span>
              </div>

              <input
                type="range"
                min={4}
                max={30}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-orange-500"
              />

              <p className="sm:col-span-2 text-sm text-slate-500">
                Showing <span className="font-extrabold">{filtered.length}</span> item(s)
                {activeCat !== "All" ? (
                  <>
                    {" "}
                    in <span className="font-extrabold">{activeCat}</span>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white border border-slate-200 p-10 text-center shadow-sm">
              <p className="text-slate-800 font-semibold">No items found.</p>
              <p className="text-slate-500 text-sm mt-1">
                Try another keyword, category, or increase max price.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((food) => (
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
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" />

                    {/* category tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-white/90 border border-white/60 text-slate-900">
                        {food.category}
                      </span>
                    </div>

                    {/* badge pill */}
                    {food.badge && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md shadow-orange-500/20">
                          {food.badge}
                        </span>
                      </div>
                    )}

                    {/* rating */}
                    {food.rating && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 border border-white/60 text-xs font-extrabold text-slate-900">
                        <FaStar className="text-amber-500" />
                        {food.rating}
                      </div>
                    )}

                    {/* mini icon chip */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-500/25">
                      {iconFor(food.icon)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {food.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-orange-600 font-extrabold text-xl">
                        ${food.price}
                      </p>

                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white
                                   bg-slate-900 shadow-md group-hover:bg-slate-800
                                   group-hover:translate-x-1 transition"
                        aria-hidden="true"
                      >
                        <FaArrowRight />
                      </div>
                    </div>

                    {/* CTA on hover */}
                    <button
                      type="button"
                      onClick={(e) => e.preventDefault()}
                      className="mt-4 w-full py-3 rounded-2xl text-sm font-extrabold text-white
                                 bg-gradient-to-r from-orange-500 to-amber-400
                                 shadow-[0_14px_35px_-20px_rgba(249,115,22,0.60)]
                                 hover:shadow-[0_18px_45px_-18px_rgba(249,115,22,0.80)]
                                 hover:-translate-y-[1px] transition
                                 opacity-0 group-hover:opacity-100"
                    >
                      View Details
                    </button>
                  </div>

                  {/* subtle shine */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;