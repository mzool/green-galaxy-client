async function getUser() {
    try {
       const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_user_info
            }`,
            {
                method: "GET",
                mode: "cors",
                credentials: "include",
            }
        );
        return promise
    } catch (err) {
        console.log("somthing error, try again later")
    }
}

export default getUser