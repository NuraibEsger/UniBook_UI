import * as Yup from "yup";

export const departmentSchema = Yup.object().shape({
    name: Yup.string()
    .min(4,"Too Short!")
    .max(40,"Too Long")
    .required("Required!"),
})