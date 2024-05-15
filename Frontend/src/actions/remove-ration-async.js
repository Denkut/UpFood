import { request } from "../utils";

export const removeRationAsync = (id) => () => request(`/api/rations/${id}`, "DELETE");
