import { Calendar, MapPin, Users } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const BookClubPage = () => {
  const data = useLoaderData();

  const {
    id,
    title,
    category,
    date,
    description,
    image,
    location,
    maxMembers,
    userName,
    userEmail,
    memberCount,
    status,
  } = data;

  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const fetchOnlineCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/online-count");
        if (!res.ok) throw new Error("Failed to fetch online count");
        const result = await res.json();
        setOnlineCount(result.count);
        console.log("Online group count fetched:", result.count);
      } catch (err) {
        console.error("Error fetching online count:", err);
      }
    };
    fetchOnlineCount();
  }, []);

  const isPastEvent = new Date(date) < new Date();
  const isActive = !isPastEvent;
  const isFull = memberCount >= maxMembers;

  const handleJoinGroup = async () => {
    setJoining(true);
    try {
      const res = await fetch("http://localhost:5000/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: id,
          userName,
          userEmail,
          joinedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to join group");

      await res.json();
      toast.success("You have successfully joined the group!");
      setHasJoined(true);

      if (status === "Ongoing") {
        setOnlineCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Join error:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setJoining(false);
    }
  };

  const isJoinDisabled =
    joining ||
    !isActive ||
    isFull ||
    hasJoined ||
    (status === "Ongoing" && onlineCount >= 6);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <main className="px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h1>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-block bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 text-xs px-3 py-1 rounded-full">
                {category}
              </div>
              <div
                className={`inline-block text-xs px-3 py-1 rounded-full ${
                  status === "Ongoing"
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {status === "Ongoing" ? "🟢 Online" : "🔴 Offline"}
              </div>
            </div>
          </div>

          <div className="relative bg-gray-200 flex justify-center items-center h-64 md:h-96">
            <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <Calendar className="text-blue-400 mr-3" size={20} />
              <div>
                <div className="text-xs text-gray-400">Start Date</div>
                <div>{new Date(date).toDateString()}</div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <MapPin className="text-blue-400 mr-3" size={20} />
              <div>
                <div className="text-xs text-gray-400">Location</div>
                <div>{location}</div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <Users className="text-blue-400 mr-3" size={20} />
              <div>
                <div className="text-xs text-gray-400">Max Members</div>
                <div>
                  {memberCount} / {maxMembers}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-1">Organizer Name</div>
              <div className="text-sm text-gray-900 dark:text-white">{userName}</div>
              <div className="text-xs text-blue-500">{userEmail}</div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <span
                className={`w-3 h-3 rounded-full mr-3 ${
                  status === "Ongoing" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <div>
                <div className="text-xs text-gray-400">Mode</div>
                <div>{status === "Ongoing" ? "Online" : "Offline"}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">About this group</h2>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>

          <div className="p-6">
            {isPastEvent ? (
              <div className="text-red-500 font-semibold text-center">Group is no longer active</div>
            ) : (
              <>
                <button
                  className="px-6 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed w-full md:w-auto"
                  onClick={handleJoinGroup}
                  disabled={isJoinDisabled}
                >
                  {joining
                    ? "Joining..."
                    : hasJoined
                    ? "You have joined"
                    : isFull
                    ? "Group is full"
                    : status === "Ongoing" && onlineCount >= 6
                    ? "Max online groups reached"
                    : "Join Group"}
                </button>

                {status === "Ongoing" && onlineCount >= 6 && (
                  <p className="text-red-500 text-sm mt-2">
                    Maximum of 6 online groups allowed at a time.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Link to="/" className="text-blue-500 hover:underline">
            ← Back to all groups
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BookClubPage;
