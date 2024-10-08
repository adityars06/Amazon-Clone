//two ways to import at top(always)..import {variable, function name without ()} from 'filepath'
//or import * as something(cartModule) from 'filepath' then use as cartModule.variable or cartModule.function()
import {cart,addToCart,initialiseCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js'


let productHTML=``;
products.forEach((product) => {
  productHTML+=`
      <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class='js-quantity-selector-${product.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=${product.id}>
            Add to Cart
          </button>
        </div>`
});

initialiseCartQuantity();


document.querySelector('.js-products-grid').innerHTML=productHTML;
let timeoutId={};

document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId=button.dataset.productId
      const select=document.querySelector(`.js-quantity-selector-${productId}`);
      let quantityToAdd= Number(select.value) ;
      
      addToCart(productId,quantityToAdd)
      updateCartQuantity(productId)
    
    })
  })
  
  
  
  
   export function updateCartQuantity(productId){
    let totalQuantity=0;
    const addedMessage=document.querySelector(`.js-added-to-cart-${productId}`);
    
    cart.forEach((cartItem)=>{
      totalQuantity+=cartItem.quantity
    })
    document.querySelector('.js-cart-quantity').innerHTML=`${totalQuantity}`;
    addedMessage.classList.add('added-to-cart-visible')
    
    
    if(timeoutId[productId]){
      clearTimeout(timeoutId[productId]);
    }
    timeoutId[productId]=setTimeout(()=>{
       addedMessage.classList.remove('added-to-cart-visible');
    },2000) 
    
  }
 




 

  
        
    