async function checkForOTPTokenHandler(token) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_check_otp_token
            }?token=${token}`,
            {
                method: "GET",
                mode: "cors",
                credentials:"include"
            }
        );
        return promise
    } catch (err) {
        return console.log("somthing went error, try again later");
    }
}

export default checkForOTPTokenHandler