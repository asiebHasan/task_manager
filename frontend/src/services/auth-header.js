import React from "react";

function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        return { Authorization: `token ${user.token}` };
    } else {
        return {};
    }
}

export default authHeader;
