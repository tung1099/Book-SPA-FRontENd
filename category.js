function showListCate(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/category",
        success: function (cate){
            let content = '';
            for (let i = 0; i < cate.length; i++) {
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${cate[i].name}</td>
        <td>${cate[i].description}</td>      
        <td><button onclick="deleteCate(${cate[i].id})">Delete</button></td>
        <td><button type="button" onclick="showEditFormCate(${cate[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
    </tr>`
            }
            $("#list-category").html(content);
        }
    })
}
showListCate();

function createCate() {
    // lay du lieu
    let name = $('#name').val();
    let description = $('#description').val();
    let newCate = {
        name: name,
        description: description,
    }
    // goi ajax
    $.ajax({

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCate),
        //tên API
        url: "http://localhost:8080/category",
        //xử lý khi thành công
        success: function (){
            showListCate()
        }
    });
    event.preventDefault();
}

function deleteCate(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/category/delete/${id}`,
        success: function (){
            showListCate()
        }
    })
}

function editCate(){
    // lay du lieu
    let name = $('#name1').val();
    let description = $('#description').val();
    let newCate = {
        name: name,
        description: description,
    }
    // goi ajax
    $.ajax({

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newCate),
        //tên API
        url: "http://localhost:8080/category/edit/{id}",
        //xử lý khi thành công
        success: function (){
            showListCate()
        }
    });
    event.preventDefault();
}

function showEditFormCate(){
    let content = `<div class="container mt-3">
                    <form>
                        <div class="mb-3">
                            <label for="name1" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name1" >
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <input type="text" class="form-control" id="description" >
                        </div>
                       
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="editCate(${id})">Edit</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/category/edit/${id}`,
        success:function (cate){
            $('#name1').val(cate.name)
            $('#description').val(cate.description)
        }
    })
}