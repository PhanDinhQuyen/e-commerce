import { useRef, useState, useEffect } from "react";

export default function CategoryItem({ name, _id, delCategory }) {
  const [value, setValue] = useState(name);
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef();
  const handleEdit = () => {
    setDisabled(false);
  };
  const handleSave = () => {
    setValue(value);
    setDisabled(true);
  };
  const handleChangeValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);
  return (
    <div key={_id}>
      <input
        id={_id}
        type='text'
        onChange={handleChangeValue}
        value={value}
        ref={inputRef}
        disabled={disabled}
      />
      <button onClick={disabled ? handleEdit : handleSave}>
        {disabled ? "Edit" : "Save"}
      </button>
      <button onClick={() => delCategory(_id)}>Del</button>
    </div>
  );
}
