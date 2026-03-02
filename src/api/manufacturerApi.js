import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_FUNCAPI_URL + "/manufacturers/";

export function getManufacturers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveManufacturer(manufacturer) {
  return fetch(baseUrl + (manufacturer.id || ""), {
    method: manufacturer.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(manufacturer),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteManufacturer(manufacturer) {
  return fetch(baseUrl + manufacturer.id, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
