// import { useState } from "react";
// import {
//     validateUsername,
//     validateUsernameMessage,
//     validationAvatarUrl,
//     avatarUrlValidationMessage,
//     validateDescription,
//     descriptionValidateMessage,
//     validateTitle,
//     validateTitleMessage,
//     emailValidationMessage,
//     validatePasswordMessage
// } from '../shared/validators'
// import { CustomInput } from './Input'
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     Input,
//     FormControl,
//     FormLabel,
//     useDisclosure
// } from "@chakra-ui/react";


// const inputs = [
//     {
//         field: 'name',
//         label: 'Name',
//         validationMessage: "",
//         type: 'text'
//     },
//     {
//         field: 'surname',
//         label: 'Lastname',
//         validationMessage: "",
//         type: 'text'
//     },
//     {
//         field: 'username',
//         label: 'Username',
//         validationMessage: validateUsernameMessage,
//         type: 'text'
//     },
//     {
//         field: 'email',
//         label: 'Email',
//         validationMessage: emailValidationMessage,
//         type: 'text'
//     },
//     {
//         field: 'password',
//         label: 'Password',
//         validationMessage: validatePasswordMessage,
//         type: 'password'
//     },
//     {
//         field: 'phone',
//         label: 'Phone',
//         validationMessage: '',
//         type: 'text'
//     }
// ]
  

// export const UserSettings = ({ settings, saveSettings }) => {
//     const [formState, setFormState] = useState({
//         email: {
//             isValid: true,
//             showError: false,
//             value: settings.email
//         },
//         name: {
//             value: settings.name,
//             isValid: true,
//             showError: false
//         },
//         password: {
//             value: settings.password,
//             isValid: validatePassword(settings.password),
//             showError: false,
//         },
//         phone: {
//             value: settings.phone,
//             isValid: true,
//             showError: false
//         },
//         surname: {
//             value: settings.surname,
//             isValid: true,
//             showError: false
//         },
//         username: {
//             value: settings.username,
//             isValid: validateUsername(settings.username),
//             showError: false,
//         }
//     })

//     const {
//         isOpen: isAccountOpen,
//         onOpen: onAccountOpen,
//         onClose: onAccountClose
//       } = useDisclosure();

//     const handleInputValueChange = (value, field) => {
//         setFormState((prevState) => ({
//             ...prevState,
//             [field]: {
//                 ...prevState[field],
//                 value
//             }
//         }))
//     }

//     const handleInputValidationOnBlur = (value, field) => {
//         let isValid = false;
//         switch (field) {
//             case "email":
//                 isValid = validateEmail(value);
//                 break;
//             case "name":
//                 isValid = true;
//                 break;
//             case "password":
//                 isValid = validatePassword(value);
//                 break;
//             case "phone":
//                 isValid = true;
//                 break;
//             case "surname":
//                 isValid = true;
//                 break;
//             case "username":
//                 isValid = validateUsername(value);
//                 break;


//             default:
//                 break;
//         }
//         setFormState((prevState) => ({
//             ...prevState,
//             [field]: {
//                 ...prevState[field],
//                 isValid,
//                 showError: !isValid,
//             },
//         }));
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();

//         saveSettings({
//             email: formState.email.value,
//             name: formState.name.value,
//             password: formState.password.value,
//             phone: formState.phone.value,
//             surname: formState.surname.value,
//             username: formState.username.value
//         })
//     }

//     const isSubmitButtonDisabled =
//         isLoading ||
//         !formState.email.isValid ||
//         !formState.name.isValid ||
//         !formState.password.isValid ||
//         !formState.phone.isValid ||
//         !formState.surname.isValid ||
//         !formState.username.isValid

//     const formBackground = useColorModeValue("white", "gray.700");
//     const labelColor = useColorModeValue("gray.700", "gray.200");
//     const buttonColor = useColorModeValue("red.500", "red.800");

//     return (
//         <Modal isOpen={isAccountOpen} onClose={onAccountClose}>
//             <ModalOverlay />
//             <ModalContent>
//                 <ModalHeader>Editar Cuenta</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody pb={6}>
//                     <FormControl>
//                         <FormLabel>Nombre de usuario</FormLabel>
//                         <Input placeholder="Nuevo nombre" defaultValue={user.username} />
//                     </FormControl>
//                     <FormControl mt={4}>
//                         <FormLabel>Correo electrónico</FormLabel>
//                         <Input placeholder="correo@ejemplo.com" defaultValue={user.email} />
//                     </FormControl>
//                 </ModalBody>

//                 <ModalFooter>
//                     <Button colorScheme="blue" mr={3}>
//                         Guardar
//                     </Button>
//                     <Button onClick={onAccountClose}>Cancelar</Button>
//                 </ModalFooter>
//             </ModalContent>
//         </Modal>

//     )
// }