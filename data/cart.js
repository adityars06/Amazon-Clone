export const cart=[];

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
        quantity:quantityToAdd
      })
    }
}