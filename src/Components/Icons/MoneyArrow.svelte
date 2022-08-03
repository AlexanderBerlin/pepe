<script>
    export let reverse = false;
</script>

<svg class="{reverse && 'sell' }" viewBox="0 0 76 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.625 19.39H73.375" stroke="white" stroke-width="5" stroke-linecap="round"/>
    <path d="M45.375 2.89001L73.375 19.39" stroke="white" stroke-width="5" stroke-linecap="round"/>
    <path d="M73.375 35.89H2.625" stroke="white" stroke-width="5" stroke-linecap="round"/>
    <path d="M30.625 52.39L2.625 35.89" stroke="white" stroke-width="5" stroke-linecap="round"/>
</svg>

<style lang="scss">
    svg {
        width: 35px; //44px;
        height: 25px; //34px;
        transition: 0.5s all linear;
    }
    .sell {
        transform: rotate3d(1, 0, 0, 180deg);
    }
</style>