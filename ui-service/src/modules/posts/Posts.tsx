import { useState } from "react";
import styles from "src/modules/posts/Posts.module.css";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "src/modules/posts/postsApiSlice";

const options = [5, 10, 20, 30];

export const Posts = () => {
  const [numberOfPosts, setNumberOfPosts] = useState(5);

  const { data, isError, isLoading, isSuccess } =
    useGetPostsQuery(numberOfPosts);

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleCreate = async () => {
    await createPost({
      title: "Title",
      body: "Body",
      userId: 1,
    });
  };

  const handleUpdate = async () => {
    await updatePost({
      id: 123,
      title: "Title2",
      body: "Body2",
      userId: 1,
    });
  };

  const handleDelete = async () => {
    await deletePost(123);
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <button className={styles.button} onClick={() => void handleCreate()}>
            Create Post
          </button>
          <button className={styles.button} onClick={() => void handleUpdate()}>
            Update Post
          </button>
          <button className={styles.button} onClick={() => void handleDelete()}>
            Delete Post
          </button>
        </div>
        <h3>Select the Quantity of Posts to Fetch:</h3>
        <select
          className={styles.select}
          value={numberOfPosts}
          onChange={(e) => {
            setNumberOfPosts(Number(e.target.value));
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {data.posts.map(({ body, id, title, userId }) => (
          <blockquote key={id}>
            <header>{title}</header>
            &ldquo;{body}&rdquo;
            <footer>
              <cite>{userId}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    );
  }

  return null;
};
