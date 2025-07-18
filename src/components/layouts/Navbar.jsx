export default function Navbar() {
  return (
    <div className="ml-64 h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://i.pravatar.cc/40"
          alt="Admin"
        />
      </div>
    </div>
  );
}
