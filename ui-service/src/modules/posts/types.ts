export type PostsApiResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
};

type Reaction = {
  likes: number;
  dislikes: number;
};
