<script>
    import './Server/mosk';
    import MoneyBlock from "./Components/MoneyBlock.svelte";
    import OperationTypeText from "./Components/OperationTypeText.svelte";
    import MainContentBlock from "./Components/MainContentBlock.svelte";
    import SpinnerDecorator from "./Components/Decorators/SpinnerDecorator.svelte";
    import Lexeme from './lexeme.js';

    //Кастомная библиотека загрузки рессурсов приложения
    import PreloadAllImages from './Helpers/preloadImages';

    //Флаг готовности предзагрузки рессурсов для приложения
    let isLoaded = false;

    //Предзагрузка больших спрайтов для приятного UX
    PreloadAllImages( [ '/img/sprite_buy.webp', '/img/sprite_sell.webp' ] ).then( () => {
        isLoaded = true;
    } ).catch( err => {
        throw new Error( `Load Images Error ${ err }` )
    } );

</script>

<main>
    <SpinnerDecorator loaded={isLoaded}>
        <MoneyBlock/>
        <OperationTypeText text={Lexeme.operationTypeText}/>
        <div class="center">
            <MainContentBlock/>
        </div>
    </SpinnerDecorator>
</main>

<style lang="scss">
    main {
        background: #00A575;
        //width: 100%;
        width: 600px; // для iPhone 13 pro max
        height: 800px; //высота блока, пока статично
        display: flex;
        flex-direction: column;
        padding-top: 50px; //отступ от верхней границы окна
        overflow: hidden;
    }

    .center {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0 0 10px ;
    }

    /*@media (min-width: 640px) {*/
    /*	main {*/
    /*		max-width: none;*/
    /*	}*/
    /*}*/
</style>