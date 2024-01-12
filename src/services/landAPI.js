import axios from "axios";

const url = "https://frontend-test-assignment-api.abz.agency";

export async function getUsers(count = 5) {
  return axios(url + `/api/v1/users?page=${count}&count=6`).catch((error) =>
    console.log(error)
  );
}

export async function getToken() {
  return axios(url + "/api/v1/token").catch((error) => console.log(error));
}

export async function reqNewUser(token, formData) {
  console.log(formData.get("name"));
  return axios({
    method: "post",
    url: url + "/api/v1/users",
    data: formData,
    headers: { Token: token, "Content-Type": "multipart/form-data" },
  }).catch((res) => console.log(res));
}
