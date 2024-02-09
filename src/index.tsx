import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



// import {tasksReducer} from './tasks-reducer';
// import {todolistsReducer} from './todolists-reducer';
// import {combineReducers, createStore} from 'redux';
//
// // объединяя reducer-ы с помощью combineReducers,
// // мы задаём структуру нашего единственного объекта-состояния
// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer
// })
// // непосредственно создаём store
// export const store = createStore(rootReducer);
// // определить автоматически тип всего объекта состояния
// export type AppRootStateType = ReturnType<typeof rootReducer>
//
// // а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// // @ts-ignore
// window.store = store;
//
// root.render(<Provider store={store}><AppWithRedux /></Provider>);
