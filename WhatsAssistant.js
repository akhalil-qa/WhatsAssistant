/* list of commands */
var commands = ["add", "remove", "check", "uncheck", "show"];

/* get all chats */
function getAllChats() {
  var chatsFromLeftPanel = getReactComponent(document.getElementsByClassName('chatlist-panel-body')[0]);
  return chatsFromLeftPanel.props.chats;
}

/* get chat by supplying an index */
function getChat(index) {
  var chats = getAllChats();
  return chats[index];
}

/* get user id of the chat */
function getUserId(chat) {
  return chat.id;
}

/* get chat that corresponds to a user id */
function getChatOfUser(userId) {
  var chats = getAllChats();
  for (var i = 0; i < chats.length; i++)
    if (getUserId(chats[i]) == userId)
      return chats[i];
}

/* get all messages of a chat */
function getAllMsgs(chat) {
  return chat.msgs.models;
}

/* extract command and command body from the message. If not found, return null */
function extractCommandBody(msg) {
  try {
    var command = msg.body.substr(0, msg.body.indexOf(" ")).toLowerCase();

    if (commands.indexOf(command) > -1)
      return [command, msg.body.substr(msg.body.indexOf(" ")+1, msg.body.length-command.length-1)];
    else
      return [null, null];
  }
  catch (err) {
    return [null, null];
  }
}

/* add item to todo list */
function add(userId, item) {
  var items = JSON.parse(localStorage.getItem(userId));
  if (!items)
    items = [];

  items.push([item, 0]);
  localStorage.setItem(userId, JSON.stringify(items));
  return "Item added to your todo list.";
}

/* remove item from todo list */
function remove(userId, itemId) {
  var items = JSON.parse(localStorage.getItem(userId));

  /* if user do not have any items in his todo list */
  if (!items)
    return "You still don't have any item in your todo list!";

  /* if item id entered in not found */
  if (itemId > items.length || itemId <= 0)
    return "Item id you entered is not found!";

  /* remove the item */
  var index = items.indexOf(items[itemId-1]);
  items.splice(index, 1);

  /* store back the items after deletion */
  localStorage.setItem(userId, JSON.stringify(items));
  return "Item removed from your list.";
}

/* check item in todo list */
function check(userId, itemId) {
  var items = JSON.parse(localStorage.getItem(userId));

  /* if user do not have any items in his todo list */
  if (!items)
    return "You still don't have any item in your todo list!";

  /* if item id entered in not found */
  if (itemId > items.length || itemId <= 0)
    return "Item id you entered is not found!";

  /* mark item as checked */
  items[itemId-1][1] = 1;
  localStorage.setItem(userId, JSON.stringify(items));
  return "Item checked.";
}

/* uncheck item in todo list */
function uncheck(userId, itemId) {
  var items = JSON.parse(localStorage.getItem(userId));

  /* if user do not have any items in his todo list */
  if (!items)
    return "You still don't have any item in your todo list!";

  /* if item id entered in not found */
  if (itemId > items.length || itemId <= 0)
    return "Item id you entered is not found!";

  /* mark item as checked */
  items[itemId-1][1] = 0;
  localStorage.setItem(userId, JSON.stringify(items));
  return "Item unchecked.";
}

/* show todo list */
function show(userId) {
  var items = JSON.parse(localStorage.getItem(userId));

  /* if user do not have any items in his todo list */
  if (!items)
    return "You still don't have any item in your todo list!";

  /* read current items and checked items */
  var currentItems = "";
  var checkedItems = "";
  for(var i = 0; i < items.length; i++){
    if (items[i][1] == 0)
      currentItems += "[" + (i+1) + "] " + items[i][0] + "\n";
    else
      checkedItems += "[" + (i+1) + "] " + items[i][0] + "\n";
  }

  /* construct a response text */
  var response = "Todo:\n" + currentItems + "\n\nChecked:\n" + checkedItems;

  return response;
}

/* send messsage to the chat */
function sendMessage(chat, text) {
  chat.sendMessage(text);
}

/* get React component */
function getReactComponent(dom) {
    for (var key in dom)
      if (key.startsWith("__reactInternalInstance$"))
        return dom[key].child.stateNode;

    return null;
};

/* loop over all chats and read its messages to reply to client requests, every 1 second */
setInterval(function(){
  var chats = getAllChats();
  for (var i = 0; i < chats.length; i++) {
    var msgs = getAllMsgs(chats[i]);
    for (var j = msgs.length-1; i >= 0; j--) {
      var msg = msgs[j];

      /* if server encounters a message (response) sent by him */
      // [AHMED: remove comment]
      //if (msg.isSentByMe)
        //break; // go to check the next message

      /* read a command and its body, if any */
      var command, commandBody;
      [command, commandBody] = extractCommandBody(msg);
      if (!command)
        break; // go to check the next message

      /* call the corresponding function and collect the response */
      var response = "";
      switch (command) {
        case "add":
          response = add(chats[i].id, commandBody);
          break;
        case "remove":
          response = remove(chats[i].id, commandBody);
          break;
        case "check":
          response = check(chats[i].id, commandBody);
          break;
        case "uncheck":
          response = uncheck(chats[i].id, commandBody);
          break;
        case "show":
          response = show(chats[i].id);
          break;
        default:
          response = "Sorry, I couldn't understand your command.";
      }

      sendMessage(chats[i], response);

      break; // go to check the next chat
    }
  }
}, 1000);
