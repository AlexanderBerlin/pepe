import { writable } from 'svelte/store';
import Const from '../const.js';

/**
 * Получаем текущий статус определенного сторджа
 * @param store
 * @returns {*}
 */
function get__store( store ) {
    let $val;
    store.subscribe( $ => $val = $ )();
    return $val
}

/**
 * Статус шага выбора параметров сделки
 * @returns {{subscribe: (this:void, run: Subscriber<number>, invalidate?: Invalidator<number>) => Unsubscriber, setPaymentProviders: (function(): void), setChooseOperationType: (function(): void), setTokenAmount: (function(): void), setChooseTokens: (function(): void)}}
 */
function createStepDealTypeStore() {
    const { subscribe, set } = writable( Const.dealTypes.CHOOSE_OPERATION_TYPE );

    return {
        subscribe,
        setChooseOperationType: () => set( Const.dealTypes.CHOOSE_OPERATION_TYPE ),
        setChooseTokens: () => set( Const.dealTypes.CHOOSE_TOKENS ),
        setTokenAmount: () => set( Const.dealTypes.TOKEN_AMOUNT ),
        setPaymentProviders: () => set( Const.dealTypes.PAYMENT_PROVIDERS ),
        setWalletAddress: () => set( Const.dealTypes.WALLET_ADDRESS ),
    }
}

/**
 * Статус типа операции
 * @returns {{setBuyMode: setBuyMode, subscribe: (this:void, run: Subscriber<string>, invalidate?: Invalidator<string>) => Unsubscriber, setSellMode: setSellMode}}
 */
function createOperationTypeStore() {
    const { subscribe, set } = writable( Const.operationTypes.NONE );

    const setStepDealToChooseToken = () => {
        //если текущий шаг выбора типа операции, то переходим к шагу выбора токенов
        if ( get__store( stepDealTypeStore ) === Const.dealTypes.CHOOSE_OPERATION_TYPE ) {
            stepDealTypeStore.setChooseTokens();
        }
    }
    return {
        subscribe,
        setBuyMode: () => {
            set( Const.operationTypes.BUY );
            setStepDealToChooseToken();
        },
        setSellMode: () => {
            set( Const.operationTypes.SELL );
            setStepDealToChooseToken();
        }
    }
}

/**
 * Провайдеры
 * @returns {{subscribe: (this:void, run: Subscriber<{selectedProvider: *, providers: *[]}>, invalidate?: Invalidator<{selectedProvider: *, providers: *[]}>) => Unsubscriber, setSelectedProvider: setSelectedProvider, setProviders: setProviders}}
 */
function createProvidersStore() {
    const { subscribe, update, set } = writable( {
        providers: [],
        selectedProvider: void (0)
    } );

    return {
        subscribe,
        setProviders: ( data ) => {
            update( store => {
                store.providers = data;
                return store;
            } );
        },
        setSelectedProvider: ( id ) => {
            update( store => {
                store.selectedProvider = id;
                return store;
            } );
            stepDealTypeStore.setWalletAddress();
        }
    }
}

/**
 * Хранилище Списка Token и Chain
 * @returns {{setTokens: setTokens, setSelectedChain: setSelectedChain, subscribe: (this:void, run: Subscriber<{chain: *[], selectedChain: *, selectedToken: *, token: *[]}>, invalidate?: Invalidator<{chain: *[], selectedChain: *, selectedToken: *, token: *[]}>) => Unsubscriber, setSelectedToken: setSelectedToken, setChains: setChains}}
 */
function createTokenChainStore() {
    const { subscribe, update, set } = writable( {
        token: [],
        chain: [],
        selectedToken: void (0),
        selectedChain: void (0)
    } );

    //проверяем на выбор обехи пораметров
    const checkSelectedTokensAndChain = () => {
        const { selectedToken, selectedChain } = get__store( tokenChainStore );

        if ( typeof selectedToken === 'number' && typeof selectedChain === 'number' ) {
            //если текущий шаг выбора типа операции, то переходим к шагу выбора токенов
            if ( get__store( stepDealTypeStore ) === Const.dealTypes.CHOOSE_TOKENS ) {
                stepDealTypeStore.setTokenAmount();
            }
        }
    }

    return {
        subscribe,
        setTokens: ( data ) => {
            update( store => {
                store.token = data;
                return store;
            } );
        },
        setChains: ( data ) => {
            update( store => {
                store.chain = data;
                return store;
            } );
        },
        setSelectedToken: ( id ) => {
            update( store => {
                store.selectedToken = id;
                return store;
            } );
            checkSelectedTokensAndChain();
        },
        setSelectedChain: ( id ) => {
            update( store => {
                store.selectedChain = id;
                return store;
            } );
            checkSelectedTokensAndChain();
        },
    }
}

/**
 * Статус типа операции
 * @returns {{subscribe: (this:void, run: Subscriber<number>, invalidate?: Invalidator<number>) => Unsubscriber, setTokenAmount: setTokenAmount}}
 */
function createTokenAmountStore() {
    const { subscribe, set } = writable( 0 );

    return {
        subscribe,
        setTokenAmount: ( number ) => {
            set( parseInt( number ) );
        }
    }
}

export const operationTypeStore = createOperationTypeStore();
export const stepDealTypeStore = createStepDealTypeStore();
export const tokenChainStore = createTokenChainStore();
export const tokenAmountStore = createTokenAmountStore();
export const providersStore = createProvidersStore();


