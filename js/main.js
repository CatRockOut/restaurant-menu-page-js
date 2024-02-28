import { infoJsonMenu } from "./json-info.js";

function initTabSwitching() {
    const foodList = document.querySelector('.food-list');
    const tabLinks = document.querySelectorAll('.tab');
    const parseMenu = JSON.parse(infoJsonMenu);

    const htmlTemplate = (item) => {
        return `
            <li class="food-item">
                <img src="${item.image}">
                <div class="food-item__description">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span>Price: ${item.price}</span>
                </div>
            </li>
        `;
    };

    tabLinks.forEach((tabLink) => {
        // Adding-removing the active class for LI > A to change the color of the active tab:
        tabLink.addEventListener('click', () => {
            tabLinks.forEach((link) => {
                link.classList.remove('active-tab');
            });
            tabLink.classList.add('active-tab');

            // Content manipulation:
            let foodItemsHtml = '';

            parseMenu.forEach((item) => {
                const selectedType = tabLink.dataset.type;

                // Adding all items by clicking on the 'ALL' TAB:
                if (selectedType === 'All') {
                    foodItemsHtml += htmlTemplate(item);
                }

                // Adding items by clicking on a specific TAB:
                if (item.type === selectedType) {
                    foodItemsHtml += htmlTemplate(item);
                }
            });

            foodList.innerHTML = foodItemsHtml;
        });
    });

    // Initialization of ALL items when loading DOMContentLoaded:
    const allItemsHtml = parseMenu.map(htmlTemplate).join('');
    foodList.innerHTML = allItemsHtml;
};

document.addEventListener('DOMContentLoaded', initTabSwitching);
