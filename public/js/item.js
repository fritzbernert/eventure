getData();
var counter = 0;
var listView = false;

async function getData() {

  const response = await fetch('/api/item');
  const data = await response.json();

  counter = 0;
  document.getElementById("itemContent").innerHTML = '';
  

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
      
      document.getElementById("itemContent").append(pageLink);
    }else{
      const root = document.createElement('div');

      const name = document.createElement('span');
      const pageLink = document.createElement('a');

      name.textContent = item.name.replaceAll('_', ' ');

      pageLink.href = '/item/' + item.name;

      root.className = "listItem";

      root.append(name);
      pageLink.append(root);
      
      document.getElementById("itemContent").append(pageLink);
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

  getData();
}