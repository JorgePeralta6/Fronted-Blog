import React, { useEffect, useState } from 'react'
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
    FormLabel,
    useDisclosure,
    InputGroup,
    Select
} from '@chakra-ui/react';

const UserFormModal = ({ isOpen, onClose, userSaved, userToEdit }) => {
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        code: "+502"
    });

    const phoneData = {
        "+1": { flag: "", length: 10 },
        "+44": { flag: "🇬🇧", length: 10 },
        "+34": { flag: "🇪🇸", length: 9 },
        "+52": { flag: "🇲🇽", length: 10 },
        "+503": { flag: "🇸🇻", length: 8 },
        "+504": { flag: "🇭🇳", length: 8 },
        "+505": { flag: "🇳🇮", length: 8 },
        "+506": { flag: "🇨🇷", length: 8 },
        "+507": { flag: "🇵🇦", length: 8 },
        "+509": { flag: "🇭🇹", length: 8 },
        "+51": { flag: "🇵🇪", length: 9 },
        "+54": { flag: "🇦🇷", length: 10 },
        "+55": { flag: "🇧🇷", length: 11 },
        "+56": { flag: "🇨🇱", length: 9 },
        "+57": { flag: "🇨🇴", length: 10 },
        "+58": { flag: "🇻🇪", length: 10 },
        "+502": { flag: "🇬🇹", length: 8 }
    };


    useEffect(() => {
        if (userToEdit) {
            setForm({
                name: String(userToEdit.name) || "",
                lastname: String(userToEdit.lastname) || "",
                username: String(userToEdit.username) || "",
                email: String(userToEdit.email) || "",
                phone: String(userToEdit.phone) || "",
                code: userToEdit.code || "+502"
            });
        } else {
            setForm({
                name: "",
                lastname: "",
                username: "",
                email: "",
                phone: "",
                code: "+502"
            })
        }
    }, [userToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.phone.trim()) {
            return toast.error("Ambos campos son obligatorios", {
                style: {
                    background: 'red',
                    color: 'white',
                    whiteSpace: 'pre-line'
                }
            });
        }

        const expectedLength = phoneData[form.code]?.length;

        if (!expectedLength || form.phone.trim().length !== expectedLength) {
            return toast.error(`El número debe tener exactamente ${expectedLength} dígitos para el código ${form.code}`, {
                style: {
                    background: 'red',
                    color: 'white',
                    whiteSpace: 'pre-line'
                }
            });
        }

        const fullPhone = `${form.code} ${form.phone}`;

        let res;
        if (userToEdit) {
            res = await updateUser(userToEdit._id, { ...form, phone: fullPhone });
        } else {
            res = await saveUsers({ ...form, phone: fullPhone })
        }

        if (res?.error) {
            return toast.error(res.msg , {
                style: {
                    background: 'red',
                    color: 'white',
                    whiteSpace: 'pre-line'
                }
            });
        }

        toast.success(userToEdit ? "User actualizado correctamente" : "Producto guardado correctamente", {
            style: {
                background: 'green',
                color: 'white'
            }
        });
        onClose();
        userSaved();
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{userToEdit ? 'Editar usuario' : 'Nuevo Usuario'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mb={4} isRequired >
                            <FormLabel>Nombre</FormLabel>
                            <Input
                                placeholder="Nombre del usuario"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired >
                            <FormLabel>Teléfono</FormLabel>
                            <InputGroup>
                                <Select
                                    width="35%"
                                    value={form.code || "+502"}
                                    onChange={(e) => setForm(prev => ({ ...prev, code: e.target.value }))}
                                    mr={2}
                                >
                                    {Object.entries(phoneData).map(([code, data]) => (
                                        <option key={code} value={code}>
                                            {data.flag} {code}
                                        </option>
                                    ))}
                                </Select>
                                <Input
                                    placeholder="Número"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Guardar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserFormModal