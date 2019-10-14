module.exports = (app) => {
    const ppob = require('../controllers/ppob.controller.js');

    // Create a new mobile credit
    app.post('/api/mobile-credit', ppob.validate('mobileCredit'), ppob.mobileCredit);
    
    // Create a phone bill
    app.post('/api/pay-phone-bill', ppob.validate('payPhoneBill'), ppob.payPhoneBill);
}