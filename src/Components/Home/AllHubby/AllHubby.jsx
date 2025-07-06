import { useEffect, useState } from "react";
import { Link } from "react-router";
import Spinner from "../Spinner/Spinner";
import { Helmet } from "react-helmet";

const AllHubby = () => {
  const [groupsData, setGroupsData] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fixed category list you provided
  const fixedCategories = [
    "all",
    "Drawing & Painting",
    "Photography",
    "Video Gaming",
    "Fishing",
    "Running",
    "Cooking",
    "Reading",
    "Writing"
  ];

  useEffect(() => {
    setLoading(true);
    fetch("https://ejp-s-sadmansakib34523-gmailcoms-projects.vercel.app/menu")
      .then((res) => res.json())
      .then((data) => {
        setGroupsData(data);
        setFilteredGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = groupsData;

    if (category !== "all") {
      filtered = filtered.filter((group) => group.category === category);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((group) =>
        group.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGroups(filtered);
  }, [category, searchQuery, groupsData]);

  // Handler to reset filters and show all groups
  const handleExploreAll = () => {
    setCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Helmet>
        <title>All Hobby Groups | Event Explorer</title>
        <meta
          name="description"
          content="Browse all hobby groups available in your area by category. Join groups, make friends, and grow your passion."
        />
        <meta
          name="keywords"
          content="hobby groups, all groups, local events, category filter, explore hobbies"
        />
      </Helmet>

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
            All Hobby Groups
          </h1>
          <p className="text-purple-300 dark:text-purple-200">
            Discover popular hobby groups in your area and connect with like-minded enthusiasts
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          {/* Category Filter */}
          <select
            className="bg-gray-100 dark:bg-gray-800 border border-gray-600 px-4 py-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {fixedCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title..."
            className="bg-gray-100 dark:bg-gray-800 border border-gray-600 px-4 py-2 rounded w-full md:w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Spinner or Groups Grid */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <div
                key={group._id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={group.image}
                    alt={group.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 bg-gray-900 text-white px-3 py-1 text-sm">
                    {group.category}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {group.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {group.date} • {group.location}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{group.description}</p>
                  <Link
                    to={`/feature/${group._id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Explore All Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleExploreAll}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
          >
            Explore All Groups
          </button>
        </div>
      </main>
    </div>
  );
};

export default AllHubby;
