import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Flex,
  Spacer,
  Text,
  Icon,
  Drawer,
  DrawerContent,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useProduct } from "../../shared/hooks/useProducts";
import { ProductSearch } from "../../components/products/ProductSearch";
import { Products } from "../../components/products/Product";
import { ProductFormModal } from "../../components/products/ProductFormModal";
import NavBar from "../../components/NavBar";
import { FiAlertCircle } from "react-icons/fi";
import Footer from "../../components/dashboard/Footer";
import "./ProductPage.css";

const ProductsPage = () => {
  const { getProducts, products, isFetching, deleteProduct } = useProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [expiringSoonAlerts, setExpiringSoonAlerts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products) {
      const lowStock = [];
      const expiring = [];

      products.forEach(product => {
        if (product.expirationDate) {
          const today = new Date();
          const exp = new Date(product.expirationDate);
          const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
          if (diffDays > 0 && diffDays <= 7) {
            expiring.push({ ...product, diffDays });
          }
        }

        if (product.stock <= 10) {
          lowStock.push(product);
        }
      });

      setLowStockAlerts(lowStock);
      setExpiringSoonAlerts(expiring);
    }
  }, [products]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products || []);
    }
  }, [searchTerm, products]);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    onOpen();
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    onOpen();
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <NavBar />
      <Box display="flex">
        <SidebarAlert
          lowStockAlerts={lowStockAlerts}
          expiringSoonAlerts={expiringSoonAlerts}
        />

        <Box
          p={4}
          flex="1"
          maxWidth="1600px"
          mx="auto"
          minH="100vh"
          bgGradient="linear(to-br,rgba(0, 0, 0, 0),rgba(74, 21, 21, 0.35))" // Fondo degradado
          px={6}
          py={8}
        >
          <Flex
            className="products-header"
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: 2, md: 4 }}
            mt={4}
            mb={4}
          >
            <Heading className="title" mb={{ base: 2, md: 0 }}>Nuestros Productos</Heading>
            <Spacer />
            <Button colorScheme="teal" onClick={handleOpenAddModal}>
              ¡Registrar nuevo producto!
            </Button>
            <ProductSearch onSearch={handleSearch} />
          </Flex>

          <Box display="flex" justifyContent="center" width="100%">
            <Box width="100%">
              {isFetching ? (
                "Cargando productos..."
              ) : filteredProducts.length > 0 ? (
                <Products
                  products={filteredProducts}
                  handleEditProduct={handleEditProduct}
                  handleDeleteProduct={deleteProduct}
                />
              ) : (
                "No se encontraron productos."
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <ProductFormModal
        isOpen={isOpen}
        onClose={() => {
          setProductToEdit(null);
          onClose();
        }}
        productToEdit={productToEdit}
        onProductSaved={getProducts}
      />
      <Footer />
    </>
  );
};

const SidebarAlert = ({ lowStockAlerts, expiringSoonAlerts }) => {
  return (
    <Box
      w={{ base: "full", md: "220px" }}
      p={4}
      borderRight="0px"
      minH="100vh"
      bgColor={useColorModeValue('gray.100', 'gray.700')}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">Alertas</Text>
        <CloseButton display={{ base: "flex", md: "none" }} />
      </Flex>

      <Box mb={4}>
        <Text fontWeight="bold" mb={2}>Stock Bajo</Text>
        {lowStockAlerts.length === 0 ? (
          <Text fontSize="sm">No hay alertas</Text>
        ) : (
          lowStockAlerts.map((p) => (
            <Flex key={p.id} align="center" mb={2}>
              <Icon as={FiAlertCircle} color="red.500" mr={2} />
              <Text fontSize="sm">{p.name} ({p.stock})</Text>
            </Flex>
          ))
        )}
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>Próximas Caducidades</Text>
        {expiringSoonAlerts.length === 0 ? (
          <Text fontSize="sm">Sin productos próximos a caducar</Text>
        ) : (
          expiringSoonAlerts.map((p) => (
            <Flex key={p.id} align="center" mb={2}>
              <Icon as={FiAlertCircle} color="orange.500" mr={2} />
              <Text fontSize="sm">{p.name} (caduca en {p.diffDays} días)</Text>
            </Flex>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
