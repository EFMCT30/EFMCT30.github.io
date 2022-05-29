const addToShoppingCartButtons= document.querySelectorAll('.agregar-carrito');
var opcion;
var totalMostrar=0;

addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addCartClicked);
});

const comprar = document.querySelector('.comprarButton');
comprar.addEventListener('click', comprarButtonClick);

const shoppingCartItemsContainer =document.querySelector('.shoppingCartItemsContainer');

function addCartClicked(event){
    const button = event.target;
    const item= button.closest('.card');

    const itemTitle=item.querySelector('.titulo').textContent;
    const itemPrice=item.querySelector('.precio').textContent;
    const itemImage=item.querySelector('img').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);

}



function addItemToShoppingCart(itemTitle, itemPrice, itemImage){

    const elementtitulo=shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');

    for(let i=0; i<elementtitulo.length;i++){
        if(elementtitulo[i].innerText === itemTitle){
           let ModicandoCanti= elementtitulo[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
           ModicandoCanti.value++;
           actualizarprecitotal();
           return;
        }
    }

    const shoppingCartRow =document.createElement('div')
    const shoppingCartContent= `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML=shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow); 

    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', borrarItem);

    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('click', ModicandoCanti);

    actualizarprecitotal();


    alert('Producto añadido correctamente al carrito');

    

}

function actualizarprecitotal(){
    let total=0;
    const shoppingCartTotal=document.querySelector('.shoppingCartTotal');

    const shoppingCartItems=document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach(shoppingCartItem =>{
     const  shoppingCartItemPriceElement=  shoppingCartItem.querySelector('.shoppingCartItemPrice');
     const shoppingCartItemPrice= Number(shoppingCartItemPriceElement.textContent.replace('S/.', ''));
     
     const shoppingCartItemQuantityElement=shoppingCartItem.querySelector('.shoppingCartItemQuantity');
     const shoppingCartItemQuantity=Number(shoppingCartItemQuantityElement.value);

     total+=shoppingCartItemPrice*shoppingCartItemQuantity;

     
    });
    shoppingCartTotal.innerHTML=`S/. ${total.toFixed(2)}`

    totalMostrar=total;


}

function borrarItem(event){
    const buttonClicked=event.target;
    buttonClicked.closest('.shoppingCartItem').remove();    
    actualizarprecitotal();

    alert("Producto eliminado exitosamente");
}

function ModicandoCanti(event){
    const input = event.target;
    if(input.value <=0){
        input.value=1;
    }
    actualizarprecitotal();

}

function comprarButtonClick(){
  
    opcion= confirm("Desea confirmar su compra "+totalMostrar.toFixed(2));
        
    if(opcion){  
        alert("Compra Realizada");
        shoppingCartItemsContainer.innerHTML='';
        actualizarprecitotal();
    }else{
        alert("Compra Cancelada");
        actualizarprecitotal();
    }

        
}


