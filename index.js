//alert("works");
let itemsData = [];
let iosteinItemsPriceData = [];
let customIconNameData = [];
async function loadData() {
  itemsData = await (await fetch("./items.json")).json();

  iosteinItemsPriceData = await (await fetch("./iostein-pricelist.json")).json();

  customIconNameData = await (await fetch("./custom-icon-names.json")).json();

  displayData();
}

async function displayData() {
  console.log('asd');
  document.getElementById("table-data").innerHTML = '';

  sortBy(filterSearch(itemsData.map((item) => ({ ...item, price: getPrice(item) }))), 'price', true)
  .forEach((item) => addRow(item));
}

function getPrice({ name: name1 }) {
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

  const coinImg = '<img height="16" width="16" src="./coin.png">';

  cell1.innerHTML = `<center><img height="32px" width="32px" src="./item-icons/${
    displayName
  }.png"></center>`;
  cell2.innerHTML = id;
  cell3.innerHTML = name;
  cell4.innerHTML = displayName;
  cell5.innerHTML = `${price ? price+coinImg : '-'}`;
}

function getIconName(name1, tmp) {
  return (tmp = customIconNameData.find(
    ({ itemName: name2 }) => name1 === name2
  )?.iconName)
    ? tmp
    : name1;
}

function sortBy(data, keyName, desc=false){
  const m = desc?1:-1;
  return data.sort((a,b) => 
    a[keyName]>b[keyName] || b[keyName]===undefined ? 1*m : (
      a[keyName]<b[keyName] || a[keyName]===undefined ? -1*m : 0
    )
  );
}

function filterSearch(data){
  const search = document.getElementById('search').value;
  if(search.length===0)return data;
  return data.filter(({name, displayName, price}) => 
      name.includes(search) || 
      displayName.includes(search) || 
      (price && `${price}`.includes(search))
  );
}