import axios from "axios";

const url = "https://frontend-test-assignment-api.abz.agency";

export async function getUsers(count = 5) {
  // eslint-disable-next-line
  return axios(url + `/api/v1/users?page=${count}&count=6`).catch((error) => console.log(error));
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

  // return fetch(url + "/api/v1/users", {
  //   method: "POST",
  //   body: formData,
  //   headers: {
  //     Token: token, // get token with GET api/v1/token method
  //   },
  // })
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //     if (data.success) {
  //       // process success response
  //     } else {
  //       // proccess server errors
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     // proccess network errors
  //   });
}
