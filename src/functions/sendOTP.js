async function sendOTP(){
    const promise = await fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi
        }${import.meta.env.VITE_send_otp_admin}`,
        {
            method: "get",
            mode: "cors",
            credentials: "include",
        }
    )
    return promise
}
export default sendOTP