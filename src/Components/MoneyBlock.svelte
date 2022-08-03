<script>
    import MoneyItem from "./MoneyItem.svelte";
    import MoneyArrow from "./Icons/MoneyArrow.svelte";
    import { operationTypeStore } from "../Stores/store";
    import Const from '../const.js';

    let isBuySelected;
    let isSellSelected;

    //реактивно роверям изменения выбранного состояния типа операции
    $: isBuySelected = $operationTypeStore === Const.operationTypes.BUY;
    $: isSellSelected = $operationTypeStore === Const.operationTypes.SELL;

    /**
     *  Выставляем режим Покупки
     */
    function handlerSetBuyMode() {
        operationTypeStore.setBuyMode();
    }

    /**
     * Выставляем режим Продажи
     */
    function handlerSetSellMode() {
        operationTypeStore.setSellMode();
    }

</script>

<div class="wrapper">
    <div>
        <MoneyItem type="buy"
                   lateWaveAnimation={true}
                   selected={isBuySelected}
                   currentOperationTypeIsSelected={isBuySelected || isSellSelected}
                   on:click={handlerSetBuyMode}/>
    </div>

    <div class="center">
        <MoneyArrow reverse={$operationTypeStore === Const.operationTypes.SELL}/>
    </div>

    <div>
        <MoneyItem type="sell"
                   selected={isSellSelected}
                   currentOperationTypeIsSelected={isBuySelected || isSellSelected}
                   on:click={handlerSetSellMode}/>
    </div>
</div>

<style lang="scss">
    div {
        //outline:1px solid red;
        display: flex;
        height: 136px; //272px / 2
        align-items: center;
    }

    .center {
        padding: 0 42px;
        z-index: 1;
    }

    .wrapper {
        flex-direction: row;
        align-items: stretch;
        justify-content: center;
    }
</style>


