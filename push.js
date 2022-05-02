var push = require('web-push');

let vapidKeys = {
    publicKey: 'BB2VclKxEI2khPyc0DZyhtlvhBYwfGKr-cd-PSk5-0h2xRL6vXNYF8kSXJe5s7L0lR2-YuBpVppGUYz4pEmsTeo',
    privateKey: 'xS2VAkZqvGjGoLQIoJRdKrb1Sfy1ORLYAit3dY0cgvY'
  } // hacer incognito esto

push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey,  vapidKeys.privateKey);

// let sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/fANgvJxDt5I:APA91bHEY8SUuXWtrLMPSVk-VEHVmL6Yz-TtM78yQ_H1TitwCW11JBCNu3t07MA3AeciX5Rw5F4TMpMzTRg_HqGZFo5NSASlp_nHFjYXJNUZjRJ9LESaFzzHca-pValLEwK2ZhQjqQdA","expirationTime":null,"keys":{"p256dh":"BOYny-wiJCEA3QbIdLa3TsJ-wmjPe1QEZ110-39Qyts6DZGFEBcnwbDE7iP2_OsnRPh1jC4iAn6oVrzs1v82DRo","auth":"7nSYTBasVEFqnxyY_YJOdQ"}};

push.sendNotification(sub, 'test message');