getCategoryData();
//getItemData();

async function getCategoryData() {
  const response = await fetch('/api/category');
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('div');
    const link = document.createElement('a');

    const text = document.createElement('div');
    const name = document.createElement('span');
    const count = document.createElement('p');
    const desc = document.createElement('p');
    
    const image = document.createElement('img');

    name.textContent = item.name.replace('_', ' ');
    desc.textContent = item.desc;

    count.textContent = "(" + item.items.length + ")";

    link.href = '/category/' + item.name;

    image.src = '/images/' + item.imgName + '.png';
    image.className = 'flex-auto d-none d-md-block';

    root.className = "contentBox";

    text.append(name, count, desc);
    link.append(root);
    root.append(text, image);
    

    document.getElementById("categoryContent").append(link);
  }
}


/*
async function getItemData() {

  const response = await fetch('/api/item');
  const data = await response.json();

  var randoms = [];

  for (let i = 0; i < 4; i++) {
    var rand = Math.floor(Math.random() * data.length);
    if(!randoms.includes(rand)){
      randoms.push(rand);

      const root = document.createElement('div');

      const text = document.createElement('div');
      const name = document.createElement('span');
      const desc = document.createElement('p');

      const pageLink = document.createElement('a');
      const image = document.createElement('img');

      name.textContent = data[rand].name.replaceAll('_', ' ');
      desc.textContent = data[rand].desc;

      pageLink.href = '/item/' + data[rand].name;

      image.src = '/images/' + data[rand].imgName + '.png';
      image.className = 'flex-auto d-none d-md-block';

      root.className = "contentBox";

      text.append(name, desc);
      pageLink.append(root);
      root.append(text, image);
      
      document.getElementById("recommendedContent").append(pageLink);
    }else{
      i--;
    }
  }

}*/