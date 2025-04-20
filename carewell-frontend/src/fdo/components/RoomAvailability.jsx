import { useState } from "react";
import RoomCard from "./RoomCard";
import VacatedRooms from "./VacatedRooms";
import "./component.css";

export default function RoomAvailability({ rooms }) {
    const [showModal, setShowModal] = useState(false);

    const totalBeds = rooms.reduce((acc, room) => acc + room.maxcapacity, 0);
    const occupiedBeds = rooms.reduce((acc, room) => acc + (room.maxcapacity - room.remcapacity), 0);
    const occupancyPercentage = (occupiedBeds / totalBeds) * 100;

    const wardTypes = [...new Set(rooms.map((room) => room.type))];
    const wardInfo = wardTypes.reduce((info, type, index) => {
        info[type] = {
            id: index + 1,
            type: type,
            maxcapacity: rooms.reduce((acc, room) => acc + (room.type === type ? room.maxcapacity : 0), 0),
            remcapacity: rooms.reduce((acc, room) => acc + (room.type === type ? room.remcapacity : 0), 0),
        };
        return info;
    }, {});

    const countRoomsOfEachType = rooms.reduce((acc, room) => {
        acc[room.type] = (acc[room.type] || 0) + 1;
        return acc;
    }, {});

    return (
        <>
            <div className="rooms-card animate-fadeIn">
                <div className="card-header">
                    <h2>
                        <i className="fas fa-bed"></i>
                        Room Availability
                    </h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        View All
                    </button>
                </div>
                <div className="card-body">
                    <div className="progress-container">
                        <div className="progress-info">
                            <span>Occupied Beds</span>
                            <span>
                                {occupiedBeds}/{totalBeds} ({Math.round(occupancyPercentage)}%)
                            </span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${occupancyPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="rooms-grid">
                        {Object.entries(wardInfo).map(([wardName, wardDetails]) => (
                            <RoomCard
                                key={wardDetails.id}
                                type={wardDetails.type}
                                occupancy={wardDetails.maxcapacity}
                                remcapacity={wardDetails.remcapacity}
                            />
                        ))}
                    </div>

                    <div className="mt-8">
                        <div className="bg-white shadow-sm rounded-xl">
                            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <i className="fas fa-hospital text-indigo-500"></i>
                                Total Wards
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-700">
                                {Object.entries(countRoomsOfEachType).map(([type, count]) => (
                                    <li
                                        key={type}
                                        className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition"
                                    >
                                        <span className="font-medium text-gray-900">{type}</span>
                                        <span className="text-sm text-gray-600">{count} room</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl relative overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                <i className="fas fa-bed mr-2 text-indigo-500"></i>All Rooms
                            </h2>
                            <button
                                className="text-gray-500 hover:text-gray-700  transition"
                                onClick={() => setShowModal(false)}
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[70vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms
                            .sort((a, b) => {
                                const wardNoA = parseInt(a.wardno.substring(1)); // Extract numeric part of wardno
                                const wardNoB = parseInt(b.wardno.substring(1)); // Extract numeric part of wardno
                                return wardNoA - wardNoB; // Compare the numeric parts
                            })
                            .map((room, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-2xl bg-white p-5 shadow hover:shadow-lg transition-all duration-200 flex flex-col gap-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xl font-semibold text-gray-800">
                                            Ward #{room.wardno}
                                        </h4>
                                        <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full font-medium">
                                            {room.type}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-700 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-users text-indigo-500 w-5"></i>
                                            <span><strong>Max Capacity:</strong> {room.maxcapacity}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-user-check text-green-500 w-5"></i>
                                            <span><strong>Remaining:</strong> {room.remcapacity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
