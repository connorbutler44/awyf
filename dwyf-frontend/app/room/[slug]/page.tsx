import Header from "../../../src/components/Header";
import Room from "./room";

interface Props {
  params: {
    slug: string;
  };
}
  
export default async function RoomPage(props: Props) {
  console.log(props.params.slug);
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 h-max bg-zinc-800 p-4 text-white justify-center flex">
        <Room roomId={props.params.slug}/>
      </div>
    </div>
  );
}