import { request } from "../utils";

export const removeRationAsync = (id) => () => request(`/rations/${id}`, "DELETE");
