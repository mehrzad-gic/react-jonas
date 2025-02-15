import { useReducer, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';

const initialState = {
  questions: null,
  selectedQuestion: null,
  status: null, // loading, error, ready, active, finished
  errorMessage: null,
};

function reducer(state, action) {

  switch (action.type) {

    case "loading":
      return {
        ...state,
        status: action.payload ? "loading" : "finished",
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

    default:
      return {
        ...state,
        status: "error",
        errorMessage: "Internal Server Error [Action unknown]",
      };
  }

}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (

    <>

      <div className="app">

        <Header />

        {state.status === 'loading' && <Loader />}

        {state.status === 'error' && <p>{state.errorMessage}</p>}

        {state.status === 'ready' && (
          <Main>
            
          </Main>
        )}

      </div>

    </>

  );

}

export default App;