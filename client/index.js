let lis = document.getElementById("list");

function submitted(e) {
    e.preventDefault();

    let expamnt = document.getElementById("expamnt").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").value;

    let lisElement = document.createElement('li');
    lisElement.className = "list-group-item";
    let text = document.createTextNode(expamnt + " - " + description + " - " + category);
    let delBtn = document.createElement('button');
    delBtn.className = "btn btn-danger delete"
    delBtn.setAttribute('style', 'float:right')
    delBtn.appendChild(document.createTextNode('X'));

    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-warning edit'
    editBtn.setAttribute('style', 'float:right')
    editBtn.appendChild(document.createTextNode("Edit"));

    lisElement.appendChild(text);
    lisElement.appendChild(delBtn);
    lisElement.appendChild(editBtn);
    lis.appendChild(lisElement);

    // localStorage.setItem(expamnt+" - "+description+" - "+category, JSON.stringify({amount:expamnt, description:description, category:category}));
    fetch('http://localhost:3000/expense/add-expense', {
        method: "POST",
        body: JSON.stringify({
            amount: expamnt,
            description,
            category
        }),
        headers: {
            "Content-Type": 'application/json'
        }
    })
        .then(res => {
            console.log("Expense Added!");
        })
        .catch(err => {
            console.log(err);
        })

    document.getElementById("expamnt").value = '';
    document.getElementById("description").value = '';
    document.getElementById("category").value = "Fuel";

}

function addExpense(expamnt, description, category) {
    let lisElement = document.createElement('li');
    lisElement.className = "list-group-item";
    let text = document.createTextNode(expamnt + " - " + description + " - " + category);
    let delBtn = document.createElement('button');
    delBtn.className = "btn btn-danger delete"
    delBtn.setAttribute('style', 'float:right')
    delBtn.appendChild(document.createTextNode('X'));

    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-warning edit'
    editBtn.setAttribute('style', 'float:right')
    editBtn.appendChild(document.createTextNode("Edit"));

    lisElement.appendChild(text);
    lisElement.appendChild(delBtn);
    lisElement.appendChild(editBtn);
    lis.appendChild(lisElement);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/expense/get-expenses')
        .then(result => {
            return result.json();
        })
        .then(res => {
            res.forEach(item => addExpense(item.amount, item.description, item.category));
        })
        .catch(err => {
            console.log(err);
        });
});


lis.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            let li = e.target.parentElement;
            // localStorage.removeItem(li.textContent.split('X')[0])
            let text = li.textContent.split('X')[0]
            let arr = text.split(' - ');
            fetch('http://localhost:3000/expense/get-expenses')
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    const delResult = result.filter(item => item.amount === Number(arr[0]) && item.description === arr[1] && item.category === arr[2])[0];
                    fetch(`http://localhost:3000/expense/delete-expense/${delResult.id}`, {
                        method: 'DELETE'
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            document.getElementById('list').removeChild(li);
        }
    }
})


lis.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) {
        if (confirm('Are You Sure?')) {
            let li = e.target.parentElement;
            let text = li.textContent.split('X')[0]
            // localStorage.removeItem(text)
            let arr = text.split(' - ');
            fetch('http://localhost:3000/expense/get-expenses')
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    const delResult = result.filter(item => item.amount === Number(arr[0]) && item.description === arr[1] && item.category === arr[2])[0];
                    fetch(`http://localhost:3000/expense/delete-expense/${delResult.id}`, {
                        method: 'DELETE'
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            document.getElementById("expamnt").value = arr[0];
            document.getElementById("description").value = arr[1];
            document.getElementById("category").value = arr[2];
            document.getElementById('list').removeChild(li);
        }
    }
})