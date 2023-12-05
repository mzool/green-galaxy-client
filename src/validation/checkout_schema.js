import * as Yup from "yup"

/// name not contains a special character
const name_rg = /^(?! *$)[a-zA-Z ]+$/;
const digitandletters = /^(?! *$)[a-zA-Z0-9_ ]+$/;
const phoneRegExp = /^07\d{8}$/;

const checkoutSchema = Yup.object().shape({
    firstName: Yup.string().matches(name_rg, {
        message: 'Invalid Username, it can only contain letters',
    }).required("first name is required"),
    lastName: Yup.string().matches(name_rg, {
        message: 'Invalid last name, it can only contain letters',
    }).required("last name is required"),
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
        .matches(phoneRegExp, 'Invalid Phone number')
        .required('Phone number is required'),
    company: Yup.string().matches(name_rg, {
        message: 'company name can only contain letters',
    }).optional(),
    city: Yup.string().matches(name_rg, {
        message: 'city name can only contain letters',
    }).required("city is required"),
    address: Yup.string().matches(digitandletters, {
        message: 'address can contain letters, underscore and numbers',
    }).required("address is required"),
})

export default checkoutSchema