import React, { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaStar, FaHeart, FaShieldAlt } from "react-icons/fa";

/**
 * ✅ Premium Food Details UI
 * - modern hero card (image + glass overlay)
 * - rating + reviews UI
 * - qty selector + total price
 * - add to cart + wishlist
 * - related items (same category)
 */

const menuFoods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 12,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Classic Margherita Pizza with fresh mozzarella, basil leaves, and tangy tomato sauce.",
    tags: ["Classic", "Cheesy", "Fresh"],
  },
  {
    id: 2,
    name: "Cheeseburger",
    category: "Burgers",
    price: 8,
    rating: 4.7,
    reviews: 98,
    image:
      "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Juicy beef patty with melted cheese, fresh lettuce, tomato, and our special sauce.",
    tags: ["Juicy", "Top Rated", "Saucy"],
  },
  {
    id: 3,
    name: "Spaghetti Carbonara",
    category: "Pasta",
    price: 10,
    rating: 4.6,
    reviews: 73,
    image:
      "https://images.pexels.com/photos/1435892/pexels-photo-1435892.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Traditional Italian pasta with creamy sauce, pancetta, and parmesan cheese.",
    tags: ["Creamy", "Italian", "Comfort"],
  },
  {
    id: 4,
    name: "California Roll",
    category: "Sushi",
    price: 15,
    rating: 4.5,
    reviews: 56,
    image:
      "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Fresh sushi roll with crab, avocado, cucumber, and seasoned rice.",
    tags: ["Fresh", "Light", "Trending"],
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 7,
    rating: 4.8,
    reviews: 142,
    image:
      "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Rich and moist chocolate cake topped with creamy chocolate ganache.",
    tags: ["Rich", "Sweet", "Best Seller"],
  },
  {
    id: 6,
    name: "Caesar Salad",
    category: "Salads",
    price: 9,
    rating: 4.4,
    reviews: 41,
    image:
      "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
    tags: ["Fresh", "Light", "Healthy"],
  },

  // ✅ extra items for related section
  {
    id: 7,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 14,
    rating: 4.7,
    reviews: 88,
    image:
      "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description: "Spicy pepperoni, extra cheese, and a crispy base.",
    tags: ["Hot", "Cheesy", "Popular"],
  },
  {
    id: 8,
    name: "BBQ Chicken Pizza",
    category: "Pizza",
    price: 15,
    rating: 4.6,
    reviews: 64,
    image:
      "https://images.pexels.com/photos/845811/pexels-photo-845811.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description: "Smoky BBQ sauce, chicken chunks, and onions.",
    tags: ["Smoky", "Trending", "BBQ"],
  },
  {
    id: 9,
    name: "Double Beef Burger",
    category: "Burgers",
    price: 11,
    rating: 4.6,
    reviews: 77,
    image:
      "https://images.pexels.com/photos/4109234/pexels-photo-4109234.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description: "Double patty, melted cheese, and house sauce.",
    tags: ["Big", "Juicy", "Value"],
  },
];

const FoodDetails = () => {
  const { foodId } = useParams();
  const food = menuFoods.find((f) => f.id === Number(foodId));

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const related = useMemo(() => {
    if (!food) return [];
    return menuFoods
      .filter((x) => x.category === food.category && x.id !== food.id)
      .slice(0, 4);
  }, [food]);

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc]">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-10 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">Food not found</h2>
          <p className="text-slate-600 mt-2">Please go back and choose another item.</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-2xl bg-slate-900 text-white font-extrabold hover:bg-slate-800 transition"
          >
            <FaArrowLeft /> Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const total = (food.price * qty).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top actions */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm
                       text-slate-700 font-bold hover:bg-slate-50 transition"
          >
            <FaArrowLeft />
            Back to Menu
          </Link>

          <button
            type="button"
            onClick={() => setLiked((p) => !p)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border shadow-sm font-bold transition ${
              liked
                ? "bg-orange-50 border-orange-200 text-orange-700"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
            aria-label="Add to wishlist"
          >
            <FaHeart className={liked ? "text-orange-500" : "text-slate-500"} />
            {liked ? "Saved" : "Wishlist"}
          </button>
        </div>

        {/* Main premium card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          {/* subtle blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-72 sm:h-[420px] lg:h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />

              {/* category pill */}
              <div className="absolute top-5 left-5">
                <span className="px-4 py-2 rounded-full text-xs font-extrabold bg-white/90 border border-white/60 text-slate-900 shadow-sm">
                  {food.category}
                </span>
              </div>

              {/* rating pill */}
              <div className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-white/60 text-slate-900 shadow-sm">
                <FaStar className="text-amber-500" />
                <span className="text-sm font-extrabold">{food.rating}</span>
                <span className="text-xs text-slate-500">({food.reviews})</span>
              </div>
            </div>

            {/* Details side */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {food.name}
              </h1>

              <p className="mt-3 text-slate-600">{food.description}</p>

              {/* tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {(food.tags || []).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-orange-50 text-orange-700 border border-orange-100"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* price + trust */}
              <div className="mt-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500">Price</p>
                  <p className="text-3xl font-extrabold text-orange-600">
                    ${food.price}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <FaShieldAlt className="text-orange-500" />
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">Hygiene</p>
                    <p className="text-[11px] text-slate-500 -mt-0.5">
                      Sealed packaging
                    </p>
                  </div>
                </div>
              </div>

              {/* qty + total */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-4">
                  <p className="text-xs font-bold text-slate-500">Quantity</p>

                  <div className="mt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setQty((v) => Math.max(1, v - 1))}
                      className="w-11 h-11 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-extrabold text-slate-700 transition"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <div className="text-center">
                      <p className="text-xl font-extrabold text-slate-900">{qty}</p>
                      <p className="text-[11px] text-slate-500 -mt-0.5">items</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setQty((v) => v + 1)}
                      className="w-11 h-11 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-extrabold text-slate-700 transition"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-4">
                  <p className="text-xs font-bold text-slate-500">Total</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">
                    ${total}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Includes item price only
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl
                             bg-gradient-to-r from-orange-500 to-amber-400 text-white font-extrabold
                             shadow-[0_14px_35px_-20px_rgba(249,115,22,0.60)]
                             hover:shadow-[0_18px_45px_-18px_rgba(249,115,22,0.80)]
                             hover:-translate-y-[1px] transition"
                >
                  <FaShoppingCart />
                  Add to Cart
                  <FaArrowRight className="group-hover:translate-x-1 transition" />
                </button>

                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl
                             bg-slate-900 text-white font-extrabold hover:bg-slate-800 transition shadow-md"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related items */}
        {related.length > 0 && (
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Related <span className="text-orange-600">{food.category}</span>
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  You may also like these.
                </p>
              </div>

              <Link
                to={`/menu/category/${food.category}`}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition"
              >
                View more <FaArrowRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((x) => (
                <Link
                  key={x.id}
                  to={`/menu/food/${x.id}`}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md
                             hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                >
                  <div className="relative">
                    <img
                      src={x.image}
                      alt={x.name}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-white/90 border border-white/60 text-slate-900">
                        {x.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 border border-white/60 text-xs font-extrabold text-slate-900">
                      <FaStar className="text-amber-500" />
                      {x.rating}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="font-extrabold text-slate-900">{x.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-orange-600 font-extrabold">${x.price}</p>
                      <span className="w-9 h-9 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:translate-x-1 transition">
                        <FaArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="sm:hidden mt-5">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition"
              >
                View more <FaArrowRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;