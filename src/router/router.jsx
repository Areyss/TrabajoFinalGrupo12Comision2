import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage"
import CreateProduct from "../pages/CreateProduct";
import DeleteButton from "../components/DeleteButton";
import RestoreProducts from "../pages/RestoreProduct";
import DetailProduct from "../pages/DatailProduct";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            //{ path: 'favoritos/', element: < /> },
            { path: 'productos/crear/', element: <CreateProduct /> },
            { path: 'productos/:id', element: < DetailProduct /> },
            { path: 'productos/eliminar/:id', element: < DeleteButton /> },
            { path: 'productos-eliminados', element: < RestoreProducts /> },
            //{ path: 'productos/editar/:id', element: < /> },
            //{ path: 'about', element: < /> },
            { path: '*', element: <ErrorPage /> }
        ]
    }
]);