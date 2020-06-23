export function loginUser(user) {
  return async function (dispatch) {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).catch((err) => console.log(err));

    try {
      const userObj = await res.json();
      localStorage.setItem("user", userObj.email);
      localStorage.setItem("token", userObj.token);
      localStorage.setItem("id", userObj.id);

      dispatch(userProfile(userObj));
    } catch (error) {
      console.log(error);
    }
  };
}

function userProfile(message) {
  return {
    type: "LOGIN",
    payload: message,
  };
}