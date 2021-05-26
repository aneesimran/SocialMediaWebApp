import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import * as EmailValidator from "email-validator";

function ChatSidebar() {
  const createChat = () => {
    const input = prompt(
      "Please enter the email of the user you wish to chat with"
    );
    if (!input) return null;
  };
  return (
    <Container>
      <SidebarButton onClick={createChat}>New Chat</SidebarButton>
    </Container>
  );
}

export default ChatSidebar;

const Container = styled.div``;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
