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
        <div key={post.id} className="bg-white p-6 shadow-md rounded-lg w-full max-w-xl mb-6">
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4 w-full h-auto object-cover rounded-t-lg" />}
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">{post.createdAt?.toDate().toDateString()}</p>
            <p className="text-gray-600">{post.userEmail}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
