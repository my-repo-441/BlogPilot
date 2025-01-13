import React, { createContext, useState, useContext, useEffect } from "react";

// Context の作成
export const AppContext = createContext();

// プロバイダーの作成
export const AppProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token")); // ローカルストレージからトークンを取得
  const [isAuthenticating, setIsAuthenticating] = useState(true); // トークン検証中フラグ

  // トークンの有効性を検証してログイン状態を更新
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await fetch("http://127.0.0.1:5000/protected", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Invalid token");
          }

          // トークンが有効であればログイン状態を true に設定
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("token");
          setToken(null);
          setIsLoggedIn(false);
        }
      }
      setIsAuthenticating(false); // トークン検証が完了したらフラグを false にする
    };

    validateToken();
  }, [token]);

  // ログイン処理
  const login = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // トークンを保存
        setToken(data.token); // Context に保存
        setIsLoggedIn(true); // ログイン状態を更新
        return true; // ログイン成功を通知
      } else {
        return false; // ログイン失敗を通知
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("サーバーエラー");
      return false; // エラー発生時も失敗を通知
    }
  };
  

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem("token"); // トークンを削除
    setToken(null); // コンテキストをリセット
    setIsLoggedIn(false);
    alert("ログアウトしました");
  };

  return (
    <AppContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        isLoggedIn,
        isAuthenticating, // トークン検証中フラグを提供
        login,
        logout,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// useAppContext フックのエクスポート
export const useAppContext = () => useContext(AppContext);
