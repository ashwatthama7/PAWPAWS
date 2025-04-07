import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSelectedUser } from "../redux/chatSlice";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { users = [], selectedUser, isUsersLoading } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-gray-400 bg-white flex flex-col shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-400 p-4 bg-gray-400">
        <div className="flex items-center gap-3">
          <Users className="size-5 text-gray-600" />
          <span className="font-medium text-gray-700 hidden lg:block text-lg">PawPaws Community</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto flex-1">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-colors duration-150 hover:bg-gray-50 ${
              selectedUser?._id === user._id ? "bg-blue-50 border-l-4 border-blue-500" : "border-l-4 border-transparent"
            }`}
          >
            {/* User Avatar with Status */}
            <div className="relative flex-shrink-0">
              <img
                src={user.avatar || "/avatar.png"}
                alt={user.username || "User"}
                className="size-10 object-cover rounded-full border-2 border-white shadow"
              />
              {user.status === "online" && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium text-gray-800 truncate">
                {user.username || "Unknown User"}
              </div>
              <div className="text-sm text-gray-500 truncate">
                @{user.username || "no_username"}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Optional Footer */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 hidden lg:block">
        <div className="text-xs text-gray-500 text-center">
          {users.length} {users.length === 1 ? "contact" : "contacts"}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;