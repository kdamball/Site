var twilio = require('twilio');

var client = new twilio.RestClient(sails.config.twilio.AccountSID, sails.config.twilio.token);

var sendMessage =  function (number, message){

    if (number.length < 9){
        return;
    }

    client.messages.create({

        to: '+255' + number,
        from: 'Fortis-Ins.',
        body: message

    }, function(error, message) {

        if (error) {
            sails.log(error);
        }
    });
};

var company = function (companyName){

    client.messages.create({
        to: '+2550686326673',
        from: 'NichekieDB',
        body: 'Check DB for new client: ' +companyName
    })
}


module.exports = {
    send: sendMessage,
    company: company
}
