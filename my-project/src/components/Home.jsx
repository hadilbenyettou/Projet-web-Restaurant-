function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-8 max-w-[1400px] mx-auto">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-start p-8 md:w-1/2">
        <h1 className="text-customGreen text-8xl md:text-7xl font-bold leading-tight font-[PlayfairDisplay]">
          Welcome to Fork & Spoon
        </h1>
        <p className="text-gray-800 text-xl md:text-2xl mt-4 font-light">
          Experience the perfect blend of freshness, flavor, and elegance in every bite.
        </p>
      </div>

      {/* The image */}
      <div className="md:w-1/2">
        <img 
          src="/images/couscous.png" 
          alt="Background" 
          className="w-full h-auto rounded-lg "
        />
      </div>
    </div>
  );
}

export default Home;
