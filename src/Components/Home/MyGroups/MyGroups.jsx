import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyGroups = () => {
  const initialGroups = useLoaderData();
  const [groups, setGroups] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    category: "",
    date: "",
    location: "",
    maxMembers: "",
    description: "",
    image: "",
    userName: "",
    userEmail: "",
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const categoryOptions = [
    "Drawing & Painting",
    "Photography",
    "Video Gaming",
    "Fishing",
    "Running",
    "Cooking",
    "Reading",
    "Writing",
  ];

  useEffect(() => {
    // Simulate loading for better UX
    const timeout = setTimeout(() => {
      setGroups(initialGroups);
      setLoadingInitial(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [initialGroups]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);

    try {
      const {
        _id,
        title,
        category,
        date,
        location,
        maxMembers,
        description,
        image,
      } = formData;

      const updatedData = {
        title,
        category,
        date,
        location,
        maxMembers,
        description,
        image,
      };

      const res = await fetch(`http://localhost:5000/menu/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.success) {
        const updatedGroups = groups.map((group) =>
          group._id === _id ? { ...group, ...updatedData } : group
        );
        setGroups(updatedGroups);
        setIsEditDialogOpen(false);
        toast.success("Group updated successfully");
      } else {
        toast.error("Update failed or no changes made");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Something went wrong");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const confirmDeleteGroup = async () => {
    if (!groupToDelete) return;
    setLoadingDelete(true);
    try {
      const res = await fetch(
        `http://localhost:5000/menu/${groupToDelete._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.deletedCount > 0) {
        setGroups(groups.filter((group) => group._id !== groupToDelete._id));
        toast.success("Group deleted successfully");
      } else {
        toast.error("Failed to delete group");
      }
    } catch (error) {
      console.error("Failed to delete group", error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleteDialogOpen(false);
      setGroupToDelete(null);
      setLoadingDelete(false);
    }
  };

  return (
    <div className="px-4 py-10 bg-white dark:bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400 tracking-tight">
        My Groups
      </h1>

      {loadingInitial || loadingUpdate || loadingDelete ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : !Array.isArray(groups) || groups.length === 0 ? (
        <p className="text-center text-gray-500">No groups found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Max Members</th>
                <th className="px-4 py-3">Created By</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {groups.map((group) => (
                <tr
                  key={group._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={group.image}
                      alt={group.title}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">
                    {group.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {group.category}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {group.date}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {group.location}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {group.maxMembers}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    <div>{group.userName}</div>
                    <div className="text-xs text-gray-400">{group.userEmail}</div>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => {
                        setFormData(group);
                        setIsEditDialogOpen(true);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setGroupToDelete(group);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-3xl w-full p-10 relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 dark:text-blue-400">
              Edit Group Details
            </h2>
            <form className="space-y-6" onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="px-4 py-2 border rounded"
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded"
                  required
                />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="px-4 py-2 border rounded"
                  required
                />
                <input
                  name="maxMembers"
                  type="number"
                  value={formData.maxMembers}
                  onChange={handleInputChange}
                  placeholder="Max Members"
                  className="px-4 py-2 border rounded"
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows="4"
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                name="image"
                type="url"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full px-4 py-2 border rounded"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="User Name"
                  className="px-4 py-2 border rounded"
                  required
                />
                <input
                  name="userEmail"
                  type="email"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  placeholder="User Email"
                  className="px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingUpdate}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {loadingUpdate ? "Updating..." : "Update Group"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete the group{" "}
              <span className="font-semibold">{groupToDelete?.title}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border px-4 py-2 rounded hover:bg-gray-100"
                disabled={loadingDelete}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteGroup}
                disabled={loadingDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {loadingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
