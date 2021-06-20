var id = document.getElementById("name").innerHTML;

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
  const response = await fetch('/api/item/' + itemId);
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('div');
    const name = document.createElement('h3');
    const desc = document.createElement('p');
    const pageLink = document.createElement('a');
    const image = document.createElement('img');

    item.name = item.name.replace('_', ' ');
    name.textContent = item.name;
    desc.textContent = item.desc;

    pageLink.href = '/item/' + item.name;

    image.src = '/images/' + item.imgName + '.png';
    image.width = 200;

    pageLink.append(root);
    root.append(name, desc, image);
    
    document.body.append(pageLink);
  }
}