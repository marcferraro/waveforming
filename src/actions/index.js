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

export const fetchInputsSuccess = data => {
    return {
        type: "FETCH_INPUTS_SUCCESS",
        inputs: data
    }
}

export const updateOOutput = data => {
    return {
        type: "UPDATE_OOUTPUT",
        oOutput: data
    }
}

export const inputCreationSuccess = input => {
    return {
        type: "INPUT_CREATION_SUCCESS",
        input: input
    }
}

export const oOutputCreationSuccess = oOutput => {
    return {
        type: "OOUTPUT_CREATION_SUCCESS",
        oOutput: oOutput
    }
}

export const inputSelect = input => {
    return {
        type: "INPUT_SELECT",
        input: input
    }
}

export const oOutputDeleteSuccess = oOutputId => {
    return {
        type: "OOUTPUT_DELETE_SUCCESS",
        id: oOutputId
    }
}