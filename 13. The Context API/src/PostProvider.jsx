import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// ! Creating own custom Context Provider Component
// Todo: Step 1:
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }
  function handleClearPosts() {
    setPosts([]);
  }
  return (
    // Todo: Step 2:
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        searchQuery: searchQuery,
        onClearPosts: handleClearPosts,
        setSearchQuery,
        onAddPost: handleAddPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// Todo: Step 3: Biz ona gore custom hooks yaradiriqki diger componentlerden el catan olsun useContext-in valuesini oxumaq ucun
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, /* PostContext */ usePosts };
