
function getLocation() {
    try {
        fetch(`${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_location}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token}`,
            }
        }).then((res)=>res.json()).then((data)=>console.log(data))
    } catch (err) {
        console.log("somthing error");
    }
}

export default getLocation