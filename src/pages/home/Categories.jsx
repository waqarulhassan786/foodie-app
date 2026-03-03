import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch, FaFilter } from "react-icons/fa";

const categories = [
  { name: "Pizza", image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Burgers", image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Pasta", image: "https://images.pexels.com/photos/1435892/pexels-photo-1435892.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Sushi", image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Salads", image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Desserts", image: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Drinks", image: "https://images.pexels.com/photos/1615196/pexels-photo-1615196.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Seafood", image: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Steak", image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Breakfast", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Fast Food", image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Vegan", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Smoothies", image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "BBQ", image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Ice Cream", image: "https://images.pexels.com/photos/301064/pexels-photo-301064.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { name: "Snacks", image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1600" },
];

export default function Categories() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute -top-28 -left-28 w-[22rem] h-[22rem] rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 w-[22rem] h-[22rem] rounded-full bg-amber-300/25 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="flex flex-col gap-7">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm">
                <span className="text-sm font-semibold text-slate-700">
                  Browse by category
                </span>
              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight">
                Explore{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                  Categories
                </span>
              </h1>

              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                A clean, modern and decent layout with smooth hover effects.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div className="relative w-full md:max-w-lg">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/90 border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300
                             shadow-sm"
                />
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3">
                <div className="px-4 py-3 rounded-2xl bg-white/80 border border-slate-200 shadow-sm text-sm font-semibold text-slate-700">
                  {filtered.length} Categories
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white font-bold shadow-md
                             hover:bg-slate-800 transition"
                >
                  <FaFilter />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
              <p className="text-slate-700 font-semibold">No categories found.</p>
              <p className="text-slate-500 text-sm mt-1">Try a different keyword.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7">
              {filtered.map((cat, idx) => (
                <Link
                  key={idx}
                  // ✅ FIX: encode category name safely
                  to={`/menu/category/${encodeURIComponent(cat.name)}`}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200
                             shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-36 sm:h-40 md:h-44 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="px-3 py-1.5 rounded-full bg-white/90 border border-white/60 backdrop-blur
                                      text-slate-900 text-sm font-extrabold truncate">
                        {cat.name}
                      </div>

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
                  </div>

                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}