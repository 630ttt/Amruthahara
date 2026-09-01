import { Link } from "react-router-dom";

const FILTERS = [
  { to: "/our-story", label: "All" },
  { to: "/organic-living", label: "Organic Living" },
  { to: "/honey", label: "Honey" },
  { to: "/flower-traditions", label: "Flower Traditions" },
  { to: "/farming", label: "Farming" },
  { to: "/recipes", label: "Recipes" },
  { to: "/farmer-stories", label: "Farmer Stories" },
  { to: "/seasonal-produce", label: "Seasonal Produce" },
  { to: "/wellness", label: "Wellness" },
];

function JournalFilters({ active }) {
  return (
    <nav className="ah-journal-filters" aria-label="Journal categories">
      {FILTERS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`ah-journal-filter${
            active === item.to ? " is-active" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default JournalFilters;
export { FILTERS };
