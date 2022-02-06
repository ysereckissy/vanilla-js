/// Storage Controller
const StorageController = (function(){
    return {
        _getItems: () => {
            const items = (localStorage.getItem('items') && JSON.parse(localStorage.getItem('items'))) || [];
            return items;
        },
        _setItems:  (items) => {
            localStorage.setItem('items', JSON.stringify(items));
        },
        persistItem: item => {
            const items = StorageController._getItems();
            items.push(item);
            StorageController._setItems(items);
        },
        fetchItems: () => StorageController._getItems(),
        persistItems: items => StorageController._setItems(items),
    }
})();
/// Item Controller
const ItemController = ((storageCtrl) => {
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    }

    return {
        initialize: () => {
            data.items = storageCtrl.fetchItems();
        },
        getItems: () => data.items,
        addItem: (name, calories) => {
            let ID;
            if(data.items.length) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            calories = parseInt(calories)
            const newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem;
        },
        getTotalCalories: () => {
            data.totalCalories = data.items.reduce((previous, current) => previous + current.calories, 0);
            return data.totalCalories;
        },
        getItemById: (id) => {
            return data.items.find(item => item.id === id);
        },
        setCurrentItem: item => {
            data.currentItem = item;
        },
        getCurrentItem: () => data.currentItem,
        updateItemList: (name, calories) => {
            calories = parseInt(calories);
            data.items = data.items.map(item => {
                if(item.id === data.currentItem.id) {
                    return Object.assign(item, {name, calories});
                } else {
                    return item;
                }
            });
            storageCtrl.persistItems(data.items);
        },
        deleteCurrentItem: () => {
            data.items = data.items.filter(item => item.id !== data.currentItem.id);
            storageCtrl.persistItems(data.items);
        },
        deleteAll: () => {
            data.items = []
            storageCtrl.persistItems(data.items);
        },
        logData: () => data
    }
})(StorageController);
/// UI Controller
const UIController = (() => {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCalories: '#item-calories',
        totalCalories: '.total-calories',
    }
    return {
        populateItemList: items => {
            let html = '';
            items.forEach(item => {
                html += `<li id="item-${item.id}" class="collection-item">
                            <strong>${item.name}:</strong> <em>${item.calories}</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i> 
                            </a>
                        </li>`
            });
            /// Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: () => UISelectors,
        getItemInput: () => ({
            name: document.querySelector(UISelectors.itemNameInput),
            calories: document.querySelector(UISelectors.itemCalories)
        }),
        addListItem: item => {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `
                            <strong>${item.name}:</strong> <em>${item.calories}</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i> 
                            </a>
            `;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCalories).value = '';
        },
        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        updateTotalCalories: (totalCalories) => {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories.toString();
        },
        clearEditState: () => {
            UIController.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: () => {
            UIController.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        addItemToForm: () => {
            UIController.showEditState();
            const item = ItemController.getCurrentItem();
            document.querySelector(UISelectors.itemNameInput).value = item.name;
            document.querySelector(UISelectors.itemCalories).value = item.calories;
        },
        clearItemList: () => {
            document.querySelector(UISelectors.itemList).innerHTML = ``;
        },
        rehydrateItemList: () => {
            UIController.clearItemList();
            UIController.populateItemList(ItemController.getItems());
            UIController.updateTotalCalories(ItemController.getTotalCalories());
            UIController.clearInput();
            UIController.clearEditState();
        }
    }
})();
/// App Controller
const AppController = ((itemCtrl, storageCtr, uiCtrl) => {
    const loadEventListeners = function () {
        const selectors = uiCtrl.getSelectors();
        document.querySelector(selectors.addBtn).addEventListener('click', (e) => {
            const input = uiCtrl.getItemInput();
            if(input.name.value.trim() && input.calories.value.trim()) {
                const newItem = itemCtrl.addItem(input.name.value.trim(), input.calories.value.trim());
                uiCtrl.addListItem(newItem);
                const totalCalories = itemCtrl.getTotalCalories();
                uiCtrl.updateTotalCalories(totalCalories);
                storageCtr.persistItem(newItem);
                uiCtrl.clearInput();
            }
            e.preventDefault();
        });
        document.addEventListener('keypress', e => {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        })
        document.querySelector(selectors.itemList).addEventListener('click', e => {
            if(e.target.classList.contains('edit-item')) {
                const itemId = e.target.parentNode.parentNode.id.split('-');
                const id = parseInt(itemId[1]);
                const itemToEdit = ItemController.getItemById(id);
                itemCtrl.setCurrentItem(itemToEdit);
                uiCtrl.addItemToForm();
            }
            e.preventDefault();
        });
        /// Update Event Listener
        document.querySelector(selectors.updateBtn).addEventListener('click', e => {
            const input = UIController.getItemInput();
            ItemController.updateItemList(input.name.value, input.calories.value);
            uiCtrl.rehydrateItemList();
            e.preventDefault();
        })
        /// Delete Event listener
        document.querySelector(selectors.deleteBtn).addEventListener('click', e => {
            ItemController.deleteCurrentItem();
            uiCtrl.rehydrateItemList();
            e.preventDefault();
        })
        /// Back Event Listener
        document.querySelector(selectors.backBtn).addEventListener('click', e => {
            uiCtrl.clearInput();
            uiCtrl.clearEditState();
            e.preventDefault();
        });

        /// Clear All Event Listener
        document.querySelector(selectors.clearBtn).addEventListener('click', e => {
            itemCtrl.deleteAll();
            uiCtrl.rehydrateItemList();
            e.preventDefault();
        })
    }
    return {
        init: () => {
            uiCtrl.clearEditState();
            itemCtrl.initialize();
            uiCtrl.rehydrateItemList();
            const items = itemCtrl.getItems();
            if(!items.length) {
                uiCtrl.hideList();
            }
            loadEventListeners();
        }
    }
})(ItemController, StorageController, UIController);

/// Initialize the application
AppController.init();