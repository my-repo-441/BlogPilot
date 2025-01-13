import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const IntroVideo = ({ onClose }) => {
  return (
    <Box
      width="100%"
      height="300px"
      bg="black"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      {/* 動画要素 */}
      <video
        src="/path/to/your/video.mp4" // 動画パスを指定
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* 閉じるボタン */}
      <IconButton
        aria-label="Close video"
        icon={<CloseIcon />}
        position="absolute"
        top="10px"
        right="10px"
        bg="red.500"
        color="white"
        borderRadius="50%"
        onClick={onClose}
      />
    </Box>
  );
};

export default IntroVideo;
