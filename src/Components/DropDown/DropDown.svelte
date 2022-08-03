<script>
    import { onMount, onDestroy, tick } from 'svelte';
    import AnimatedDecorator from "../Decorators/AnimatedDecorator.svelte";
    import ArrowDown from "./../Icons/ArrowDown.svelte";

    // export let placeholderText = '';
    export let openedHeight = 200;
    export let width = 300;
    export let minHeight = 0;
    export let marginTopAndDownPx = 2;
    export let isSelected = false;

    let wrapperNode = null;
    let childrenDecorator = null;

    let showArrowScrollToTop = false;
    let showArrowScrollToBottom = false;

    //высота блока для разницы скрола
    let deltaHeightDropDownAndContent = 0;

    //открыкт ли dropdown
    let open = false;

    //текущая высота блока
    let height = 0;

    function openDropDown() {
        open = true;
        height = openedHeight;
    }
    function closeDropDown() {
        open = false;
        height = minHeight;
    }

    //рассчитывсаем высоту блоков (с коррекцией и выставляем стрелку для скрола)
    async function checkDownArrow() {
        await tick();
        deltaHeightDropDownAndContent = childrenDecorator.offsetHeight - openedHeight;

        if ( openedHeight - (marginTopAndDownPx * 2 + 10 * 2 + 2) < childrenDecorator.offsetHeight ) {
            showArrowScrollToBottom = true;
        }
    }

    $: if ( open ) {
        checkDownArrow();
    }

    function handlerScroll( event ) {

        const scrollTop = event.target.scrollTop;
        const bottomDelta = childrenDecorator.offsetHeight - openedHeight - scrollTop;

        showArrowScrollToTop = scrollTop > 5;
        showArrowScrollToBottom = bottomDelta > 0;
    }

    function checkOutsideClicked( event ) {
        if ( !wrapperNode.contains( event.target ) ) {
            closeDropDown();
        }
    }

    function handlerOpenClick() {
        if ( !open ) {
            openDropDown();
            document.addEventListener( 'click', checkOutsideClicked, true );
        } else {
            closeDropDown();
        }
    }

    onMount( () => {
        if ( !minHeight ) minHeight = wrapperNode.offsetHeight;
        height = minHeight;
    } );

    onDestroy( () => {
        document.removeEventListener( 'click', checkOutsideClicked, true );
    } );

</script>

<AnimatedDecorator clickable={ !open }
                   stroke={ open || isSelected ? 2 : 1 }
                   on:click={ handlerOpenClick }>

    <div class="wrapper {open ? 'open' : ''} {isSelected ?'selected' : ''}"
         style="height:{height || minHeight}px; width:{width}px"
         bind:this={wrapperNode}>

        <div class="upArrowIcon {showArrowScrollToTop ? 'showArrowScrollToTop' : ''} ">
            <ArrowDown/>
        </div>

        <div class="list"
             on:scroll={handlerScroll}
             style="--borderRadius: {minHeight / 2}px;
                    --marginTopDownPx: {marginTopAndDownPx}px;
                    height: {height - marginTopAndDownPx * 2 || minHeight - marginTopAndDownPx * 2}px;">
                <div bind:this={childrenDecorator}>
                    <slot name="dropdownContent" open={open} />
                </div>
        </div>

        <div class="downArrowIcon {showArrowScrollToBottom ? 'showArrowScrollToBottom' : ''} ">
            <ArrowDown/>
        </div>
    </div>

</AnimatedDecorator>

<style lang="scss">
    .wrapper {
        padding: 30px;
        position: relative;
        color: #fff;
        font-weight: 100;
        transition: height 0.3s ease-in-out;
        align-items: center;
        display: flex;
        justify-content: center;
        &.selected {
            background-color: rgba(255, 255, 255, 0.3);
        }
    }

    .upArrowIcon,
    .downArrowIcon {
        left: 50%;
        position: absolute;
    }

    .upArrowIcon {
        transition: opacity 0.15s ease-in-out;
        opacity: 0;
        top: 5px;
        transform: translateX(-50%) rotate(180deg);
    }

    .downArrowIcon {
        transition: opacity 0.15s ease-in-out;
        opacity: 1;
        bottom: 5px;
        transform: translateX(-50%);
    }

    .list {
        //opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        margin: var(--marginTopDownPx) auto;
        border-radius: var(--borderRadius);
        transition: opacity 0.3s ease-in-out;
    }

    .open {
        &.wrapper {
            animation: openAnimation 0.3s normal forwards;
        }

        .upArrowIcon {
            &.showArrowScrollToTop {
                opacity: 1;
            }
        }

        .downArrowIcon:not(.showArrowScrollToBottom) {
            opacity: 0;
        }

        .list {
            opacity: 1;
        }
    }

    @keyframes openAnimation {
        0% {
            //background-color: rgba(255, 255, 255, 0);
            background-color: rgb(0,164,116);
        }
        50% {
            background-color: rgb(4, 168, 120);
        }
        100% {
            //background-color: rgba(255, 255, 255, 0.3);
            background-color: rgb(107,192,159);
        }
    }
</style>