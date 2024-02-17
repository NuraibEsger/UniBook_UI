import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required!"),

    name: Yup.string()
    .min(3, "Min 3 chars!")
    .max(20, "Max 50 chars")
    .required("!Required!"),

    surname: Yup.string()
    .min(3, "Min 3 chars!")
    .max(30, "Max 50 chars")
    .required("!Required!"),

    password: Yup.string()
    .min(3, "Min 3 chars!")
    .max(50, "Max 50 chars")
    .required("Required!"),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password's not match")
    .required("Required!")
})