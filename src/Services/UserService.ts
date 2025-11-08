import ApiService from "../Api/ApiService";
import endpoints from "../Api/Endpoints";
import type { LoginDto } from "../Models/LoginDto";

export const loginUser = async <T>(user: LoginDto): Promise<T> => {
  return await ApiService.post<T>(endpoints.auth.login, user);
};