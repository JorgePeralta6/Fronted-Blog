import React from "react";
import {
    Box,
    Text,
    Stack,
    Heading,
    Image,
    Divider,
    Button,
    HStack,
    useColorModeValue,
} from "@chakra-ui/react";

const borderColorByCourse = {
    PracticaSupervisadas: "blue.400",
    Taller: "green.400",
    Tecnologia: "purple.400",
};

const PublicationCard = ({ pub, viewMode, onOpenModal }) => {
    return viewMode === "grid" ? (
        <Box
            key={pub._id}
            p={6}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="2xl"
            rounded="lg"
            borderLeft="6px solid"
            borderLeftColor={borderColorByCourse[pub.course] || "gray.300"}
        >
            <Image
                rounded="lg"
                height={250}
                width="full"
                objectFit="cover"
                src={pub.image}
                alt="#"
            />
            <Stack pt={5} spacing={3} flex={1}>
                <Heading fontSize="xl">{pub.title}</Heading>
                <Text>{pub.maintext}</Text>
                <Text color="gray.500">Curso: {pub.course}</Text>
                <Text color="gray.500">Autor: {pub.author}</Text>
                <Text color="gray.500">
                    Fecha-Publicacion: {new Date(pub.createdAt).toLocaleDateString()}
                </Text>
                <Divider my={4} />
                <Button onClick={() => onOpenModal(pub)} colorScheme="blue" size="sm">
                    Ver más
                </Button>
            </Stack>
        </Box>
    ) : (
        <Box
            key={pub._id}
            p={4}
            w="full"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="2xl"
            rounded="lg"
            borderLeft="6px solid"
            borderLeftColor={borderColorByCourse[pub.course] || "gray.300"}
        >
            <HStack align="start">
                <Image
                    rounded="lg"
                    height={190}
                    width={250}
                    objectFit="cover"
                    src={pub.image}
                    alt="#"
                />
                <Stack spacing={2} flex={1}>
                    <Heading fontSize="lg">{pub.title}</Heading>
                    <Text>{pub.maintext}</Text>
                    <Text color="gray.500">Curso: {pub.course}</Text>
                    <Text color="gray.500">Autor: {pub.author}</Text>
                    <Text color="gray.500">
                        Fecha-Publicacion: {new Date(pub.createdAt).toLocaleDateString()}
                    </Text>
                    <Button onClick={() => onOpenModal(pub)} colorScheme="blue" size="sm">
                        Ver más
                    </Button>
                </Stack>
            </HStack>
        </Box>
    );
};

export default PublicationCard;
