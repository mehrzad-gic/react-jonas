
function Start({ numQuestions, dispatch }) {

  function initialStart(){
    dispatch({ type: "active" })
    dispatch({ type: "index",payload:0 })
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={initialStart}
      >
        Let's start
      </button>
    </div>
  );
}

export default Start;
