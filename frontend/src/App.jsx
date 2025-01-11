import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AppProvider } from "./context/AppContext";
import Layout from './components/Layout';
import GenerateBlogHome from './pages/GenerateBlogHome';
import BlogToTweet from './pages/BlogToTweet';
import ImproveBlogContent from './pages/ImproveBlogContent';
import Top from './pages/Top';
import { ChakraProvider, Container, Box } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: '/', element: <Top /> },
      { path: '/generate-blog', element: <GenerateBlogHome /> },
      { path: '/blog-to-tweet', element: <BlogToTweet /> },
      { path: '/improve_blog_content', element: <ImproveBlogContent /> },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
