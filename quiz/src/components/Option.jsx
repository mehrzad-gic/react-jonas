import React from 'react'

export default function Option({dispatch, answer, option, question, doneQuestions,index}) {


    function click(e){

        const value = e.target.innerText;

        const correctValue = question.options[question.correctOption];

        // check if done is valued object
        if(doneQuestions){
                        
            const isDone = doneQuestions.find((val) => val.id == question.id)
            
            if(isDone){
                alert('Dear user you have already done this Question');
                return
            }

            // add current answer question to doneQuestions
            dispatch({type:'addToDone',payload:[...doneQuestions,question]})

            // set answer
            dispatch({type:'answer',payload:index})

        } else {

            // add current answer question to doneQuestions
            dispatch({type:'addToDone',payload:[question]})
        }

        if(correctValue == value) dispatch({type:"point",payload:question.points})

        dispatch({type:'answer',payload:question.correctOption})

    }
    
    const style = answer ? answer == index ? 'correct' : 'wrong' : '';

    return (
        <button disabled={!!answer} className={`btn btn-option ${style}`} onClick={click}>{option}</button>
    )

}
