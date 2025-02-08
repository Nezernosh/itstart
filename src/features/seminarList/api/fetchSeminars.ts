import { baseApi } from "../../../shared/api/baseApi";
import { Seminar } from "../model/types";

export const fetchSeminars = async (): Promise<Seminar[]> => {
  const response = await baseApi.get("/seminars");
  return response.data;
};
