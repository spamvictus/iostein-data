//alert("works");
let itemsData = [];
let iosteinItemsPriceData = [];
let customIconNameData = [];

const pwd='VollGerne';

document.querySelector("#password").addEventListener("keyup", e => {
  if(e.key !== "Enter") return;
  e.preventDefault();
  setCookie('pwd', e.currentTarget.value);
  document.getElementById('login-form').style.display = 'none';
  loadData();
});

async function loadData() {
  if(!auth()){
    showLoginForm();
    return;
  }

  itemsData = await (await fetch("./items.json")).json();

  iosteinItemsPriceData = await (await fetch("./iostein-pricelist.json")).json();

  customIconNameData = await (await fetch("./custom-icon-names.json")).json();

  displayData();
}

function auth(){
  return getCookieVal('pwd')===pwd;
}

function showLoginForm(){
  document.getElementById('login-form').style.display = 'flex';
}

async function displayData() {
  document.getElementById("table-data").innerHTML = '';

  const processedData = sortBy(
    filterSearch(
      itemsData.map((item) => ({ ...item, price: getPrice(item) }))
    ),'price', false
  )
  processedData.forEach((e,i) => addRow(e,i));
  
  document.getElementById("result-amount-info").innerText = `Found Results: ${processedData.length}`;
}

function getPrice({ name: name1 }) {
  return iosteinItemsPriceData.find(({ name: name2 }) => name1 === name2)
  ?.price;
}

function addRow({ id, name, displayName, price }, nr) {
  const table = document.getElementById("table-data");

  const row = table.insertRow(nr);

  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  const cell6 = row.insertCell(5);

  const coinImg = '<img height="16" width="16" src="./coin.png">';

  cell1.innerHTML = nr+1;
  cell2.innerHTML = `<center><img height="32px" width="32px" src="./item-icons/${
    displayName
  }.png"></center>`;
  cell3.innerHTML = id;
  cell4.innerHTML = name;
  cell5.innerHTML = displayName;
  cell6.innerHTML = `${price ? price+coinImg : '-'}`;
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

const filterUnknown = data => data.filter(({price}) => price === undefined);

const filterFn = searchTerm => ({id, name, displayName, price}) => {
    const searchFn = (
      a => b => b!=undefined && `${b}`.toLowerCase().includes(a)
    )(searchTerm);//expects b to be lowercase already
    return (searchFn(id) || searchFn(name) || searchFn(displayName) || searchFn(price));
}

function filterSearch(data){
  const search = document.getElementById('search').value.toLowerCase();
  if(search.length===0)return data;

  const myFilterFn = filterFn(search);
  return data.filter(myFilterFn);
}