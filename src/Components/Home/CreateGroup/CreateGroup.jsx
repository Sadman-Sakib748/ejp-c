import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../hook/useAuth";

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

const CreateGroup = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    category: "",
    date: "",
    location: "",
    description: "",
    image: "",
    maxMembers: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, ...rest } = formData;

      const formattedData = {
        ...rest,
        name: user?.displayName,
        email: user?.email,
        date: new Date(formData.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };

      const response = await fetch("https://assignment-10-server-xi-six.vercel.app/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Group created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create group:", error);
      toast.error("Failed to create group.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create a New Group</h1>
          <p className="">
            Start your own hobby group and connect with like-minded individuals
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-600 shadow-2xl rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-1">Group Information</h2>
          <p className="text-gray-800 mb-6">
            Fill in the details about your new hobby group
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Group Name
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="category" className="block font-medium mb-1">
                Hobby Category
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>

            <div>
              <label htmlFor="location" className="block font-medium mb-1">
                Meeting Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="maxMembers" className="block font-medium mb-1">
                  Maximum Members
                </label>
                <input
                  id="maxMembers"
                  name="maxMembers"
                  type="number"
                  min="2"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  placeholder="20"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="date" className="block font-medium mb-1">
                  Start Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="image" className="block font-medium mb-1">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="url"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter an image URL for your group"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  readOnly
                  defaultValue={`${user?.displayName}`}
                  placeholder={`${user?.displayName}`}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  readOnly
                  defaultValue={`${user?.email}`}
                  placeholder={`${user?.email}`}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Group"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
