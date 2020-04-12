import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar = () => {
  return (
    <Menu inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          FIFALeague
        </Menu.Item>
        <Menu.Item name="League" />
        <Menu.Item>
          <Button positive content="Create League" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
