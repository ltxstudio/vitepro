import React from "react";
import Auth from "./components/Auth";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto p-4">
      {!currentUser ? (
        <Auth />
      ) : (
        <>
          <CreatePost />
          <Posts />
        </>
      )}
    </div>
  );
}

export default App;
