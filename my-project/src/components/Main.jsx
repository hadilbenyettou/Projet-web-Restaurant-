import NavBar from './NavBar';
function Main() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center mt-8">
        {/* The image with full width and a max-width to make it large */}
        <img 
          src="/images/pic.avif" 
          alt="Background" 
          className="w-full max-w-[1400px] h-auto" 
        />
      </div>
    </div>
  );
}

export default Main