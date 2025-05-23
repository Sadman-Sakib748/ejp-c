

const EditGroupDialog = ({ formData, setFormData, onClose, onSave }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-2">Edit Group</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full mt-1 border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full mt-1 border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full mt-1 border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full mt-1 border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full mt-1 border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditGroupDialog;