import { request } from "../utils";
import { setRationData } from "./set-ration-data";

export const saveRationAsync = (id, newRationData) => (dispatch) => {
  const saveRequest = id
    ? request(`/api/rations/${id}`, "PATCH", newRationData)
    : request("/api/rations", "POST", newRationData);

  return saveRequest.then((updatedRation) => {
    dispatch(setRationData(updatedRation.data));

    return updatedRation.data;
  });
};
