export default function errorInfor(error) {
  throw new Error(error.response.data.msg);
}
