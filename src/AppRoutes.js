import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./Components/CreateUser";
import ViewUser from "./Components/DisplayUser";
import DisplayUserUser from "./Components/DisplayUser";
import DisplayUser from "./Components/DisplayUser";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateUser />}></Route>
                <Route path="/viewUser" element={<DisplayUser />}></Route>
                <Route path="/viewOneUser/+id" element={<ViewUser />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default AppRoutes;