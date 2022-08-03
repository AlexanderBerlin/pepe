<script>
    import { operationTypeStore } from "../Stores/store";
    import Const from '../const.js';
    import Config from '../config.js';

    export let text = 'word 1/word2'; //входящий текст по умолчанию
    export let separator = '/'; //симввол разделителя по умолчанию
    export let frameDelayMs = 1000 / Config.sellAndBuyText.lettersPerSecond; //ms время отработки между символами по умолчанию

    //получаем позицию разделитя (используя бинарный сдвиг ~)
    const separatorPosition = ~text.indexOf( separator ) * -1;

    //если нет разделителя, компонент не имеет смысла, возвращаем ошибку
    if ( separatorPosition === 0 ) {
        throw Error( `OperationTypeText: no ${ separator } text separator in ${ text }` );
    }

    let startPosition = 0; //стартовая позиция обрезки текста
    let endPosition = text.length; //конечная позиция обрезки текста
    let textAnimationInterval = null; //переменная для объекта счетсчика clearInterval
    let resultText = text; //тект для отображения в DOM

    /**
     * Функция анимации текста (режем по делителю до или после, и побуквенно выводим)
     * @param start
     * @param end
     */
    function animateText( start, end ) {
        if ( textAnimationInterval ) clearInterval( textAnimationInterval );

        textAnimationInterval = setInterval( () => {
            if ( startPosition < start ) {
                startPosition++;
            } else if ( startPosition > start ) {
                startPosition--;
            }

            if ( endPosition < end ) {
                endPosition++;
            } else if ( endPosition > end ) {
                endPosition--;
            }

            //если начало текста и конец достигли заданныз точек, завершаем работу setInterval
            if ( startPosition === start && endPosition === end ) {
                clearInterval( textAnimationInterval );
            }
            //Режем текст до текущих велечин с начала и конца
            resultText = text.substr( startPosition, endPosition );

        }, frameDelayMs )
    }

    //Реактивное событие: наблюдаем за переменной operationTypeStore, отрабатываем по условию
    $: if ( $operationTypeStore === Const.operationTypes.SELL ) {
        animateText( separatorPosition, text.length );
    } else if ( $operationTypeStore === Const.operationTypes.BUY ) {
        animateText( 0, separatorPosition - 1 );
    }

</script>

<div>
    {#each resultText as letter}
        {#if letter === separator}
            <i>{letter}</i>
        {:else}
            {letter}
        {/if}
    {/each}
</div>

<style lang="scss">
    div {
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 300;
        font-size: 23px;
        line-height: 61px;
        display: flex;
        align-self: center;
        align-items: center;
        letter-spacing: -0.04em;
        height: 68px;
    }

    i {
        padding: 0 5px;
        font-style: normal;
    }
</style>