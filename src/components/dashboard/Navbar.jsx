'use client'

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
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ChevronDown } from "lucide-react";

const NavLink = ({ children }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  )
}
export default function Nav({ onCourseSelect }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCourseSelect = (course) => {
    onCourseSelect(course);
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box fontSize="4xl" fontWeight="semibold" fontFamily="mono">
          Publicaciones
        </Box>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDown />}>
                Cursos
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => onCourseSelect(null)}>Todas las Publicaciones</MenuItem>
                <MenuItem onClick={() => onCourseSelect("Taller")}>Taller</MenuItem>
                <MenuItem onClick={() => onCourseSelect("Tecnologia")}>Tecnología</MenuItem>
                <MenuItem onClick={() => onCourseSelect("PracticaSupervisadas")}>Práctica Supervisadas</MenuItem>
              </MenuList>
            </Menu>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}