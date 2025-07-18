import { Home, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-6 fixed">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="flex items-center gap-2 hover:text-gray-300">
            <Home size={20} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="#" className="flex items-center gap-2 hover:text-gray-300">
            <Users size={20} /> Users
          </Link>
        </li>
        <li>
          <Link to="#" className="flex items-center gap-2 hover:text-gray-300">
            <Settings size={20} /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
