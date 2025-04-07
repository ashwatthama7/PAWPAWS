import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeletons";
import { fetchMessages } from "../redux/chatSlice";
import { formatMessageTime } from "../lib/utils";
import Sidebar from "../components/Sidebar"; // Import Sidebar

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);
  const messageEndRef = useRef(null);

  // Fetch messages when the selected user changes
  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchMessages(selectedUser._id));
    }
  }, [dispatch, selectedUser]);

  // Scroll to the last message when messages are updated
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading || !selectedUser) {
    // Show loading skeleton and sidebar while waiting for selectedUser or loading messages
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <Sidebar />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // Ensure messages is always an array before mapping
  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messageList.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messageList.map((message, index) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="size-5 rounded-full border">
                  <img
                    className="h-5 w-5 rounded-full"
                    src={
                      message.senderId === authUser
                        ? authUser.avatar || "/avatar.png"
                        : selectedUser.avatar || "/avatar.png"
                    }
                    alt="Profile"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img src={message.image} className="sm:max-w-[200px] rounded-md mb-2" alt="Message" />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        )}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
