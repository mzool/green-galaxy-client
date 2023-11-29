import * as Yup from "yup"

/// name not contains a special character
const name_rg = /^["a-zA-Z0-9_.,; +"]+$/;
const phoneRegExp = /^\d{10}$/;

const contactUsSchema = Yup.object().shape({
    name: Yup.string().matches(name_rg, {
        message: 'Username can only contain letters, numbers, and underscores',
    }).required("Username is required"),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .test(
            'invalid email',
            (value) => {
                return value && value.includes('@') && value.includes('.');
            }
        ),
    phone: Yup.string()
        .matches(phoneRegExp, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    message: Yup.string().matches(name_rg, { message: "message can not contains special characters and 1000 letter maximum " }).trim().required().max(1000),
})

export default contactUsSchema