import { baseApi } from "@shared/api";
import { Seminar } from "@features/seminarList/model/types";

export const editSeminar = async (
  id: number,
  seminar: Partial<Seminar>
): Promise<Seminar> => {
  const response = await baseApi.patch<Seminar>(`/seminars/${id}`, seminar);
  return response.data;
};
