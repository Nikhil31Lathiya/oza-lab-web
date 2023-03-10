import axios from "axios";
const GetPermissionsByRoleId = async (roleId) => {
  const permissions = await axios.get(`http://localhost:3000/permission/${roleId}`);
  return permissions;
};

export default GetPermissionsByRoleId;