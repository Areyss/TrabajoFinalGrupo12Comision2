import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/home"
import ErrorPage from "../pages/ErrorPage"
import CreateProduct from "../pages/CreateProduct";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            //{ path: 'favoritos/', element: < /> },
            //{ path: 'productos', element: < /> },
            { path: 'productos/crear/', element: <CreateProduct /> },
            //{ path: 'productos/editar/:id', element: < /> },
            //{ path: 'about', element: < /> },
            { path: '*', element: <ErrorPage /> }
        ]
    }
]);