import { ChatMessageProps } from "../../types/chat";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ hideInChat, role, text }: ChatMessageProps) => {
  return (
    !hideInChat && (
      <div className={`message ${role}-message`}>
        {role === "model" && <ChatbotIcon />}
        <p style={{ whiteSpace: "pre-line" }} className="message-text">
          {text}
        </p>
      </div>
    )
  );
};

export default ChatMessage;
