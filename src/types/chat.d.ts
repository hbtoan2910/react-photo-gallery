export type ChatMessageProps = {
  hideInChat?: boolean;
  role: "user" | "model";
  text: string;
};
export type ChatFormProps = {
  chatHistory: ChatMessageProps[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessageProps[]>>;
  generateBotResponse: (history: ChatMessageProps[]) => Promise<string>;
};
