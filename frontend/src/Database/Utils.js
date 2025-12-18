import Cookies from "universal-cookie";

export const getHeaderWithToken = () => {
    let config;
    const cookies = new Cookies();
    const token = cookies.get("adminToken");
    config = {
        headers: {
            Accept: "*/*",
            Authorization: token,

        }
    }
    return config;
}

export const getHeaderWithoutToken = {
    headers: {
        Accept: "*/*",
    }
}

export const postHeaderWithToken = async () => {
    let config;
    const cookies = new Cookies();
    const token = await cookies.get("adminToken");
    config = {
        headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
            Authorization: token,

        }
    }
    return config;

}

export const postHeaderWithoutToken = {
    headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
    }
}