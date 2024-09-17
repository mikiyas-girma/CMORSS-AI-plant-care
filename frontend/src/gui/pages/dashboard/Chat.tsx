import { useState, useEffect, useRef } from "react";
import { Button } from "@/gui/components/ui/button";
import { Input } from "@/gui/components/ui/input";
import { ScrollArea } from "@/gui/components/common/scroll-area";
// import  Separator  from "@/gui/components/common/Separator"
import { Avatar, AvatarFallback } from "@/gui/components/common/avatar";
import { Send, Bot, User, Plus, Loader } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/gui/components/common/sheet";
import { useParams } from "react-router-dom";
import { axiosForApiCall } from "@/lib/axios";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/selectorHook";
import { setChatResponse } from "@/redux/chat/chatSlice";
import { useDispatch } from "react-redux";

interface RouteParams {
  [key: string]: string | undefined; // Index signature allows matching any key
  plantId?: string; // Explicitly specify plantId, but still allow other keys
}

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

type ChatHistory = {
  id: string;
  title: string;
  messages: Message[];
};

type Page = "home" | "chat" | "settings";

export default function DashboardChatbot() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState<Page>("chat");
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const chatResponse = useAppSelector((state) => state.chat.response);
  const analyzing = useAppSelector((state) => state.chat.analyzing);

  // Clear the chat response when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(setChatResponse("")); // Clear the response on unmount
    };
  }, [dispatch]);

  const { plantId } = useParams<RouteParams>();

  useEffect(() => {
    const savedHistories = localStorage.getItem("chatHistories");
    if (savedHistories) {
      setChatHistories(JSON.parse(savedHistories));
    }
  }, []);

  useEffect(() => {
    if (currentChatId) {
      const currentChat = chatHistories.find(
        (chat) => chat.id === currentChatId
      );
      if (currentChat) {
        setMessages(currentChat.messages);
      }
    }
  }, [currentChatId, chatHistories]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      if (!currentChatId) {
        try {
          const response = await axiosForApiCall.post("/chat/", {
            userQuery: {
              prompt: input,
            },
          });
          const newChatId = response.data.chatId;
          const newMessage: Message = {
            id: uuidv4(),
            text: input,
            sender: "user",
          };

          const aiResponse: Message = {
            id: Date.now(),
            text: response.data.response,
            sender: "ai",
          };
          // update the chat history with the new user query and AI response
          setMessages((prev) => [...prev, newMessage, aiResponse]);

          //   save the new chat history
          const newChatHistory: ChatHistory = {
            id: newChatId,
            title: input.slice(0, 20) + (input.length > 15 ? "..." : ""),
            messages: [newMessage, aiResponse],
          };
          setChatHistories((prev) => [...prev, newChatHistory]);
          setCurrentChatId(newChatId);
        } catch (error) {
          console.error("Error starting new chat ", error);
        }
      } else {
        const newMessage: Message = {
          id: uuidv4(),
          text: input,
          sender: "user",
        };

        setMessages((prev) => [...prev, newMessage]);

        try {
          const response = await axiosForApiCall.post("/chat/", {
            userQuery: { prompt: input, chatId: currentChatId },
          });

          const aiResponse: Message = {
            id: Date.now(),
            text: response.data.response,
            sender: "ai",
          };

          setMessages((prev) => [...prev, aiResponse]);

          setChatHistories((prev) =>
            prev.map((chat) =>
              chat.id === currentChatId
                ? {
                    ...chat,
                    messages: [...chat.messages, newMessage, aiResponse],
                  }
                : chat
            )
          );
        } catch (error) {
          console.error("Error fetching AI response:", error);
        }
      }

      setInput("");
    }
  };

  const handlePageChange = (page: Page) => {
    if (currentPage === "chat" && messages.length > 0) {
      saveChatHistory();
    }
    setCurrentPage(page);
  };

  const saveChatHistory = () => {
    if (currentChatId && messages.length > 0) {
      setChatHistories((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId ? { ...chat, messages } : chat
        )
      );
    }
  };

  const startNewChat = () => {
    const chatResponse = useAppSelector((state) => "");
    saveChatHistory();
    setMessages([]);
    setCurrentChatId(null);
    setIsHistoryOpen(false);
  };

  const loadChatHistory = (chatId: string) => {
    saveChatHistory();
    setCurrentChatId(chatId);
    setIsHistoryOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("chatHistories", JSON.stringify(chatHistories));
  }, [chatHistories]);

  return (
    <div className="flex min-h-full bg-gray-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        { analyzing ? (
          <div className="flex flex-col h-full items-center justify-center space-x-2">
            <Loader size={52} color="green" className="animate-spin" />
            <p>Analyzing Your Weather</p>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden mt-16">
            <div className="flex flex-col h-full">
              {/* Chat messages */}
              <ScrollArea className="flex-1">
                <div className="p-4">
                  <div>
                    {(chatResponse || !analyzing )? (
                      <div className="flex justify-start mb-4">
                        <div className="flex items-start flex-row">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              <Bot />
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-space_grotesk mx-2 px-7 leading-7 text-justify rounded-lg bg-gray-200 text-gray-800">
                            {chatResponse}
                          </div>
                        </div>
                      </div>
                    ) : (
                        <div className="flex justify-center mb-4">
                            <Loader size={52} color="green" className="animate-spin" />
                        </div>
                    )
                }
                  </div>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      } mb-4`}
                    >
                      <div
                        className={`flex items-start ${
                          message.sender === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {message.sender === "user" ? (
                              <User color="red" />
                            ) : (
                              <Bot color="green" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`font-space_grotesk mx-2 p-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto">
                    History
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Chat History</SheetTitle>
                    <SheetDescription>
                      Your saved conversations
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                    <Button onClick={startNewChat} className="w-full mb-2">
                      <Plus className="mr-2 h-4 w-4" /> New Chat
                    </Button>
                    {chatHistories.map((chat) => (
                      <Button
                        key={chat.id}
                        variant="ghost"
                        className="w-full justify-start mb-2 text-left"
                        onClick={() => loadChatHistory(chat.id)}
                      >
                        {chat.title}
                      </Button>
                    ))}
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleSend}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
