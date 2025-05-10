"use client";

import { useDisclosure, MenuItem } from "@chakra-ui/react";
import { UsersModify } from "./users/UserModify";
import { useUserSettings } from "../shared/hooks/useUserSetting";

export default function AccountSettings({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { saveSettings } = useUserSettings(user._id);  

  const handleSaveSettings = (newSettings) => {
    saveSettings(newSettings);
  };

  const handleDeleteSettings = (userToDelete) => {
    console.log("Deleting", userToDelete);
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Account Settings</MenuItem>
      <UsersModify
        isOpen={isOpen}
        onClose={onClose}
        settings={user}
        saveSettings={handleSaveSettings}
        deleteSettings={handleDeleteSettings}
      />
    </>
  );
}
