import { baseApi } from "@shared/api";
import { Seminar } from "@features/seminarList/model/types";

export const fetchSeminars = async (): Promise<Seminar[]> => {
  const response = await baseApi.get("/seminars");
  return response.data;
};
