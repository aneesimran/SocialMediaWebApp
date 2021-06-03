import styled from "styled-components";
import React from "react";
import { getSession } from "next-auth/client";
import Head from "next/head";
import ChatSidebar from "../../components/ChatSidebar";
import Header from "../../components/Header";
import ChatScreen from "../../components/ChatScreen";
import { db } from "../../firebase";

function Message({ chat, messages }) {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <Header currentPage="chat" />
      <MessagingContainer>
        <ChatSidebar />
        <ChatContainer>
          <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
      </MessagingContainer>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessagingContainer = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 93vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; // ie and edge
  scrollbar-width: none; // firefox
`;

export async function getServerSideProps(context) {
  // prep the messages on the server
  const ref = db.collection("chats").doc(context.query.id);

  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //Prep the chat

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  // get the user
  const session = await getSession(context);

  return {
    props: {
      session,
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
