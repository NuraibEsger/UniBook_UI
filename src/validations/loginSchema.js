import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required!"),

    password: Yup.string()
    .min(3, "Min 3 chars!")
    .max(50, "Max 50 chars")
    .required("Requirid!"),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password's not match")
    .required("Required!")

})