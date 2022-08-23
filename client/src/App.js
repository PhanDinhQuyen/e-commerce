import { publicRoutes } from "~/routers";
import { DefaultLayout } from "~/layouts";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";

function App() {
  const layoutOptions = {
    default: DefaultLayout,
  };
  return (
    <Routes>
      {publicRoutes.map((item) => {
        const { page, path, layout } = item;

        const Page = page;
        const Layout = layoutOptions[layout] || Fragment;

        return (
          <Route
            key={path}
            path={path}
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

export default App;
