export let cart= JSON.parse(localStorage.getItem('cart')) || [{
  productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
  deliveryId:'1'
},{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
  deliveryId:'2'
}];

export  function addToCart(productId,quantityToAdd){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId==productId){
        matchingItem=cartItem;
        }
      })
    if(matchingItem){
      matchingItem.quantity+=quantityToAdd;
    }
    else{
      cart.push({
        productId: productId,
        quantity:quantityToAdd,
        deliveryId:'1'

      })
    }
    saveToStorage();

}



function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function initialiseCartQuantity(){
  let totalQuantity=0;
  cart.forEach((cartItem)=>{
  totalQuantity+=cartItem.quantity;
  document.querySelector('.js-cart-quantity').innerHTML=`${totalQuantity}`;
})

}


export function deleteItem(productId){
  let newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })
  cart=newCart;
  saveToStorage();
}





