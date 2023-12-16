let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    data.forEach(toy => {
      const toyDiv = document.createElement('div')
      toyDiv.classList.add('card')
      
      const toyName = document.createElement('h2')
      toyName.textContent = toy.name
      toyDiv.appendChild(toyName)

      const toyImage = document.createElement('img')
      toyImage.src = toy.image
      toyImage.alt = toy.name
      toyImage.classList.add('toy-avatar')
      toyDiv.appendChild(toyImage)

      const toyLikes = document.createElement('p')
      toyLikes.textContent = `Likes: ${toy.likes}`
      toyDiv.appendChild(toyLikes)

      const likeButton = document.createElement('button')
      likeButton.classList.add('like-btn')
      likeButton.id = toy.id
      likeButton.textContent = 'Like'
      toyDiv.appendChild(likeButton)

      likeButton.addEventListener('click', () => {
        const toyId = likeButton.id
        const currentLikes = toy.likes
        const newLikes = currentLikes + 1

        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ likes: newLikes })
        })
          .then(response => response.json())
          .then(updatedToy => {
            toyLikes.textContent = `Likes: ${updatedToy.likes}`
          })
      })
      
      document.querySelector('#toy-collection').appendChild(toyDiv)
  })
})

function addNewToy(name, image) {
  const toyData = {
    name: name,
    image: image,
    likes: 0
  }

fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify(toyData)
})
  .then(response => response.json())
  .then(data => {
    const toyDiv = document.createElement('div')
    toyDiv.classList.add('card')
        
    const toyName = document.createElement('h2')
    toyName.textContent = data.name
    toyDiv.appendChild(toyName)
  
    const toyImage = document.createElement('img')
    toyImage.src = data.image
    toyImage.alt = data.name
    toyImage.classList.add('toy-avatar')
    toyDiv.appendChild(toyImage)
  
    const toyLikes = document.createElement('p')
    toyLikes.textContent = `Likes: ${data.likes}`
    toyDiv.appendChild(toyLikes)
  
    const likeButton = document.createElement('button')
    likeButton.classList.add('like-btn')
    likeButton.id = data.id
    likeButton.textContent = 'Like'
    toyDiv.appendChild(likeButton)
        
    document.querySelector('#toy-collection').appendChild(toyDiv)
    })
    
    const createToyButton = document.querySelector('.submit')

    createToyButton.addEventListener('click', handleCreateToy)
    
    function handleCreateToy(event) {
    event.preventDefault()
    
    const toyNameInput = document.querySelector('#toy-name')
    const toyImageInput = document.querySelector('#toy-image')

    const toyName = toyNameInput.value
    const toyImage = toyImageInput.value

    addNewToy(toyName, toyImage)

    toyNameInput.value = ''
    toyImageInput.value = ''
    }
}
})
