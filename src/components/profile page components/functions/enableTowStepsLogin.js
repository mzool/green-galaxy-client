async function enableTowStepsLoginHandler() {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_enable_tow_steps_login_user

            }`,
            {
                method: "PUT",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                },
                credentials: "include",
            }
        );
        return promise
    } catch (err) {
        return console.log("somthing went error when adding to cart");
    }
}

export default enableTowStepsLoginHandler