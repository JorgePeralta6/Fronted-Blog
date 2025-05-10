'use client'

import React from 'react'
import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const MotionBox = motion.create(Box)

function AnimatedCard({ image, alt, title, description }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 })

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      role={'group'}
      p={6}
      mt={10}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
    >
      <Box
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: { filter: 'blur(20px)' },
        }}
      >
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={image}
          alt={alt}
          transition="transform 0.3s ease"
          _groupHover={{ transform: 'scale(1.1)' }}
        />
      </Box>
      <Stack pt={10} align={'center'}>
        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          {title}
        </Text>
        <Text fontWeight={800} fontSize={'xl'} textAlign="center">
          {description}
        </Text>
      </Stack>
    </MotionBox>
  )
}

export default function HeadLine() {
  const bgText = useColorModeValue('black', 'black')
  const bgHeadLine = useColorModeValue('gray.100', 'white')

  return (
    <Box textAlign="center" py={10} px={6} bg={bgHeadLine}>
      <Heading as="h2" size="xl" mt={6} mb={2} color={bgText}>
        Almacenadora JPLRLP
      </Heading>
      <Text color={'black'} mb={8}>
        Esta es nuestra almacenadora donde se gestiona diferentes productos de todo el país.
      </Text>

      <Flex justify="center" gap={6} wrap="wrap">
        <AnimatedCard
          image="https://images.unsplash.com/photo-1592085198739-ffcad7f36b54?q=80"
          alt="Bodega Norte"
          title="Bodega Norte"
          description="Almacena productos nacionales."
        />
        <AnimatedCard
          image="https://images.unsplash.com/photo-1601598704991-eef6114775e0?q=80&w=1974&auto=format&fit=crop"
          alt="Bodega Sur"
          title="Bodega Sur"
          description="Recepción de importaciones."
        />
        <AnimatedCard
          image="https://images.unsplash.com/photo-1504376830547-506dedfe1fe9?q=80&w=2070&auto=format&fit=crop"
          alt="Bodega Central"
          title="Bodega Central"
          description="Distribución nacional."
        />
        <AnimatedCard
          image="https://images.unsplash.com/photo-1578351709091-33ee78a1565d?q=80&w=2070&auto=format&fit=crop"
          alt="Bodega de Respaldo"
          title="Bodega de Respaldo"
          description="Mercancía de emergencia."
        />
      </Flex>
    </Box>
  )
}
