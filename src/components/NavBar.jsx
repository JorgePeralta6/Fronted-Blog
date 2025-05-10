"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  HStack,
  Image,
  Divider,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../shared/hooks";
import { motion } from "framer-motion";
import { UsersModify } from "./users/UserModify";
import { useUserSettings } from "../shared/hooks/useUserSetting";
import AccountSettings from "./AccountSettings";

const NavLink = ({ children, to }) => {
  const navLinkHover = useColorModeValue("gray.200", "gray.700");
  return (
    <Box
      as="div"
      px={3}
      py={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: navLinkHover,
      }}
    >
      <Link to={to}>{children}</Link>
    </Box>
  );
};

const NavLogo = () => {
  return (
    <Image
      src="https://www.svgrepo.com/show/520503/quiz.svg"
      boxSize="50px"
      borderRadius="full"
      fit="cover"
      alt="Alamcenadora"
    />
  )
}


export default function NavBar() {

  const { colorMode, toggleColorMode } = useColorMode();

  const { user, refreshUser } = useContext(UserContext);

  const { saveSettings } = useUserSettings(user._id);

  const bgColor = useColorModeValue("gray.100", "gray.900");

  const [avatarURL, setAvatarURL] = useState();

  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();

  const MotionBox = motion.create(Box);

  useEffect(() => {
    const profilePicturaFecth = async () => {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const profilePicUrl = data.results[0].picture.large;
      setAvatarURL(profilePicUrl);
    };

    profilePicturaFecth();
  }, []);

  const handleLogout = () => {
    logout();
    refreshUser();
  }

  if (!user) {
    return null;
  }

  return (
    <>

      <Box bg={bgColor} w="100%">
        <Flex
          maxW="auto"
          mx="auto"
          px={6}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <HStack spacing={8} alignItems={"center"}>
            <NavLogo />
            <Link to={'/dashboard'} >
              <Box fontWeight="bold" fontSize="xl">
                Almacenadora
              </Box>
            </Link>
            {user.role === 'ADMIN_ROLE' ? (
              <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/movimientos">Movements</NavLink>
                <NavLink to="/information">Information</NavLink>
                <NavLink to="/clients">Clients</NavLink>
                <NavLink to="/providers">Providers</NavLink>
                <NavLink to="/category">Category</NavLink>
              </HStack>
            ) : (
              <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
                <NavLink to="/movimientos">Movements</NavLink>
                <NavLink to="/clients">Clients</NavLink>
              </HStack>
            )}
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={6}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          avatarURL
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems="center">
                      <br />
                      <Center>
                        <Avatar size="2xl" src={avatarURL} />
                      </Center>
                      <br />
                      <Center>
                        <VStack spacing={2}>
                          <Text fontWeight="bold" pr="5%" pl="5%" textAlign="center">
                            {user.username}
                          </Text>
                          <MotionBox
                            as={Divider}
                            w="80%"
                            borderColor={useColorModeValue("gray.500", "gray.300")}
                            initial={{ scaleX: 0, transformOrigin: "center" }}
                            animate={{ scaleX: isOpen ? 1 : 0, transformOrigin: "center" }}
                            transition={{ duration: 1 }}
                          />
                          <Text fontWeight="bold" pr="5%" pl="5%" ps={6} pe={6} textAlign="center">
                            {user.email}
                          </Text>
                        </VStack>
                      </Center>

                      <br />
                      <MenuDivider />
                      <AccountSettings user={user} />
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>

                    </MenuList>
                  </>
                )}
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>

    </>
  );
}