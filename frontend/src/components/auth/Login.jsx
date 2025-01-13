import React, { useState } from 'react';
import { Box, Input, Button, VStack, Heading, Text } from '@chakra-ui/react';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <Box width="300px" mx="auto" mt="100px" p="4" borderWidth="1px" borderRadius="lg">
      <VStack spacing={4}>
        <Heading size="md" color="teal.500">
          ログイン
        </Heading>
        <Input
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Input
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          ログイン
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
