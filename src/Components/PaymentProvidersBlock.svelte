<script>
    import { onMount } from "svelte";
    import { getProvidersList } from '../Server/api';
    import SpinnerDecorator from "./Decorators/SpinnerDecorator.svelte";
    import { providersStore, tokenAmountStore } from "../Stores/store";
    import PaymentProviderItem from "./PaymentProviderItem.svelte";

    //ручка выбора Token
    function handleClickProvider( event ) {
        providersStore.setSelectedProvider( event.detail.id );
    }

    onMount( () => {
        //если в хранилище нет списка провайдеров запрашиваем их с сервера
        if ( !$providersStore.providers.length ) {
            getProvidersList().then( providersStore.setProviders );
        }
    } );
</script>

<div class="wrapper">
    <SpinnerDecorator loaded={$providersStore.providers.length}>
        <div class="slider">
            {#each $providersStore.providers as { id, icon, name, factor, currency }, i (id)}
                    <PaymentProviderItem id={id}
                                         icon={icon}
                                         name={name}
                                         currency={currency}
                                         amount={factor * $tokenAmountStore}
                                         animationDelay={i * 150}
                                         isSelected={$providersStore.selectedProvider === id}
                                         on:clicked={handleClickProvider}
                    />
            {/each}
        </div>
    </SpinnerDecorator>
</div>

<style lang="scss">
    .wrapper {
        margin: 50px 0;
    }
    .slider {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .helpText {
        margin-top: 40px;
    }
</style>
