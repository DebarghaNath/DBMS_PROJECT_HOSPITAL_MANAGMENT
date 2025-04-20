import React from "react";
import { BASE_URL } from "../../config"

const DeleteModal = ({
  showModal,
  setShowModal,
  userToDelete,
  currentPage,
  usersPerPage,
  filteredUsers,
  setFilteredUsers,
  setCurrentPage,
}) => {
  const handleDelete = async () => {
    console.log(userToDelete.user.userid);
    if (userToDelete) {
      try {
        const response = await fetch(`${BASE_URL}/api/authorization/deleteusers`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin$token")}`, // Add Bearer token
          },
          body: JSON.stringify({ id: userToDelete.user.userid }), // Send user ID in the request body
        });

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        const { idx } = userToDelete;
        const actualIndex = (currentPage - 1) * usersPerPage + idx;
        const updatedUsers = filteredUsers.filter((_, i) => i !== actualIndex);
        setFilteredUsers(updatedUsers);
        setShowModal(false);

        if (updatedUsers.length <= (currentPage - 1) * usersPerPage && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        console.log("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              <button
                title="button"
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)} 
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userToDelete?.user.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                title="button"
                type="button"
                className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                title="button"
                type="button"
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;