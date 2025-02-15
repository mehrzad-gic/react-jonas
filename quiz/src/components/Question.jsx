import React, { useEffect } from 'react';

export default function Question({questions, dispatch, currentQuestion }) {

    useEffect(() => {
        if (currentQuestion == null) {
            dispatch({ type: 'index', payload: 0 }); // ✅ Safe: State update in useEffect
            dispatch({ type: 'active' }); // ✅ Safe: State update in useEffect
        }
    }, [currentQuestion, dispatch]);

    return (
        <div>
            {currentQuestion ? (
                <div>Question ID: {questions[currentQuestion].name}</div>
            ) : (
                <div>No question available</div>
            )}
        </div>
    );
}