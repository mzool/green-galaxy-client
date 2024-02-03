function postImage(profileImage, message, src) {
    /// create form data
    let formData = new FormData();
    formData.append("images", profileImage);
    //// fetch the server
    fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_update_profile_image
        }`,
        {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            body: formData
        }
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.success) { message({ msg: data.message, err: "" }); src(data.src) } else {
                message({ err: data.message, msg: "" })
            }
        });
}
export default postImage