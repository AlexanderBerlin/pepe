<script>
    import { createEventDispatcher } from "svelte";
    import Config from "../config";

    export let id;
    export let icon;
    export let name;
    export let amount;
    export let currency;
    export let animationDelay = 0;
    export let isSelected = false;

    let animationDelayToRender = animationDelay;

    /**
     * Функция клика на объект
     */
    function handlerClickItem() {
        dispatch( 'clicked', { id: id } );
        animationDelayToRender = 0;
    }

    const dispatch = createEventDispatcher();

    $: amountToRender = amount && parseInt( amount ).toString().replace( /(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + Config.amountText.separator ) || 0;

</script>

<div class={isSelected ? 'selected' : ''} style="--animationDelay: {animationDelayToRender}ms"
     on:click={() => handlerClickItem()}>
    <i></i>
    <span>{amountToRender}</span>
    <span>{currency}</span>
    <img src={icon} alt={name}/>
</div>

<style lang="scss">
    div {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 30px;
        cursor: pointer;
        opacity: 0;
        animation: opacityAnimation 1.3s normal forwards;
        animation-delay: var(--animationDelay);
        position: relative;

        & > * {
            z-index: 1;
            &:not(:first-child) {
                margin-top: 3px;
            }
        }

        &,
        i,
        &:before,
        &:after {
            width: 125px;
            height: 125px;
            display: flex;
            border-radius: 100%;
        }
        i,
        &:before,
        &:after {
            position: absolute;
            content: "";
        }

        &:after {
            opacity: 0;
            border: 2px solid #fff;
            //filter: drop-shadow(-7px -7px 20px #0EBF8C) drop-shadow(12px 12px 25px #088D66);
            //filter: drop-shadow(-5px -5px 15px #16BE8D) drop-shadow(8px 8px 15px #008E65);
            box-shadow: -10px -10px 15px #13C290, 10px 10px 15px #058761, inset -20px -20px 40px #12956E, inset 30px 30px 40px rgba(0, 0, 0, 0.25);
            transition: opacity 300ms ease-in-out;
        }

        &:before {
            background: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='white' stroke-width='2' stroke-dasharray='6' stroke-dashoffset='80' stroke-linecap='butt'/%3e%3c/svg%3e");
            animation: rotateAnimation 1.3s normal forwards;
            animation-delay: var(--animationDelay);
        }

        &.selected {
            &:before {
                display: none;
            }
            cursor: default;
            &:after {
                opacity: 1;
            }
        }
        i {
            background: #00A575;
            position: absolute;
            top: 2px;
            left: 2px;
            width: 121px;
            height: 121px;
            border-radius: 100%;
        }
    }

    span {
        color: #fff;
        font-size: 18px;
    }

    img {
        max-height: 52px;
    }

    @keyframes rotateAnimation {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(-90deg);
        }
    }

    @keyframes opacityAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

</style>
