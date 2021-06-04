import Header from "../components/Header";
import Sidebar from "../components/ChatSidebar";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import { db } from "../firebase";
import styled from "styled-components";
import NavSidebar from "../components/Sidebar";

export default function Chat() {
  return (
    <Container>
      <Header currentPage="chat" />
      <NavSidebarContainer>
        <NavSidebar currentPage="chat" />
        <Sidebar />
      </NavSidebarContainer>
      <LargeScreens>
        <Sidebar />
      </LargeScreens>
    </Container>
  );
}

const Container = styled.div`
  background-color: whitesmoke;
`;

const LargeScreens = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const NavSidebarContainer = styled.div`
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }
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
