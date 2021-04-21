import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    // получаем данные со страницы из окна выбора данных
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowsWidth = document.querySelectorAll('#width'),
        windowsHeight = document.querySelectorAll('#height'),
        windowsType = document.querySelectorAll('#view_type'),
        windowsProfile = document.querySelectorAll('.checkbox');
// валидируем ввод пользователя в цифры
    checkNumInputs('#width');
    checkNumInputs('#height');

// функция принимает определенный элемент(elem),обработчик события(event),свойство ,которое будет записано в объект(prop)
    function bindActionToElems(event, elem, prop) {
        //перебирает каждый элемент массива(item) и определяет индекс(i) элемента на котором произошло событие
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case'SPAN':
                        state[prop] = i;
                        break;
                    case'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            })
                        } else {
                            state[prop] = item.value;
                        }
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
            })
        })
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowsHeight, 'height');
    bindActionToElems('input', windowsWidth, 'width');
    bindActionToElems('change', windowsType, 'type');
    bindActionToElems('change', windowsProfile, 'profile');
};
export default changeModalState;