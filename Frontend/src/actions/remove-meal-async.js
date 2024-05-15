import { request } from "../utils";

export const removeMealAsync = (id) => () =>
  request(`/api/meals/${id}`, "DELETE");
