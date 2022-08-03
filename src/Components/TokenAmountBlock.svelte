<script>
    import { onMount, tick } from 'svelte';
    import { stepDealTypeStore, tokenAmountStore } from '../Stores/store';
    import Config from './../config';
    import Lexeme from '../lexeme.js';

    let inputHiddenDOMElementRef = null;
    let inputDOMElementRef = null;

    let currentInputWidth = 0;
    let currentValue = '';
    let hiddenCurrent = Lexeme.tokenAmountPlaceholderText;

    /**
     * Асинхронная яункция. Получаем размер по ширине скрытого блока с прибавкой отступов
     * @returns {Promise<void>}
     */
    async function recalculateWidth() {
        //ждем ре-рендеринг DOM блока
        await tick();
        //получаем длинну блока с введенными фицрами в px
        currentInputWidth = (inputHiddenDOMElementRef && inputHiddenDOMElementRef.offsetWidth || 0) + Config.amountText.underlinePaddingPx;
    }

    /**
     * Функция сабмита
     */
    function submittedValue() {
        // если введенная сумма больше нуля, переходим на следующий шаг
        if ( $tokenAmountStore > 0 ) stepDealTypeStore.setPaymentProviders();
    }

    //перечситываем при изменении вводимой суммы
    $: {
        //отсекаем все не цифровые символы и добаляем разделители, parseInt нужен для удаления нулей в начале суммы
        const value = parseInt( currentValue.replace( /\D/g, '' ) ) || 0;

        //если значени больше 0 то переводим в строку и делим на разделители, либо просто пустой текст
        if ( value > 0 ) {
            currentValue = value.toString().replace( /(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + Config.amountText.separator );
        } else {
            currentValue = '';
        }
        //сохраяем текущее значние в store
        tokenAmountStore.setTokenAmount( parseInt( currentValue.replaceAll( ' ', '' ) ) || 0 );
        //выводим в скрытое поле
        hiddenCurrent = (currentValue.length ? currentValue : Lexeme.tokenAmountPlaceholderText);
        //пересчитываем длинну поля для линии подчеркивания
        recalculateWidth();
    }

    onMount( () => {
        //считаем ширину поля для рассчета длинны подчеркивающей линии
        recalculateWidth();
        //задержка установки фокуса на поле ввода
        setTimeout( () => inputDOMElementRef.focus(), Config.amountText.focusDelay );
    } );

</script>

<form on:submit|preventDefault={submittedValue}>
    <div class="hidden" bind:this={inputHiddenDOMElementRef}>{hiddenCurrent}</div>
    <input placeholder={Lexeme.tokenAmountPlaceholderText}
           bind:value={currentValue}
           bind:this={inputDOMElementRef}
           type="text"
           maxlength={Config.amountText.maxLength}/>
    <div class="underline"
         style="width: {currentInputWidth}px;--animationSpeed: {Config.amountText.underlineAnimationSpeedMs}ms"></div>
</form>

<style lang="scss">

    form {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .hidden {
        position: absolute;
        display: inline;
        opacity: 0;
        pointer-events: none;
    }

    input,
    .hidden {
        font-size: 26px;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
    }

    input {
        color: #fff;
        text-align: center;
        font-weight: 100;
        margin-bottom: 6px;
    }

    .underline {
        display: inline-flex;
        align-self: center;
        height: 2px;
        background: #fff;
        bottom: 0;
        position: absolute;
        transition: width var(--animationSpeed) ease-in-out;
    }
</style>