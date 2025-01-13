import React from "react";
import ReactDOM from "react-dom";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

function ResultDialog({ isOpen, onClose, cancelRef, message, isSuccess }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            display="flex"
            alignItems="center"
          >
            <Icon
              as={isSuccess ? CheckCircleIcon : WarningIcon}
              color={isSuccess ? "green.500" : "red.500"}
              boxSize={6}
              mr={2}
            />
            {isSuccess ? "成功" : "エラー"}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="blue">
              閉じる
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>,
    document.getElementById("modal") // Portalを使用
  );
}

export default ResultDialog;
