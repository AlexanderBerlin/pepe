export default {
    operationTypes: { //вид операции сделки
        NONE: 'NONE',
        BUY: 'BUY',
        SELL: 'SELL'
    },
    dealTypes: { //типы шагов операций. Значения должны быть от 0 и по возрастающей!!!
        CHOOSE_OPERATION_TYPE: 0,
        CHOOSE_TOKENS: 1,
        TOKEN_AMOUNT: 2,
        PAYMENT_PROVIDERS: 3,
        WALLET_ADDRESS: 4
    }
}