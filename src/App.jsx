import { useReducer, useRef } from "react";
import "./App.css";

let style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems:  'center',
  gap: '30px',
  margin: '30px 0px',
}

function reducer(valor, action) {

  switch(action.type) {
    case "add":
      return [
        ...valor,
        { name: action.payload, isCompleted: false }
      ]
      
    case "remove":
      return valor.filter(indice => indice.name != action.payload)
    case "completed": 
    
      return (
        valor.map(indice => {
          if (indice.name == action.payload) {
            return {...indice, isCompleted: !indice.isCompleted}
          }

          return indice
        })
      )
          
  }
}


function App() {

  const [valueAtual, dispatch] = useReducer(reducer, [])
  const inp = useRef()
  console.log(valueAtual)

  function tarefas(object) {
    if (object.payload == "") {
      window.alert("prencha o campo")
    } else {
      if (object.type == "add") {
        let response = false
        
        valueAtual.map(indice => {
          if (indice.name.trim() == object.payload.trim()) {
            response = true
          } 
        })  
      
        if (response) {
          window.alert("tarefa já existente")
        } else {
          dispatch(object)
        }
      } else {
        dispatch(object)
      }
    }
  }

  return (
    <div>
      <h1>adicione uma tarefa</h1>
      <input type="text" ref={inp} />
      <button onClick={() => {
        tarefas({ type: "add", payload: inp.current.value});
        inp.current.value = ""
      
      }}>adicionar Tarefa</button>

      {valueAtual.length > 0 ? (
        <div>
          { valueAtual.map(indice => {
            return (
              <div key={indice.name}style={style}>
                <span onClick={() => tarefas({ type: "completed", payload: indice.name})} style={{background: indice.isCompleted ? '#00ff00' : 'darkGray',  padding: '15px 25px', color: 'white', borderRadius: '5px', cursor: 'pointer',}}>{indice.name}</span>
                <button onClick={() => tarefas({ type: "remove", payload: indice.name})}>remover</button>
              </div>
            )
          })}
        </div>
      ): <div></div>}
    </div>
  )

}

export default App; 