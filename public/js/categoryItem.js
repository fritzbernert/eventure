var id = document.getElementById("name").innerHTML;
var counter = 0;
var data;

const getData = async () => {
  try {
    const response = await fetch('/api/categoryItems/' + id);
    data = await response.json();
    itemData();
  } catch (err) {
    console.log(err);
  }

}
getData();

function itemData(){
  for (id of data) {
    getItemData(id);
  }
}

async function getItemData(itemId){
  if(!itemId){
    return;
  }
  const response = await fetch('/api/item/' + itemId);
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('div');

    const text = document.createElement('div');
    const name = document.createElement('h3');
    const desc = document.createElement('p');

    const pageLink = document.createElement('a');
    const image = document.createElement('img');

    item.name = item.name.replace('_', ' ');
    name.textContent = item.name;
    desc.textContent = item.desc;

    pageLink.href = '/item/' + item.name;

    image.src = '/images/' + item.imgName + '.png';

    root.className = "contentBox";

    text.append(name, desc);
    pageLink.append(root);
    root.append(text, image);
    
    document.getElementById("content").append(pageLink);

    counter++;
  }
  document.getElementById("counter").innerHTML = counter;
}