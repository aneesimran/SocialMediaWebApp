import Header from "../components/Header";
import Sidebar from "../components/ChatSidebar";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import { db } from "../firebase";
import styled from "styled-components";

export default function Chat() {
  return (
    <Container>
      <Header currentPage="chat" />
      <Sidebar />
    </Container>
  );
}

const Container = styled.div`
  background-color: whitesmoke;
`;

export async function getServerSideProps(context) {
  // get the user
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
