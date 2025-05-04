
import React from "react";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatbot } from "@/context/ChatbotContext";

const ChatbotButton = () => {
  const { isOpen, setIsOpen } = useChatbot();

  return (
    <Button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X size={24} /> : <Bot size={24} />}
    </Button>
  );
};

export default ChatbotButton;
