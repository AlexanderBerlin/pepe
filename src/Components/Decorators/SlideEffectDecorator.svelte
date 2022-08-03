<script>
    import { onMount } from 'svelte';

    export let showDelayMs = 0; //ms задержка начала анимации
    export let animationSpeed = 800; //ms скорость анимации по умолчанию
    export let width = 0;

    //показываем ли содерджимое компонента сразу
    let show = !showDelayMs;

    //после монтирования DOM провяем, нужна ли задержка и включаем ее для отобоажения (если нужно)
    onMount( () => {
        if ( showDelayMs ) {
            setTimeout( () => {
                show = true;
            }, showDelayMs );
        }
    } );
</script>

{#if show}
    <div style="--animationSpeed: {animationSpeed}ms;{width ? 'width:'+ width :''}">
        <slot/>
    </div>
{/if}

<style lang="scss">
    div {
        transform: translateY(-10px);
        animation: var(--animationSpeed) ease-out topToDownSlide forwards;
    }

    @keyframes topToDownSlide {
        0% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>