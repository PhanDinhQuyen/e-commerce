import { useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "~/components/GlobalState";

import classNames from "classnames/bind";
import style from "./Home.module.scss";

const cx = classNames.bind(style);

export default function Home() {
  const state = useContext(GlobalState);
  const [products] = state.products;

  const renderProducts = () => {
    return (
      <ul className={cx("list_products")}>
        {products.map((product) => (
          <li key={product._id}>
            <Link target='_blank' to={`/product/detail/${product._id}`}>
              <figure>
                <img width='250' src={product.image.url} alt='' />
                <figcaption>{product.description}...</figcaption>
              </figure>
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return <div className={cx("wrapper")}>{renderProducts()}</div>;
}
