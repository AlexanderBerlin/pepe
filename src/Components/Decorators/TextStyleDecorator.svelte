<span>
    <slot />
</span>
<style lang="scss">
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 485px;
        height: 101px;
        //max-width:500px;
        //height:102px;
        color: #fff;
        font-size: 23px;
        font-weight: 100;

        & :global(b) {
            font-weight: 500;
            padding: 0 8px;
        }
    }
</style>