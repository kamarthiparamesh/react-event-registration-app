import { useFetchUserInfoQuery } from "./fetchUserInfo";

export function useAuthentication() {
  const { data, status } = useFetchUserInfoQuery();

  return {
    isLoading: status === "loading",
    isAuthenticated: status === "success",
    ...data,
  };
}
