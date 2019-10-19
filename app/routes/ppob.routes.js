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
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
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
 *     api_key: ["dfsddfsdfsdf"]
 */

 app.get('/api/pricelist/:produk', ppob.pricelistCredit);

// Create a new mobile credit

/**
 * @swagger
 * /mobile-credit:
 *   post:
 *     summary: Pay your mobile credit
 *     tags:
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
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
 *            - payment_method
 *           properties:
 *            kode_produk:
 *              type: string
 *              example: I10H
 *            phone_number:
 *              type: string
 *              example: 085648889293
 *            payment_method:
 *              type: string
 *              example: wallet
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
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
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
 *               example: "021"
 *             phone_number:
 *               type: string
 *               example: "88393209"
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
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
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
 *             - payment_method
 *           properties:
 *             area_code:
 *               type: string
 *               example: "021"
 *             phone_number:
 *               type: string
 *               example: "88393209"
 *             nominal:
 *               type: string
 *               example: "137580"
 *             ref1:
 *               type: string
 *               example: ref1 value
 *             ref2:
 *               type: string
 *               example: ref2 value
 *             payment_method:
 *               type: string
 *               example: wallet
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

// Get Electricity inquiry
/**
 * @swagger
 * /electricity-inq:
 *   post:
 *     summary: Get your Electricity Inquiry
 *     tags:
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
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
 *             - customer_id
 *           properties:
 *             customer_id:
 *               type: string
 *               example: "5392112011703"  
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
 app.post('/api/electricity-inq', ppob.validate('inquiryElectricity'), ppob.inquiryElectricity);

// Pay Electricity bill
/**
 * @swagger
 * /pay-electricity-bill:
 *   post:
 *     summary: Pay your Electricity Bill
 *     tags:
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
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
 *             - customer_id
 *             - ref2
 *             - nominal
 *             - payment_method
 *           properties:
 *             customer_id:
 *               type: string
 *               example: "5392112011703"
 *             nominal:
 *               type: string
 *               example: "698000"
 *             payment_method:
 *               type: string
 *               example: cash
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
 app.post('/api/pay-electricity-bill', ppob.validate('payElectricityBill'), ppob.payElectricityBill);

// Get a BPJS Payment inquiry

/**
 * @swagger
 * /inq-bpjs:
 *   post:
 *     summary: Get your PBJS Inquiry
 *     tags:
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
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
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
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
 *             - payment_method
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
 *             ref2:
 *               type: string
 *               example: ref2 value
 *             phone_number:
 *               type: string
 *               example: 085648889293 
 *             payment_method:
 *               type: string
 *               example: cashwallet 
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

// Get a transactions Data

/**
 * @swagger
 * /get-transactions/{produk}:
 *   get:
 *     summary: get your transactions data by date
 *     tags:
 *      - dashboard 
 *     security:
 *      - ApiKeyAuth: [] 
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: produk
 *         in: path
 *         description: TELEPON | PLNNONH code for return transaction type
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
 app.get('/api/get-transactions', ppob.getTransactions);

// Get remaining balance

/**
 * @swagger
 * /balance-check:
 *   get:
 *     summary: Get remaining balance
 *     description: Returns remaining balance
 *     tags:
 *      - Android 
 *     security:
 *      - ApiKeyAuth: [] 
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */

 app.get('/api/balance-check', ppob.balanceCheck);

}