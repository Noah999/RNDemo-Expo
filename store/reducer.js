import { combineReducers } from 'redux';    //整合分散store

const defaultState = {
    count: 0
};
// 接收关于store改变的操作，state无法修改state，可以通过深拷贝一份，返回新的state
const TODOReducer = (state = defaultState,action) => {
    const newState = JSON.parse(JSON.stringify(state));
    if(action.type === 'INCREMENT'){
        newState.count = action.value;
        return newState;
    }
    if(action.type === 'DECREMENT'){
        newState.count = action.value;
        return newState;
    }
    return state;
}

// 项目store
const reducer = combineReducers({
    TODOReducer
})
export default reducer