export type QuestionType = "single" | "multiple" | "text";

export interface Question {
    id:string;
    question:string;
    type: QuestionType;
    options?: string[];
    required?: boolean;
    helper?: string;
}

export type Answer = string | string[];

export interface FormState {
    [questionId:string]: Answer;
}