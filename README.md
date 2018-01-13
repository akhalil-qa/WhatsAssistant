# WhatsAssistant
This is a demonstration of how to automate a WhatsApp account to act as a personal assistant to other WhatsApp users in order to maintain their todo lists!

## Purspose
This project is a proof-of-concept (PoC) only to discover the possibilites of automating an instant messaging platform to do extra and useful stuff in addition to the usual human-to-human chatting. 

## How Does It Work?
One WhatsApp user is logging in using the [web version of WhatsApp](https://web.whatsapp.com). Using **WhatsAssistant.js** script, the user will be acting as a server to other users (e.g. the clients). The server will help clients to maintain their todo list and query it at anytime via normal WhatsApp chatting!

Below are the commands/requests that users can send to the server:
- **add** *\<item_text\>*: add an item to the todo list.
- **remove** *\<item_id\>*: remove an item from todo list.
- **check** *\<item_id\>*: mark an item as completed/done.
- **uncheck** *\<item_id\>*: umark an item to go back to todo list.
- **show list**: show the checked and unchecked list of items in todo list.

## Server Installation
1. Open [https://web.whatsapp.com](web version of WhatsApp) in **Chrome** browser.
2. From Chrome's toolbar, go to **View** > **Developer** > **JavaScript Console**.
3. Copy and paste the content of **WhatsAssistant.js** file into **Console**.
4. The logged in user will be acting as a server from now to serve other users' requests.

**Notes:** 
1. Once the server user is logged out from web WhatsApp, the server will be down and will not respond to any requests from users.
2. All data (e.g. todo lists of all users) are stored in server's browser *localStorage*. So, if the user, who acts as a server, logged in from different machine, the data will be lost and the server will start from scratch.
3. **WhatsApp Inc.** might not allow this type of actvities in their platform, Thus, any usage of thi script will be under your personal liability and I'll not have any liabilites of any damages that might occur to eith WhatsApp, as a company, or yourself.


## Screenshots
Check the below demonstration video.

