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
 *            - ref_customer_id
 *            - product_code
 *            - phone_number
 *            - price
 *            - saldoterpotong
 *            - value
 *            - type
 *            - payment_method
 *           properties:
 *            ref_customer_id:
 *              type: string
 *              example: ""
 *            product_code:
 *              type: string
 *              example: I10H
 *            phone_number:
 *              type: string
 *              example: 085648889293
 *            price:
 *              type: number
 *              example: 5000
 *            saldoterpotong:
 *              type: number
 *              example: 4700
 *            value:
 *              type: string
 *              example: "4GB"
 *            type:
 *              type: string
 *              example: "internet"
 *            ref1:
 *              type: string
 *              example: "" 
 *            payment_method:
 *              type: string
 *              example: wallet
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
 *             - kode_produk
 *             - area_code
 *             - phone_number
 *           properties:
 *             kode_produk:
 *               type: string
 *               example: "TELEPON"
 *             area_code:
 *               type: string
 *               example: "021"
 *             phone_number:
 *               type: string
 *               example: "88393209"
 *             ref1:
 *               type: string
 *               example: ""
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
 *             - ref_customer_id
 *             - product_code
 *             - area_code
 *             - phone_number
 *             - ref2
 *             - nominal
 *             - biayaadmin
 *             - payment_method
 *           properties:
 *             ref_customer_id:
 *               type: string
 *               example: ""
 *             product_code:
 *               type: string
 *               example: "TELEPON"
 *             area_code:
 *               type: string
 *               example: "021"
 *             phone_number:
 *               type: string
 *               example: "88393209"
 *             nominal:
 *               type: number
 *               example: 137580
 *             biayaadmin:
 *               type: number
 *               example: 500
 *             ref1:
 *               type: string
 *               example: ref1 value
 *             ref2:
 *               type: string
 *               example: "18156560"
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
 *             - kode_produk
 *             - customer_id
 *           properties:
 *             kode_produk:
 *              type: string
 *              example: "PLNPRA"
 *             customer_id:
 *               type: string
 *               example: "01117082246" 
 *             ref1:
 *               type: string
 *               example: ""  
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
 *             - ref_customer_id
 *             - product_code
 *             - customer_id
 *             - ref2
 *             - nominal
 *             - biayaadmin
 *             - payment_method
 *           properties:
 *             ref_customer_id:
 *               type: string
 *               example: ""
 *             product_code:
 *               type: string
 *               example: "PLNPRAB"
 *             customer_id:
 *               type: string
 *               example: "5392112011703"
 *             nominal:
 *               type: number
 *               example: 698000
 *             biayaadmin:
 *               type: number
 *               example: 500
 *             ref1:
 *               type: string
 *               example: ""
 *             ref2:
 *               type: string
 *               example: ""
 *             payment_method:
 *               type: string
 *               example: cash
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
 *               example: "ASRBPJSKS"
 *             customer_id:
 *               type: string
 *               example: "8888801851523593"
 *             periode:
 *               type: string
 *               example: "12"
 *             ref1:
 *               type: string
 *               example: ""
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
 *             - ref_customer_id
 *             - product_code
 *             - customer_id
 *             - phone_number
 *             - periode
 *             - nominal
 *             - biayaadmin
 *             - ref2
 *             - payment_method
 *           properties:
 *             ref_customer_id:
 *               type: string
 *               example: ""
 *             product_code:
 *               type: string
 *               example: "ASRBPJSKS"
 *             customer_id:
 *               type: string
 *               example: "8888801851523593"
 *             phone_number:
 *               type: string
 *               example: "085648889293" 
 *             periode:
 *               type: string
 *               example: "12"
 *             nominal:
 *               type: number
 *               example: 50000
 *             biayaadmin:
 *               type: number
 *               example: 500
 *             ref1:
 *               type: string
 *               example: ""
 *             ref2:
 *               type: string
 *               example: "432635265"
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

// Get a transactions Data

/**
 * @swagger
 * /get-transactions:
 *   post:
 *     summary: get your transactions data by date
 *     tags:
 *      - dashboard 
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
 *             - page
 *             - pageLength
 *             - orderNo
 *             - dateFrom
 *             - dateTo
 *             - workflowState
 *           properties:
 *             page:
 *               type: number
 *               example: 1
 *             pageLength:
 *               type: number
 *               example: 20
 *             orderNo:
 *               type: string
 *               example: ""
 *             dateFrom:
 *               type: string
 *               example: ""
 *             dateTo:
 *               type: string
 *               example: ""
 *             workflowState:
 *               type: string
 *               example: "Credits"
 *             ref_customer_id:
 *               type: string
 *               example: ""
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
 app.post('/api/get-transactions', ppob.getTransactions);


/**
 * @swagger
 * /get-transaction:
 *   post:
 *     summary: get your single transaction detail
 *     tags:
 *      - dashboard 
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
 *             - orderNo
 *           properties:
 *             orderNo:
 *               type: string
 *               example: "425345"
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
 app.post('/api/get-transaction', ppob.getTransaction);


 /**
 * @swagger
 * /re-print:
 *   post:
 *     summary: Re-print transaction receipt
 *     tags:
 *      - dashboard 
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
 *             - ref1
 *           properties:
 *             ref1:
 *               type: string
 *               example: "Contains transaction ID customer when payment request"
 *             ref2:
 *               type: string
 *               example: "Contains ref2 bimasakti when payment response"
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Reqired data is missing
 *       401:
 *         description: Unauthorized
 *     api_key: []
 */
app.post('/api/re-print', ppob.rePrint);

}