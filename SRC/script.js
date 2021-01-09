

var currentInventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000, inStock: 12, timeInDays: 23},
      {name: 'tasselled green low-top lace-up', price: 1100, inStock: 2, timeInDays: 0},
      {name: 'plain beige suede moccasin', price: 950, inStock: 11, timeInDays: 20},
      {name: 'plain olive suede moccasin', price: 1050, inStock: 4, timeInDays: 30}
    ]
  },
  {
    name: 'Gucci',
    shoes: [
      {name: 'red leather laced sneakers', price: 800, inStock: 8, timeInDays: 15},
      {name: 'black leather laced sneakers', price: 900, inStock: 17, timeInDays: 30}
    ]
  }
];
/*
PROMOTION BUTTON FUNCTION
20% off for the product in inventory the longest
I'll create a helper function, not sure if I will need one
OUTPUT => 2 OBJECTs {
designerName: ,
productName: ,
price: with 20% reduction
};

/*
When refactor make sure code flows
1st => the workers funcion,
2nd => the create function,
3rd => the display function

1,2,3 and so forth
*/

const currentPromotion = (currentInventory, expired) => {
  const expiredInventory = [];
  //use filter to seperate the two designers
  currentInventory.map( (product) => {
    //grab necessary values
    const designerName = product.name;
    const shoesArray = product.shoes;

    //map over shoes array
    shoesArray.map( (description) => {
      //get values && use helper function
      const shoeName = description.name;
      const shoePrice = Number(reducebyTwenty(description)).toFixed(2);
      const howMany =  description.inStock;
      const howLong = description.timeInDays
      //get only the products that are less than expired
      if (description.timeInDays >= expired) {
        //create return object
        const designerObject = {
          designer: designerName,
          name: shoeName,
          price: `$${shoePrice}`,
          stock: howMany,
          time: howLong
        }
        expiredInventory.push(designerObject);
      }
    });
  });
    if (expiredInventory.length === 0) {
      return 'There are no promotions currently';
    } else {
      return expiredInventory;
    }
};


//helper function
reducebyTwenty = product => product.price * .8;



// Function to display HTML for Promotion Button
const createPromotionHtml = (currentInventory) => {
  //set variable to call function currentPromotion, with a experiation date of 30 days
  const promoDetails = currentPromotion(currentInventory, 30);
  console.log('promo', promoDetails);
  //Create main DIV
  const createDiv = document.createElement('div');
  //Create what is going to host the data
  const createParagraph = document.createElement('p');
  //forEach over first array
  for (let productDetails of promoDetails) {
    //create innerHTML
    const header = document.createElement('h2');
    header.innerHTML = productDetails.designer;
    const descriptionHolder = document.createElement('p');
    descriptionHolder.innerHTML = `DESCRIPTION: ${productDetails.name}`;
    const priceHolder = document.createElement('p');
    priceHolder.innerHTML = `PRICE: ${productDetails.price}`;
    const quanityHolder = document.createElement('p');
    quanityHolder.innerHTML = `IN STOCK: ${productDetails.stock}`;
    //append HTML to header
    header.appendChild(priceHolder);
    header.appendChild(descriptionHolder);
    header.appendChild(quanityHolder);

    createParagraph.appendChild(header);
  }
  createDiv.appendChild(createParagraph)

  return createDiv;
}





// Get the modal
var modal = document.getElementById("promoModal");
const paragraph = document.getElementById('paragraph');

paragraph.appendChild(createPromotionHtml(currentInventory));

// Get the button that opens the modal
var btn = document.getElementById("sale");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



/*
BARGAIN BUTTON FUNCTION
OUTPUT => STRING: ALL PRODUCT THAT INSTOCK > NUM =>  DESIGNERNAME + DESCRIPTION + COST
Reduce price by 5%
*/
const currentBargain = (inventory, target) => {
  let bargainResult = '';
  const designers = inventory.map( (product) => {

    const designerName = product.name;
    const shoesArray = product.shoes;
    console.log('bargain', product)
      const productInfo = shoesArray.map( (description) => {

        console.log('bargainDescription', description)
        const productDescription = description.name;
        const productPrice = description.price;
        const inStock = description.inStock;

        let reducedPrice = Number(reductByFive(description)).toFixed(2);

        if (description.inStock >= target) {
          bargainResult += `${designerName}, ${productDescription}, $${reducedPrice} \n`
        }
      })
      return bargainResult;
  })
  return bargainResult
}

reductByFive = product => product.price * .95;


//BARGAIN HTML

