import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "~/components/GlobalState";
import Loading from "~/components/Loading";
import { toastError, toastSuccess } from "~/components/Toast";
import * as httpRequest from "~/utils/httpRequest";
import style from "./Upload.module.scss";
import { TiDelete } from "react-icons/ti";
import errorInfor from "~/utils/errorInfor";

const cx = classNames.bind(style);

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "Health",
  checked: false,
  image: {},
};

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [stateProduct, setStateProduct] = useState(initialState);
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [isAdmin] = state.user.admin;
  const [loading, setLoading] = useState(false);
  const [categories] = state.categories;
  const [disableButton, setDisableButton] = useState(false);
  // const inputRef = useRef();
  // console.log(category);
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = async (e) => {
    try {
      if (!isAdmin) {
        return;
      }

      const file = e.target.files[0];
      const typeImgSupport = ["image/jpg", "image/jpeg", "image/png"];

      if (
        !file ||
        file.size > 1024 * 1024 ||
        !typeImgSupport.includes(file.type)
      ) {
        toastError(
          !file
            ? "No file selected"
            : file.size > 1024 * 1024
            ? "File is too large"
            : "File is not supported"
        );
        setPreview(undefined);
        setSelectedFile(undefined);
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const result = await httpRequest.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setStateProduct((state) => {
        state.image = result;
        return state;
      });
      setSelectedFile(file);
    } catch (error) {
      setSelectedFile(undefined);
      toastError(error.message);
    } finally {
      e.target.value = null;
      setLoading(false);
    }
  };

  const handleChangeProduct = (objName, value) => {
    setDisableButton(false);
    setStateProduct({
      ...stateProduct,
      [objName]: value,
    });
  };

  const handleDeleteImage = async (e) => {
    e.target.value = null;
    try {
      setPreview(undefined);
      setSelectedFile(undefined);
      const reuslt = await httpRequest.post(
        "/api/destroy",
        {
          public_id: "imgFolder/sxuhhojv6aantzfo35kk",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(reuslt);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickUploadButton = async (e) => {
    e.preventDefault();
    try {
      console.log("run");
      for (const key in stateProduct) {
        if (key === "checked") continue;

        if (!stateProduct[key]) {
          toastError("Required");
          return;
        }
      }

      const result = await httpRequest.post("api/product", stateProduct, {
        headers: {
          Authorization: token,
        },
      });
      console.log(result);
      toastSuccess("Product created successfully");

      setStateProduct(initialState);
      setPreview(undefined);
      setSelectedFile(undefined);
    } catch (error) {
      toastError("Product already exists!");
      errorInfor(error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("l_img")}>
        <label htmlFor='files'>Select Image</label>
        <input
          id='files'
          onChange={onSelectFile}
          style={{ visibility: "hidden", position: "absolute" }}
          type='file'
        />
        <div className={cx("l_img_wrapper")}>
          {!loading ? <img src={preview} alt='' /> : <Loading />}
          {!!preview && (
            <button onClick={handleDeleteImage}>
              <TiDelete />
            </button>
          )}
        </div>
      </div>
      <div className={cx("l_form")} action=''>
        <div className={cx("f_input")}>
          <label htmlFor=''>ProductID</label>
          <input
            value={stateProduct.product_id}
            onChange={(e) => handleChangeProduct("product_id", e.target.value)}
            type='text'
            name=''
            id=''
            // required
          />
        </div>

        <div className={cx("f_input")}>
          <label htmlFor=''>Title</label>
          <input
            value={stateProduct.title}
            onChange={(e) => handleChangeProduct("title", e.target.value)}
            type='text'
            name=''
            id=''
            // required
          />
        </div>

        <div className={cx("f_input")}>
          <label htmlFor=''>Price</label>
          <input
            value={stateProduct.price}
            onChange={(e) => handleChangeProduct("price", e.target.value)}
            type='number'
            name=''
            id=''
            // required
          />
        </div>

        <div className={cx("f_input")}>
          <label htmlFor=''>Description</label>
          <input
            value={stateProduct.description}
            onChange={(e) => handleChangeProduct("description", e.target.value)}
            type='text'
            name=''
            id=''
            // required
          />
        </div>

        <div className={cx("f_input")}>
          <label htmlFor=''>Content</label>
          <input
            value={stateProduct.content}
            onChange={(e) => handleChangeProduct("content", e.target.value)}
            type='text'
            name=''
            id=''
            // required
          />
        </div>

        <div className={cx("f_input")}>
          <label htmlFor=''>Category</label>
          <select
            onChange={(e) => handleChangeProduct("category", e.target.value)}
            name=''
            id=''
            // required
          >
            {categories.map((item) => (
              <option key={item._id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className={cx("f_input")}>
          <label htmlFor=''>Checked</label>
          <input
            type='checkbox'
            checked={stateProduct.checked}
            onChange={() =>
              handleChangeProduct("checked", !stateProduct.checked)
            }
            name=''
            id=''
          />
        </div>
        <button
          disabled={disableButton}
          onClick={handleClickUploadButton}
          className={cx("f_button")}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
