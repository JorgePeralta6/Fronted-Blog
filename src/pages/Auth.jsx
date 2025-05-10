import { useState } from 'react'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { Box } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

const MotionBox = motion.create(Box)

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    const handleAuthPageToggle = () => {
        setIsLogin((prev) => !prev)
    }

    const variants = {
        hidden: { opacity: 0, y: 30, transition: { duration: 0.4 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
    }

    const backgroundVariants = {
        login: {
            background: "linear-gradient(135deg,rgb(197, 71, 71),rgba(161, 196, 253, 0.34))",
            transition: { duration: 0.6 }
        },
        register: {
            background: "linear-gradient(135deg, rgba(161, 196, 253, 0.34), rgb(197, 71, 71))",
            transition: { duration: 0.6 }
        }
    }

    return (
        <MotionBox
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            initial={false}
            animate={isLogin ? "login" : "register"}
            variants={backgroundVariants}
            p={4}
        >
            <AnimatePresence mode="wait">
                {isLogin ? (
                    <MotionBox
                        key="login"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        width="100%"
                        maxW="400px"
                    >
                        <Login switchAuthHandler={handleAuthPageToggle} />
                    </MotionBox>
                ) : (
                    <MotionBox
                        key="register"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        width="100%"
                        maxW="400px"
                    >
                        <Register switchAuthHandler={handleAuthPageToggle} />
                    </MotionBox>
                )}
            </AnimatePresence>
        </MotionBox>
    )
}

export default Auth
