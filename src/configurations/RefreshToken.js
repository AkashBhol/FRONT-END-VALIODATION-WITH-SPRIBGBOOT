import jwt_decode from "jwt-decode";
import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import CommonUtil from "../util/CommonUtils";

export default function RefreshToken() {
  const { tokenRefreshTimer, setTokenRefreshTimer } = useContext(AppContext);

  React.useEffect(() => {
    console.warn("Inside refresh token component @" + new Date());
    if (tokenRefreshTimer > 0) {
      console.warn("New timer @" + tokenRefreshTimer);
      console.warn("Set refrsh token timer", tokenRefreshTimer);
      setTimeout(() => {
        refreshToken();
      }, tokenRefreshTimer);
      setTokenRefreshTimer(0);
    } else if (tokenRefreshTimer === -1) {
      const decoded = jwt_decode(localStorage.getItem("USER_TOKEN"));
      var currentSeconds = Math.floor(Date.now() / 1000);
      console.warn("decoded.exp", decoded.exp);
      console.warn("currentSeconds", currentSeconds);
      var secondsLeft = decoded.exp - currentSeconds;
      console.warn("secondsLeft", secondsLeft);
      var timer = Math.floor(secondsLeft / 60) - 5;
      console.warn("timer", timer);
      console.warn("Next token generation after", timer + " mins");

      timer = timer * 60 * 1000;
      setTokenRefreshTimer(timer);
    }
  }, [tokenRefreshTimer]);

  const refreshToken = async () => {
    var decoded_jwtToken = jwt_decode(localStorage.getItem("USER_TOKEN"));
    var payload = {
      refreshToken: localStorage
        .getItem("REFRESH_TOKEN")
        .replace("Bearer ", ""),
      companyCode: decoded_jwtToken.companyCode,
    };
    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("USER_TOKEN"),
      },
      body: JSON.stringify(payload),
    };
    try {
      const fetchResponse = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/web/user/refresh_token`,
        settings
      );
      const res = await fetchResponse.json();
      if (res.code === "UASI0011") {
        console.log("Refreshed token @" + new Date());
        localStorage.setItem("USER_TOKEN", "Bearer " + res.data.access_token);
        localStorage.setItem(
          "REFRESH_TOKEN",
          "Bearer " + res.data.refresh_token
        );

        CommonUtil.setCookie(
          "USER_TOKEN",
          "Bearer " + res.data.access_token,
          1
        );
        CommonUtil.setCookie(
          "REFRESH_TOKEN",
          "Bearer " + res.data.refresh_token,
          1
        );

        const decoded = jwt_decode(res.data.access_token);
        localStorage.setItem("USER", JSON.stringify(decoded));

        var currentSeconds = Math.floor(Date.now() / 1000);
        var secondsLeft = decoded.exp - currentSeconds;
        var timer = Math.floor(secondsLeft / 60) - 5;
        timer = timer * 60 * 1000;
        console.warn("Next token generation after", timer + " ms");
        setTokenRefreshTimer(timer);
      }
    } catch (e) {
      return e;
    }
  };
  return <></>;
}
