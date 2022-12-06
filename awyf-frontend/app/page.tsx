async function getPosts() {
  return Promise.resolve([1, 2, 3, 4]);
}
  
export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  return (
    <h1 className="text-3xl font-bold underline">
      Art With Your Friends 🎭
    </h1>
  );
}