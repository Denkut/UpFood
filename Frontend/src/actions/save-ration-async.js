import { request } from "../utils";
import { setRationData } from "./set-ration-data";

export const saveRationAsync = (id, newRationData) => (dispatch) => {
  const saveRequest = id
    ? request(`/rations/${id}`, "PATCH", newRationData)
    : request("/rations", "POST", newRationData);

  return saveRequest.then((updatedRation) => {
    dispatch(setRationData(updatedRation.data));

    return updatedRation.data;
  });
};
