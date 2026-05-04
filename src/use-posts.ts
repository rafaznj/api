import { useState, useEffect } from "react";
import { deletePost, getPosts, updatePost } from "./controller";
import type { Post } from "./types";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPosts();
        if (!cancelled) setPosts(data);
      } catch {
        if (!cancelled) setError("Erro ao carregar posts.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const onClickUpdate = async (id: number) => {
    try {
      const response = await updatePost(id);
      return response;
    } catch {
      setError("Erro ao atualizar post.");
    }
  };

  const onClickDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch {
      setError("Erro ao deletar post.");
    }
  };

  return { posts, loading, error, onClickUpdate, onClickDelete };
};
