module.exports = (app) => {
    const ppob = require('../controllers/ppob.controller.js');

// Get mobile credit pricelist

/**
 * @swagger
 * /pricelist/{produk}:
 *   get:
 *     summary: Get mobile credit price list
 *     description: Returns mobile credit price list
 *     tags:
 *      - fastpay 
 *     security:
 *      - bearerAuth: [] 
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: produk
 *         in: path
 *         description: TELKOMSEL | KARTU3 code for return pricelist
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */

 app.get('/api/pricelist/:produk', ppob.pricelistCredit);

// Create a new mobile credit

/**
 * @swagger
 * /mobile-credit:
 *   post:
 *     summary: Pay your mobile credit
 *     tags:
 *      - fastpay 
 *     security:
 *      - bearerAuth: [] 
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Body object that needs to be create transection
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *            - kode_produk
 *            - phone_number
 *           properties:
 *            kode_produk:
 *              type: string
 *              example: I10H
 *            phone_number:
 *              type: string
 *              example: 085648889293
 *            ref1:
 *              type: string
 *              example: ref1 value 
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
 app.post('/api/mobile-credit', ppob.validate('mobileCredit'), ppob.mobileCredit);


// Get phone inquiry
/**
 * @swagger
 * /phone-inq:
 *   post:
 *     summary: Get your Phone Inquiry
 *     tags:
 *      - fastpay 
 *     security:
 *      - bearerAuth: [] 
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Body object that needs to be create transection
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - area_code
 *             - phone_number
 *           properties:
 *             area_code:
 *               type: string
 *             phone_number:
 *               type: string
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
 app.post('/api/phone-inq', ppob.validate('inquiryPhone'), ppob.inquiryPhone);



// Pay phone bill
/**
 * @swagger
 * /pay-phone-bill:
 *   post:
 *     summary: Pay your Phone Bill
 *     tags:
 *      - fastpay 
 *     security:
 *      - bearerAuth: [] 
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Body object that needs to be create transection
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - area_code
 *             - phone_number
 *             - ref2
 *             - nominal
 *           properties:
 *             area_code:
 *               type: string
 *             phone_number:
 *               type: string
 *             nominal:
 *               type: string
 *             ref1:
 *               type: string
 *               example: ref1 value
 *             ref2:
 *               type: string
 *               example: ref2 value
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
 app.post('/api/pay-phone-bill', ppob.validate('payPhoneBill'), ppob.payPhoneBill);

// Get a BPJS Payment inquiry

/**
 * @swagger
 * /inq-bpjs:
 *   post:
 *     summary: Get your PBJS Inquiry
 *     tags:
 *      - fastpay 
 *     security:
 *      - bearerAuth: [] 
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Body object that needs to be create transection
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - kode_produk
 *             - customer_id
 *             - periode
 *           properties:
 *             kode_produk:
 *               type: string
 *             customer_id:
 *               type: string
 *               example: 8888801821212256
 *             periode:
 *               type: string
 *               example: 12
 *             ref1:
 *               type: string
 *               example: ref1 value
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
 
 app.post('/api/inq-bpjs', ppob.validate('bpjsInquiry'), ppob.bpjsInquiry);
// Create a BPJS Payment

/**
 * @swagger
 * /pay-bpjs:
 *   post:
 *     summary: Pay your PBJS
 *     tags:
 *      - fastpay 
 *     security:
 *      - bearerAuth: [] 
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Body object that needs to be create transection
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - kode_produk
 *             - customer_id
 *             - periode
 *             - ref2
 *             - phone_number
 *           properties:
 *             kode_produk:
 *               type: string
 *               example: I10H
 *             customer_id:
 *               type: string
 *               example: 8888801821212256
 *             periode:
 *               type: string
 *               example: 12
 *             ref1:
 *               type: string
 *               example: ref1 value
 *             ref2:
 *               type: string
 *               example: ref2 value
 *             phone_number:
 *               type: string
 *               example: 085648889293 
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
 
 app.post('/api/pay-bpjs', ppob.validate('payBPJS'), ppob.payBPJS);
}