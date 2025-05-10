import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export const UserSearch = ({ onSearch }) => (
  <InputGroup flex="1">
    <Input
      placeholder="Buscar usuarios..."
      onChange={(e) => onSearch(e.target.value)}
    />
    <InputRightElement>
      <LuSearch size={20} />
    </InputRightElement>
  </InputGroup>
);
