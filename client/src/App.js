import { publicRoutes } from "~/routers";
import { DefaultLayout, HeaderOnly } from "~/layouts";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import { GlobalState } from "./components";
import { useContext } from "react";

function App() {
  const layoutOptions = {
    default: DefaultLayout,
    headerOnly: HeaderOnly,
  };

  const state = useContext(GlobalState);
  const [isAdminState] = state.userAPI.isAdmin;
  return (
    <Routes>
      {publicRoutes.map((item) => {
        const { page, path, layout } = item;
        let isAdmin = item.isAdmin;

        if (isAdmin && isAdminState) {
          isAdmin = false;
        }
        const Page = page;
        const Layout = layoutOptions[layout] || Fragment;

        return (
          !isAdmin && (
            <Route
              key={path}
              path={path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        );
      })}
    </Routes>
  );
}

export default App;
