async function forgetPasswordHandler(email) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_forget_password
            }`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email:email }),
            }
        )
        return promise
    } catch (err) {
        return console.log("something went error");
    }
}

export default forgetPasswordHandler