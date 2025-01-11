import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <Box>
    {/* Navbar をトップに配置 */}
    <Navbar />
    {/* Navbar の高さ分の余白を設定 */}
    <Box as="main" pt="64px">
      <Container maxW="container.lg" py={6}>
        {children}
      </Container>
    </Box>
  </Box>
);

export default Layout;
