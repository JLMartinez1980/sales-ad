
//FAKE API
const currentInventory = [
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
Create the function to sort through the API and take 20% of product that have BEEN
in stock for more than 30 days

*/

const currentPromotion = (currentInventory, expired) => {
  const expiredInventory = [];
  //Map over current inventory
  currentInventory.map( (product) => {
    //SET necessary values
    const designerName = product.name;
    const shoesArray = product.shoes;

    //map over shoes array
    shoesArray.map( (description) => {
      //get and set values
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


//helper function for PROMOTION function
reducebyTwenty = product => product.price * .8;



// Function to display HTML for Promotion Button
const createPromotionHtml = (currentInventory) => {
  //set constiable to call function currentPromotion, with a experiation date of 30 days
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
const modal = document.getElementById("promoModal");
const paragraph = document.getElementById('paragraph');

paragraph.appendChild(createPromotionHtml(currentInventory));

// Get the button that opens the modal
const btn = document.getElementById("sale");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

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
reduce 5% off cost for any product that is in stock for longer than so many days
*/


const currentBargain = (inventory, target) => {
  const expiredInventory = [];
    //Map over product to seperate the designers
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
      if (description.timeInDays >= target) {
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
      return 'There are no Bargains currently';
    } else {
      return expiredInventory;
    }
  }

//Helper function for the BARGAIN function
reductByFive = product => product.price * .95;


//Create BARGAIN HTML
//CHOOSING to not leave notes, and see which is more readable
const createBargainHtml = (currentInventory) => {

  const bargainDiv = document.createElement('div');

  const bargainDetails = currentBargain(currentInventory, 30);

  bargainDetails.forEach( (product) => {

    const bargainHeader = document.createElement('h2');
    bargainHeader.innerHTML = product.designer;

    const bargainDescription = document.createElement('p');
    bargainDescription.innerHTML = `DESCRIPTION: ${product.name}`;

    const bargainPrice = document.createElement('p');
    bargainPrice.innerHTML = `PRICE: ${product.price}`;

    const inStock = document.createElement('p');
    inStock.innerHTML = `IN STOCK: ${product.stock}`;


    bargainHeader.appendChild(bargainDescription);
    bargainHeader.appendChild(bargainPrice);
    bargainHeader.appendChild(inStock);

    bargainDiv.appendChild(bargainHeader);
  })

  return bargainDiv
}


//Bargain Modal => yes, the goal is to only have one modal.
const bargModal = document.getElementById("bargainModal");
const bargParagraph = document.getElementById('bargainParagraph');
bargParagraph.appendChild(createBargainHtml(currentInventory, 30));
// Get the button that opens the modal
const bargBtn = document.getElementById("bargain");
// Get the <span> element that closes the modal
const bargSpan = document.getElementsByClassName("closeBargain")[0];
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

//Function to sort all Gucci product in ascending order
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

  //CREATE Gucci HTML
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
const guccModal = document.getElementById("gucciModal");

const guccParagraph = document.getElementById('gucciParagraph');
// paragraph.appendChild(createPromotionHtml(currentInventory));
guccParagraph.appendChild(createGucciHTML(currentInventory));
// Get the button that opens the modal
const guccBtn = document.getElementById("gucci");
// Get the <span> element that closes the modal
const guccSpan = document.getElementsByClassName("closeGucc")[0];
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
Create Brunello function to sort product in ascending order
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

//Create Brunello HTML
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
const brunelloModal = document.getElementById("brunelloModal");
const brunelloParagraph = document.getElementById('brunelloParagraph');
console.log('brunello', brunelloParagraph)

// paragraph.appendChild(createPromotionHtml(currentInventory));
brunelloParagraph.appendChild(createBrunelloHTML(currentInventory));
// Get the button that opens the modal
const brunelloBtn = document.getElementById("brunello");
// Get the <span> element that closes the modal
const brunelloSpan = document.getElementsByClassName("closebrun")[0];
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


// I need to Re-write all test cases, as I've change the structure and limits
// of a few functions 
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
