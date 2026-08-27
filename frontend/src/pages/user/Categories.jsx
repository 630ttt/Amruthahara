
import Navbar from "../../components/layout/Navbar";
const Categories = () => {
  const categories = [
    "Organic Flowers",
    "Natural Honey",
    "Organic Foods",
    "Farm Products",
    "Wellness Products",
  ];

  return (
    <div>
      <Navbar />
      <h1>Categories</h1>

      {categories.map((category) => (
        <div key={category}>
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;