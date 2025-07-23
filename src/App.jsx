import { useEffect, useReducer, useState } from "react";
import "./App.css";

function reducer(state, action) {// state == valor,  action == mudar o valor
  switch(action.type) {
    case "add-tarefa":
      return {
        tasks: [
          ...state.tasks,
          { name: action.payload, isCompleted: false, }
        ]
      }
    case "remove":
      return {
        tasks: state.tasks.filter(indice => indice.name != action.payload)
       
      }
     case "complete":
 
        return {
          tasks: state.tasks.map(indice => {
            if (indice.name === action.payload) {
              return {...indice, isCompleted: !indice.isCompleted}
            }

            return indice
          })
        }
  
    default:
      return state
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, { tasks: [] })
  const [inputValue, setInputVelue] = useState("")

  useEffect(() => {
    console.log(state)
  },[state])



  return (
    <div>
      <input value={inputValue} onChange={(event) => setInputVelue(event.target.value)} />
      <button onClick={() => {
        dispatch({ type: "add-tarefa", payload: inputValue })
        setInputVelue("") 
      }
      }>adicionar</button>

      {state.tasks.length > 0 ? (
        <div>
          {state.tasks.map(indice => {
            return (
              <div key={indice.name} style={{display: "flex", gap: "5px", justifyContent: "center", margin: "30px", cursor: 'pointer'}}>
                <p onClick={() => dispatch({ type: "complete", payload: indice.name })} style={ {backgroundColor: indice.isCompleted ? '#00ff00' : 'darkgray', padding: "20px", borderRadius: "5px"} } >{indice.name}</p>
                
                <button onClick={() => dispatch({ type: "remove", payload: indice.name })}>remover</button>
              </div>
            )
          })}
        </div>

        ): ""}
     
    </div>

  );  
}

export default App;
