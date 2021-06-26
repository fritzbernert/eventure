getItemData(4);

async function getItemData(count) {

    const response = await fetch('/api/item');
    const data = await response.json();
  
    var randoms = [];
  
    for (let i = 0; i < count; i++) {
      var rand = Math.floor(Math.random() * data.length);
      if(!randoms.includes(rand)){
        randoms.push(rand);
  
        const root = document.createElement('div');
  
        const text = document.createElement('div');
        const name = document.createElement('span');
        const desc = document.createElement('p');
  
        const pageLink = document.createElement('a');
        const image = document.createElement('img');
        const imageContainer = document.createElement('div');
  
        name.textContent = data[rand].name.replaceAll('_', ' ');
        desc.textContent = data[rand].desc;
  
        pageLink.href = '/item/' + data[rand].name;
  
        image.src = '/images/' + data[rand].imgName + '.png';
        image.className = 'flex-auto d-none d-md-block';
  
        root.className = "contentBox";
        imageContainer.className = "imgContainer";
  
        imageContainer.append(image);
        text.append(name, desc);
        pageLink.append(root);
        root.append(text, imageContainer);
        
        document.getElementById("recommendedContent").append(pageLink);
      }else{
        i--;
      }
    }
  
  }