import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import firebase from "firebase";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function ChatScreen({ chat, messages }) {
  const [session] = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, session.user))
  );

  const sendMessage = (e) => {
    e.preventDefault();
    // update the last seen
    db.collection("users").doc(session.user.email).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: session.user.email,
      photoURL: session.user.image,
    });

    setInput("");
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(chat.users, session.user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.userPhoto} />
        ) : (
          <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
        )}
        <HeaderInformation>
          {recipient ? <h3>{recipient.name}</h3> : <h3>{recipientEmail}</h3>}

          {recipientSnapshot ? (
            <p>
              Last Active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last Active...</p>
          )}
        </HeaderInformation>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send message
        </button>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div`
  flex: 0.7;
`;

const MessageContainer = styled.div`
  padding-top: 100px !important;
  padding: 30px;
  background-color: #e5ded8;
  min-height: 89vh;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  margin-left: 15px;
  margin-right: 15px;
  background-color: whitesmoke;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const EndOfMessage = styled.div``;

const Header = styled.div`
  position: fixed;
  background-color: white;
  z-index: 49;
  top: 20;
  right: 0;
  left: 260px;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    font-size: 18px;
    font-weight: 600;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
