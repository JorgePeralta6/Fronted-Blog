import { Route, Routes } from "react-router-dom";
import { Users } from "../users/Users";
import { Settings } from "../settings/Settings";
import {UsersCards} from "../users/UsersCards";

export const Content = ({ users, getUsers}) => {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Users users={users} /> } />
                <Route path="/users/:id" element={ <Settings/> } />          
                <Route path="/users/" element={ <Settings/> } />          
            </Routes>
        </>
    )
}