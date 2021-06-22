getCategoryData();
getItemData();

async function getCategoryData() {
  const response = await fetch('/api/category');
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('div');
    const link = document.createElement('a');

    const text = document.createElement('div');
    const name = document.createElement('h3');
    const desc = document.createElement('p');
    
    const image = document.createElement('img');

    name.textContent = item.name.replace('_', ' ');
    desc.textContent = item.desc;

    link.href = '/category/' + item.name;

    image.src = '/images/' + item.imgName + '.png';
    image.width = 200;

    root.className = "contentBox";

    text.append(name, desc);
    link.append(root);
    root.append(text, image);
    

    document.getElementById("categoryContent").append(link);
  }
}



async function getItemData() {

  const response = await fetch('/api/item');
  const data = await response.json();

  var randoms = [];

  for (let i = 0; i < 4; i++) {
    var rand = Math.floor(Math.random() * data.length);
    if(randoms.includes(rand)){
      i--;
    }
    randoms.push(rand);

    const root = document.createElement('div');

    const text = document.createElement('div');
    const name = document.createElement('h3');
    const desc = document.createElement('p');

    const pageLink = document.createElement('a');
    const image = document.createElement('img');

    data[rand].name = data[rand].name.replace('_', ' ');
    name.textContent = data[rand].name;
    desc.textContent = data[rand].desc;

    pageLink.href = '/item/' + data[rand].name;

    image.src = '/images/' + data[rand].imgName + '.png';

    root.className = "contentBox";

    text.append(name, desc);
    pageLink.append(root);
    root.append(text, image);
    
    document.getElementById("recommendedContent").append(pageLink);

  }

}