import {
  Home,
  Login,
  NotFound,
  Product,
  Register,
  DetailProduct,
} from "~/pages";

const publicRoutes = [
  {
    path: "/",
    page: Home,
    layout: "default",
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/products",
    page: Product,
    layout: "default",
  },
  {
    path: "/register",
    page: Register,
  },
  {
    path: "/detail/:id",
    page: DetailProduct,
    layout: "headerOnly",
  },
  {
    path: "*",
    page: NotFound,
    layout: "default",
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
