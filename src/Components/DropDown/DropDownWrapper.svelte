<script>
    import DropDown from "./DropDown.svelte";
    import DropDownTokenList from "./DropDownTokenList.svelte";

    export let width = 200;
    export let minHeight = 103;
    export let openedHeight = 254;
    export let dataList = [];
    export let placeholderText = "DROP DOWN";
    export let selectedId = void (0);

    //выбран ли элемент в списке
    $: isSelected = typeof selectedId === 'number';
</script>

<DropDown width={width}
          minHeight={minHeight}
          openedHeight={openedHeight}
          isSelected={isSelected}>

    <div slot="dropdownContent" let:open>
        <DropDownTokenList dataList={dataList}
                           placeholderText={placeholderText}
                           open={open}
                           selectedId={selectedId}
                           isSelected={isSelected}
                           on:clicked />
    </div>

</DropDown>