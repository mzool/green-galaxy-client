async function checkAdminCookie(){
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_check_admin_cookie
            }`,
            {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            }
        )
        return promise
    } catch (err) {
        console.log("somthing error");
    }
}

export default checkAdminCookie