import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from "./context/AppContext";
import Layout from './components/Layout';
import GenerateBlogHome from './pages/GenerateBlogHome';
import BlogToTweet from './pages/BlogToTweet';
import ImproveBlogContent from './pages/ImproveBlogContent';
import Top from './pages/Top';
import LoginPage from './pages/LoginPage';
import { ChakraProvider } from '@chakra-ui/react';
import TrendAnalysisPage from './pages/TrendAnalysisPage';
import CompetitorAnalysisPage from './pages/CompetitorAnalysisPage';
import KeywordPage from './pages/KeywordPage';

// 認証を必要とするルート用コンポーネント
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, isAuthenticating } = useAppContext();

  if (isAuthenticating) {
    // 認証中はローディング状態を表示
    return <div>Loading...</div>;
  }

  return isLoggedIn ? element : <Navigate to="/login" replace />;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: "/", element: <ProtectedRoute element={<Top />} /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/generate-blog", element: <ProtectedRoute element={<GenerateBlogHome />} /> },
      { path: "/blog-to-tweet", element: <ProtectedRoute element={<BlogToTweet />} /> },
      { path: "/improve_blog_content", element: <ProtectedRoute element={<ImproveBlogContent />} /> },
      { path: "/trend-analysis", element: <ProtectedRoute element={<TrendAnalysisPage />} /> },
      { path: "/competitor-analysis", element: <ProtectedRoute element={<CompetitorAnalysisPage />} /> },
      { path: "/keyword-suggestion", element: <ProtectedRoute element={<KeywordPage />} /> },
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
