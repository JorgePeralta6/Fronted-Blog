import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCategory as getCategoriesRequest, saveCategory as saveCategoryRequest, updateCategory as updateCategoryRequest, deleteCategory as deleteCategoryRequest } from "../../services";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [total, setTotal] = useState(0);

    const getCategories = async ({ limite = 12, desde = 0 }) => {
        setIsFetching(true);
        const categoryData = await getCategoriesRequest(limite, desde);
        setIsFetching(false);
    
        if (categoryData?.error) {
          console.error("Error al obtener categorias:", categoryData);
          return;
        }
    
        setCategories(categoryData.data?.categories || []);
        setTotal(categoryData.data?.total || 0);
      };


    useEffect(() => {
        getCategories();
    }, []);

    const addCatgegory = async (newCategory) => {
        const result = await saveCategoryRequest(newCategory);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || 'No se pudo guardar la categoria', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            })
        }

        toast.success('Categoria guardada con exito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        })

        await getCategories();
    };

    const updateCategory = async (id, updateCategory) => {
        const result = await updateCategoryRequest(id, updateCategory);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || 'No se pudo actualizar la categoria', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            })
        }

        toast.success('Categoria actualizada con exito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        })

        await getCategories();
    }

    const deleteCategory = async(id) => {

        const result = await deleteCategoryRequest(id);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || 'No se pudo eliminar la categoria', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            })
        }

        toast.success('Categoria eliminada con exito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        })

        await getCategories();
    }


    return {
        categories,
        getCategories,
        addCatgegory,
        updateCategory,
        deleteCategory,
        isFetching,
        total
    }
}