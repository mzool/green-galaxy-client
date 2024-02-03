
function getLocation() {
    try {
        fetch(`${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_location}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
    } catch (err) {
        console.log("somthing error");
    }
}

export default getLocation