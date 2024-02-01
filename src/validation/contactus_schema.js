import * as Yup from "yup"

const contactUsSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
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
        .required('Phone number is required'),
    message: Yup.string().trim().required().max(1000),
})

export default contactUsSchema