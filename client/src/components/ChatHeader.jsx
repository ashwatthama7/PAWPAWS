import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/chatSlice";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const handleClose = () => {
    dispatch(setSelectedUser(null));
  };

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-400 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {/* Avatar with status indicator */}
          <div className="relative">
            <div className="size-10 rounded-full overflow-hidden">
              <img
                src={selectedUser?.avatar || "/avatar.png"}
                alt={selectedUser?.username}
                className="w-full h-full object-cover"
              />
            </div>
            {selectedUser?._id && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            )}
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {selectedUser?.username}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedUser?._id ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="p-2 rounded-full text-red-500 hover:text-red-800 dark:text-red-500 dark:hover:text-gray-200 hover:bg-red-100 dark:hover:bg-red-700 transition-colors"
          aria-label="Close chat"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;