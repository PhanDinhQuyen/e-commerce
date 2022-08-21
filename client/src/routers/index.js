import { Home, Login, Product } from "~/pages";

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
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
