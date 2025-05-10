import { useEffect } from "react";
import NavBar from "./NavBar";
import { Content } from "./dashboard/Content";
import { useUsers } from "../shared/hooks/useUsers";
import { useUserDetails } from "../shared/hooks/useUserDetails";
import Footer from "./dashboard/Footer";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const ViewUsers = () => {
    const { getUsers, allUsers, isFetching } = useUsers();
    const { isLogged } = useUserDetails();

    const MotionBox = motion.create(Box);

    const backgroundVariants = {
        initial: {
            background: 'linear-gradient(135deg,rgb(197, 71, 71),rgba(161, 196, 253, 0.34))',
            transition: { duration: 1 },
        },
        animate: {
            background: 'linear-gradient(135deg, rgba(161, 196, 253, 0.34), rgb(197, 71, 71))',
            transition: { duration: 1 },
        },
    };

    useEffect(() => {
        getUsers(isLogged)
    }, [])

    if (isFetching) {
        return <Loading />
    }

    return (
        <>
            <NavBar />
            <MotionBox
                variants={backgroundVariants}
                initial="initial"
                animate="animate"
                minH="100vh"
                p={4}
            >
                <Content users={allUsers} getUsers={getUsers} />
            </MotionBox>

            <Footer />
        </>
    )
}

export default ViewUsers;