import React from 'react'

export default function Progress({currentQuestion,length,totalPoints,point}) {
    
    return (

        <header className='progress'>
            <progress max={length} value={currentQuestion} />
            <p>Question <strong>{currentQuestion + 1} /</strong> <strong>{length}</strong> </p>
            <p>Point <strong>{point} /</strong> <strong>{totalPoints}</strong> </p>
        </header>    
    
    )

}
