import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessageThunk } from "../redux/chatSlice";
import { Send } from "lucide-react";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(sendMessageThunk({ text }));
    setText("");
  };

  return (
    <div className="p-4 w-full bg-white dark:bg-gray-400 border-t border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSend} className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            className="w-full py-3 px-4 bg-gray-100 dark:bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-400 transition-all"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSend(e);
              }
            }}
          />
        </div>
        <button
          type="submit"
          className={`p-2 rounded-full transition-colors ${
            text.trim()
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
          disabled={!text.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;