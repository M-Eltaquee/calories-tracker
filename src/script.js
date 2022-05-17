// storage controller 
const Storectrl = (function () {
  return {
    addItem: function (item) {
      let items;
      if (localStorage.getItem("items") === null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem("items"))
      }
      items.push(item)
      localStorage.setItem("items", JSON.stringify(items))
    },
    getItems: function () {
      let items;
      if (localStorage.getItem("items") === null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem("items"))
      }
      return items
    },
    updateItem: function (updatedItem) {
      const items = this.getItems()
      items.forEach((item, index) => {
        if (item.id === updatedItem.id) {
          items.splice(index, 1, updatedItem)
        }
      })
      localStorage.setItem("items", JSON.stringify(items))
    },
    deleteItem: function (itemToBeDelete) {
      const items = this.getItems()
      items.forEach((item, index) => {
        if (item.id === itemToBeDelete.id) {
          items.splice(index, 1)
        }
      })
      localStorage.setItem("items", JSON.stringify(items))
    },
    clearAll: function () {
      localStorage.removeItem("items")
    }
  }
})()

// Item controller 
const Itemctrl = (function () {
  class Item {
    constructor(id, name, cals) {
      this.id = id;
      this.name = name;
      this.cals = cals
    }
  }
  const itemData = {
    items: Storectrl.getItems(),
    currentItem: null,
    totalcals: 0
  }
  return {
    addData: function (nameInput, calInput) {
      let newId = itemData.items.length;
      newItem = new Item(newId, nameInput, parseInt(calInput))
      itemData.items.push(newItem)
      return newItem
    },
    updateItem: function (updatedName, updatedCals) {
      const updatedItem = itemData.items.find(item => item.id === itemData.currentItem.id)
      updatedItem.name = updatedName
      updatedItem.cals = parseInt(updatedCals)
      return updatedItem
    },
    deleteItem: function (itemToBeDelete) {
      let itemToBeDeleteIndex;
      itemData.items.find((item, index) => {
        if (item.id === itemToBeDelete.id) {
          itemToBeDeleteIndex = index;
        }
      })
      itemData.items.splice(itemToBeDeleteIndex, 1)
    },
    cleaAll: function () {
      itemData.items = []
    },
    getData: function () {
      return itemData
    },
    getTotalCals: function () {
      let totalCals = 0;
      itemData.items.forEach(item => totalCals += item.cals)
      itemData.totalcals = totalCals
      return totalCals;
    },
    setCurrentItem: function (itemToBeEdit) {
      itemData.currentItem = itemToBeEdit
    },
    getElementByID: function (id) {
      let itemToBeEdit = null;
      itemToBeEdit = itemData.items.find(item => item.id === id)
      return itemToBeEdit
    },
    clearCurrentItem: function () {
      itemData.currentItem = null;
    }
  }
})()

const UIctrl = (function () {
  const selectorList = {
    nameInput: "#item-name",
    calInput: "#item-calories",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn ",
    clearBtn: ".clear-btn",
    listItems: "#item-list",
    listItem: ".collection-item",
    calsCounter: ".total-calories",
    editBtn: ".edit-item"
  }
  return {
    ulHide: function () {
      document.querySelector(UIctrl.getSelectors().listItems).style.display = "none"
    },
    editStatHide: function () {
      document.querySelector(selectorList.addBtn).style.display = "inline"
      document.querySelector(selectorList.updateBtn).style.display = "none"
      document.querySelector(selectorList.deleteBtn).style.display = "none"
      document.querySelector(selectorList.backBtn).style.display = "none"
    },
    editStatShow: function () {
      document.querySelector(selectorList.addBtn).style.display = "none"
      document.querySelector(selectorList.updateBtn).style.display = "inline"
      document.querySelector(selectorList.deleteBtn).style.display = "inline"
      document.querySelector(selectorList.backBtn).style.display = "inline"
    },
    showItemToBeEdit: function (itemToBeEdit) {
      document.querySelector(selectorList.nameInput).value = itemToBeEdit.name;
      document.querySelector(selectorList.calInput).value = itemToBeEdit.cals;
    },
    showData: function (itemsData) {
      let html = ""
      let listItems = document.querySelector(selectorList.listItems)
      itemsData.items.forEach(item => {
        html += `
        <li class="collection-item" id="item-${item.id}"><strong>${item.name}: </strong><em>${item.cals} 
        Calories</em><a href="#"class="edit-item secondary-content"><i class="fa fa-pencil"></i></a></li>
        `
      })
      listItems.innerHTML = html
    },
    addItem: function (newItem) {
      document.querySelector(selectorList.listItems).style.display = "block"
      const listItems = document.querySelector(selectorList.listItems)
      const liElement = document.createElement("li")
      liElement.className = "collection-item"
      liElement.id = `item-${newItem.id}`;
      liElement.innerHTML = `<strong>${newItem.name}: </strong><em>${newItem.cals} Calories</em><a href="#"class="edit-item secondary-content"><i class="fa fa-pencil"></i></a>`
      listItems.insertAdjacentElement("beforeend", liElement)
    },
    updateItem: function (updatedItem) {
      document.querySelector(`#item-${updatedItem.id}`).innerHTML = `<strong>${updatedItem.name}: </strong><em>${updatedItem.cals} 
      Calories</em><a href="#"class="edit-item secondary-content"><i class="fa fa-pencil"></i></a>`
    },
    deleteItem: function (id) {
      document.querySelector(`#item-${id}`).remove()
    },
    clearAll: function () {
      const listItems = Array.from(document.querySelectorAll(selectorList.listItem))
      listItems.forEach(item => item.remove())
    },
    setTotalCals: function (totalCals) {
      const calsCounter = document.querySelector(selectorList.calsCounter)
      calsCounter.textContent = totalCals;
    },
    getSelectors: function () {
      return selectorList
    },
    getInputs() {
      return {
        nameInput: document.querySelector(selectorList.nameInput),
        calsInput: document.querySelector(selectorList.calInput)
      }
    },
    clearInputs: function () {
      document.querySelector(selectorList.nameInput).value = "";
      document.querySelector(selectorList.calInput).value = "";
    },
    prventEnterKey: function () {
      // prevent Enter function 
      document.addEventListener("keypress", function (e) {
        if (e.keyCode === 13 || e.which === 13 || e.key === "Enter") {
          e.preventDefault()
          return false
        }
      })
    }
  }
})()

