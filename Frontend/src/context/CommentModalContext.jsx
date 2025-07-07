import { createContext, useState} from "react";
export const CommentModalContext = createContext();

export const CommentModalProvider  = ({ children }) => {
  const [isCommentPanelOpen, setIsCommentPanelOpen] = useState(false); 
  return (
    <CommentModalContext.Provider value={{ isCommentPanelOpen, setIsCommentPanelOpen }}>
      {children}
    </CommentModalContext.Provider>
  );
};
