var push = require('web-push');

let vapidKeys = push.generateVAPIDKeys();

console.log(vapidKeys);

push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey,  vapidKeys.privateKey);

let sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/cG8JPyJW7G4:APA91bHTJzVkLtydtmYn1uApTYYUuG8DVo3QNO6610ldlzeS_VlD0pEe27sMRJThXEhEGiIWpNc0EQNf4biYWolTl2NnO1w3dBpBN6GQovi9qtKDo7q1qGLNkjw3m0LWe2zCnuxYJ1gn",
"expirationTime":null,
"keys":{
"p256dh":"BJe5I1AX-Xo_LrmCzFRx2LlphFsmDu7KsAf_JipoCv7tlV3deW_3q7nk9DqKoE5IalLsj0sHn6A_DVjMWlO5XOc",
"auth":"yj0p-XaxKqvekZlV7SXhsQ"}};

push.sendNotification(sub, 'test message123');