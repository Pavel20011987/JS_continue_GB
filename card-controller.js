async function fetchData() {
    try {
        const response = await fetch("./card data.json");
        // console.log(response);
        if (!response.ok) {
            throw new Error("Не удалось получить данные с data JSON");
        }
        const data = await response.json();
        // console.log(data);
        const cartBox = document.querySelector(".cart-items__box");

        // так как врятли у нас товаров будет слишком много, обойдёмся словарём для хранения состояния корзины без массивов
        const cartStat = {};

        // события удаления карточек
        function addCloseCartClickEvent(button) {
            button.addEventListener('click', function () {
                const cartCard = this.closest('.cart-card');
                if (cartCard) {
                    // Получаем id удаляемой карточки
                    const deleteId = cartCard.querySelector('.product-id').textContent;

                    // Удаляем соответствующий ключ из словаря cartStat
                    delete cartStat[deleteId];
                    cartIcoUpdate();
                    cartCard.remove();
                }
            });
        }
         // обновление счётчика корзины
         const cartCounterParent = document.querySelector('.cart-counter');
         const cartCounter = cartCounterParent.querySelector('.cart-counter__number');
         function cartIcoUpdate() {
             const sum = Object.values(cartStat).reduce((total, currValue) => total + currValue, 0);
 
             cartCounter.textContent = sum;
 
             // Добавить или удалить класс hidden в зависимости от значения суммы
             if (sum === 0) {
                 cartCounterParent.classList.add('hidden');
                } else {

                    cartCounterParent.classList.remove('hidden');
    
                }
    
            }
    
            cartIcoUpdate();
    
    
    
    
            // вешаем событие на карточки
    
            document.querySelector('.products_cards-grid').addEventListener('click', function (event) {
    
                // отфильтровываем события на нужный элемент
    
                // дополнение: нужен не просто элемент с классом а все возможные его потомки, по этому проверяем является ли элемент потомком класса либо им самим
    
                if (event.target.closest('.card_hover_add_to_cart')) {
    
                    // ищем родителя данной карточки, затем в нём ищем id
    
                    let productId = event.target.closest('.products_cards-grid_card').querySelector('.product-id').textContent;
    
                    console.log(productId);
    
    
    
    
                    // сначала ищем товар в базе
    
                    // достаём нужные данные
    
                    const foundObject = data.find(function (object) {
    
                        return object.IDproduct === productId;
    
                    });
    
    
    
    
                    if (foundObject) {
    
                        // раскладываем данные по переменным
    
                        let { IDproduct, name, price, img, color, size } = foundObject;
    
                        // добавим счётчик который пока что для новой карточки равен 0
    
                        let quantityCount = 0;
    
    
    
    
                        // проверяем наличе карточки
    
                        if (!(productId in cartStat)) {
    
                            // если нет, создаём карточку
    
    
    
    
                            // Находим элемент шаблона, который нужно скопировать
    
                            const template = document.querySelector('.cart-card');
    
                            // Создаем копию элемента шаблона
    
                            const copy = template.cloneNode(true);
    
                            // Удаляем класс, отвечающий за скрытие элемента
    
                            copy.classList.remove('hidden');
    
    
    
    
                            // Добавляем свои данные в скопированный элемент
    
                            copy.querySelector('.product-id').textContent = IDproduct;
    
                            copy.querySelector('.product-photo').src = img;
    
                            copy.querySelector('.product-photo').alt = img;
    
                            copy.querySelector('.product_name').textContent = name;
    
                            copy.querySelector('.price-assigned').textContent = `$${price}`;
    
                            copy.querySelector('.color').textContent = color;
    
                            copy.querySelector('.size').textContent = size;
    
                            copy.querySelector('.quantity-field').value = 1;
    
    
    
    
                            // вешаем событие на крестик
    
                            addCloseCartClickEvent(copy.querySelector('.close-cart'));
    
    
    
    
                            // создаём запись в наших "рабочих" данных
    
                            cartStat[productId] = 1;
    
                            cartIcoUpdate()
    
                            // Вставляем скопированный элемент на страницу
    
                            cartBox.appendChild(copy)
    
    
    
    
                        } else {
    
                            // ищем карточку которой нужно добавить счётчик
    
    
    
    
                            // Находим все элементы с классом ".cart-card"
    
                            const cartCards = document.querySelectorAll('.cart-card');
    
    
    
    
                            // Итерируемся по всем найденным элементам
    
                            for (let i = 0; i < cartCards.length; i++) {
    
                                // Получаем значение атрибута "product-id" текущего элемента
    
                                const inCartProductId = cartCards[i].querySelector('.product-id').textContent;
    
    
    
    
                                // Проверяем, совпадает ли значение атрибута с требуемым номером
    
                                if (inCartProductId == productId) {
    
                                    // Если совпадает, сохраняем этот элемент в переменной
    
                                    selectedCard = cartCards[i];
    
                                    // добавляем в стат количество
    
                                    cartStat[productId] += 1;
    
                                    // присваиваем новое значение в поле
    
                                    selectedCard.querySelector('.quantity-field').value = cartStat[productId];
    
                                    cartIcoUpdate()
    
    
    
    
                                    break; // прерываем цикл, так как нужная карточка уже найдена
    
                                }
    
                            }
    
                        }
    
    
    
    
    
    
    
                    } else {
    
                        console.log("Объект не найден");
    
                    }
    
                }
    
            });
    
    
    
    
            // обработка изменения заказа пользователем
    
            // вешаем событие "change" на весь бокс
    
            document.querySelector('.cart-items__box').addEventListener('change', function (event) {
    
                const target = event.target;
    
                // проверяем объект события
    
                if (target.classList.contains('quantity-field')) {
    
                    // записываем карточку в которой произошло событие
    
                    const parentDiv = target.closest('.cart-card');
    
                    // считываем id товара
    
                    const productId = parentDiv.querySelector('.product-id').textContent;
    
                    // перехватываем ввод пользователя
    
                    const quantity = Number(target.value);
    
                    // переписываем заказ
    
                    cartStat[productId] = quantity;
    
                    console.log(cartStat);
    
                    cartIcoUpdate()
    
                }
    
            });
    
    
    
    
        } catch (error) {
    
            console.error(error);
    
        }
    
    }
    
    
    
    
    document.addEventListener('DOMContentLoaded', fetchData);