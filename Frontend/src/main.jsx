import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user.context.jsx";
import { PostProvider } from "./context/post.context.jsx";
import { CommentModalProvider } from "./context/CommentModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PostProvider>
          <CommentModalProvider>
            <App />
          </CommentModalProvider>
        </PostProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
