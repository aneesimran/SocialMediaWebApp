import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./ChatSection";

function ChatSidebar() {
  const [session, loading] = useSession();
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", session.user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter the email of the user you wish to chat with"
    );
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== session.user.email
    ) {
      db.collection("chats").add({
        users: [session.user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <SidebarButton onClick={createChat}>New Chat</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default ChatSidebar;

const Container = styled.div`
  flex: 0.3;
  max-width: 260px;
  min-width: 260px;
  height: 94vh;
  overflow-y: scroll;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }

  --ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 767px) {
    min-width: 92vw;
    height: 100vh;
  }
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
