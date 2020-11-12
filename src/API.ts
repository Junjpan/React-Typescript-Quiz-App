import { shuffleArray } from './utils';

export enum Difficult{
EASY='easy',
MEDIUM='medium',
HARD='hard'
}

export type Question={
    category: string,
    correct_answer:string,
    difficult:string,
    incorrect_answers:string[],
    question:string,
    type:string
}

//to extend the question and add another property of answers
export type QuestionsState=Question&{answers:string[]}

export const fetchQuizQuestions=async (amount:number,difficulity:Difficult):Promise<QuestionsState[]>=>{
const endpoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulity}&type=multiple`;
const datas=await fetch (endpoint)
                 .then(res=>res.json())
                 .then(data=>{return data})

const allQuestions= datas.results.map((question:Question)=>
({  ...question, answers:shuffleArray([...question.incorrect_answers,question.correct_answer])}
))

return allQuestions
}