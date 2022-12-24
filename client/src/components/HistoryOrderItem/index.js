import { useState } from "react";
import { Link } from "react-router-dom";

export default function HistoryOrderItem({ changeStatus, ...props }) {
  const [checked, setChecked] = useState(props.status);
  const handleChangeStatus = async () => {
    setChecked(!checked);
    await changeStatus({ status: !checked, _id: props._id });
  };

  return (
    <tr>
      <td>{props.paymentID}</td>
      <td>{new Date(props.createdAt).toLocaleDateString()}</td>
      <td
        style={{
          textAlign: "center",
        }}
      >
        <input
          disabled={!props.isAdmin}
          type='checkbox'
          checked={checked}
          onChange={handleChangeStatus}
          name=''
          id=''
        />
      </td>
      <td style={{ wordWrap: "break-word" }}>
        <Link to={`/history/${props._id}`}>View</Link>
      </td>
    </tr>
  );
}
