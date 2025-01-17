const TopDishes = () => {
  const topDishes = [
    {
      name: "Couscous",
      description: "Classic Algerian couscous with lamb,meat or chicken, and vegetables",
      image: "/images/couscous.jpg", 
      price: "1200 DA",
    },
    {
      name: "Chorba Frik",
      description: "Traditional wheat soup with lamb and spices",
      image: "/images/chorba.jpg",
      price: "500 DA",
    },
    {
      name: "Bourak",
      description: "Algerian bourak is a crispy pastry filled with spiced meat and potatoes.",
      image: "/images/bourak.jpg",
      price: "250 DA",
    },
  ];

  return (
    <div className="p-10"> 
      <h2 className="text-center text-customGreen text-8xl md:text-6xl font-bold leading-tight font-[PlayfairDisplay]">
        Top Dishes
      </h2>

      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
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
            <p className="text-customGreen font-semibold">{dish.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDishes;