// App controller 
const Appctrl = (function (Storectrl, Itemctrl, UIctrl) {
  // load event lisners 
  const eventLisner = function () {
    const inputs = UIctrl.getInputs()
    const selectors = UIctrl.getSelectors()
    // Add item listner
    document.querySelector(selectors.addBtn).addEventListener("click", addItem)
    function addItem(e) {
      if (inputs.nameInput.value !== "" && inputs.calsInput.value) {
        const newItem = Itemctrl.addData(inputs.nameInput.value, inputs.calsInput.value)
        Storectrl.addItem(newItem)
        UIctrl.addItem(newItem)
        const totalCals = Itemctrl.getTotalCals()
        UIctrl.setTotalCals(totalCals)
        UIctrl.clearInputs()
      } else {
        console.log("Noo")
      }
      e.preventDefault()
    }
    // Edit Item listner---------------------------
    document.querySelector(selectors.listItems).addEventListener("click", editItem)
    function editItem(e) {
      if (e.target.parentElement.classList.contains("edit-item")) {
        UIctrl.editStatShow()
        const id = parseInt(e.target.parentElement.parentElement.id.split("-")[1])
        const itemToBeEdit = Itemctrl.getElementByID(id)
        Itemctrl.setCurrentItem(itemToBeEdit)
        UIctrl.showItemToBeEdit(Itemctrl.getData().currentItem)
        UIctrl.prventEnterKey()
      }
      e.preventDefault()
    }
    // update Item Listner
    document.querySelector(selectors.updateBtn).addEventListener("click",
      updateItem)
    function updateItem(e) {
      const updateItem = Itemctrl.updateItem(inputs.nameInput.value, inputs.calsInput.value)
      UIctrl.updateItem(updateItem)
      Storectrl.updateItem(updateItem)
      const totalCals = Itemctrl.getTotalCals()
      UIctrl.setTotalCals(totalCals)
      UIctrl.clearInputs()
      UIctrl.editStatHide()
      Itemctrl.clearCurrentItem()
      e.preventDefault()
    }
    // back listner
    document.querySelector(selectors.backBtn).addEventListener("click", back)
    function back(e) {
      UIctrl.clearInputs()
      UIctrl.editStatHide()
      Itemctrl.clearCurrentItem()
      e.preventDefault()
    }
    // Delete listner
    document.querySelector(selectors.deleteBtn).addEventListener("click", deleteItem)
    function deleteItem(e) {
      const id = Itemctrl.getData().currentItem.id
      const itemToBeDelete = Itemctrl.getElementByID(id)
      Itemctrl.deleteItem(itemToBeDelete)
      Storectrl.deleteItem(itemToBeDelete)
      Itemctrl.clearCurrentItem()
      const totalCals = Itemctrl.getTotalCals()
      UIctrl.setTotalCals(totalCals)
      UIctrl.deleteItem(id)
      UIctrl.clearInputs()
      UIctrl.editStatHide()
      UIctrl.ulHide()
      e.preventDefault()
    }
    // Clear all 
    document.querySelector(selectors.clearBtn).addEventListener("click",
      clearAll)
    function clearAll(e) {
      Itemctrl.cleaAll()
      Storectrl.clearAll()
      const totalCals = Itemctrl.getTotalCals()
      UIctrl.setTotalCals(totalCals)
      UIctrl.clearAll()
      UIctrl.ulHide()
      e.preventDefault()
    }
  }
  return {
    init: function () {
      UIctrl.editStatHide()
      const itemsData = Itemctrl.getData()
      if (itemsData.items.length === 0) {
        UIctrl.ulHide()
      } else {
        UIctrl.showData(itemsData)
      }
      const totalCals = Itemctrl.getTotalCals()
      UIctrl.setTotalCals(totalCals)
      eventLisner()
    }
  }
})(Storectrl, Itemctrl, UIctrl)

Appctrl.init()
