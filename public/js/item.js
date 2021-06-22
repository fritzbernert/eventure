getData();
var counter = 0;

async function getData() {

  const response = await fetch('/api/item');
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
    //image.width = 200;

    root.className = "contentBox";

    text.append(name, desc);
    pageLink.append(root);
    root.append(text, image);
    
    document.getElementById("content").append(pageLink);

    counter++; 
  }
  document.getElementById("counter").innerHTML = counter;
}