import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export const ClientSearch = ({ onSearch }) => (
  <InputGroup flex="1">
    <Input
      placeholder="Buscar clientes..."
      onChange={(e) => onSearch(e.target.value)}
    />
    <InputRightElement>
      <LuSearch size={20} />
    </InputRightElement>
  </InputGroup>
);
