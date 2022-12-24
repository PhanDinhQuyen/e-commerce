import { useContext } from "react";
import { GlobalState } from "~/components/GlobalState";

export default function Upload() {
  const state = useContext(GlobalState);

  console.log(state);

  return;
}
