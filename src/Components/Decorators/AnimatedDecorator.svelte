<script>
    import { onMount } from 'svelte';
    import { watchResize } from "svelte-watch-resize";

    export let width = 0;//500;
    export let height = 0//width * (202 / 987);
    export let borderRadius = 0;//height / 2;
    export let stroke = 1;
    export let clickable = false;
    //export let animationSpeed = 500; //скорость анимации в ms

    /**
     * Экспортируемая функция вызывающая визуальное скрытие компонента с resolve прописома по завершению
     * @returns {Promise<unknown>}
     */
    export const Hide = () => {
        show = false;
        return new Promise( ( resolve ) => setTimeout( () => resolve(), 500 ) );
    }

    //стили для span элементов - 5ти чайстей анимации
    let spanStyle;

    //статус показа
    let show = false;
    //начальная высоты
    let startHeight = height;

    //переменные для ссыллок на DOM элементы
    let wrapperElement = null;

    /**
     * Пересчет размеров и параметров
     * @returns {Promise<void>}
     */
    function calculateSize() {
        //Рассчитываем высоту, ширину и радиус закругления для svg элемента
        width = wrapperElement.offsetWidth;
        height = wrapperElement.offsetHeight - stroke / 2;

        //если не задано начальное значение высоты, задаем
        if ( !startHeight ) startHeight = height;

        //считаем бордер-радиус, если не задан
        if ( !borderRadius ) borderRadius = height / 2;
    }

    onMount( () => {
        calculateSize();

        //задержка до обработки основного потока, для Safari (иначе анимация css не сработает)
        setTimeout( () => {
            show = true;
        }, 0 )
    } );

    $: spanStyle = `border-radius: ${ borderRadius }px; border: ${ stroke }px solid #fff`;
</script>


<div on:click class="animation {show ? 'show' : ''} {clickable ? 'clickable': ''}">
    <div class="wrapper" style="border-radius: {borderRadius}px">
        {#each Array(5) as _}
            <span style={spanStyle}></span>
        {/each}
        <div class="slot"
             use:watchResize={calculateSize}
             bind:this={wrapperElement}>
            <slot/>
        </div>
    </div>
</div>

<style lang="scss">
    .slot {
        height: fit-content;
        opacity: 0;
        transition: 0.5s opacity ease-in;
    }

    .animation {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        position: relative;
        overflow: hidden;

        &.clickable {
            cursor: pointer;
        }
    }

    .wrapper {
        transform: translateZ(0);
        overflow: hidden;
        display: inline-block;
        position: relative;
        color: #fff;
        font-size: 0;
        text-decoration: none;
        transition: opacity 150ms ease-in-out;

        > span {
            pointer-events: none;
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 2em;
            transition: clip-path 150ms cubic-bezier(.31, .14, .83, .45);
            shape-rendering: crispEdges;
        }

        > span:nth-child(1) {
            clip-path: polygon(50% 50%, 100% 50%, 100% 50%);
            transition-delay: 600ms;
        }

        > span:nth-child(2) {
            clip-path: polygon(50% 50%, 100% 100%, 100% 100%);
            transition-delay: 450ms;
        }

        > span:nth-child(3) {
            clip-path: polygon(50% 50%, 0 100%, 0 100%);
            transition-delay: 300ms;
        }

        > span:nth-child(4) {
            clip-path: polygon(50% 50%, 0 0, 0 0);
            transition-delay: 150ms;
        }

        > span:nth-child(5) {
            clip-path: polygon(50% 50%, 100% 0, 100% 0%);
            transition-delay: 0ms;
        }
    }

    .animation.show {
        .slot {
            opacity: 1;
            z-index: 1;
        }

        .wrapper {
            > span:nth-child(1) {
                clip-path: polygon(50% 50%, 100% 50%, 100% 100%);
                transition-delay: 0ms;
            }

            > span:nth-child(2) {
                clip-path: polygon(50% 50%, 100% 100%, 0% 100%);
                transition-delay: 150ms;
            }

            > span:nth-child(3) {

                clip-path: polygon(50% 50%, 0 100%, 0 0);
                transition-delay: 300ms;
            }

            > span:nth-child(4) {
                clip-path: polygon(50% 50%, 0 0, 100% 0);
                transition-delay: 450ms;
            }

            > span:nth-child(5) {
                clip-path: polygon(50% 50%, 100% 0%, 100% 50%);
                transition-delay: 600ms;
            }
        }
    }

</style>
