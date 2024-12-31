
import Menu from './Menu'; // Import the Menu component

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-10">
        <Menu /> {/* Render the Menu component */}
      </section>
    </div>
  );
};

export default Page;
