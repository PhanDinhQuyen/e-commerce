import { useContext, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts";
import { GlobalState } from "./components/GlobalState";
import { praviteRouters, publicRouters } from "./routers";

export default function App() {
  const state = useContext(GlobalState);
  const [isLogin] = state.user.login;
  const layoutOptions = {
    default: DefaultLayout,
  };
  return (
    <Routes>
      {publicRouters.map((router) => {
        const Page = router.page;
        const Layout = layoutOptions[router.layout] || Fragment;
        return (
          <Route
            key={router.path}
            path={router.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          ></Route>
        );
      })}
      {isLogin &&
        praviteRouters.map((router) => {
          const Page = router.page;
          const Layout = layoutOptions[router.layout] || Fragment;

          return (
            <Route
              key={router.path}
              path={router.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}
    </Routes>
  );
}
