import api from "./axios";

export const CheckvalidSession = async () => {
  const response = await api.get('/api/checkvalidsession');
  return response.data;
};
