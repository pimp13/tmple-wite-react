import { PostCard } from "../components/PostCard";
import useDataProvider from "../hooks/useDataProvider";

const Home = () => {
  // const {
  //   data: posts,
  //   loading,
  //   error,
  // } = useDataProvider({
  //   provider: "/posts",
  //   autoLoad: true,
  // });
  // if (error) return <div>Error: {error}</div>;
  // if (loading) return <div>Loading posts</div>;
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        Hello world this is home page...
        {/* {posts?.data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))} */}
      </div>
    </div>
  );
};
export default Home;
