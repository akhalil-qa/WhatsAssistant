var MSG_TYPE = {
  CHAT: "chat",
  IMAGE: "image",
  LOCATION: "location"
}

/* get React component */
function getReactComponent(dom) {
    for (var key in dom)
        if (key.startsWith("__reactInternalInstance$")) {
            var compInternals = dom[key]._currentElement;
            var compWrapper = compInternals._owner;
            var comp = compWrapper._instance;
            return comp;
        }
    return null;
};

/* get all chats */
function getAllChats() {
  var chatsFromLeftPanel = getReactComponent(document.getElementsByClassName('chatlist-panel-body')[0]);
  return chatsFromLeftPanel.chatlist.props.chats;
}

/* get chat bu supplying index */
function getChat(index) {
  var chats = getAllChats();
  return chats[index];
}

/* get mobile number of user in the chat */
function getUserMobileNumber(chat) {
  return chat.id.substr(0, chat.id.indexOf("@"));
}

/* get chat that corresponds to a mobile number */
function getChatOfMobileNumber(mobileNumber) {
  var chats = getAllChats();
  for (var i = 0; i < chats.length; i++)
    if (getUserMobileNumber(chats[i]) == mobileNumber)
      return chats[i];
}

/* get all messages of a chat */
function getAllMsgs(chat) {
  return chat.msgs.models;
}

/* get type of a message */
function getMsgType(msg) {
  return msg.type;
}

/* check if message is a location */
function isLocation(msg) {
  if (getMsgType(msg) == MSG_TYPE.LOCATION)
    return true;
  else
    return false;
}

/* get location's latitude and longitude */
function getLocation(msg) {
  return {latitude: msg.lat, longitude: msg.lng};
}

var chats = getAllChats();
var msgs = getAllMsgs(chats[0]);
var msg = msgs[msgs.length-1];
