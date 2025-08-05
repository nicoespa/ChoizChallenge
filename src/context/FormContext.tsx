"use client";
import React, {createContext, useContext, useState, ReactNode} from "react";
import {FormState} from "@/types/form"

interface FormContextProps{
    answers:FormState;
    setAnswer: (questionId: string, answer: string | string[]) => void;
    resetForm: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext =() => {
    const context = useContext(FormContext);
    if(!context) throw new Error("FormContext must be used within a FormProvider");
    return context;
}

export const FormProvider = ({children}:{children:ReactNode}) =>{
    const [answers, setAnswers] = useState<FormState>({});

const setAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev)=>({...prev, [questionId]:answer}));
};

const resetForm = () => setAnswers({});

return(
    <FormContext.Provider value={{answers, setAnswer, resetForm}}>
        {children}
    </FormContext.Provider>
)
}