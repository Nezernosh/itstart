import { baseApi } from "../../../shared/api/baseApi";

export const deleteSeminar = async (id: number): Promise<void> => {
  await baseApi.delete(`/seminars/${id}`);
};
