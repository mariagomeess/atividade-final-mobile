import { createStore } from 'redux'; 
import { reducer } from '../reducers/reducer'; 

// Cria o store com o reducer
const store = createStore(reducer);

export default store; 
