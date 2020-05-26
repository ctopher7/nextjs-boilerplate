const defaultState={
    loading:false,
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case 'HOME_LOADING':return{...state,loading:action.payload}
        default:return state
    }
}