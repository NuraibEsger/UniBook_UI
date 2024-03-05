import * as Yup from "yup";

export const subjectSchema = Yup.object().shape({
    name: Yup.string()
    .min(4,"Too Short!")
    .max(15,"Too Long")
    .required("Required!"),
    description: Yup.string()
    .min(5,"Too short!")
    .max(50,"Too long!")
    .required("Required!")
})

export const addToSubjectSchema = Yup.object().shape({
    subjectId: Yup.number().typeError("!Required").required("Required")
})