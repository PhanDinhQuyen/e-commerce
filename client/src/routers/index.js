import {
  Home,
  Register,
  Login,
  DetailProduct,
  HistoryOrder,
  Cart,
  History,
} from "~/pages";
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
    path: "/notfound",
    page: NotFound,
    layout: "default",
  },
  {
    path: "/*",
    page: NotFound,
    layout: "default",
  },
];

const praviteRouters = [
  {
    path: "/user/historyOrder",
    page: HistoryOrder,
    layout: "default",
  },
  {
    path: "/history/:id",
    page: History,
    layout: "default",
  },
];
export { publicRouters, praviteRouters };
