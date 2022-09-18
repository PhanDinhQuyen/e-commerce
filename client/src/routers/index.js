import { Home, Register, Login, DetailProduct, Manage, Cart } from "~/pages";
import NotFound from "~/pages/NotFound";

const publicRouters = [
  {
    path: "/",
    page: Home,
    layout: "default",
  },
  {
    path: "/product/detail/:id",
    page: DetailProduct,
    layout: "default",
  },
  {
    path: "/user/cart",
    page: Cart,
    layout: "default",
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/register",
    page: Register,
  },
  {
    path: "*",
    page: Home,
    layout: "default",
  },
];

const praviteRouters = [
  {
    path: "/admin/manage",
    page: Manage,
    layout: "default",
  },
];
export { publicRouters, praviteRouters };
