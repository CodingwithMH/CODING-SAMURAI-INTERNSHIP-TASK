import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/post/getposts",{}, {
          withCredentials: true,
        });
        setPosts(res.data);
      } catch (err) {
        console.log('Error fetching posts : ', err)
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading }}>
      {children}
    </PostsContext.Provider>
  );
};
