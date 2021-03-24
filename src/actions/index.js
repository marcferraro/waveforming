export const loginSuccess = (user) => {
    return {
        type: "LOGIN_SUCCESS",
        user: user
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}