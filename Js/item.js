const database = firebase.firestore()
function createItem(description,price,qty){
    database.collection('Items').add({
        description:description,
        price:price,
        qty:qty
    })
        .then(result=>{
            console.log(result)
        })
        .catch(error=>{
            console.log(error);
        })

}
const saveItems=()=>{
    let descriptionData = document.getElementById('description');
    let priceData = document.getElementById('qty');
    let qtyData = document.getElementById('uty');

    let description = descriptionData.value;
    let price = priceData.value;
    let qty = qtyData.value;


    createItem(description,price,qty)


}