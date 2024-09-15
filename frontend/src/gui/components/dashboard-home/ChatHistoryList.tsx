import ChatHistoryCard from '../dashboard-chat/ChatHistoryCard';
import chatHistory from '../dashboard-chat/dummyChatHistoryCardData';

const ChatHistoryList = () => {
  // Fetch Top Four of the User's Chat history from the Database

  //   Return JSX Component
  return (
    <div className="scrollbar-thin flex gap-3 overflow-x-auto rounded-lg bg-white p-4 shadow-[inset_4px_4px_16px_rgba(0,0,0,0.2),inset_0_-2px_8px_rgba(0,0,0,0.2)]">
      {chatHistory.slice(0, 3).map((chat, index) => (
        <ChatHistoryCard
          key={index}
          title={chat.title}
          messageCount={chat.messageCount}
          date={chat.date}
          chatId={chat.chatId}
        />
      ))}
    </div>
  );
};

export default ChatHistoryList;
