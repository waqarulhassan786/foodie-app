import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa";

const categories = [
  {
    name: "Pizza",
    image:
      "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Burgers",
    image:
      "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Pasta",
    image:
      "https://images.pexels.com/photos/1435892/pexels-photo-1435892.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Sushi",
    image:
      "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const popularFoods = [
  {
    name: "Margherita Pizza",
    price: 12,
    image:
      "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Best Seller",
    rating: 4.8,
  },
  {
    name: "Cheeseburger",
    price: 8,
    image:
      "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Top Rated",
    rating: 4.7,
  },
  {
    name: "Spaghetti Carbonara",
    price: 10,
    image:
      "https://images.pexels.com/photos/1435892/pexels-photo-1435892.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Chef’s Pick",
    rating: 4.6,
  },
  {
    name: "California Roll",
    price: 15,
    image:
      "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Trending",
    rating: 4.5,
  },
];

const Home = () => {
  const stats = useMemo(
    () => [
      { label: "Avg Delivery", value: "25 min" },
      { label: "Customers", value: "12k+" },
      { label: "Menu Items", value: "200+" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] text-slate-900 font-sans">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Soft color blobs */}
        <div className="absolute -top-28 -left-28 w-[26rem] h-[26rem] rounded-full bg-orange-300/35 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 w-[26rem] h-[26rem] rounded-full bg-amber-300/30 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-slate-200 backdrop-blur text-sm font-semibold text-slate-700 shadow-sm">
                ✨ Fresh • Fast • Delicious
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                Delicious food,
                <span className="block">
                  delivered{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                    fast
                  </span>
                  .
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl">
                Explore trending meals and order in seconds. Modern menu, fresh
                ingredients, and quick delivery — all in one place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/menu"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl
                             bg-gradient-to-r from-orange-500 to-amber-400 text-white font-extrabold
                             shadow-[0_14px_35px_-18px_rgba(249,115,22,0.65)]
                             hover:shadow-[0_18px_45px_-18px_rgba(249,115,22,0.80)]
                             transition hover:-translate-y-[2px]"
                >
                  Explore Menu
                  <FaArrowRight className="group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  to="/popular"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl
                             bg-white text-slate-900 font-extrabold border border-slate-200
                             hover:bg-slate-50 hover:-translate-y-[2px] transition shadow-sm"
                >
                  See Popular
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/70 border border-slate-200 backdrop-blur px-4 py-3
                               shadow-sm hover:shadow-md hover:-translate-y-[2px] transition"
                  >
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="text-lg font-extrabold">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
                <div className="p-6 sm:p-7">
                  <p className="text-sm font-semibold text-slate-600">
                    Today’s Pick
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                    Pepperoni Pizza
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Crispy base, premium cheese, fresh toppings — ready in
                    minutes.
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Starting from</p>
                      <p className="text-2xl font-extrabold text-orange-600">
                        $9.99
                      </p>
                    </div>
                    <Link
                      to="/menu"
                      className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-extrabold
                                 hover:bg-slate-800 transition shadow-md"
                    >
                      Order
                    </Link>
                  </div>
                </div>

                <div className="h-44 sm:h-52 relative">
                  <img
                    src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Featured Pizza"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Categories
              </h2>
              <p className="mt-2 text-slate-600">
                Choose a category and explore meals you’ll love.
              </p>
            </div>

            <Link
              to="/categories"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition"
            >
              View all <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-7">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/menu/category/${cat.name}`}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg
                           hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-44 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="px-3 py-1.5 rounded-full bg-white/90 border border-white/60 text-sm font-extrabold text-slate-900">
                      {cat.name}
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 flex items-center justify-center text-white
                                    shadow-md group-hover:translate-x-1 transition">
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="sm:hidden mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition"
            >
              View all <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#fff7ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Popular Foods
              </h2>
              <p className="mt-2 text-slate-600">
                Top picks people order again and again.
              </p>
            </div>

            <Link
              to="/popular"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition"
            >
              View all <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularFoods.map((food, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg
                           hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                <div className="relative">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-white/90 border border-white/60 text-slate-900">
                      {food.badge}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 border border-white/60 text-xs font-extrabold text-slate-900">
                    <FaStar className="text-amber-500" />
                    {food.rating}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {food.name}
                  </h3>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-orange-600 font-extrabold text-xl">
                      ${food.price}
                    </p>

                    <Link
                      to="/menu"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white font-extrabold text-sm
                                 hover:bg-slate-800 transition shadow-md"
                    >
                      Order <FaArrowRight />
                    </Link>
                  </div>

                  <button
                    className="mt-4 w-full py-3 rounded-2xl text-sm font-extrabold text-white
                               bg-gradient-to-r from-orange-500 to-amber-400
                               shadow-[0_14px_35px_-20px_rgba(249,115,22,0.60)]
                               hover:shadow-[0_18px_45px_-18px_rgba(249,115,22,0.80)]
                               hover:-translate-y-[1px] transition
                               opacity-0 group-hover:opacity-100"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* gentle shine effect */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl" />
                </div>
              </div>
            ))}
          </div>

          <div className="sm:hidden mt-8">
            <Link
              to="/popular"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition"
            >
              View all <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;