export default function StatsCard({ users }) {
    const today = new Date();
    const currentMonth = today.getMonth(); // Get the current month (0-indexed)
    const currentYear = today.getFullYear(); // Get the current year

    // Count users who joined this month
    const newThisMonthCount = users.filter(user => {
        if (!user.additiontime) return false; // Skip users without an addition timestamp
        const additionDate = new Date(user.additiontime);
        return (
            additionDate.getMonth() === currentMonth &&
            additionDate.getFullYear() === currentYear
        );
    }).length;

    const activeTodayCount = users.filter(user => {
        const lastLogoutDate = user.lastlogout ? new Date(user.lastlogout).toISOString().split("T")[0] : null;
        return lastLogoutDate === today.toISOString().split("T")[0];
    }).length;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold mt-1">{users.length}</h3>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <i className="fas fa-users text-blue-500 text-xl"></i>
                        </div>
                    </div>
                </div>
                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Active Today</p>
                            <h3 className="text-2xl font-bold mt-1">{activeTodayCount}</h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <i className="fas fa-user-clock text-green-500 text-xl"></i>
                        </div>
                    </div>
                </div>
                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Doctors</p>
                            <h3 className="text-2xl font-bold mt-1">{users.filter(user => user.role === "doctor").length}</h3>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                            <i className="fas fa-user-md text-purple-500 text-xl"></i>
                        </div>
                    </div>
                </div>
                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">New This Month</p>
                            <h3 className="text-2xl font-bold mt-1">{newThisMonthCount}</h3>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <i className="fas fa-user-plus text-yellow-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}