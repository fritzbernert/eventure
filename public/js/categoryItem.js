var id = document.getElementById("name").innerHTML;
var counter = 0;
var listView = false;
var data;

const getData = async () => {
  try {
    const response = await fetch('/api/categoryItems/' + id.replaceAll(' ','_'));
    data = await response.json();
    itemData();
  } catch (err) {
    console.log(err);
  }

}
getData();

function itemData(){
  document.getElementById("content").innerHTML = '';
  counter = 0;
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
    if(!listView){
      const root = document.createElement('div');

      const text = document.createElement('div');
      const name = document.createElement('span');
      const desc = document.createElement('p');

      const pageLink = document.createElement('a');
      const image = document.createElement('img');

      name.textContent = item.name.replaceAll('_', ' ');
      desc.textContent = item.desc;

      pageLink.href = '/item/' + item.name;

      image.src = '/images/' + item.imgName + '.png';
      image.className = 'flex-auto d-none d-md-block';

      root.className = "contentBox";

      text.append(name, desc);
      pageLink.append(root);
      root.append(text, image);
      
      document.getElementById("content").append(pageLink);
    }else{
      const root = document.createElement('div');
      const name = document.createElement('span');
      const pageLink = document.createElement('a');

      name.textContent = item.name.replaceAll('_', ' ');

      pageLink.href = '/item/' + item.name;

      root.className = "listItem";

      pageLink.append(root);
      root.append(name);
      
      document.getElementById("content").append(pageLink);
    }

    counter++;
  }
  document.getElementById("counter").innerHTML = counter;
}

function changeView(){
  var button = document.getElementById("viewChange");
  if(listView){
    listView = false;
    button.innerHTML = "&#xE8EF;";
  }else{
    listView = true;
    button.innerHTML = "&#xE9B0";
  }

  itemData();
}