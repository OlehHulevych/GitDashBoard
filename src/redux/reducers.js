const initialState = {
    repositories:[],
    currentRepo:''
}

export const repoReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_REPOSITORY":
            return{
                ...state,
                repositories:[...state.repositories, action.payload]
            }
        case "UPDATE_REPO":
            const {id, updatedIssues, propertyName} = action.payload
            const index = state.repositories.findIndex((repo) => repo.id === id)
            const updateObject = {...state.repositories[index], [propertyName]:updatedIssues}
            const updateArray = [
                ...state.repositories.slice(0,index),
                updateObject,
                ...state.repositories.slice(index+1)
                
            ]

            return {
                ...state,
                repositories:updateArray
            }
        case "CURRENT_REPO":
            return {
                ...state,
                currentRepo:action.payload
            }
        default:
            return state       
    }

}