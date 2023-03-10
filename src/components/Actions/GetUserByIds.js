import axios from "axios";
const GetUserByIds = async (ids) => {
  const user = await axios.post(
    "http://localhost:3000/user/byIds",
    {
      ids: ids,
    },
    {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }
  );
  return user;
};

export default GetUserByIds;
