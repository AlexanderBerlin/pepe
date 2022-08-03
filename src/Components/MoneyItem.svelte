<script>
    import { onMount, onDestroy } from 'svelte';
    import Config from '../config';

    export let type = 'buy';
    export let selected = false;
    export let lateWaveAnimation = false;
    export let currentOperationTypeIsSelected = false;

    //деструктиризируем константы конфигурации из импортированного гонфига
    const { coin: {
        framesSpeedMs,
        framesWaveSpeedMs,
        unselectedLastFrame,
        unselectedFirstWaveFrame,
        selectedLastFrame,
        animationFirstDelayMs,
        animationIntervalDelayMs
    }} = Config;

    //текущий кадр
    let currentFrame = 0;

    //переменные для объектов timeout и setInterval;
    let intervalCurrent = null;
    let intervalWave = null;
    let timeoutWave = null;

    /**
     * Анимации к нужному кадру
     * @param toFrame
     * @param reverse
     * @param speed
     * @param callBack
     */
    function moveToFrame( { toFrame = 0, reverse = false, speed = framesSpeedMs, callBack = null } ) {

        if ( intervalCurrent ) clearInterval( intervalCurrent );

        intervalCurrent = setInterval( () => {
            if ( !reverse ) {
                currentFrame++;
            } else {
                currentFrame--;
            }

            if ( currentFrame > selectedLastFrame ) currentFrame = 0;
            if ( currentFrame === toFrame ) {
                clearInterval( intervalCurrent );
                if ( typeof callBack === 'function' ) callBack();
            }
        }, speed );
    }

    /**
     * Останавливаем все анимации
     */
    function stopAllAnimation() {
        if ( intervalCurrent ) clearInterval( intervalCurrent );
        if ( intervalWave ) clearInterval( intervalWave );
        if ( timeoutWave ) clearTimeout( timeoutWave );
    }

    /**
     * Разовая анимация качения монеты
     * @param speed
     */
    function setWaveAnimation( { speed = framesSpeedMs } ) {
        moveToFrame( {
            toFrame: unselectedFirstWaveFrame,
            speed: speed,
            reverse: true,
            callBack: () => {
                moveToFrame( {
                    speed: speed,
                    toFrame: unselectedLastFrame,
                } )
            }
        } );
    }

    //если изменилось состояния выбранной операции, останавливаем все анимации
    $: if ( currentOperationTypeIsSelected ) {
        stopAllAnimation();
    }

    //Если изменилась импортировання переменная select, то запускаем соответствующую анимацию
    $: if ( selected ) {
        stopAllAnimation();
        moveToFrame( { toFrame: 0 } );
    } else {
        stopAllAnimation();
        moveToFrame( { toFrame: unselectedLastFrame } );
    }

    //после монторования поворачиваем монетки в состояние "не выбрано", если не выбрана
    onMount( () => {
        if ( !selected ) {
            moveToFrame( {
                toFrame: unselectedLastFrame,
                callBack: () => {
                    //задержка до старта анимации качения
                    timeoutWave = setTimeout( () => {
                        setWaveAnimation( { speed: framesWaveSpeedMs } );

                        intervalWave = setInterval( () => {
                            setWaveAnimation( { speed: framesWaveSpeedMs } );
                        }, animationIntervalDelayMs );

                    }, animationFirstDelayMs + (lateWaveAnimation ? 2000 : 0));
                }
            } );
        }
    } )

    //при размонтировании компонента уничтожаем все интервалы и timeout-ы
    onDestroy( () =>{
        stopAllAnimation();
    })

</script>

<div class="moneyBg" on:click>
    <i class="icon icon_{type} icon_{currentFrame}"></i>
</div>

