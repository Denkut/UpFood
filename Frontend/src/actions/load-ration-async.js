import { request } from "../utils";
import { setRationData } from "./set-ration-data";

export const loadRationAsync = (id) => (dispatch) =>
  request(`/api/rations/${id}`).then((rationData) => {
    if (rationData.data) {
      dispatch(setRationData(rationData.data));
    }
    return rationData;
  });
