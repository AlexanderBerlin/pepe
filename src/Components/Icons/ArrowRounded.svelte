<script>
    import { onMount } from "svelte";
    export let sellMode;

    const sellClass= 'sell';
    const buyClass= 'buy';

    let mode = '';

    $: if ( mode !== '') {
        mode = sellMode ? sellClass : buyClass;
    }

    onMount( () => {
        mode = sellMode ? sellClass : buyClass;
    } )
</script>
<div>
    <svg class={mode}
         width="29" height="29" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<!--        <circle cx="29" cy="29.5574" r="28.9998" fill="white"/>-->
        <path d="M28.9137 13.6785C30.2761 13.6785 31.3806 14.7829 31.3806 16.1454L31.3806 38.1278L37.489 33.5633C38.5804 32.7478 40.1263 32.9714 40.9418 34.0628C41.7574 35.1542 41.5337 36.7001 40.4423 37.5156L30.8524 44.6817C30.3655 45.2131 29.6867 45.4881 29.0029 45.4796C28.317 45.4897 27.6355 45.2145 27.1471 44.6813L17.5577 37.5156C16.4663 36.7 16.2427 35.1541 17.0582 34.0627C17.8738 32.9713 19.4197 32.7477 20.511 33.5633L26.4467 37.9987L26.4467 16.1454C26.4467 14.7829 27.5512 13.6785 28.9137 13.6785Z"
              fill="#00A575"/>
    </svg>
</div>

<style lang="scss">
    div {
        width: 29px;
        height: 29px;
        border-radius: 100%;
        background-color: #fff;
        opacity: 0;
        animation: 0.3s ease-out 0s 1 show forwards;
    }

    svg {
        transform: rotate(-90deg);
        transition: all 0.5s ease-in-out;
        &.sell {
            transform: rotate(0deg);
        }
        &.buy {
            transform: rotate(-180deg);
        }
    }

    @keyframes show {
        to {
            opacity: 1;
        }
    }
</style>
