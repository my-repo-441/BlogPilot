import React from "react";
import { ListItem, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavButton = ({ label, href, menuItems, isOpen, onOpen, onClose }) => {
  const buttonStyles = {
    bg: "transparent",
    _hover: { bg: "teal.600" },
    _focus: { boxShadow: "none" },
    height: "40px",
    lineHeight: "40px",
    fontWeight: "bold",
    px: 4,
  };

  return menuItems ? (
    <ListItem>
      <Menu isOpen={isOpen}>
        <MenuButton
          as={Button}
          {...buttonStyles}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          {label}
        </MenuButton>
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <Link to={item.href}>{item.label}</Link>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </ListItem>
  ) : (
    <ListItem>
      <Button as={Link} to={href} {...buttonStyles}>
        {label}
      </Button>
    </ListItem>
  );
};

export default NavButton;
