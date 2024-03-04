import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const {role} = useSelector((x) => x.account)
    if(role !== "Rector") return <Navigate to={'/*'}/>

  return (
    children
  )
}

export function ProtectedRouteForTeachers({children}){
    const {role} = useSelector((x) => x.account)
    if(role !== "Rector" || "Teacher") return <Navigate to={'/*'} />

    return(
      children
    )
}

export function ProtectedRouteForStuTeach({children}){
  const {role} = useSelector((x) => x.account)
  if(role !== "Student" && role !== "Teacher" && role !== "Rector") return <Navigate to={'/'} />

  return(
    children
  )
}

