import { useReducer, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import Start from './components/Start';
import Question from './components/Question';

const initialState = {
  questions: null,
  currentQuestion: null,
  status: null, // loading, error, ready, active, finished
  errorMessage: null,
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

    default:
      return {
        ...state,
        status: "error",
        errorMessage: "Internal Server Error [Action unknown]",
      };
  }

}

function App() {

  const [{ status, questions, errorMessage, currentQuestion }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    const abortController = new AbortController();

    async function fetchData() {

      try {

        dispatch({ type: 'loading', payload: true });

        const data = await fetch(`http://localhost:5000/questions`, {
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

  console.log('Current state:', { status, questions, errorMessage,currentQuestion });

  return (

    <>
      <div className="app">
        <Header />

        {status === 'loading' && <Loader />}

        {errorMessage && <Error message={errorMessage} />}

        {status == 'ready' && questions?.length > 0 && (
          <Main>
            <Start dispatch={dispatch} numQuestions={questions.length}/>
          </Main>
        )}

        {status == 'active' && <Question questions={questions} dispatch={dispatch} currentQuestion={currentQuestion}/>}

      </div>

    </>
    
  );
}

export default App;