const createBargainHtml = (currentInventory) => {
  const bargainHolder = [];
  const bargainDiv = document.createElement('div');
  const bargainParagraph = document.createElement('p');
  const bargainDetails = currentBargain(currentInventory, 10);
  //split 2 times to create an array with create word order.
  const splitter = bargainDetails.split('  ');
  // bargainHolder.push(bargainDetails);
  // console.log('tester', bargainHolder);
  // bargainHolder.forEach( (item) => {
  //   console.log('item', item);
  // })

  splitter.forEach( (words) => {
    const bargainDisplay = words;
    bargainParagraph.innerHTML = bargainDisplay;
  })

  bargainDiv.appendChild(bargainParagraph);
  return bargainDiv;

}


//Bargain Modal => yes, the goal is to only have one modal.

var bargModal = document.getElementById("bargainModal");
const bargParagraph = document.getElementById('bargainParagraph');

bargParagraph.appendChild(createBargainHtml(currentInventory, 30));
// Get the button that opens the modal
var bargBtn = document.getElementById("bargain");
// Get the <span> element that closes the modal
var bargSpan = document.getElementsByClassName("closeBargain")[0];
// When the user clicks on the button, open the modal
bargBtn.onclick = function() {
  bargModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
bargSpan.onclick = function() {
  bargModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == bargModal) {
    bargModal.style.display = "none";
  }
}

//Gucci function
const gucciProduct = (inventory) => {
    const gucciDisplayObj = {};
    const designers = inventory.filter( (product) => {
      const designerName = product.name;
      const shoesArray = product.shoes;

        const productInfo = shoesArray.map( (description) => {
          const productName = description.name;
          const productPrice = description.price;
          const productQty = description.inStock;

          const gucciObj = {
            productName,
            productPrice,
            productQty
          };
          return gucciObj;
        })

        const sortedByPrice = productInfo.sort( (a, b) => {
            return a.productPrice - b.productPrice
        })

        if (designerName === 'Gucci') {
          gucciDisplayObj[designerName] = sortedByPrice
        }
    })
    return gucciDisplayObj;
  }

  const createGucciHTML = (currentInventory) => {
    const getGucciInfo = gucciProduct(currentInventory);
    const gucciDiv = document.createElement('div');

    for (let key in getGucciInfo) {
      const gucciInfo = getGucciInfo[key]
      const gucciHeader = document.createElement('h2');
      gucciHeader.innerHTML = key

      gucciInfo.forEach( (product) => {
        console.log('product', product);
        const gucciDescription = document.createElement('p');
        gucciDescription.innerHTML = `DESCRIPTION: ${product.productName}`;

        const gucciPrice = document.createElement('p');
        gucciPrice.innerHTML = `PRICE: $${product.productPrice}`;

        const gucciQuanity = document.createElement('p');
        gucciQuanity.innerHTML = `IN STOCK: ${product.productQty}`;


        gucciHeader.appendChild(gucciDescription);
        gucciHeader.appendChild(gucciPrice);
        gucciHeader.appendChild(gucciQuanity);
      })

      gucciDiv.appendChild(gucciHeader);
    }
    return gucciDiv
  }


//Gucci Modal
var guccModal = document.getElementById("gucciModal");

const guccParagraph = document.getElementById('gucciParagraph');
console.log('test', guccParagraph)
// paragraph.appendChild(createPromotionHtml(currentInventory));
guccParagraph.appendChild(createGucciHTML(currentInventory));
// Get the button that opens the modal
var guccBtn = document.getElementById("gucci");
// Get the <span> element that closes the modal
var guccSpan = document.getElementsByClassName("closeGucc")[0];
// When the user clicks on the button, open the modal
guccBtn.onclick = function() {
  guccModal.style.display = "block";
  console.log("guc", guccModal);
}

// When the user clicks on <span> (x), close the modal
guccSpan.onclick = function() {
  guccModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == guccModal) {
    guccModal.style.display = "none";
  }
}


/*
GUCCI AND Brunello BUTTONES EXACTLY THE SAME
OUTPUT => ARRAY { GUCCI: [PRODUCT IN ASCENDING ORDER], BRUELLO: [PRODUCT IN ASCENDING ORDER]]
AsSCEND BY COST
*/

const brunelloProduct = (inventory) => {
  const brunelloDisplayObj = {};
  const designers = inventory.filter( (product) => {
    const designerName = product.name;
    const shoesArray = product.shoes;

      const productInfo = shoesArray.map( (description) => {
        const productName = description.name;
        const productPrice = description.price;
        const productQty = description.inStock;

        const brunelloObj = {
          productName,
          productPrice,
          productQty
        };
        return brunelloObj;
      })

      const sortedByPrice = productInfo.sort( (a, b) => {
          return a.productPrice - b.productPrice
      })

      if (designerName === 'Brunello Cucinelli') {
        brunelloDisplayObj[designerName] = sortedByPrice
      }
  })
  return brunelloDisplayObj;
}

