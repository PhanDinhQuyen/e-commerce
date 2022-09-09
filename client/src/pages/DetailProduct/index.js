import React from "react";

// import httpRequest from "~/utils/httpRequest";

import { useContext } from "react";

import { GlobalState } from "~/components";

import { useParams, Link } from "react-router-dom";

import classNames from "classnames/bind";

import style from "./DetailProduct.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "~/components/Loading";
// const cx = classNames.bind(style);

export default function DetailProduct() {
  const param = useParams();

  const state = useContext(GlobalState);

  const [products] = state.productsAPI.products;

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(products);

  useEffect(() => {
    const productsLocalStore = JSON.parse(localStorage.getItem("productsFind"));
    let isFindLocalStore = true;
    setLoading(true);
    if (param) {
      products.forEach((product) => {
        if (product._id === param.id) {
          setProductDetail(product);
          isFindLocalStore = false;
        }
      });
      isFindLocalStore &&
        productsLocalStore.forEach((product) => {
          if (product._id === param.id) {
            setProductDetail(product);
          }
        });
    }
    setLoading(false);
  }, [param, products]);
  if (!productDetail) {
    return;
  }

  // console.log(productDetail);
  // console.log(!!null);
  return loading ? (
    <Loading />
  ) : (
    <div>
      <img src={productDetail.image.url} alt='' />
      <h3>{productDetail.title}</h3>
      <h4>${productDetail.price}</h4>
      <p>{productDetail.description}</p>
    </div>
  );
}
