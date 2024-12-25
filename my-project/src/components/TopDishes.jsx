const TopDishes = () => {
  const topDishes = [
    {
      name: "Couscous",
      description: "Classic Algerian couscous with lamb, chicken, and vegetables",
      image: "/images/couscous.jpg", // Replace with your image path
      price: "1200 DA",
    },
    {
      name: "Chorba Frik",
      description: "Traditional wheat soup with lamb and spices",
      image: "/images/chorba.jpg", // Replace with your image path
      price: "500 DA",
    },
    {
      name: "Makroud",
      description: "Semolina cookies filled with dates and honey",
      image: "/images/makroud.jpg", // Replace with your image path
      price: "250 DA",
    },
  ];

  return (
    <div className="p-10 bg-[url('/images/poids.jpg')]"> {/* Light beige background */}
      <h2 className="text-center text-green-800 text-6xl font-bold mb-10">
        Top Dishes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {topDishes.map((dish, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-60 object-cover rounded-xl mb-6"
            />
            <h3 className="text-brown-700 text-2xl font-bold mb-2">{dish.name}</h3>
            <p className="text-gray-700 text-sm mb-4">{dish.description}</p>
            <p className="text-green-700 font-semibold">{dish.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDishes;
