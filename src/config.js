const config = {
    //Монетки
    coin: {
        framesSpeedMs: 1000 / 40, // скорость анимации монет, 40 кадров в секунду
        framesWaveSpeedMs: 1000 / 30, //скорость анммации качения монет, 30 кадров в секунду
        unselectedLastFrame: 41, //последний кадр НЕ выбранной монеты
        unselectedFirstWaveFrame: 26, //первый кадрд НЕ выбронной монеты для "качения"
        selectedLastFrame: 81, //последний кадр выбранной монеты
        animationFirstDelayMs: 2000, //задержка начала качения монеты
        animationIntervalDelayMs: 4000, //интервал начала качения монеты
    },
    //блок отображения текста sell/buy
    sellAndBuyText: {
        lettersPerSecond: 10 //анимация число символов в секунду
    },
    //Поле ввода суммы
    amountText: {
        focusDelay: 1000, //задержка установки фокуса на поле ввода в ms
        maxLength: 7, //максимальная длинна ввода суммы знаков включая разделители (например 555 555, будет 7 символов)
        separator: ' ', //разделитель между цифрами
        underlinePaddingPx: 22, //отступы линии подчеркивания от суммы ввода в px (суммарно с двух сторон)
        underlineAnimationSpeedMs: 400 //скорость анимации линии подчеркивания в ms
    },
    //эффект печатной машинки текста (печать/удаление)
    textTyper: {
        lettersPerSecond: 200 //анимация число символов в секунду
    }
}
export default config
