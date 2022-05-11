function showList(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/book",
        success: function (books){
            let content = '';
            for (let i = 0; i < books.length; i++) {
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${books[i].name}</td>
        <td>${books[i].price}</td>
        <td>${books[i].author}</td>
        <td><img src="${'http://localhost:8080/image/' + books[i].image}" width="100px"></td>
        <td>${books[i].category.name}</td>
        <td><button onclick="deleteBook(${books[i].id})">Delete</button></td>
        <td><button type="button" onclick="showEditForm(${books[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
    </tr>`
            }
            $("#list-book").html(content);
        }
    })
}
showList();

function showCate(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/book/cate",
        success: function (cate){
            let content = "";
            for (let i = 0; i < cate.length; i++) {
                content +=`<option value="${cate[i].id}">${cate[i].name}</option>`
            }
            $("#category").html(content);
            $("#u-category").html(content);
        }

    })
}

function createBook() {
    // lay du lieu
    let name = $('#name').val();
    let price = $('#price').val();
    let author = $('#author').val();
    let image = $('#image');
    let category = $('#category').val();
    let bookForm = new FormData();
    bookForm.append('name', name);
    bookForm.append('author', author);
    bookForm.append('price', price);
    bookForm.append('category', category);
    bookForm.append('image', image.prop('files')[0]);
    // goi ajax
    $.ajax({

        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        url: "http://localhost:8080/book",
        data: bookForm,
        success: function (){
            showList()
        }
    });
    event.preventDefault();
}

function deleteBook(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/book/delete/${id}`,
        success: function (){
            showList()
        }
    })
}

function updateBook(id){
    let name = $(`#u-name`).val();
    let author = $(`#u-author`).val();
    let price = $(`#u-price`).val();
    let category = $(`#u-category`).val();
    let image = $('#u-image');
    let bookForm = new FormData();
    bookForm.append('name',name);
    bookForm.append('price',price);
    bookForm.append('author',author);
    bookForm.append('category',category);
    bookForm.append('image',image.prop('files')[0]);
    if (image.prop('files')[0]=== undefined){
        let file = new File([""],"filename.jpg")
        bookForm.append('image',file);
    } else {
        bookForm.append('image',image.prop('files')[0]);
    }

    $.ajax({
        type:"POST",
        enctype: 'multipart/from-data',
        processData: false,
        contentType: false,
        data: bookForm,
        url:`http://localhost:8080/book/edit/${id}`,
        success:showList
    })
    event.preventDefault();
}


function showEditForm(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="u-name" >
                        </div>
                        <div class="mb-3">
                            <label for="author" class="form-label">Price</label>
                            <input type="text" class="form-control" id="u-price">
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Author</label>
                            <input type="text" class="form-control" id="u-author">
                        </div>
                        <tr>
                        <div>
                        <label>Category:</label>
                        <select name="u-category" id="u-category">
                        </select>
                        </div>
                        </tr>
                        <div class="mb-3">
                            <label for="image" class="form-label">Image</label>
                            <div id="showImg"></div>
                            <input type="file" class="form-control" id="u-image">
                        </div>
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="updateBook(${id})">Edit</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/book/${id}`,
        success:function (book){
            $('#u-name').val(book.name)
            $('#u-price').val(book.price)
            $('#u-author').val(book.author)
            $('#u-category').val(book.description)
            let img = `<img src="http://localhost:8080/image/${book.image}" width="100">`
            $(`#showImg`).html(img)
        }
    })
    showCate();
}
showCate();