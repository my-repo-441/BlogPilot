import React, { useState } from 'react';
import { Box, Heading, List } from '@chakra-ui/react';
import NavButton from './common/NavButton'; // 修正版の NavButton をインポート

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (menuName) => setOpenMenu(menuName);
  const handleCloseMenu = () => setOpenMenu(null);

  const menuData = [
    { label: "Home", href: "/" },
    {
      label: "Generate Content",
      menuName: "generate",
      menuItems: [
        { label: "Generate Blog", href: "/generate-blog" },
        { label: "Blog to Tweet", href: "/blog-to-tweet" },
        { label: "Blog Improvement", href: "/improve_blog_content" },
      ],
    },
    {
      label: "Analytics",
      menuName: "analytics",
      menuItems: [
        { label: "Fetch Trends", href: "/fetch-trends" },
        { label: "Trend Analysis", href: "/trend-analysis" },
        { label: "Competitor Analysis", href: "/competitor-analysis" },
      ],
    },
  ];

  return (
    <Box
      as="nav"
      bg="teal.500"
      color="black"
      p={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      position="fixed"
      top={0}
      zIndex={1}
      height="80px"
    >
      <Heading as="h2" size="md">
        Menu
      </Heading>
      <List display="flex" alignItems="center">
        {menuData.map((menu, index) => (
          <NavButton
            key={index}
            label={menu.label}
            href={menu.href}
            menuItems={menu.menuItems}
            isOpen={openMenu === menu.menuName}
            onOpen={() => handleOpenMenu(menu.menuName)}
            onClose={handleCloseMenu}
          />
        ))}
      </List>
    </Box>
  );
};

export default Navbar;
