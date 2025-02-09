import { baseApi } from "@shared/api";

export const deleteSeminar = async (id: number): Promise<void> => {
  await baseApi.delete(`/seminars/${id}`);
};
