import { Home, Login, NotFound, Product, Register } from "~/pages";

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
    path: "*",
    page: NotFound,
    layout: "default",
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
