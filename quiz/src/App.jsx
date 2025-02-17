import { useReducer, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import Start from './components/Start';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Finish from './components/Finish';

const initialState = {
  questions: null,
  currentQuestion: null,
  status: null, // loading, error, ready, active, finished
  errorMessage: null,
  point:0,
  time:null,
  doneQuestions:null,
  answer:null,
};

function reducer(state, action) {
  
  switch (action.type) {

    case "loading":
      return {
        ...state,
        status: action.payload ? "loading" : "ready",
      };

    case "error":
      return {
        ...state,
        status: "error",
        errorMessage: action.payload,
      };

    case "ready":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };

    case "active":
      return {
        ...state,
        status: "active",
      };

    case "finished":
      return {
        ...state,
        status: "finished",
      };

    
    case "index":
      return {
        ...state,
        currentQuestion: action.payload, // Update the selected question index
      };


    case "point" : 
      return{
        ...state,
        point : state.point+action.payload
      };


    case "addToDone" :
      return {
        ...state,
        doneQuestions : action.payload
      };

    case 'answer':
      return {...state,answer:action.payload}

    
    case "next":
      return {...state,currentQuestion : state.currentQuestion + 1,answer : null}


    case "reset":
      return {...initialState,questions:state.questions,status:'ready'}

    default:
      return {
        ...state,
        status: "error",
        errorMessage: "Internal Server Error [Action unknown]",
      };
  }

}

function App() {

  const [{ status, questions, errorMessage, doneQuestions, currentQuestion, point, time, answer }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    const abortController = new AbortController();

    async function fetchData() {

      try {

        dispatch({ type: 'loading', payload: true });

        const data = await fetch(`http://localhost:5100/questions`, {
          signal: abortController.signal,
        });

        if (!data.ok) {
          dispatch({ type: 'error', payload: 'Something went wrong while fetching data' });
          return;
        }

        const res = await data.json();

        if (!res || res.length < 1) {
          dispatch({ type: 'error', payload: 'Data is not valid' });
          return;
        }

        dispatch({ type: 'ready', payload: res });

      } catch (e) {
        if (e.name !== 'AbortError') {
          dispatch({ type: 'error', payload: e.message });
        }
      } finally {
        dispatch({ type: 'loading', payload: false });
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };

  }, []);


  console.log('Current state:', { status, answer, questions, errorMessage,currentQuestion,point,time,doneQuestions });

  let totalPoints = 0;
  if(questions) totalPoints = questions.reduce((accumulate,val) => accumulate + val.points ,0)
      

  return (

    <>
      <div className="app">

        <Header />

        {status == 'active' && <Progress point={point} length={questions.length} totalPoints={totalPoints} currentQuestion={currentQuestion} />}

        {status === 'loading' && <Loader />}

        {errorMessage && <Error message={errorMessage} />}

        {status == 'ready' && questions?.length > 0 && (
          <Main>
            <Start dispatch={dispatch} numQuestions={questions.length}/>
          </Main>
        )}

        {status == 'active' && (<>
          <Question answer={answer} doneQuestions={doneQuestions} questions={questions} dispatch={dispatch} currentQuestion={currentQuestion}/>
          <NextButton dispatch={dispatch} answer={answer} length={questions.length} currentQuestion={currentQuestion}/>
        </>)}

        {status=='finished' && <Finish dispatch={dispatch} maxPossiblePoints={totalPoints} points={point} />}

  
      </div>

    </>
    
  );
}

export default App;