import { Box, Button, useColorModeValue } from '@chakra-ui/react'
import NavBar from '../components/NavBar';
import MovimientosTableComponent from '../components/Movimientos/Registros'

const Mtable = ({ switchEntryHandler, switchOutHandler }) => {
  return (
    <Box bg={useColorModeValue('gray.300', 'gray.700')} minH="100vh" w="100%">
      <NavBar />
      <Button variant="solid" m={3} onClick={switchEntryHandler}>Entrada</Button>

      <Button variant="solid" m={3} onClick={switchOutHandler}>Salida</Button>

      <MovimientosTableComponent />
    </Box>
  )
}

export default Mtable