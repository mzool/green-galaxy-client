async function getOTPFromUserHandler(otp, token) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_otp_from_user
            }?token=${token}`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({ otp: otp }),
                credentials:"include"
            }
        );
        return promise
    } catch (err) {
        return console.log("somthing went error, try again later");
    }
}

export default getOTPFromUserHandler