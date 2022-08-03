<script>
    export let text = 'text';
    import Config from '../config.js';

    //задержка анимации между символами
    const lettersDelay = 1000 / Config.textTyper.lettersPerSecond;

    let previewText = text;
    let resultTextArray = text.split( '' );
    let animationAction = false;

    /**
     * Функция задержки для функций-генераторов
     * @param ms
     * @returns {Promise}
     */
    const delayMs = ms => new Promise( resolve => setTimeout( resolve, ms ) );

    /**
     * Стираем прошлый текст
     * @returns {Promise<void>}
     */
    async function deleteText() {
        const letters = resultTextArray;

        while ( letters.length > 0 ) {
            await delayMs( lettersDelay );
            letters.pop();
            resultTextArray = letters;
        }
    }

    /**
     * Печатаем новый текст
     * @param newText
     * @returns {Promise<void>}
     */
    async function typeText( newText ) {
        const letters = newText.split( "" );
        let i = 0;
        let result = [];

        while ( result.length < letters.length ) {
            await delayMs( lettersDelay );
            result.push( letters[ i ] );
            resultTextArray = result;
            i++
        }
    }

    /**
     * Запускаем цикл стирания и печати нового текста
     * @param newText
     * @returns {Promise<void>}
     */
    async function carousel( newText ) {
        if ( !animationAction ) {
            animationAction = true;
            await deleteText();
            await typeText( newText );
            animationAction = false;
        }
    }

    //наблюдаем за изменениями в тексте
    $: if ( text !== previewText ) {
        (async ( newText ) => {
            await carousel( text );
            await delayMs( lettersDelay * newText.length + lettersDelay * previewText.length );
            previewText = newText;
        })( text )
    }
</script>

<!--Выводим текст-->
{#each resultTextArray as letter}
    {#if letter === '.'}
        {letter}<br/>
    {:else}
        {letter}
    {/if}
{/each}

