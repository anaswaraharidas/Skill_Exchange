import React, { createContext, useState, useContext, ReactNode } from "react";
import { MOCK_SKILLS, MOCK_USERS, CATEGORIES } from '@/lib/types';

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotContextType {
  messages: Message[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "👋 Hi there! I'm SkillBot. I can help you find the perfect skill or person for your learning journey. What are you interested in learning? You can explore technical skills like programming, cultural skills like cooking, creative skills like music, business skills like marketing, or lifestyle skills like fitness!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  // Enhanced skill matching function with category types
  const findMatchingSkills = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    
    // Find matching skills
    const matchingSkills = MOCK_SKILLS.filter(skill => 
      skill.title.toLowerCase().includes(normalizedQuery) ||
      skill.description.toLowerCase().includes(normalizedQuery) ||
      skill.category.toLowerCase().includes(normalizedQuery)
    );
    
    // Find matching providers
    const providers = MOCK_USERS.filter(user => 
      user.skills?.some(skillName => 
        skillName.toLowerCase().includes(normalizedQuery)
      ) ||
      (user.bio && user.bio.toLowerCase().includes(normalizedQuery))
    );
    
    // Get related categories and their types
    const relatedCategories = CATEGORIES.filter(category => 
      category.name.toLowerCase().includes(normalizedQuery)
    );

    // Group skills by category type
    const skillsByType = matchingSkills.reduce((acc, skill) => {
      const category = CATEGORIES.find(c => c.name === skill.category);
      const type = category?.type || 'other';
      if (!acc[type]) acc[type] = [];
      acc[type].push(skill);
      return acc;
    }, {} as Record<string, typeof matchingSkills>);
    
    return { matchingSkills, providers, relatedCategories, skillsByType };
  };

  // Get recommended skills that are different from the current query
  const getRecommendations = (currentQuery: string) => {
    // Recommend popular categories or skills that are different from the current query
    const normalizedQuery = currentQuery.toLowerCase();
    
    // Get all skills except those matching the current query
    const otherSkills = MOCK_SKILLS.filter(skill => 
      !skill.title.toLowerCase().includes(normalizedQuery) &&
      !skill.category.toLowerCase().includes(normalizedQuery)
    );
    
    // Take 3 random skills as recommendations
    const recommendations = [];
    const usedIndices = new Set();
    
    while (recommendations.length < 3 && usedIndices.size < otherSkills.length) {
      const randomIndex = Math.floor(Math.random() * otherSkills.length);
      
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        recommendations.push(otherSkills[randomIndex]);
      }
    }
    
    return recommendations;
  };

  // Generate response based on user input with categorized results
  const generateResponse = (userMessage: string) => {
    const { matchingSkills, providers, relatedCategories, skillsByType } = findMatchingSkills(userMessage);
    
    if (matchingSkills.length === 0 && providers.length === 0 && relatedCategories.length === 0) {
      return `I couldn't find any exact matches for "${userMessage}". Try exploring our different skill categories:\n\n` +
             "- Technical Skills (programming, cloud computing, cybersecurity)\n" +
             "- Cultural Skills (languages, cooking, traditional arts)\n" +
             "- Creative Skills (digital art, music, photography)\n" +
             "- Business Skills (marketing, project management)\n" +
             "- Lifestyle Skills (fitness, mindfulness, personal finance)";
    }
    
    let response = `Based on your interest in "${userMessage}", I found:\n\n`;
    
    // Show results grouped by category type
    Object.entries(skillsByType).forEach(([type, skills]) => {
      if (skills.length > 0) {
        response += `**${type.charAt(0).toUpperCase() + type.slice(1)} Skills:**\n`;
        skills.forEach(skill => {
          response += `- **${skill.title}** (${skill.category}) - taught by ${skill.owner.name} from ${skill.owner.location}\n`;
        });
        response += "\n";
      }
    });
    
    if (providers.length > 0) {
      response += "**Expert Instructors Available:**\n";
      providers.forEach(user => {
        const relevantSkills = user.skills?.filter(skill => 
          skill.toLowerCase().includes(userMessage.toLowerCase())
        ) || [];
        
        response += `- **${user.name}** (${user.location}) - Specializes in: ${relevantSkills.join(', ')}\n`;
      });
      response += "\n";
    }
    
    // Add recommendations
    const recommendations = getRecommendations(userMessage);
    if (recommendations.length > 0) {
      response += "**You might also be interested in:**\n";
      recommendations.forEach(skill => {
        const category = CATEGORIES.find(c => c.name === skill.category);
        response += `- **${skill.title}** (${category?.type} skill) - taught by ${skill.owner.name}\n`;
      });
      response += "\n";
    }
    
    response += "Would you like to learn more about any specific skill type or instructor?";
    
    return response;
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: "user" as const,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        sender: "bot" as const,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const clearMessages = () => {
    setMessages([
      {
        id: "welcome",
        content: "👋 Hi there! I'm SkillBot. I can help you find the perfect skill or person for your learning journey. What are you interested in learning?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        setIsOpen,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
