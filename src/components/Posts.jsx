import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 shadow-md rounded w-1/2 mb-4">
          <p className="text-gray-600">{post.userEmail}</p>
          <p className="mt-2">{post.content}</p>
          <p className="text-gray-400 text-sm">{post.createdAt?.toDate().toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
