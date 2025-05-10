import React, { useEffect, useState } from 'react';
import { saveUsers, updateUser } from '../../services';
import toast from 'react-hot-toast';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel
} from '@chakra-ui/react';

const UserFormModal = ({ isOpen, onClose, userSaved, userToEdit }) => {
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        phone: ""
    });

    useEffect(() => {
        if (userToEdit) {
            setForm({
                name: userToEdit.name || "",
                lastname: userToEdit.lastname || "",
                username: userToEdit.username || "",
                email: userToEdit.email || "",
                password: "", // Mantener vacío por seguridad
                phone: userToEdit.phone || ""
            });
        } else {
            setForm({
                name: "",
                lastname: "",
                username: "",
                email: "",
                password: "",
                phone: ""
            });
        }
    }, [userToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.lastname.trim() || !form.username.trim() || !form.email.trim() || !form.password.trim() || !form.phone.trim()) {
            return toast.error("Todos los campos son obligatorios", {
                style: {
                    background: 'red',
                    color: 'white'
                }
            });
        }

        let res;
        if (userToEdit) {
            res = await updateUser(userToEdit._id, { ...form });
        } else {
            res = await saveUsers({ ...form });
        }

        if (res?.error) {
            return toast.error(res.msg, {
                style: {
                    background: 'red',
                    color: 'white'
                }
            });
        }

        toast.success(userToEdit ? "Usuario actualizado correctamente" : "Usuario guardado correctamente", {
            style: {
                background: 'green',
                color: 'white'
            }
        });
        onClose();
        userSaved();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{userToEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder="Nombre del usuario" name="name" value={form.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Apellido</FormLabel>
                        <Input placeholder="Apellido del usuario" name="lastname" value={form.lastname} onChange={handleChange} />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input placeholder="Username" name="username" value={form.username} onChange={handleChange} />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Teléfono</FormLabel>
                        <Input placeholder="Número de teléfono" name="phone" value={form.phone} onChange={handleChange} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Guardar</Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserFormModal;
