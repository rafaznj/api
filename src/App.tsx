import { useState } from "react";
import { Dialog } from "./Dialog";
import { usePosts } from "./use-posts";
import type { Post } from "./types";

function App() {
  const { posts, loading, error, onClickUpdate, onClickDelete } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (loading)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 text-sm tracking-widest uppercase animate-pulse">
          Carregando...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-red-500 text-sm border border-red-200 bg-red-50 px-4 py-2 rounded">
          {error}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 px-8 py-6">
        <h1 className="text-2xl font-bold tracking-tight text-stone-800">
          Posts
        </h1>
        <p className="text-stone-400 text-sm mt-1">{posts.length} resultados</p>
      </header>

      <ul className="max-w-2xl mx-auto px-8 py-8 flex flex-col gap-6">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                #{post.id}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-400 text-xs px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-blue-400 hover:border-stone-400 transition-colors duration-150 font-medium hover:text-white cursor-pointer"
                >
                  Editar
                </button>

                <button
                  onClick={() => onClickDelete(post.id)}
                  className="text-xs text-red-500 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors duration-150 font-medium cursor-pointer"
                >
                  Excluir
                </button>
              </div>
            </div>

            <h2 className="text-base font-semibold text-stone-800 capitalize mb-2 leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed">
              {post.body}
            </p>
          </li>
        ))}
      </ul>
      <Dialog
        key={selectedPost?.id}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onConfirm={(updatePost) => onClickUpdate(updatePost)}
      />
    </div>
  );
}

export default App;
