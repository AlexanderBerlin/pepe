<script>
    import AnimatedDecorator from "./Decorators/AnimatedDecorator.svelte";
    import { stepDealTypeStore, tokenAmountStore, providersStore } from '../Stores/store';
    import Const from '../const.js';
    import Lexeme from '../lexeme.js';
    import TextStyleDecorator from "./Decorators/TextStyleDecorator.svelte";
    import PaymentProvidersBlock from "./PaymentProvidersBlock.svelte";
    import SlideEffectDecorator from "./Decorators/SlideEffectDecorator.svelte";
    import TokenAmountBlock from "./TokenAmountBlock.svelte";
    import TokenChainBlock from "./TokenChainBlock.svelte";
    import TextTyper from "./TextTyper.svelte";

    let chooseOperationTypeBlock = null;
    let tokenAmountInfoBlock = null;
    let providersInfoBlock = null;

    let showChooseOperationType = true;
    let showChooseToken = false;
    let showPaymentProviders = false;
    let showProvidersHelpInfo = true;

    $: if ( showChooseOperationType && $stepDealTypeStore !== Const.dealTypes.CHOOSE_OPERATION_TYPE ) {
        chooseOperationTypeBlock && chooseOperationTypeBlock.Hide().then( () => {
            showChooseOperationType = false;
            showChooseToken = true;
        } )
    }
    $: if ( stepDealTypeStore && $stepDealTypeStore === Const.dealTypes.PAYMENT_PROVIDERS ) {
        tokenAmountInfoBlock && tokenAmountInfoBlock.Hide().then( () => {
            showPaymentProviders = true;
        } )
    }
    $: if ( stepDealTypeStore && $stepDealTypeStore === Const.dealTypes.WALLET_ADDRESS ) {
        providersInfoBlock && providersInfoBlock.Hide().then( () => {
            showProvidersHelpInfo = false;
        } )
    }

    $:tokenAmountHelpText = $tokenAmountStore > 0 ? Lexeme.tokenAmountHelpText_AmountSet : Lexeme.tokenAmountHelpText_AmountEmpty;
</script>

<!--Выбор типа операции-->
{#if showChooseOperationType }
    <SlideEffectDecorator>
        <AnimatedDecorator bind:this={chooseOperationTypeBlock}>
            <TextStyleDecorator>
                {@html Lexeme.operationTypeHelpText}
            </TextStyleDecorator>
        </AnimatedDecorator>
    </SlideEffectDecorator>
{/if}

<!--Выбор токена и chain-->
{#if showChooseToken}
    <div class="tokenChainBlock">
        <TokenChainBlock/>
    </div>
{/if}

<!--Ввод суммы сделки -->
{#if $stepDealTypeStore >= Const.dealTypes.TOKEN_AMOUNT}
    <SlideEffectDecorator>
        <TokenAmountBlock />
    </SlideEffectDecorator>
    {#if !showPaymentProviders }
        <SlideEffectDecorator showDelayMs={300}>
            <div class="tokenAmountInfo">
                <AnimatedDecorator bind:this={tokenAmountInfoBlock}>
                    <TextStyleDecorator>
                        <TextTyper text={tokenAmountHelpText}/>
                    </TextStyleDecorator>
                </AnimatedDecorator>
            </div>
        </SlideEffectDecorator>
    {/if}
{/if}

<!--Провайдер транзакции-->
{#if showPaymentProviders}
    <SlideEffectDecorator>
        <PaymentProvidersBlock/>
    </SlideEffectDecorator>

    {#if showProvidersHelpInfo && $providersStore.providers.length}
        <SlideEffectDecorator showDelayMs={300}>
            <div class="helpText">
                <AnimatedDecorator bind:this={providersInfoBlock}>
                    <TextStyleDecorator>
                        {Lexeme.providerHelpText}
                    </TextStyleDecorator>
                </AnimatedDecorator>
            </div>
        </SlideEffectDecorator>
    {/if}
{/if}



<style lang="scss">
    .tokenChainBlock {
        display: flex;
        justify-content: start;
        flex-direction: column;
        align-self: center;
        z-index: 100;
        height: 130px;
    }

    .tokenAmountInfo {
        padding-top: 50px;
    }
</style>