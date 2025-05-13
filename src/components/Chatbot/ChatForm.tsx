import { useState } from "react";
import { ChatFormProps } from "../../types/chat";

const ChatForm: React.FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) => {
  const [userInputText, setUserInputText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputText(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInputText.trim()) return;
    setUserInputText("");

    /*
    // Update chat history with user's message immediately
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: userInputText },
    ]);

    // Add message with content: "thinking..." for bot right after
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "model", text: "is thinking ..." },
    ]);
    */

    // Single update for both messages
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: userInputText },
      { role: "model", text: "Thinking..." },
    ]);

    try {
      //Call the function to generate the bot's response
      const botResponseMessage = await generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this query: ${userInputText}`, //use prefinedDate combine with AI
        },
        // Removing the restrictive prefix ("Using the details provided above...") will make Gemini behave like
        // its default mode—answering based on its full training data (not just your predefined context)
      ]);
      // Remove the "Thinking..." message and add the actual response from bot
      setChatHistory((prevHistory) => [
        ...prevHistory.slice(0, -1), // Remove the last message ("Thinking...")
        { role: "model", text: botResponseMessage },
      ]);
    } catch (error) {
      console.log(error);
      // Replace "Thinking..." with error message if something went wrong
      setChatHistory((prevHistory) => [
        ...prevHistory.slice(0, -1),
        {
          role: "model",
          text: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Message..."
        className="message-input"
        value={userInputText}
        onChange={handleInputChange}
        required
      />
      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
