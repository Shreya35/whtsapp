export function addSelectedItem(data){
    // console.log("actionnnn addSelectedItem",data);
    return {
        type:'selectedItem',
        payload:data
    }
}
export function messToReciever(data) {
//    console.log("<<<data in messageTo Reciever",data);
   return {
       type:'messToReciever',
       payload:data
   }
}
export function storeAllMessages(data) {
    // console.log("<<<data in storeAllMessages",data);
    return {
        type:'allMessages',
        payload: data
    }

}
export function messagesArray(data) {
    console.log("<<+++ data in messageArr",data);
    return {
        type:"messagesArr",
        payload:data
    }
}