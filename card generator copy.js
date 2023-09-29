async function fetchData() {
    try {
        const response = await fetch("./card data.json");
        console.log(response);
        if (!response.ok) {
            throw new Error("Не удалось получить данные с data JSON");
        }
        const data = await response.json();
        console.log(data);
        const productBox = document.querySelector(".products_cards-grid");

        //получаем шаблон из HTML
        const cardTemplate = document.querySelector('#card_template');
        console.log(cardTemplate.querySelector('.card_title'));

        // создаём копию элемента из шаблона
        const newCard = cardTemplate.cloneNode(true);
        console.log(newCard.querySelector('.card_title'));


        data.forEach(({ name, description, price, img }) => {

        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', fetchData);