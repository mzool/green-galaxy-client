import * as Yup from "yup"
const phoneRegExp = /^\d{10}$/;
/// register schema
const validationSchema = Yup.object().shape({
    username: Yup.string().matches(/^[a-zA-Z0-9_]+$/, {
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
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/,
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});
/// login schema
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});
/// subscribe to email schema
const subscribeSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
})
/// admin page schemas
/// add product schema
const AddProductSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required"),
    productPrice: Yup.string().required("Product price is required"),
    productDescription: Yup.string().required("Product description is required"),
    productCategory: Yup.string().required("Product category is required"),
    productStock: Yup.string().required("Product stock is required"),
    availableCountries: Yup.string()
        .optional("At least one country is required"),
    brand: Yup.string(),
});
/// validate images
function validateImages(values = []) {
    const supportedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']; // Supported image MIME types
    let isValid = true; // Initialize isValid to true
if (!values){
    return isValid
}
    // Loop through the selected files
    values.forEach((value) => {
        if (!supportedImageTypes.includes(value.type)) {
            isValid = false; // Set isValid to false if an unsupported file type is found
        }

        if (value.size / 1024 ** 2 > 1) {
            isValid = false; // Set isValid to false if the file size exceeds 1MB
        }
    });

    return isValid; // Return true if all files meet the criteria, false if any file fails
}

const validationImage = Yup.object().shape({
    imgs: Yup.mixed().test('fileType', 'Invalid file type or size', validateImages),
});

//// combine images validation and form validation
// const combinedSchema = Yup.object().shape({
//     ...AddProductSchema.fields, // Use the fields from AddProductSchema
//     imgs: Yup.mixed().test('fileType', 'Invalid file type or size', validateImages),
// });

export { validationSchema, loginSchema, validationImage,AddProductSchema, subscribeSchema }