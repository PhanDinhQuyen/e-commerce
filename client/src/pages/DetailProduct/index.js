import React from "react";

// import httpRequest from "~/utils/httpRequest";

import { useContext } from "react";

import { GlobalState } from "~/components";

import { useParams, Link } from "react-router-dom";

import classNames from "classnames/bind";

import style from "./DetailProduct.module.scss";
import { useEffect } from "react";
import { useState } from "react";

const cx = classNames.bind(style);

export default function DetailProduct() {
  const param = useParams();

  const state = useContext(GlobalState);

  const [products] = state.productsAPI.products;

  const [productDetail, setProductDetail] = useState(null);

  // console.log(products);

  useEffect(() => {
    if (param) {
      products.forEach((product) => {
        if (product._id === param.id) {
          setProductDetail(product);
        }
      });
    }
  }, [param, products]);
  if (!productDetail) return null;

  // console.log(productDetail);
  // console.log(!!null);
  return (
    <div>
      <img src={productDetail.image.url} alt='' />
      <h3>{productDetail.title}</h3>
      <h4>${productDetail.price}</h4>
      <p>{productDetail.description}</p>
    </div>
  );
}
