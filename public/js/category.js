getData();

async function getData() {
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
    const imageContainer = document.createElement('div');

    name.textContent = item.name.replaceAll('_', ' ');
    desc.textContent = item.desc;

    count.textContent = "(" + item.items.length + ")";

    link.href = '/category/' + item.name;

    image.src = '/images/' + item.imgName + '.png';
    image.className = 'flex-auto d-none d-md-block';

    root.className = "contentBox";
    imageContainer.className = "imgContainer";

    imageContainer.append(image);
    text.append(name, count, desc);
    link.append(root);
    root.append(text, imageContainer);
    

    document.getElementById("categoryContent").append(link);
  }
}