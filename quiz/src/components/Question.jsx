import React, { useEffect } from 'react';
import Option from './Option';

export default function Question({answer, questions, doneQuestions, dispatch, currentQuestion }) {

    const question = questions[currentQuestion]; 
    console.log(question);
    
    return (
        <div>
            {currentQuestion != null ? (<>

                <h4>{question.question}</h4>
                
                <div className='options'>
                    {question.options.map((option,index) => (<Option index={index} answer={answer} doneQuestions={doneQuestions} dispatch={dispatch} question={question} key={index} option={option}/>))}
                </div>

            </>) : (
                <h3>No question available</h3>
            )}
        </div>
    );
}