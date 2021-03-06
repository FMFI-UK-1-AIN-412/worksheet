
const initState = {
    currentFile: null,
    currentFileContent: null,
    repoList:[],
    currentRepo: "",
    branchList:[],
    currentBranch:"",
    currentRepoData:[],
    path:""

};


const repoReducer = (state = initState, action) => {
    switch(action.type){
        case "LOAD_FILE" : 
            return {
                ...state,
                currentFile: action.currentFile,
                currentFileContent: action.currentFileContent
            };

        case "CLOSE_FILE" :  
            return  {
                ...state,
                currentFile: ""
            }; 

        case "SET_CURRENT_FILE" :  
            return  {
                ...state,
                currentFile: action.currentFile
            }; 
        case "SET_REPO_LIST" : 
            return {
                ...state,
                repoList: action.repoList
            };
         
        case "SET_CURRENT_REPO" :  
            return  {
                ...state,
                currentRepo: action.currentRepo,
                branchList: action.branchList,
                currentFile: null,
                currentFileContent: null,
                currentBranch:"",
                currentRepoData:[],
                path:""
            }; 
        case "SET_CURRENT_REPO_DATA" :  
            return  {
                ...state,
                currentBranch: action.currentBranch,
                currentRepoData: action.currentRepoData,
                path: action.path,
                currentFile: null,
                currentFileContent: null,
            }; 

        case "UPDATE_REPO" : 
            console.log("UPDATE_REPO", action, state)
            return {
                ...state,
                repoList: action.repoList,
                currentRepo: action.currentRepo,
                branchList: action.branchList,
                currentBranch: action.currentBranch,
                currentRepoData: action.currentRepoData,
                path: action.path
            };
        case "RESET_REPO_DATA" :  
            return  {
                ...state,
                currentFileContent:null,
                repoList:[],
                currentRepo: "",
                branchList:[],
                currentBranch:"",
                currentRepoData:[],
                path:""
            }; 
        case "RESET_REPO_ON_FILE_OPEN" :  
            return  {
                ...state,
                currentFileContent:null,
                branchList:[],
                currentBranch:"",
                currentRepoData:[],
                path:""
            }; 


        
        default:
            return state;
    }
}

export default repoReducer;