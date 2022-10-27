const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();
        if(elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if(elem.createTextRange) { // ручной полифил для старых браузеров
            let range = elem.createTextRange();

            range.collapse(true); //старый метод выделения и установки курсора
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+375 (__) ___ __ __',//можно вруную, можно через джейсон
            i = 0,
            def = matrix.replace(/\D/g, ''), //статичное
            val = this.value.replace(/\D/g, ''); //через контекст события = динамичное

        if(def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if(event.type === 'blur') {
            if(this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;