// Search button function 
document.getElementById('input-button').addEventListener('click', () => {
    const inputValue = document.getElementById('input-value');
    const searchText = inputValue.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data))
    inputValue.value = ''
})

// function for display searching book list
const displayResult = booksResult =>{
    const resultMsg = document.getElementById('result-msg');
    // condition for showing search result 
    if(booksResult.docs.length > 0){
        resultMsg.innerText = `Showing Result is : ${booksResult.docs.length} From Total Number of books ${booksResult.numFound}`
        resultMsg.style.display = 'block'
    }else{
        resultMsg.innerText = `Showing Result is: ${booksResult.docs.length}, Somthing went wrong`
        resultMsg.style.display = 'block'
    }
    const books = booksResult.docs
    const displayDiv = document.getElementById('books')
    displayDiv.textContent = ''
    // add data with html and show book result in display
    books.forEach(book => {
        const div = document.createElement('div')
        let icon = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        let imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeCYVUx9KPTQ_8PD8ArtBKSEl2i29L0PXcqg&usqp=CAU'
        div.innerHTML = `
        <div class="col p-4">
            <div class="card">
                <div class="row gy-4 gx-4 align-items-center shadow rounded-2">
                    <div class="col-md-4">
                        <img src="${book.cover_i? icon: imgUrl}" class="img-thumbnail rounded-start" alt="..." style ="width:150px; height:250px">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">By ${book.author_name? book.author_name[0]: 'Unknown'}</p>
                            <p class="card-text">Published By : <small class="text-muted">${book.publisher? book.publisher[0]: 'Unknown'}</small></p>
                            <p class="card-text"><small class="text-muted">First Published in ${book.first_publish_year? book.first_publish_year: 'Unknown'}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        displayDiv.appendChild(div)
    })
}
