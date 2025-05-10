import { useState } from "react";
import toast from "react-hot-toast";
import { getProducts as getProductsRequest, saveProducts as saveProductsRequest, updateProducts as updateProductsRequest, deleteProducts as deleteProductsRequest  } from "../../services";

export const useProduct = () => {
  const [products, setProducts] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getProducts = async (isLogged = false) => {
    setIsFetching(true); 

    const productsData = await getProductsRequest();
  
    setIsFetching(false); 

    if (productsData.error) {
      toast.error(productsData.e?.response?.data || 'Error al traer los productos');
      return;
    }

    setProducts(productsData.data.products);

    if (isLogged) {
      return { products: productsData.data.products };
    }
  };

  const addProduct = async (newProduct) => {
    const result = await saveProductsRequest(newProduct);

    if (result.error) {
      return toast.error(result.e?.response?.data?.msg || "No se pudo guardar el producto");
    }

    toast.success("Producto guardado correctamente");
    await getProducts();
  };

  const updateProduct = async (id, updatedProduct) => {
    const result = await updateProductsRequest(id, updatedProduct);

    if (result.error) {
      return toast.error(result.e?.response?.data?.msg || "No se pudo actualizar el producto");
    }

    toast.success("Producto actualizado correctamente");
    await getProducts();
  };

  const deleteProduct = async (id, body = { confirm: "YES" }) => {
    const result = await deleteProductsRequest(id, body); 
  
    if (result.error) {
      return toast.error(result.e?.response?.data?.msg || "No se pudo eliminar el producto");
    }
  
    toast.success("Producto eliminado correctamente");
    await getProducts();
  };
  
  return {
    products,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    isFetching
  };
};
