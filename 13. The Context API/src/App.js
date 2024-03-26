import { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// ! Step 1: Create a new CONTEXT component
const PostContext = createContext();

function App() {
  const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()));
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);
  // Derived state. These are the posts that will actually be displayed
  const searchedPosts = searchQuery.length > 0 ? posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())) : posts;
  // console.log(posts);  // {title: 'mobile protocol', body: "I'll hack the back-end API circuit, that should firewall the SQL pixel!"}

  function handleAddPost(post) { setPosts((posts) => [post, ...posts]) }  // [post, ...posts] ona gore bele yazildiki daxil edilen deyer evvele getsin
  function handleClearPosts() { setPosts([]) }

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(function () {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]);

  return (
    // ! Step 2: PROVIDE VALUE to child components    value={{posts : searchedPosts}} === <Component posts={searchedPosts} />
    <PostContext.Provider value={{
      posts : searchedPosts,
      searchQuery : searchQuery,
      onClearPosts : handleClearPosts,
      setSearchQuery,
      onAddPost : handleAddPost,
    }}>
      <section>
        <button onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)} className="btn-fake-dark-mode">{isFakeDark ? "☀️" : "🌙"}</button>
        <Header /* posts={searchedPosts} onClearPosts={handleClearPosts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} //! There is no need props anymore*//>        
        <Main /* posts={searchedPosts} onAddPost={handleAddPost} */ />
        <Archive /* onAddPost={handleAddPost} */ />
        <Footer />
      </section>
    </PostContext.Provider>
  );
}

function Header(/* { posts, onClearPosts, searchQuery, setSearchQuery } */) {
  // ! Step 3: CONSUMING (read) the Provided Context Value 
  const allStates = useContext(PostContext);
  const { posts , searchQuery, onClearPosts, setSearchQuery, onAddPost } = allStates;
  // const { posts , searchQuery, onClearPosts, setSearchQuery, onAddPost } = useContext(PostContext);
  // console.log(allStates);       // * {posts: Array(30), searchQuery: '', onClearPosts: ƒ, setSearchQuery: ƒ, onAddPost: ƒ}

  return (
    <header>
      <h1><span>⚛️</span>The Atomic Blog</h1>
      <div>
        <Results /* posts={posts} */ />
        <SearchPosts /* searchQuery={searchQuery} setSearchQuery={setSearchQuery} */ />
        <button onClick={onClearPosts} /* onClick={onClearPosts} */>Clear posts</button>
      </div>
    </header>
  );
}

function Results(/* { posts } */) {
  const {posts} = useContext(PostContext);
  return <p>🚀 {posts.length} atomic posts found</p>;
}
function SearchPosts(/* { searchQuery, setSearchQuery } */) {
  const {searchQuery, setSearchQuery} = useContext(PostContext);
  return <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search posts..." />;
}

function Main(/* { posts, onAddPost } */) {
  return (
    <main>
      <FormAddPost /* onAddPost={onAddPost} */ />
      <Posts /* posts={posts} */ />
    </main>
  );
}

function Posts(/* { posts } */) {
  return <section><List /></section>;
}
function FormAddPost(/* { onAddPost } */) {
  const {onAddPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Post body" />
      <button>Add post</button>
    </form>
  );
}

function List(/* { posts } */) {
  const { posts } = useContext(PostContext);
  return (
    <ul>{posts.map((post, i) => <li key={i}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </li>)}</ul>
  );
}

function Archive(/* { onAddPost } */) {
  const {onAddPost} = useContext(PostContext);
  const [posts] = useState(() => Array.from({ length: 10000 }, () => createRandomPost()));
  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>{showArchive ? "Hide archive posts" : "Show archive posts"}</button>
      {showArchive && (
        <ul>{posts.map((post, i) => <li key={i}>
          <p><strong>{post.title}:</strong> {post.body}</p>
          <button onClick={() => onAddPost(post)}>Add as new post</button>
        </li>)}</ul>)}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;