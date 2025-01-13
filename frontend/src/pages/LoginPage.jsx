import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Box, Input, Button, VStack, Heading, useDisclosure } from "@chakra-ui/react";
import ResultDialog from "../components/ResultDialog";

const LoginPage = () => {
  const { login } = useAppContext(); // `login` 関数を取得
  const [email, setEmail] = useState(""); // メールアドレスの状態
  const [password, setPassword] = useState(""); // パスワードの状態
  const navigate = useNavigate(); // ページ遷移用
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信動作を防止
    if (!email || !password) {
      setDialogMessage("メールアドレスとパスワードを入力してください。");
      setIsSuccess(false);
      onOpen();
      return;
    }
    const success = await login(email, password); // `login` を呼び出してログイン処理を実行
    if (success) {
      navigate("/"); // ログイン成功時にルートに遷移
    } else {
      setDialogMessage("ログイン失敗。ユーザーIDまたはパスワードを確認してください。");
      setIsSuccess(false);
      onOpen();
    }
  };

  return (
    <Box mt="100px" width="300px" mx="auto" p="4" borderWidth="1px" borderRadius="lg">
      {/* フォーム全体 */}
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <Heading size="md" color="teal.500">ログイン</Heading>
          <Input
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {/* ボタンの `type` を "submit" に設定 */}
          <Button colorScheme="teal" type="submit">ログイン</Button>
        </VStack>
      </form>
      {/* ダイアログ */}
      <ResultDialog
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={null}
        message={dialogMessage}
        isSuccess={isSuccess}
      />
    </Box>
  );
};

export default LoginPage;
