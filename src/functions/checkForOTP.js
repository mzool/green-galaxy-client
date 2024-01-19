async function checkOTP(otp) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_admin_otp
            }`,
            {
                method: "post",
                mode: "cors",
                credentials: "include",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({ otp }),
            }
        )
        return promise
    } catch (err) {
        console.log("somthing error");
    }
}
export default checkOTP