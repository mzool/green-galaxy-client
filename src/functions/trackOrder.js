async function trackOrder(orderNumber, email, result, msg) {
    fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_track_order
        }`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ orderNumber, email }),
        }
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                msg('')
                result(data.order)
            }else{
                msg(data.message);
            }
        });
}
export default trackOrder