import * as Yup from "yup";

export const examSchema = Yup.object().shape({
    dateTime: Yup.date()
        .min(new Date(), "Date must be in the future") // Ensure the date is in the future
        .required("Date is required"),
    groupId: Yup.number()
        .typeError("Group is required")
        .required("Group is required")
});
