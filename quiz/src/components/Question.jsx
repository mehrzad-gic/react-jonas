import React, { useEffect } from 'react';

export default function Question({questions, dispatch, currentQuestion }) {

    return (
        <div>
            {currentQuestion != null ? (
                <div>Question ID: {questions[currentQuestion].id}</div>
            ) : (
                <div>No question available</div>
            )}
        </div>
    );
}