//Brunello HTML
const createBrunelloHTML = (currentInventory) => {
  const getbrunelloInfo = brunelloProduct(currentInventory);
  const brunelloDiv = document.createElement('div');

  for (let key in getbrunelloInfo) {
    const brunelloInfo = getbrunelloInfo[key]
    const brunelloHeader = document.createElement('h2');
    brunelloHeader.innerHTML = key

    brunelloInfo.forEach( (product) => {
      console.log('product', product);
      const brunelloDescription = document.createElement('p');
      brunelloDescription.innerHTML = `DESCRIPTION: ${product.productName}`;

      const brunelloPrice = document.createElement('p');
      brunelloPrice.innerHTML = `PRICE: $${product.productPrice}`;

      const brunelloQuanity = document.createElement('p');
      brunelloQuanity.innerHTML = `IN STOCK: ${product.productQty}`;


      brunelloHeader.appendChild(brunelloDescription);
      brunelloHeader.appendChild(brunelloPrice);
      brunelloHeader.appendChild(brunelloQuanity);
    })

    brunelloDiv.appendChild(brunelloHeader);
  }
  console.log('brunello', brunelloDiv)
  return brunelloDiv
}



//Brunello Modal
var brunelloModal = document.getElementById("brunelloModal");
const brunelloParagraph = document.getElementById('brunelloParagraph');
console.log('brunello', brunelloParagraph)

// paragraph.appendChild(createPromotionHtml(currentInventory));
brunelloParagraph.appendChild(createBrunelloHTML(currentInventory));
// Get the button that opens the modal
var brunelloBtn = document.getElementById("brunello");
// Get the <span> element that closes the modal
var brunelloSpan = document.getElementsByClassName("closebrun")[0];
// When the user clicks on the button, open the modal
brunelloBtn.onclick = function() {
  brunelloModal.style.display = "block";

}

// When the user clicks on <span> (x), close the modal
brunelloSpan.onclick = function() {
  brunelloModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == brunelloModal) {
    brunelloModal.style.display = "none";
  }
}

console.log('brunelloModal', brunelloModal);


/*
CREATE A FUNCTION TO KEEP TRACK OF HOW MANY ITEMS HAVE BEEN PURCHASED
TOTAL
PER DESIGNER

OUTPUT => OBJECT {
TOTOALPURCHASED: TOTAL,
GUCCIPURCHASED: GUCCIPURCHASED
BrunelloPURCHASED: BrunelloPURCHASED
}
*/

const totalProductPurchased = () => {

}

// const assertEquals = (actual, expected, mssg) => {
//   actual = JSON.stringify(actual);
//   expected = JSON.stringify(expected);
//
//   if (actual === expected) {
//     console.log('passed');
//   } else {
//     console.log(`FAILED ${mssg}, [EXPECTED: ${expected}] => ${actual}`)
//   }
// }


//test cases
const promotionOutput = currentPromotion(currentInventory , 5);
console.log('promotion', promotionOutput);
// const expectedPromotion = [
//   {
//   designer: "Brunello Cucinelli",
//   name: "plain beige suede moccasin",
//   price: "$760.00"
//   },
//   {
//     designer: "Gucci",
//     name: "red leather laced sneakers",
//     price: "$640.00"
//   }
// ]
//
// assertEquals(promotionOutput, expectedPromotion, `should return nested object with price reduce`)
//
const bargainOutput = currentBargain(currentInventory, 10);
console.log('bargain', bargainOutput);
// const expectedBargain = "Brunello Cucinelli, plain olive suede moccasin, $997.50 \nGucci, red leather laced sneakers, $760.00 \n"
// assertEquals(bargainOutput, expectedBargain, 'return a string of all items with price meeting criteria')
//
// const brunelloOutput = brunelloProduct(currentInventory);
// console.log('brunello', brunelloOutput);
// const brunelloExpected = {
//    "Brunello Cucinelli":
//   [
//     {productName:"plain beige suede moccasin",productPrice:950,productQty:22},
//     {productName:"tasselled black low-top lace-up",productPrice:1000,productQty:12},
//     {productName:"plain olive suede moccasin",productPrice:1050,productQty:42},
//     {productName:"tasselled green low-top lace-up",productPrice:1100,productQty:2}
//   ]
// }
//
// assertEquals(brunelloOutput, brunelloExpected, 'return all of brunello product nested object in asceding order');
//
// const gucciOutput = gucciProduct(currentInventory);
// console.log('gucci', gucciOutput)
// const gucciExpected = {
//   "Gucci":
//   [
//     {productName: "red leather laced sneakers", productPrice: 800, productQty: 31},
//     {productName: "black leather laced sneakers", productPrice: 900, productQty: 17},
//   ]
// };
// assertEquals(gucciOutput, gucciExpected, 'return all of brunello product nested object in asceding order');
