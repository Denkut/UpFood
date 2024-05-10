import { request } from "../utils";

export const removeMealAsync = (id) => () => request(`/meals/${id}`, "DELETE");
