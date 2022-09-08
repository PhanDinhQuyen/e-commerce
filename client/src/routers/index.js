import {
  Home,
  Login,
  NotFound,
  Product,
  Register,
  DetailProduct,
  Management,
} from "~/pages";

const publicRoutes = [
  {
    path: "/",
    page: Home,
    layout: "default",
    isAdmin: false,
  },
  {
    path: "/login",
    page: Login,
    isAdmin: false,
  },
  {
    path: "/products",
    page: Product,
    layout: "default",
    isAdmin: false,
  },
  {
    path: "/register",
    page: Register,
    isAdmin: false,
  },
  {
    path: "/detail/:id",
    page: DetailProduct,
    layout: "headerOnly",
    isAdmin: false,
  },
  {
    path: "*",
    page: NotFound,
    layout: "default",
    isAdmin: false,
  },
  {
    path: "/admin/manager",
    page: Management,
    layout: "headerOnly",
    isAdmin: true,
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
