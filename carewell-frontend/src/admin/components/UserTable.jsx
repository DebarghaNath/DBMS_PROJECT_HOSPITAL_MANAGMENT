import { useState, useEffect } from "react";
import DeleteModal from "./DeleteModal";

export default function UserTable({ users, setUsers, searchQuery, selectedRole }) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const rolePriority = {
    owner: 0,
    admin: 1,
    doctor: 2,
    fdo: 3,
    deo: 4,
  };

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  const openDeleteModal = (user, idx) => {
    setUserToDelete({ user, idx });
    setShowModal(true);
  };

  useEffect(() => {
    let filtered = [...users];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Role filter
    if (selectedRole !== "all") {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    // Sort by role priority
    filtered.sort((a, b) => rolePriority[a.role] - rolePriority[b.role]);

    setFilteredUsers(filtered);
    setCurrentPage(1); // reset page on filter
  }, [searchQuery, selectedRole, users]);

  return (
    <>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.imageurl}
                        className="user-avatar mr-3 h-10 w-10 rounded-full"
                        alt="User"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {user.role}
                    </span>
                  </td>
                  {user.email !== localStorage.getItem("admin$email") && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-blue-500 hover:text-blue-700 mr-3">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn-danger rounded-md px-3 py-1 text-xs"
                          onClick={() => openDeleteModal(user, idx)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium">
            {filteredUsers.length > 0 ? indexOfFirstUser + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastUser, filteredUsers.length)}
          </span>{" "}
          of <span className="font-medium">{filteredUsers.length}</span> users
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md hover:bg-gray-100"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          {pages.map((page, i) => (
            <button
              key={i}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md hover:bg-gray-100"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        userToDelete={userToDelete}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        filteredUsers={filteredUsers}
        setFilteredUsers={setFilteredUsers}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
