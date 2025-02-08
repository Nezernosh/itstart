import { baseApi } from "../../../shared/api/baseApi";
import { Seminar } from "../model/types";

export const editSeminar = async (
  id: number,
  seminar: Partial<Seminar>
): Promise<Seminar> => {
  const response = await baseApi.patch<Seminar>(`/seminars/${id}`, seminar);
  return response.data;
};
