import { Box, useColorModeValue } from '@chakra-ui/react'
import NavBar from '../components/NavBar';
import BarListComponent from '../components/Stats/BarList';
import StatsHeader from '../components/Stats/StatsHeader';
import PieChart from '../components/Stats/PieChart';
import Sidebar from '../components/Stats/Sidebar';
import TopProductCard from '../components/Stats/TopProductCard';
import TopList from '../components/Stats/TopList';
import Footer from '../components/dashboard/Footer';
import { Grid, GridItem } from "@chakra-ui/react"

export const Stats = () => {

  const bgBack = useColorModeValue('white', 'gray.700')

  return (
    <Box position="relative">
      <Box position="fixed" top="0" width="100%" zIndex="1000">
        <NavBar />
      </Box>
      
      <Box position="fixed" top="0" left="0" height="100vh" zIndex="900">
        <Sidebar />
      </Box>

      <Box 
        bg={bgBack}
        minH="100vh" 
        w="100%" 
        pt="60px"
        pl="210px"
      >
        <StatsHeader />

        <Box pr="35px" pl="35px">
          <Grid
            templateColumns="1fr 350px"
            mt="5px"
            w="100%"
            h="auto"
            gap={4}
            align="center"
          > 
            <GridItem bg="white" borderRadius="lg" overflow="hidden" boxShadow="sm">
              <BarListComponent />
            </GridItem>

            <GridItem bg="gray.50" borderRadius="lg" overflow="hidden" boxShadow="sm">
              <PieChart />
            </GridItem>
          </Grid>
        </Box>

        <Box pr="35px" pl="35px">
          <Grid
            templateColumns="350px 1fr"  
            mt="25px"
            w="100%"
            h="auto"
            gap={4}
            align="center"
          > 
            <GridItem  borderRadius="lg" overflow="hidden" boxShadow="sm">
              <TopProductCard />
            </GridItem>

            <GridItem bg="white" borderRadius="lg" overflow="hidden" boxShadow="sm">
              <TopList />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
    
  );
};

export default Stats;