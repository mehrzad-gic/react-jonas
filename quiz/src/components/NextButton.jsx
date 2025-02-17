import React from 'react'

export default function NextButton({dispatch,answer,length,currentQuestion}) {

    if(answer == null) return null;

    return (
        <button className='btn btn-ui' onClick={() => length == currentQuestion +1 ? dispatch({type:'finished'}) : dispatch({type:'next'}) }>Next</button>
    )

}
