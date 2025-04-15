import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeletons";
import { fetchMessages } from "../redux/chatSlice";
import { formatMessageTime } from "../lib/utils";
import Sidebar from "../components/Sidebar";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(fetchMessages(selectedUser._id));
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Ensure comparison with string type if senderId is an ObjectId
 

  // Ensure username comparison works correctly
  const getUsername = (userId) => {
    const userIdStr = userId?.toString();  // Ensuring ObjectId is converted to string
    if (userIdStr === authUser?._id.toString()) return authUser?.username;
    if (userIdStr === selectedUser?._id.toString()) return selectedUser?.username || "User";
    return "You";
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <Sidebar />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <ChatHeader />
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
        {!messages?.length ? (
          <div className="h-full flex items-center justify-center">
            <p>No messages yet</p>
          </div>
        ) : (
          messages.map((message) => {
            const senderId = message.senderId;
            const isCurrentUser = senderId?.toString() === authUser?._id.toString();  // String comparison
            
            const username = getUsername(senderId);

            return (
              <div
                key={message._id || Math.random()}
                className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
               
                <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                  <span className="text-sm font-semibold mb-1 text-gray-600">{username}</span>

                  <div
                    className={`rounded-lg px-4 py-2 max-w-xs sm:max-w-md ${
                      isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    
                    {message.text}
                  </div>

                  <time className="text-xs opacity-50 mt-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                {isCurrentUser && (
                  <div className="flex-shrink-0 ml-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={avatar}
                      alt="You"
                      onError={(e) => (e.target.src = "/avatar.png")}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
