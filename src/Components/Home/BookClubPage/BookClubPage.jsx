import { Calendar, MapPin, Users } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


const BookClubPage = () => {
  const group = useLoaderData();
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // Check localStorage to mark joined groups
  useEffect(() => {
    const joinedGroups = JSON.parse(localStorage.getItem("joinedGroups") || "[]");
    if (joinedGroups.includes(group._id)) {
      setHasJoined(true);
    }
  }, []);

  const isPastEvent = new Date(group.date) < new Date();
  const isActive = !isPastEvent;
  const isFull = group.memberCount >= group.maxMembers;

  const handleJoinGroup = async () => {
    setJoining(true);
    try {
      // Fake API call - replace with your actual POST API
      const res = await fetch("https://ejp-s.vercel.app/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: group._id,
          userName: group.displayName,
          userEmail: group.email,
          joinedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to join group");

      await res.json();
      toast.success("You have successfully joined the group!");
      setHasJoined(true);

      // Save joined group locally
      const joinedGroups = JSON.parse(localStorage.getItem("joinedGroups") || "[]");
      if (!joinedGroups.includes(group._id)) {
        localStorage.setItem("joinedGroups", JSON.stringify([...joinedGroups, group._id]));
      }
    } catch (error) {
      console.error("Join error:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setJoining(false);
    }
  };

  const isJoinDisabled = joining || !isActive || isFull || hasJoined;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{group.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-block bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 text-xs px-3 py-1 rounded-full">
              {group.category}
            </div>
          </div>
          <div className="relative bg-gray-200 flex justify-center items-center h-64 md:h-96 mb-6">
            <img
              src={group.image}
              alt={group.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center">
              <Calendar className="text-blue-400 mr-3" size={20} />
              <div>
                <div className="text-xs text-gray-400">Start Date</div>
                <div>{new Date(group.date).toDateString()}</div>
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
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-xs text-gray-400 mb-1">Organizer Name</div>
            <div className="text-sm text-gray-900 dark:text-white">{group.displayName}</div>
            <div className="text-xs text-blue-500 mt-1">{group.email}</div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">About this group</h2>
            <p className="text-gray-700 dark:text-gray-300">{group.description}</p>
          </div>

          <div>
            {isPastEvent ? (
              <div className="text-red-500 font-semibold text-center">
                Group is no longer active
              </div>
            ) : (
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
                  : "Join Group"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookClubPage;
