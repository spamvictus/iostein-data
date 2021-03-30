//alert("works");
let itemsData = [];
let iosteinItemsPriceData = [];
let customIconNameData = [];
async function loadData() {
  itemsData = await (await fetch("./items.json")).json();

  iosteinItemsPriceData = await (
    await fetch("./iostein-pricelist.json")
  ).json();

  customIconNameData = await (await fetch("./custom-icon-names.json")).json();

  displayData();
}

async function displayData() {
  itemsData.forEach((item) => {
    addRow({ ...item, price: getPrice(item.name) });
  });
}

function getPrice({ name1 }) {
  return iosteinItemsPriceData.find(({ name: name2 }) => name1 === name2)
    ?.price;
}

function addRow({ id, name, displayName, price }) {
  const table = document.getElementById("table-data");

  const row = table.insertRow(0);

  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);

  cell1.innerHTML = `<img height="32px" width="32px" src="./item-icons/${getIconName(
    name
  )}.png">`;
  cell2.innerHTML = id;
  cell3.innerHTML = name;
  cell4.innerHTML = displayName;
  cell5.innerHTML = price;
}

function getIconName(name1, tmp) {
  return (tmp = customIconNameData.find(
    ({ itemName: name2 }) => name1 === name2
  )?.iconName)
    ? tmp
    : name1;
}
