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

export const fetchOoutputsSuccess = data => {
    return {
        type: "FETCH_OOUTPUTS_SUCCESS",
        oOutputs: data
    }
}