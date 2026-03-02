import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_FUNCAPI_URL + "/bikes/";

export function getBikes() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveBike(bike) {
  const manu = bike.manufacturer;
  delete bike.manufacturer;
  return fetch(baseUrl + (bike.id || ""), {
    method: bike.id ? "PUT" : "POST",
    headers: { "content-type": "application/json", "manufacturer": manu },
    body: JSON.stringify(bike),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteBike(bike) {
  return fetch(baseUrl + bike.id, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