<style lang="scss">

    .moneyBg {
        border-radius: 100%;
        width: 136px;
        height: 136px;
        background: #067454;
        border: 2px solid #12BF8D;
        box-shadow: -10px -10px 15px #13C290, 10px 10px 15px #058761, inset -20px -20px 40px #12956E, inset 30px 30px 40px rgba(0, 0, 0, 0.25);
    }

    .icon {
        margin: -23px 0 0 -23px;
        display: block;
        width: 312px;
        height: 312px;
        zoom: 0.5;
        cursor: pointer;

        &_buy {
            background-image: url('/img/sprite_buy.webp')
        }

        &_sell {
            background-image: url('/img/sprite_sell.webp')
        }
    }


    .icon_0 {
        background-position: -312px 0px;
    }

    .icon_1 {
        background-position: -1872px -1560px;
    }

    .icon_2 {
        background-position: 0px -312px;
    }

    .icon_3 {
        background-position: -312px -312px;
    }

    .icon_4 {
        background-position: -624px 0px;
    }

    .icon_5 {
        background-position: -624px -312px;
    }

    .icon_6 {
        background-position: 0px -624px;
    }

    .icon_7 {
        background-position: -312px -624px;
    }

    .icon_8 {
        background-position: -624px -624px;
    }

    .icon_9 {
        background-position: -936px 0px;
    }

    .icon_10 {
        background-position: -936px -312px;
    }

    .icon_11 {
        background-position: -936px -624px;
    }

    .icon_12 {
        background-position: 0px -936px;
    }

    .icon_13 {
        background-position: -312px -936px;
    }

    .icon_14 {
        background-position: -624px -936px;
    }

    .icon_15 {
        background-position: -936px -936px;
    }

    .icon_16 {
        background-position: -1248px 0px;
    }

    .icon_17 {
        background-position: -1248px -312px;
    }

    .icon_18 {
        background-position: -1248px -624px;
    }

    .icon_19 {
        background-position: -1248px -936px;
    }

    .icon_20 {
        background-position: 0px -1248px;
    }

    .icon_21 {
        background-position: -312px -1248px;
    }

    .icon_22 {
        background-position: -624px -1248px;
    }

    .icon_23 {
        background-position: -936px -1248px;
    }

    .icon_24 {
        background-position: -1248px -1248px;
    }

    .icon_25 {
        background-position: -1560px 0px;
    }

    .icon_26 {
        background-position: -1560px -312px;
    }

    .icon_27 {
        background-position: -1560px -624px;
    }

    .icon_28 {
        background-position: -1560px -936px;
    }

    .icon_29 {
        background-position: -1560px -1248px;
    }

    .icon_30 {
        background-position: 0px -1560px;
    }

    .icon_31 {
        background-position: -312px -1560px;
    }

    .icon_32 {
        background-position: -624px -1560px;
    }

    .icon_33 {
        background-position: -936px -1560px;
    }

    .icon_34 {
        background-position: -1248px -1560px;
    }

    .icon_35 {
        background-position: -1560px -1560px;
    }

    .icon_36 {
        background-position: -1872px 0px;
    }

    .icon_37 {
        background-position: -1872px -312px;
    }

    .icon_38 {
        background-position: -1872px -624px;
    }

    .icon_39 {
        background-position: -1872px -936px;
    }

    .icon_40 {
        background-position: -1872px -1248px;
    }

    .icon_41 {
        background-position: 0 0;
    }

    .icon_42 {
        background-position: 0px -1872px;
    }

    .icon_43 {
        background-position: -312px -1872px;
    }

    .icon_44 {
        background-position: -624px -1872px;
    }

    .icon_45 {
        background-position: -936px -1872px;
    }

    .icon_46 {
        background-position: -1248px -1872px;
    }

    .icon_47 {
        background-position: -1560px -1872px;
    }

    .icon_48 {
        background-position: -1872px -1872px;
    }

    .icon_49 {
        background-position: -2184px 0px;
    }

    .icon_50 {
        background-position: -2184px -312px;
    }

    .icon_51 {
        background-position: -2184px -624px;
    }

    .icon_52 {
        background-position: -2184px -936px;
    }

    .icon_53 {
        background-position: -2184px -1248px;
    }

    .icon_54 {
        background-position: -2184px -1560px;
    }

    .icon_55 {
        background-position: -2184px -1872px;
    }

    .icon_56 {
        background-position: 0px -2184px;
    }

    .icon_57 {
        background-position: -312px -2184px;
    }

    .icon_58 {
        background-position: -624px -2184px;
    }

    .icon_59 {
        background-position: -936px -2184px;
    }

    .icon_60 {
        background-position: -1248px -2184px;
    }

    .icon_61 {
        background-position: -1560px -2184px;
    }

    .icon_62 {
        background-position: -1872px -2184px;
    }

    .icon_63 {
        background-position: -2184px -2184px;
    }

    .icon_64 {
        background-position: -2496px 0px;
    }

    .icon_65 {
        background-position: -2496px -312px;
    }

    .icon_66 {
        background-position: -2496px -624px;
    }

    .icon_67 {
        background-position: -2496px -936px;
    }

    .icon_68 {
        background-position: -2496px -1248px;
    }

    .icon_69 {
        background-position: -2496px -1560px;
    }

    .icon_70 {
        background-position: -2496px -1872px;
    }

    .icon_71 {
        background-position: -2496px -2184px;
    }

    .icon_72 {
        background-position: 0px -2496px;
    }

    .icon_73 {
        background-position: -312px -2496px;
    }

    .icon_74 {
        background-position: -624px -2496px;
    }

    .icon_75 {
        background-position: -936px -2496px;
    }

    .icon_76 {
        background-position: -1248px -2496px;
    }

    .icon_77 {
        background-position: -1560px -2496px;
    }

    .icon_78 {
        background-position: -1872px -2496px;
    }

    .icon_79 {
        background-position: -2184px -2496px;
    }

    .icon_80 {
        background-position: -2496px -2496px;
    }

    .icon_81 {
        background-position: -2808px 0px;
    }
</style>