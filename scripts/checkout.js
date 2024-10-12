import {cart,deleteItem,addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryoption.js';
import formatCurrency from './utils/money.js';




let cartSummaryHTML='';

cart.forEach((cartItem)=>{
  const productId=cartItem.productId; 

  let matchingProduct;

  products.forEach((product)=>{
    if(productId===product.id){
      matchingProduct=product;
    }
  })
  const deliveryOptionId=cartItem.deliveryId;
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(deliveryOptionId===option.id){
      deliveryOption=option;
    }
  })
  const today=dayjs();
  const deliveryDate=today.add(deliveryOption.deliveryTime,'days');
  const dateString=deliveryDate.format('dddd,MMMM D');



  cartSummaryHTML+=`
  <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                  <div class="product-price">
                  $${(matchingProduct.priceCents/100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}"data-product-id="${matchingProduct.id}"/>
                  <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}"
                  data-product-id="${matchingProduct.id}">Save</span>

                  
                </div>
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}.
              </div>
                
                
              </div>
            </div>
          </div>

  `
  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;
})

function deliveryOptionsHTML(matchingProduct,cartItem){

  let html=``;
  deliveryOptions.forEach((deliveryOption)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryTime,'days');
    const dateString=deliveryDate.format('dddd,MMMM D');

    const priceString = deliveryOption.priceCents
    ===0?'Free shipping':`$${formatCurrency(deliveryOption.priceCents)} -`;
    
    const isChecked= deliveryOption.id==cartItem.deliveryId;

    html+=`
    <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    <div class="delivery-option">
      <input type="radio" ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"
        >
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString}
        </div>
      </div>
    </div>
    `


  });

  return html;


}



document.querySelectorAll('.delete-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId= link.dataset.productId;
    deleteItem(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateCheckoutHeader();

  })
})

document.querySelectorAll('.update-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      document.querySelector(`.js-delete-link-${productId}`).classList.add('hide');
      document.querySelector(`.js-quantity-input-${productId}`).classList.add('is-editing-value');
      document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('is-editing-value');  
    })
  })

document.querySelectorAll('.save-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      document.querySelector(`.js-delete-link-${productId}`).classList.remove('hide');
      document.querySelector(`.js-quantity-input-${productId}`).classList.remove('is-editing-value');
      document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('is-editing-value'); 
      const input=document.querySelector(`.js-quantity-input-${productId}`)
      let value=Number(input.value);
      addToCart(productId,value);
      updateCheckoutHeader();
      updateQuantity(productId);
      input.value='';
      

      
    })
  })

document.querySelectorAll('.quantity-input')
  .forEach((input)=>{
    const productId=input.dataset.productId;
    input.addEventListener('keydown',(event)=>{
      if(event.key=='Enter'){
        document.querySelector(`.js-delete-link-${productId}`).classList.remove('hide');
        document.querySelector(`.js-quantity-input-${productId}`).classList.remove('is-editing-value');
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('is-editing-value'); 
        const input=document.querySelector(`.js-quantity-input-${productId}`)
        let value=Number(input.value);
        addToCart(productId,value);
        updateCheckoutHeader();
        updateQuantity(productId);
        input.value='';

      }
    })
  })

updateCheckoutHeader();

function updateCheckoutHeader(){
  let totalQuantity=0;
cart.forEach((cartItem)=>{
  totalQuantity+=cartItem.quantity
})
document.querySelector('.js-checkout-header-middle-section').innerHTML=
          `Checkout (<a class="return-to-home-link"
            href="amazon.html">${totalQuantity} items</a>)`

}

function updateQuantity(productId){
  
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem
    }
  })
  
document.querySelector(`.js-quantity-label-${productId}`).innerHTML=`${matchingItem.quantity}`;
  
}
