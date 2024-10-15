import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    if (image) {
      const imageRef = ref(storage, `posts/${image.name + Date.now()}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        description,
        imageUrl,
        createdAt: serverTimestamp(),
        userId: currentUser.uid,
        userEmail: currentUser.email,
      });
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
      <input
        className="mb-2 p-2 border border-gray-300 rounded w-1/2"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        className="mb-2 p-2 border border-gray-300 rounded w-1/2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        className="mb-2 p-2"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded">Post</button>
    </form>
  );
};

export default CreatePost;
