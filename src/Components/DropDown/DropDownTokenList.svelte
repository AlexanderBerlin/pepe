<script>
    import { createEventDispatcher } from "svelte";
    import { slide } from 'svelte/transition';

    export let placeholderText = '';
    export let open = false;
    export let selectedId = null;
    export let isSelected = false;
    export let dataList = [];
    let show = false;

    let isSelectedItem;
    const dispatch = createEventDispatcher()

    $:if ( open ) {
        setTimeout( () => {
            show = true;
        }, 0 );
    }

    $: isSelectedItem = typeof selectedId === 'number';

    $: if ( !isSelectedItem && !open ) {
        show = false;
    }

</script>
<div class="dropDownList {open ? 'open' : ''} {isSelectedItem && 'isSelected'}">
    <div class="placeHolder">
        {placeholderText}
    </div>
    {#if open || isSelectedItem}
        <ul class="{show ? 'show' : isSelected ? 'selected' : ''}">
            {#each dataList as { id, icon, name }, i (id)}
                <li transition:slide|local style="--delay: {i/9}s"
                    class="{ isSelectedItem && selectedId === id ? 'selected' : ''}"
                    on:click={ () => dispatch( 'clicked', { id: id } ) }>
                    <span>
                        <img src={icon} alt={name}/>
                    </span>
                    {name}
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    .dropDownList:not(.open) {
        position: relative;
        pointer-events: none;
    }

    .placeHolder {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-self: center;
        align-items: center;
        justify-content: center;
        font-size: 23px;
        font-weight: 100;
        font-family: 'Roboto', sans-serif;
        //transition: opacity 0.15s ease-in-out;
        opacity: 1;
        height: 99px;
    }

    .open .placeHolder,
    .isSelected .placeHolder {
        opacity: 0;
        height: 0;
    }

    span {
        display: flex;
        justify-content: center;
        width: 56px;
        height: 56px;
        margin-right: 29px;

        img {
            height: 56px;
        }
    }

    ul {
        margin: 10px 0 10px;

        li {
            display: flex;
            align-items: center;
            opacity: 0;
            font-size: 23px;
            font-weight: 100;
            color: #fff;
            padding: 10px 0 10px 22px;
            transition: all 0.3s ease-in;
            transition-delay: var(--delay);
            cursor: pointer;
        }

        &.show {
            li {
                opacity: 1;
            }
        }
    }

    .isSelected:not(.open) {
        li {
            transition: all 0s ease-in;
        }
        li:not(.selected) {
            overflow: hidden;
            height: 0;
            padding: 0 0 0 22px;

            span {
                height: 0;
            }
        }

        li.selected {
            opacity: 1;
        }
    }
</style>