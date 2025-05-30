import { useEffect, useState } from "react";
import { Link } from "react-router";
import Spinner from "../Spinner/Spinner";
import { Helmet } from "react-helmet";


const Featured = () => {
  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assignment-10-server-xi-six.vercel.app/menu")
      .then((res) => res.json())
      .then((data) => {
        setGroupsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900">
      <Helmet>
        <title>Featured Hobby Groups | Event Explorer</title>
        <meta
          name="description"
          content="Explore the most popular hobby groups in your area. Connect, learn, and grow with communities that share your interests."
        />
        <meta
          name="keywords"
          content="hobby groups, community events, featured activities, local groups"
        />
      </Helmet>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
            Featured Hobby Groups
          </h1>
          <p className="text-purple-500 dark:text-purple-300">
            Discover popular hobby groups in your area and connect with like-minded enthusiasts
          </p>
        </div>

        {loading ? (
            <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupsData.slice(0, 6).map((group) => (
                <div
                  key={group._id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={group.image}
                      alt={group.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 bg-black/70 text-white px-3 py-1 text-xs">
                      {group.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{group.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {group.date} • {group.location}
                    </p>
                    <div
                      className={`inline-block text-xs px-3 py-1 mb-3 rounded-full ${
                        group.status === "Ongoing"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {group.status === "Ongoing" ? "🟢 Online" : "🔴 Offline"}
                    </div>
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

            <div className="mt-10 text-center">
              <Link
                to="/allHobby"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transition"
              >
                Explore All Groups
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Featured;
