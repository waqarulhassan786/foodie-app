import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

const menuFoods = [
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 12, rating: 4.8, image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg" },
  { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 14, rating: 4.7, image: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg" },
  { id: 3, name: "BBQ Chicken Pizza", category: "Pizza", price: 15, rating: 4.6, image: "https://images.pexels.com/photos/845811/pexels-photo-845811.jpeg" },

  { id: 4, name: "Cheeseburger", category: "Burgers", price: 8, rating: 4.7, image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg" },
  { id: 5, name: "Double Beef Burger", category: "Burgers", price: 11, rating: 4.6, image: "https://images.pexels.com/photos/4109234/pexels-photo-4109234.jpeg" },
  { id: 6, name: "Chicken Burger", category: "Burgers", price: 10, rating: 4.5, image: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg" },

  { id: 7, name: "Spaghetti Carbonara", category: "Pasta", price: 10, rating: 4.6, image: "https://images.pexels.com/photos/1435892/pexels-photo-1435892.jpeg" },
  { id: 8, name: "Penne Alfredo", category: "Pasta", price: 11, rating: 4.5, image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg" },
  { id: 9, name: "Lasagna", category: "Pasta", price: 13, rating: 4.6, image: "https://images.pexels.com/photos/4079520/pexels-photo-4079520.jpeg" },

  { id: 10, name: "California Roll", category: "Sushi", price: 15, rating: 4.5, image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg" },
  { id: 11, name: "Salmon Nigiri", category: "Sushi", price: 16, rating: 4.7, image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg" },

  { id: 12, name: "Chocolate Cake", category: "Desserts", price: 7, rating: 4.7, image: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg" },
  { id: 13, name: "Cheesecake", category: "Desserts", price: 8, rating: 4.8, image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg" },

  { id: 14, name: "Caesar Salad", category: "Salads", price: 9, rating: 4.4, image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg" },
  { id: 15, name: "Greek Salad", category: "Salads", price: 9, rating: 4.5, image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg" },

  { id: 16, name: "Fresh Lemonade", category: "Drinks", price: 4, rating: 4.6, image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg" },
  { id: 17, name: "Iced Coffee", category: "Drinks", price: 5, rating: 4.5, image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg" },

  { id: 18, name: "Grilled Salmon", category: "Seafood", price: 19, rating: 4.6, image: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg" },
  { id: 19, name: "Fish & Chips", category: "Seafood", price: 14, rating: 4.4, image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg" },

  { id: 20, name: "Pancake Stack", category: "Breakfast", price: 7, rating: 4.6, image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg" },
  { id: 21, name: "French Toast", category: "Breakfast", price: 8, rating: 4.5, image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg" },

  { id: 22, name: "Chicken Wings", category: "Snacks", price: 12, rating: 4.6, image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg" },
  { id: 23, name: "Loaded Fries", category: "Snacks", price: 6, rating: 4.6, image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg" },
];

export default function CategoryFoods() {

  const { category } = useParams();

  const decodedCategory = decodeURIComponent(category || "");

  const foods = useMemo(() => {
    return menuFoods.filter(
      (food) =>
        food.category.toLowerCase() === decodedCategory.toLowerCase()
    );
  }, [decodedCategory]);

  if (foods.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <h2 className="text-2xl font-bold mb-3">Category not found</h2>

          <Link
            to="/menu"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Back To Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] py-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">
            {decodedCategory}
          </h1>

          <Link
            to="/menu"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Back
          </Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {foods.map((food) => (
            <Link
              key={food.id}
              to={`/menu/food/${food.id}`}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >

              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">

                <h3 className="text-lg font-bold mb-2">
                  {food.name}
                </h3>

                <div className="flex justify-between items-center">

                  <span className="text-orange-500 font-bold">
                    ${food.price}
                  </span>

                  <span className="text-sm text-gray-600">
                    ⭐ {food.rating}
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}