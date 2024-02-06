import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

async function apiSource(data, method, header = {}, url) {
  try {
    const resp = await axios({
      url: `http://192.168.1.3:3000/${url}`,
      method: method,
      timeout: 5000,
      data: data,
      headers: { Accept: "application/json", ...header },
    });
    return resp;
  } catch (err) {
    console.log(err, "error2");
    throw err;
  }
}

export async function newUser(userData) {
  try {
    return await apiSource(userData, "POST", {}, "user/new");
  } catch (error) {
    throw error;
  }
}

export async function login(userData) {
  try {
    return await apiSource(userData, "POST", {}, "user/login");
  } catch (error) {
    throw error;
  }
}

export async function tokenLogin(token) {
  try {
    return await apiSource(token, "POST", {}, "user/token-login");
  } catch (error) {}
}

export async function newCustomer(customerData) {
  try {
    return await apiSource(customerData, "POST", {}, "client/new");
  } catch (error) {
    throw error;
  }
}

export async function listCustomer(token) {
  headers = {
    Authorization: "Bearer " + token,
  };
  try {
    return await apiSource(null, "GET", headers, "client/list");
  } catch (error) {
    return error;
  }
}

export async function updateCustomer(id, newCostumerData) {
  try {
    return await apiSource(newCostumerData, "PUT", {}, `client/update/${id}`);
  } catch (error) {}
}

export async function deleteCustomer(id) {
  try {
    return await apiSource(null, "DELETE", {}, `client/delete/${id}`);
  } catch (error) {}
}

export function tokenInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      const originalReq = err.config;
      if (err.response.status == 401 && err.config && !err.config._retry) {
        originalReq._retry = true;
        try {
          const token = await AsyncStorage.getItem("TOKEN");
          if (token) {
            let res = await apiSource(
              { oldToken: token },
              "PUT",
              {},
              "token/refresh"
            );
            AsyncStorage.setItem("TOKEN", res.data.access_token);
            originalReq.headers[
              "Authorization"
            ] = `Bearer ${res.data.access_token}`;
            return axios(originalReq);
          } else {
            throw err;
          }
        } catch (error) {
          throw err;
        }
      } else {
        throw err;
      }
    }
  );
}
