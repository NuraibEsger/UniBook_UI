import * as Yup from "yup";

export const groupSchema = Yup.object().shape({
    name: Yup.string()
    .min(4,"Too Short!")
    .max(40,"Too Long")
    .required("Required!"),
    departmentId: Yup.number().typeError("!Required").required("Required")
})

export const addToGroupSchema = Yup.object().shape({
    groupId: Yup.number().typeError("!Required").required("Required")
})