import { BaseURL } from "../../app/constants";

export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(BaseURL + "/orders/own", {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(BaseURL + "/users/own", {
      credentials: "include",
    });
    const data = await response.json();
    console.log("fetchLogged in user ", data);
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(BaseURL + "/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
