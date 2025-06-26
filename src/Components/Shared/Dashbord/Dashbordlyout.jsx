import { Link, Outlet } from "react-router"; // ✅ use react-router-dom instead of react-router
import { LayoutDashboard, Users, PlusCircle } from "lucide-react";
import useAuth from "../../../hook/useAuth";

const Dashbordlyout = () => {
    const { user } = useAuth();

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div>
                <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-5 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white"><Link to={`/`}>Dashboard</Link></h2>
                    <nav className="space-y-2">
                        <Link
                            to="/dashboard/home"
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard Home
                        </Link>

                        {user?.email && (
                            <Link
                                to={`/dashboard/myGroup/${encodeURIComponent(user.email)}`}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600"
                            >
                                <Users size={18} />
                                My Groups
                            </Link>
                        )}

                        <Link
                            to="/dashboard/createGroup"
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600"
                        >
                            <PlusCircle size={18} />
                            Create Group
                        </Link>
                    </nav>
                </aside>
            </div>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashbordlyout;
