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
        data.forEach(({ IDproduct, name, description, price, img }) => {

            // Находим элемент шаблона, который нужно скопировать
            const template = document.querySelector('.products_cards-grid_card');
             // Создаем копию элемента шаблона
             const copy = template.cloneNode(true);
             // Удаляем класс, отвечающий за скрытие элемента
             copy.classList.remove('hidden');
             // Добавляем свои данные в скопированный элемент
             copy.querySelector('.product-id').textContent = IDproduct;
             copy.querySelector('.card_img').src = img;
             copy.querySelector('.card_img').alt = img;
             copy.querySelector('.card_title').textContent = name;

     
     
   
             copy.querySelector('.card_text').textContent = description;
             copy.querySelector('.card_price').textContent = `$${price}`;
             // Вставляем скопированный элемент на страницу
             productBox.appendChild(copy)
         });
     } catch (error) {
         console.error(error);
     }
 }
    
        
          

document.addEventListener('DOMContentLoaded', fetchData);