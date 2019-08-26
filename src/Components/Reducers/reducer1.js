const initialState = {
    selectedUser: null,
    messages:[]
}
export function reducer1(state=initialState,action) { 
    console.log("<<<action is",action);
    switch(action.type) {
      case 'selectedItem':
      const newState = JSON.parse(JSON.stringify(state));
      
      newState.selectedUser = action.payload;
      console.log("<<<newStatae after",newState);
      return newState;
      case 'allMessages':
      const newState1 = JSON.parse(JSON.stringify(state));
      // console.log("<<<<newState1",newState1);
      newState1.messages.push(action.payload)
      // console.log("<<<newState1 after",newState1);
      return newState1;

      case 'messagesArr':
      const newState2 = JSON.parse(JSON.stringify(state));
      console.log('<<<newState2 before',newState2);
      newState2.messages = action.payload;
      return newState2;

      default: return state
    }
}