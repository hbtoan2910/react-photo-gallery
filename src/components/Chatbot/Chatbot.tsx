import ChatbotIcon from "./ChatbotIcon";
import "./Chatbot.css";
import ChatForm from "./ChatForm";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { FaFacebookMessenger } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { companyInfo } from "./PredefinedScript"; //use prefinedDate combine with AI
import { ChatMessageProps } from "../../types/chat";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo, //use prefinedDate combine with AI
    },
  ]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Auto scroll when chathistory is updated
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  const generateBotResponse = async (history: ChatMessageProps[]) => {
    console.log(history);
    const adaptedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: adaptedHistory }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_GEMINIAPI_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error.message || "Cannot fetch data from GEMINI API !"
        );
      const responseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      console.log(data.candidates[0].content.parts[0].text);
      return responseText;
    } catch (error) {
      console.log(error);
    }
  };

  const toggleChatUI = () => {
    setIsVisible((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const toggleElement = document.getElementById("chatbot-toggle");
    const containerElement = document.getElementById("chatbot-container");
    const collapseButton = document.getElementsByClassName(
      "material-symbols-rounded"
    )[0];

    if (!toggleElement || !containerElement || !collapseButton) {
      return; // Exit early if elements aren't found
    }

    const clickedOnToggle = e.target === toggleElement;
    const clickedOnCollapse =
      e.target === collapseButton || collapseButton.contains(e.target as Node);
    const clickedInsideContainer = containerElement.contains(e.target as Node);

    // Close only if:
    // 1. Not clicking the toggle button
    // 2. Not clicking the collapse button (or its children)
    // 3. Not clicking inside the container
    if (!clickedOnToggle && !clickedOnCollapse && !clickedInsideContainer) {
      setIsVisible(false); // Typically we only close on outside clicks
    }
  };

  useEffect(() => {
    addEventListener("click", handleClickOutside);
    return () => {
      removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div id="chatbot-container">
      <button onClick={toggleChatUI} id="chatbot-toggle">
        {isVisible ? (
          <MdClose size={24} style={{ pointerEvents: "none" }} /> // Using react-icons' close icon
        ) : (
          <FaFacebookMessenger size={24} style={{ pointerEvents: "none" }} />
        )}
      </button>

      {isVisible && (
        <div className="chatbot-popup">
          {/* Chatbot Header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">Chatbot</h2>
            </div>

            <button onClick={toggleChatUI} className="material-symbols-rounded">
              keyboard_arrow_down
            </button>
          </div>

          {/* Chatbot Body */}
          <div ref={chatBodyRef} className="chat-body">
            <div className="message model-message">
              <ChatbotIcon />
              <p className="message-text">
                {" "}
                Hey there 👋 <br /> How can I help you today ?
              </p>
            </div>

            {chatHistory &&
              chatHistory.map((chat, index) => (
                <ChatMessage
                  hideInChat={chat.hideInChat}
                  key={index}
                  role={
                    chat.role === "user" || chat.role === "model"
                      ? chat.role
                      : "user"
                  }
                  text={chat.text}
                />
              ))}

            {/* <div className="message user-message">
          <p className="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div> */}
          </div>

          {/* Chatbot Footer*/}
          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
