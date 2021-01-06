

var currentInventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000, inStock: 12, timeInDays: 23},
      {name: 'tasselled green low-top lace-up', price: 1100, inStock: 2, timeInDays: 60},
      {name: 'plain beige suede moccasin', price: 950, inStock: 11, timeInDays: 90},
      {name: 'plain olive suede moccasin', price: 1050, inStock: 4, timeInDays: 45}
    ]
  },
  {
    name: 'Gucci',
    shoes: [
      {name: 'red leather laced sneakers', price: 800, inStock: 31, timeInDays: 75},
      {name: 'black leather laced sneakers', price: 900, inStock: 17, timeInDays: 60}
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
      //get only the products that are less than expired
      if (description.timeInDays >= expired) {
        //create return object
        const designerObject = {
          designer: designerName,
          name: shoeName,
          price: `$${shoePrice}`
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
const createPromotionHtml = (currentPromotion) => {
  //Create main DIV
  const createDiv = document.createElement('div');
  //Create what is going to host the data
  const createParagraph = document.createElement('p');
  //forEach over first array
  currentPromotion.forEach( (product) => {
    const  createpromoDiv = document.createElement('div');
    //Create HEADER to host designer name
    let createHeader = document.createElement('h2');
    createParagraph.appendChild(createHeader);
    //set values for INFO needed
    const descriptionHolder = product.shoes;
    //second forEach over inner Array
    descriptionHolder.forEach( (item) => {


    createHeader.innerHTML = product.name

      const priceHolder = document.createElement('p');
      const descriptionHolder = document.createElement('p');
      const quanityHolder = document.createElement('p');

      descriptionHolder.innerHTML = `Description: ${item.name}`
      priceHolder.innerHTML = `PRICE: $${item.price}`
      quanityHolder.innerHTML = `IN STOCK: ${item.timeInDays}`


      createParagraph.appendChild(descriptionHolder);
      createParagraph.appendChild(priceHolder);
      createParagraph.appendChild(quanityHolder);

      createpromoDiv.appendChild(createParagraph)

    })
      createDiv.appendChild(createpromoDiv);
      // createDiv.appendChild(createParagraph);

  })

  return createDiv;
}




// Get the modal
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
OUTPUT => STRING: ALL PRODUCT THAT INSTOCK > 30  =>  DESIGNERNAME + DESCRIPTION + COST
Reduce price by 5%
*/
const currentBargain = (inventory, target) => {
  let bargainResult = ''
  const designers = inventory.filter( (product) => {
    const designerName = product.name;
    const shoesArray = product.shoes;

      const productInfo = shoesArray.map( (description) => {
        const productName = description.name;
        let productPrice = Number(reductByFive(description)).toFixed(2);

        if (description.inStock >= target) {
          bargainResult += `${designerName}, ${productName}, $${productPrice} \n`
        }
      })
      return bargainResult;
  })
  return bargainResult
}

reductByFive = product => product.price * .95;

//Bargain Modal => yes, the goal is to only have one modal.

var bargModal = document.getElementById("bargainModal");
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
// const promotionOutput = currentPromotion(currentInventory , 10);
// console.log('promotion', promotionOutput);
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
// const bargainOutput = currentBargain(currentInventory, 30);
// console.log('bargain', bargainOutput);
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
