import { GET_AUTH_STATE } from "./actionTypes";
import api from "../../helpers/axiosAuth";
import { API_TOKEN_REFRESH_URL } from "../../consts/api";

export const initAuth = () => async (dispatch) => {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  console.log(access, refresh);

  // нет токенов → пользователь не авторизован
  if (!access || !refresh) {
    dispatch({
      type: GET_AUTH_STATE,
      payload: {
        isAuthenticated: false,
        user: null,
        error: null,
      },
    });
    return;
  }

  try {
    // пробуем обновить access
    const res = await api.post(API_TOKEN_REFRESH_URL, { refresh });
    const newAccess = res.data.access;

    localStorage.setItem("access", newAccess);

    dispatch({
      type: GET_AUTH_STATE,
      payload: {
        isAuthenticated: true,
        user: { username: "User" }, // можно заменить на реальный профиль
        error: null,
      },
    });
  } catch (e) {
    // refresh истёк → выходим из аккаунта
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    dispatch({
      type: GET_AUTH_STATE,
      payload: {
        isAuthenticated: false,
        user: null,
        error: null,
      },
    });
  }
};
