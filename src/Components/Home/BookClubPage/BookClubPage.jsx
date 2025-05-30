import { Calendar, MapPin, Users } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

const LiveStatus = ({ friends }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">Live Status</h2>
      <ul>
        {friends.map((userEmail) => (
          <li
            key={userEmail}
            className="flex items-center justify-between py-2 border-b last:border-none"
          >
            <span>{userEmail}</span>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                onlineUsers.includes(userEmail)
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {onlineUsers.includes(userEmail) ? "🟢 Online" : "🔴 Offline"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BookClubPage = () => {
  const data = useLoaderData();
  const groups = Array.isArray(data) ? data : data?.groups || [];

  const friends = Array.from(new Set(groups.map((group) => group.email)));

  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchOnlineCount = async () => {
      if (!navigator.onLine) return;

      try {
        const res = await fetch(
          "https://assignment-10-server-xi-six.vercel.app/online-count"
        );
        if (!res.ok) throw new Error("Failed to fetch online count");
        const result = await res.json();
        setOnlineCount(result.count);
      } catch (err) {
        console.error("Error fetching online count:", err);
      }
    };
    fetchOnlineCount();
  }, []);

  const group = groups[0] || {};

  useEffect(() => {
    const joinedGroups = JSON.parse(localStorage.getItem("joinedGroups") || "[]");
    if (joinedGroups.includes(group.id)) {
      setHasJoined(true);
    }
  }, [group.id]);

  const isPastEvent = group.date ? new Date(group.date) < new Date() : false;
  const isActive = !isPastEvent;
  const isFull = group.memberCount >= group.maxMembers;

  const handleJoinGroup = async () => {
    setJoining(true);
    try {
      const userName = group.displayName;
      const userEmail = group.email;

      const res = await fetch("https://assignment-10-server-xi-six.vercel.app/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: group.id,
          userName,
          userEmail,
          joinedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to join group");

      await res.json();
      toast.success("You have successfully joined the group!");
      setHasJoined(true);

      const joinedGroups = JSON.parse(localStorage.getItem("joinedGroups") || "[]");
      if (!joinedGroups.includes(group.id)) {
        localStorage.setItem("joinedGroups", JSON.stringify([...joinedGroups, group.id]));
      }

      if (group.status === "Ongoing") {
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
    (group.status === "Ongoing" && onlineCount >= 6);

  const showOnlineBadge = group.status === "Ongoing" && isOnline;
  const showOfflineBadge = group.status === "Ongoing" && !isOnline;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <main className="px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {group.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-block bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 text-xs px-3 py-1 rounded-full">
                {group.category}
              </div>

              {showOnlineBadge && (
                <div className="inline-block text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200">
                  🟢 Online
                </div>
              )}

              {showOfflineBadge && (
                <div className="inline-block text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200">
                  ⚠️ No Internet
                </div>
              )}

              {group.status !== "Ongoing" && (
                <div className="inline-block text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200">
                  🔴 Offline
                </div>
              )}
            </div>
          </div>

          <div className="relative bg-gray-200 flex justify-center items-center h-64 md:h-96">
            <img
              src={group.image}
              alt={group.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <Calendar className="text-blue-400 mr-3" size={20} />
              <div>
                <div className="text-xs text-gray-400">Start Date</div>
                <div>{group.date ? new Date(group.date).toDateString() : ""}</div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <MapPin className="text-blue-400 mr-3" size={20} />
              <div>
                <div className="text-xs text-gray-400">Location</div>
                <div>{group.location}</div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <Users className="text-blue-400 mr-3" size={20} />
              <div>
                <div className="text-xs text-gray-400">Max Members</div>
                <div>
                  {group.memberCount} / {group.maxMembers}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-1">Organizer Name</div>
              <div className="text-sm text-gray-900 dark:text-white">{group.displayName}</div>
              <div className="text-xs text-blue-500 flex items-center gap-2">
                {group.email}
                <Link
                  to={`/profile/${group.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Profile
                </Link>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <span
                className={`w-3 h-3 rounded-full mr-3 ${
                  group.status === "Ongoing"
                    ? isOnline
                      ? "bg-green-500"
                      : "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></span>
              <div>
                <div className="text-xs text-gray-400">Mode</div>
                <div>
                  {group.status === "Ongoing"
                    ? isOnline
                      ? "Online"
                      : "No Internet"
                    : "Offline"}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
              About this group
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{group.description}</p>
          </div>

          <div className="p-6">
            {isPastEvent ? (
              <div className="text-red-500 font-semibold text-center">
                Group is no longer active
              </div>
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
                    : group.status === "Ongoing" && onlineCount >= 6
                    ? "Max online groups reached"
                    : "Join Group"}
                </button>

                {group.status === "Ongoing" && onlineCount >= 6 && (
                  <p className="text-red-500 text-sm mt-2">
                    Maximum of 6 online groups allowed at a time.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <LiveStatus friends={friends} />

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
