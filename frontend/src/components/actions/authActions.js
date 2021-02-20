import axios from "axios";
import * as actionTypes from "./action-types/auth-actions";


export const profileStart = () => {
  return {
    type: actionTypes.PROFILE_START,
  };
};

export const profileFail = (error) => {
  return {
    type: actionTypes.PROFILE_FAIL,
    error: error,
  };
};

export const profileSuccess = () => {
  return {
    type: actionTypes.PROFILE_SUCCESS,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const userLoading = () => {
  return {
    type: actionTypes.USER_LOADING,
  };
};

export const userLoaded = (user) => {
  return {
    type: actionTypes.USER_LOADED,
    user: user,
  };
};

export const resetPass = () => {
  return {
    type: actionTypes.RESET_PASS,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  return { type: actionTypes.AUTH_LOGOUT };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(authStart());
    await axios
      .post("/auth/logout/", {})
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
        dispatch(authLogout());
      })
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    dispatch(userLoading());
    await axios
      .get("/api/user/get", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        dispatch(userLoaded(res.data));
      });
  };
};

export const authLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/auth/login/", {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return async (dispatch) => {
    dispatch(authStart());
    await axios
      .post("/auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data));
      });
  };
};

export const createProfile = (firstName, lastName, sex, age, phone) => {
  return async (dispatch) => {
    dispatch(profileStart());
    await axios
      .post(
        "/api/profile/create/",
        {
          firstname: firstName,
          lastname: lastName,
          sex: sex,
          age: age,
          phone: phone,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        dispatch(profileSuccess());
      })
      .catch((error) => {
        dispatch(profileFail(error.response.data));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const authResetPassword = (email) => async (dispatch) => {
  dispatch(authStart());
  await axios
    .post("/auth/password/reset/", {
      email: email,
    })
    .then(() => {
      dispatch(resetPass());
    })
    .catch((error) => {
      dispatch(authFail(error.response.data));
    });
};

export const authResetPasswordConfirm = (uid, token, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/auth/password/reset/confirm/", {
        uid: uid,
        token: token,
        new_password1: password1,
        new_password2: password2,
      })
      .then(() => {
        dispatch(resetPass());
      })
      .catch((error) => {
        dispatch(authFail(error.response.data));
      });
  };
};
