module.exports = {
    send: function(req, res, next){

        TwilioService.send(req.param('number'), req.param('message'));
        
        return res.view('sms', {
            success: true,
            number: req.param('number')
        })

    }
}