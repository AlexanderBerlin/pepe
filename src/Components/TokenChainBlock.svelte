<script>
    import { onMount } from 'svelte';
    import { operationTypeStore, tokenChainStore } from "../Stores/store";
    import { getTokensList, getChainList } from '../Server/api';
    import Const from "../const";
    import Lexeme from '../lexeme.js';
    import DropDownWrapper from "./DropDown/DropDownWrapper.svelte";
    import ArrowRounded from './Icons/ArrowRounded.svelte';
    import SlideEffectDecorator from "./Decorators/SlideEffectDecorator.svelte";
    import SpinnerDecorator from "./Decorators/SpinnerDecorator.svelte";

    //режим продажи (в противном случае режим покупки)
    $: sellMode = $operationTypeStore === Const.operationTypes.SELL;

    //ручка выбора Token
    function handleClickToken( event ) {
        tokenChainStore.setSelectedToken( event.detail.id );
    }

    //ручка выбора Coin
    function handleClickChain( event ) {
        tokenChainStore.setSelectedChain( event.detail.id );
    }

    onMount( () => {
        //если в хранилище нет списка токенов запрашиваем их с сервера
        if ( !$tokenChainStore.token.length ) {
            getTokensList().then( tokenChainStore.setTokens );
        }
        //если в хранилище нет списка чайнов запрашиваем их с сервера
        if ( !$tokenChainStore.chain.length ) {
            getChainList().then( tokenChainStore.setChains );
        }
    } );
</script>

<SpinnerDecorator loaded={$tokenChainStore.token.length && $tokenChainStore.chain.length}>
    <div class="tokenChainBlock">

        <div class="tokenChainBlock__item">
            <SlideEffectDecorator width="100%">
                <div class="tokenChainBlock__inner">
                    <DropDownWrapper width={210}
                                     minHeight={103}
                                     openedHeight={254}
                                     dataList={$tokenChainStore.token}
                                     placeholderText={Lexeme.tokenChooseBlockPlaceholderLeft}
                                     selectedId={$tokenChainStore.selectedToken}
                                     on:clicked={handleClickToken}/>
                </div>
            </SlideEffectDecorator>
        </div>

        <div class="roundedArrowBlock">
            <ArrowRounded sellMode={sellMode}/>
        </div>

        <div class="tokenChainBlock__item">
            <SlideEffectDecorator showDelayMs={300} width="100%">
                <div class="tokenChainBlock__inner right">
                    <DropDownWrapper width={210}
                                     minHeight={103}
                                     openedHeight={254}
                                     dataList={$tokenChainStore.chain}
                                     placeholderText={Lexeme.tokenChooseBlockPlaceholderRight}
                                     selectedId={$tokenChainStore.selectedChain}
                                     on:clicked={handleClickChain} />
                </div>
            </SlideEffectDecorator>
        </div>

    </div>
</SpinnerDecorator>

<style lang="scss">
    .tokenChainBlock {
        display: flex;
        flex-direction: row;
        align-self: center;

        &__item {
            display: flex;
            min-width: 223px;
            position: relative;
        }

        &__inner {
            position: absolute;

            &.right {
                right: 0;
            }
        }
    }

    .roundedArrowBlock {
        padding: 37px 11px 0;
    }
</style>