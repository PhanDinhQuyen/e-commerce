import { useContext, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts";
import { GlobalState } from "./components/GlobalState";
import { praviteRouters, publicRouters } from "./routers";

export default function App() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.user.admin;
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
      {/* Only admin render router */}
      {isAdmin &&
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
