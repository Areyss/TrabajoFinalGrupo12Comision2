import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage"
import CreateProduct from "../pages/CreateProduct";
import DeleteButton from "../components/DeleteButton";
import RestoreProducts from "../pages/RestoreProduct";
import DetailProduct from "../pages/DatailProduct";
import FavoriteProducts from "../pages/FavoriteProducts";
import EditProduct from "../pages/EditProduct";
import LoginPage from "../pages/LoginPage";
import RouteProtector from "../components/RouteProtector";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: '/login', element: < LoginPage /> },
            {
                path: 'favoritos/', element: (
                    <RouteProtector rolesPermitidos={['usuario', 'administrador']}>
                        <FavoriteProducts />
                    </RouteProtector>
                )
            },
            {
                path: 'productos/crear/', element: (
                    < RouteProtector rolesPermitidos={['administrador']} >
                        <CreateProduct />
                    </RouteProtector >
                )
            },
            {
                path: 'productos/:id', element: (
                        <DetailProduct />
                )
            },
            {
                path: 'productos/eliminar/:id', element: (
                    <RouteProtector rolesPermitidos={['administrador']}>
                        <DeleteButton />
                    </RouteProtector>
                )
            },
            {
                path: 'productos-eliminados', element: (
                    <RouteProtector rolesPermitidos={['administrador']}>
                        <RestoreProducts />
                    </RouteProtector>
                )
            },
            {
                path: 'productos/editar/:id', element: (
                    <RouteProtector rolesPermitidos={['administrador']}>
                        <EditProduct />
                    </RouteProtector>
                )
            },
            //{ path: 'about', element: < /> },
            { path: '*', element: <ErrorPage /> }
        ]
    }
]);