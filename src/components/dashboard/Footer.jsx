'use client'

import React from 'react'
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Image,
  Flex,
} from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'blackAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'blackAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.900', 'gray.900')}
      color={useColorModeValue('gray.200', 'gray.200')}
    >
      <Container maxW={'6xl'} py={10}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap={10}>
          {/* Imagen a la izquierda */}
          <Box flex="1" display="flex" justifyContent="flex-start">
            <Image
              src="https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-warehouse-flat-composition-png-image_12506935.png"
              boxSize="250px"
              objectFit="contain"
            />
          </Box>

          {/* Contenido de columnas */}
          <Box flex="3" w="full">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
              <Stack align={'flex-start'}>
                <ListHeader>Company</ListHeader>
                <Box as="a" href={'#'}>Joaquin Figueroa</Box>
                <Box as="a" href={'#'}>Jorge Peralta</Box>
                <Box as="a" href={'#'}>Lisandro Jimenez</Box>
                <Box as="a" href={'#'}>Robbin Sisimit</Box>
                <Box as="a" href={'#'}>Luis De Leon</Box>
                <Box as="a" href={'#'}>Luis Pichiya</Box>
              </Stack>

              <Stack align={'flex-start'}>
                <ListHeader>Support</ListHeader>
                <Box as="a" href={'#'}>Help Center</Box>
                <Box as="a" href={'#'}>Safety Center</Box>
                <Box as="a" href={'#'}>Community Guidelines</Box>
              </Stack>

              <Stack align={'flex-start'}>
                <ListHeader>Legal</ListHeader>
                <Box as="a" href={'#'}>Cookies Policy</Box>
                <Box as="a" href={'#'}>Privacy Policy</Box>
                <Box as="a" href={'#'}>Terms of Service</Box>
                <Box as="a" href={'#'}>Law Enforcement</Box>
              </Stack>
            </SimpleGrid>
          </Box>
        </Flex>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text>© 2025 Tu Empresa. Todos los derechos reservados</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'https://x.com/JoFLeF'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'https://youtu.be/xvFZjo5PgG0?si=LdDH14rtIck5OtX2'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'https://www.instagram.com/jk.i.fg/'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
