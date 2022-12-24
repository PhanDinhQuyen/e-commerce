import { useContext, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import React, { Fragment } from "react";

import DefaultLayout from "./layouts";
import { GlobalState } from "./components/GlobalState";
import { praviteRouters, publicRouters, adminRouters } from "./routers";

export default function App() {
  const state = useContext(GlobalState);
  const [isLogin] = state.user.login;
  const [isAdmin] = state.user.admin;
  const layoutOptions = {
    default: DefaultLayout,
  };

  const routes = useMemo(() => {
    const routes = [...publicRouters];
    if (isLogin) {
      routes.push(...praviteRouters);
    }
    if (isAdmin) {
      routes.push(...adminRouters);
    }
    return routes;
  }, [isLogin, isAdmin]);
  return (
    <Routes>
      {routes.map((router) => {
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
          />
        );
      })}
    </Routes>
  );
}
