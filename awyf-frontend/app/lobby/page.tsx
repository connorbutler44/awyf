async function getPosts() {
  return Promise.resolve([5, 6, 7, 8]);
}
  
export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  return <div>Lobby</div>;
}