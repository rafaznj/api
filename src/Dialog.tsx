import { useState } from "react";
import type { Post } from "./types";

interface DialogProps {
  post: Post | null;
  onClose: () => void;
  onConfirm: (updatedPost: Post) => void;
}

export const Dialog = ({ post, onClose, onConfirm }: DialogProps) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  
  if (!post) return null;

  const handleConfirm = () => {
    if (!post) return;
    onConfirm({ ...post, title, body });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">Editar Post #{post.id}</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-stone-600">Título</label>
          <input
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-stone-600">Conteúdo</label>
          <textarea
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm min-h-25"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg border border-stone-300 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="text-sm px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
