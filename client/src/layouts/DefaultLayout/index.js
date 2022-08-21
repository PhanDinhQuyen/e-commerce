import { Header, Footer } from "../components";
import { Fragment } from "react";
export default function DefaultLayout({ children }) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
