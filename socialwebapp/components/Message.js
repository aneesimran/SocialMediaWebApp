import { useSession } from "next-auth/client";
import React from "react";
import styled from "styled-components";
import moment from "moment";

function Message({ user, message }) {
  const [session] = useSession();

  const TypeOfMessage = user === session.user.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
  min-width: 60px;
  position: relative;
  text-align: right;
  padding-bottom: 20px;
`;

const Sender = styled(MessageElement)`
  padding-left: 30px;
  padding-right: 30px;
  margin-left: auto;
  background-color: #b8b5ff;
`;

const Reciever = styled(MessageElement)`
  padding-left: 30px;
  padding-right: 30px;
  text-align: left;
  background-color: lightgray;
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  padding-bottom: 6px;
  margin-top: 40px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
