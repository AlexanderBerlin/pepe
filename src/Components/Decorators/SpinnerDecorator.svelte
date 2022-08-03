<script>
    import { onMount } from 'svelte';

    export let loaded = false;

    let show = false;
    let showContent = loaded;

    $: if ( loaded ) {
        setTimeout(() => {
            showContent = true;
        }, 300 );
    }

    onMount( () => {
        if ( !loaded ) {
            setTimeout( () => {
                show = true;
            }, 700);
        }
    } );
</script>

{#if showContent}
    <slot/>
{:else}
    <div class={show ? 'show' : ''}>
        <img src="/icons/white_logo_anim.png" alt="Loading">
    </div>
{/if}

<style lang="scss">
    div {
        text-align: center;
        padding: 20px;
        color: #fff;
        font-size: 20px;
        transition: opacity 0.3s ease-in-out;
        opacity: 0;

        &.show {
            opacity: 1;
        }
        img {
            max-height: 125px;
        }
    }
</style>