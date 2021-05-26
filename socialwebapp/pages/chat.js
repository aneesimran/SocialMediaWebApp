import Header from "../components/Header";
import Sidebar from "../components/ChatSidebar";
import { getSession } from "next-auth/client";

export default function Chat() {
  return (
    <div>
      <Header currentPage="chat" />
      <Sidebar />
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the user
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
