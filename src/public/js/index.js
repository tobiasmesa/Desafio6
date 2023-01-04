const socket = io();

socket.on('sendProducts', (data) => {
    renderList(data)

  })
  
  const renderList = (productList) => {

    console.log('[renderList]: ', productList)
  
    let list = ''
  
    productList.forEach((product) => {
      list += `<li>id: ${product.id}</li>
              <ul>
                <li>title: ${product.title}</li>
                <li>description: ${product.description}</li>
                <li>code: ${product.code}</li>
                <li>price: ${product.price}</li>
                <li>status: ${product.status}</li>
                <li>stock: ${product.stock}</li>
                <li>category: ${product.category}</li>
                <li>thumbnails: ${product.thumbnails}</li>
              </ul>`
    })
  
    document.querySelector('#productsList').innerHTML = list
  
  }

socket.emit("Online")