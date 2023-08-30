let selectedCustomer =null;
let selectedItem = null;
let cart = [];

const database = firebase.firestore();

const loadItemData=()=>{
    selectedItem = null;
    console.log("loadItemData() works");
    const itemDataComponent = document.getElementById('description');
    let description = itemDataComponent.value;
    database.collection('Items')
        .where('description','==',description)
        .get()
        .then(response=>{
            response.forEach((dataOption)=>{
                console.log('Data Option:', dataOption.data);
                if (dataOption.data()){
                    selectedItem = dataOption.data();
                    console.log(dataOption.data())
                    document.getElementById('description').value=dataOption.data().description;
                    document.getElementById('qtyI').value=dataOption.data().qty;
                    document.getElementById('pty').value=dataOption.data().price;
                } else {
                console.log('No matching document found.');
             }
            });
        }).catch(error=>{
        console.log(error)

    });
}
const loadCustomerData=()=>{
    const customerDataItem = document.getElementById('nic');
    let nic = customerDataItem.value;
    database.collection('customer')
        .where('nic','==',nic)
        .get()
        .then(response=>{
            response.forEach((dataOption)=>{
                if (dataOption.data()){
                    selectedCustomer=dataOption.data()
                    document.getElementById('nic').value=dataOption.data().nic;
                    document.getElementById('name').value=dataOption.data().name;
                    document.getElementById('address').value=dataOption.data().address;
                }
            });
        }).catch(error=>{

    });
}
const customerDataItem = document.getElementById('nic');
customerDataItem.addEventListener('keypress',(event)=>{
    if (event.key == 'Enter'){
        // event.preventDefault();
        loadCustomerData();
    }
});

const itemDataComponent = document.getElementById('description');
itemDataComponent.addEventListener('keypress',(event)=>{
    if (event.key == 'Enter'){
        console.log('Enter key pressed in description field');
        // event.preventDefault();
        loadItemData();
    }
});

addToCart=()=>{
    let qty = parseInt(document.getElementById('Myqty').value);
    let unitPrice = parseInt(document.getElementById('pty').value);
    let total = qty * unitPrice;

    cart.push({
        item:selectedItem,
        qty:qty,
        total:total
    });

    let tBody = $('#tBody');
    tBody.empty();
    let rowData = '';
    cart.forEach(function(data){
        rowData+=`<tr> <td>${data.item.description}</td><td>${data.qty}</td><td>${data.item.price}</td><td>${data.total}</td> </tr>`

        tBody.html(rowData);
    });
}

placeOrder=()=>{

    if(!selectedCustomer && !items){
        alert('empty, try again');
        return;
    }

    let data ={
        items:[],
        customer:null,
        date:new Date().toISOString().split('T')[0],
        total:0
    }

    cart.forEach(e=>{
       data.items.push(e);
       data.total+=e.total;
    });


    data.customer=selectedCustomer;
    database.collection('orders').add(data)
            .then(result=>{
                console.log(result);
            })
            .catch(error=>{
                console.log(error);
            })

}
