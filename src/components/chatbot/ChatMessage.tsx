
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  content: string;
  sender: "user" | "bot";
}

const ChatMessage = ({ content, sender }: ChatMessageProps) => {
  const isBot = sender === "bot";

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
          <Bot size={16} />
        </Avatar>
      )}

      <div
        className={cn(
          "p-3 rounded-lg max-w-[80%]",
          isBot
            ? "bg-accent text-accent-foreground rounded-tl-none"
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}
      >
        {isBot ? (
          <div className="prose dark:prose-invert prose-sm">
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>

      {!isBot && (
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
          <User size={16} />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
