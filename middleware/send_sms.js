const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'this is the twilio service',
        from: '+15017122661',
        to: '+917561818488'
    })
    .then(message => console.log(message.sid));





client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    .verifications
    .create({ to: '+15017122661', channel: 'sms' })
    .then(verification => console.log(verification.status));



client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    .verifications
    .create({ to: '+15017122661', channel: 'sms' })
    .then(verification => console.log(verification.status));
