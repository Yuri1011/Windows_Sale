import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    //получаем элементы
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');
//проверка ввода телефона на цифры
    checkNumInputs('input[name="user_phone"]');
//объект с сообщениями,которые будут показываться пользователю
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    }
    // функция отвечающая за отправку POST запроса
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }
    // очищаем инпуты после отправки формы
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
    }

//перебираем все формы
    form.forEach(item => {
        //навешиваем обработчик события submit
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            //создаем блок с сообщениями для пользователя
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
//собираем все данные из формы
            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
// отправляем запрос на сервер
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                })
        })
    })
}

export default forms;