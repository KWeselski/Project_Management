import axios from "axios";
import * as actionTypes from "./action-types/auth-actions";


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

export const profileListStart = () => {
  return {
    type: actionTypes.PROFILE_LIST_START,
  };
};

export const profileListFail = (error) => {
  return {
    type: actionTypes.PROFILE_LIST_FAIL,
    error: error,
  };
};

export const profileListFinish = (profiles) => {
  return {
    type: actionTypes.PROFILE_LIST_FINISH,
    payload: { profiles },
  };
};

export const addUser = (profile) => {
  return {
    type: actionTypes.ADD_USER,
    payload: { profile },
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(authStart());
    await axios.post("/auth/logout/", {}).then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      dispatch(authLogout());
    });
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

export const getUsers = () => {
  return (dispatch) => {
    dispatch(profileListStart());
    axios
      .get("/api/users/get")
      .then((res) => {
        res.data.sort((a, b) =>
          a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0
        );
        dispatch(profileListFinish(res.data));
      })
      .catch((error) => dispatch(profileListFail(error)));
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
        dispatch(getUsers())
      })
      .catch((err) => {
        dispatch(authFail(err.response.data));
      });

  };
};

export const authSignup = (
  email,
  password1,
  password2,
  firstName,
  lastName,
  sex,
  age,
  phone
) => {
  return async (dispatch) => {
    dispatch(authStart());
    await axios
      .post("/auth/registration/", {
        username: email,
        email: email,
        password1: password1,
        password2: password2,
        first_name: firstName,
        last_name: lastName,
        sex: sex,
        age: age,
        phone: phone,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        dispatch(getUsers())
      })
      .catch((error) => {
        dispatch(authFail(error.response.data));
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

