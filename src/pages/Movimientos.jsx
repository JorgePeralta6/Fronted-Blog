import React, { useState, useContext } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Mtable from '../components/Mtable';
import { Entry } from '../components/Movimientos/Entry';
import { Out } from '../components/Movimientos/Out'; // Asegúrate de importar esto

import { UserContext } from '../context/UserContext';

const Movimientos = () => {
  const [view, setView] = useState("table");
  const { user } = useContext(UserContext);

  return (
    <Box bg={useColorModeValue('gray.300', 'gray.700')} minH="100vh" w="100%">
      {user ? (
        view === "table" ? (
          <Mtable
            switchEntryHandler={() => setView("entry")}
            switchOutHandler={() => setView("out")}
          />
        ) : view === "entry" ? (
          <Entry switchEntryHandler={() => setView("table")} />
        ) : (
          <Out switchOutHandler={() => setView("table")} />
        )
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </Box>
  );
};

export default Movimientos;
