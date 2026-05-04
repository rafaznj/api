import { usePosts } from "./use-posts";

function App() {
  const { posts, loading, error, onClickUpdate, onClickDelete } = usePosts();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <span>{post.id}</span>
          <button onClick={() => onClickUpdate(post.id)}>update</button>
          <button onClick={() => onClickDelete(post.id)}>delete</button>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default App;
