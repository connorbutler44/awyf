import Header from "../src/components/Header";
import Form from "./form";
  
export default async function Page() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 h-max bg-zinc-800 p-4 text-white justify-center flex">
        <Form />
      </div>
    </div>
  );
}