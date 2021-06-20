getData();

async function getData() {
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
    

    document.getElementById("content").append(link);
  }
}