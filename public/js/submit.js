var image64;
const submitItem = document.getElementById('submitItem');
const submitCategory = document.getElementById('submitCategory');


submitItem.addEventListener('click', async event => {

    const name = document.getElementById('itemName').value;
    const imgName = document.getElementById('itemImgName').value;
    const desc = document.getElementById('itemDescription').value;
    const link = document.getElementById('itemLink').value;

    const data = { name, imgName, desc, link};

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api/item', options);
    const json = await response.json();
    console.log(json);
});

submitItem.addEventListener('click', async event => {
  const name = document.getElementById('itemName').value;

  var category = document.getElementById('itemCategory').value;
  category = category.split(',');
  console.log(category);

  
  for(item of category){
    console.log(item);
    const data = {item, name};

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api/category/addItem', options);
    const json = await response.json(); 
    //console.log(json);     
  }
});


submitCategory.addEventListener('click', async event => {

    const name = document.getElementById('cateName').value;
    const imgName = document.getElementById('cateImgName').value;
    const desc = document.getElementById('cateDescription').value;
    var items = document.getElementById('cateItems').value;

    items = items.replace(/\s/g, '');
    items = items.split(',');
    items = [...new Set(items)];

    const data = { name, imgName, desc, items };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api/category', options);
    const json = await response.json();
    console.log(json);
});
