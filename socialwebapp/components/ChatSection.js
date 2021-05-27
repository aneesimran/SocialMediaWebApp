import { Avatar } from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

function ChatSection({ id, users }) {
  const [session] = useSession();
  const recipientEmail = getRecipientEmail(users, session.user);
  const router = useRouter();

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(users, session.user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/message/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <>
          <UserAvatar src={recipient?.userPhoto} />
          <p>{recipient?.name}</p>
        </>
      ) : (
        <>
          <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
          <p>{recipientEmail}</p>
        </>
      )}
    </Container>
  );
}

export default ChatSection;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid whitesmoke;

  > p {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
