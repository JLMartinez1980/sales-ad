

var currentInventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000, inStock: 12, timeInDays: 23},
      {name: 'tasselled green low-top lace-up', price: 1100, inStock: 2, timeInDays: 60},
      {name: 'plain beige suede moccasin', price: 950, inStock: 22, timeInDays: 90},
      {name: 'plain olive suede moccasin', price: 1050, inStock: 42, timeInDays: 45}
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
currentPromotion = (inventory, expired) => {

  const expiredInventory = [];
  //use filter to seperate the two designers
  inventory.filter( (product) => {
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

const assertEquals = (actual, expected, mssg) => {
  actual = JSON.stringify(actual);
  expected = JSON.stringify(expected);

  if (actual === expected) {
    console.log('passed');
  } else {
    console.log(`FAILED ${mssg}, [EXPECTED: ${expected}] => ${actual}`)
  }
}


//test cases
const promotionOutput = currentPromotion(currentInventory , 75);

const expectedPromotion = [
  {
  designer: "Brunello Cucinelli",
  name: "plain beige suede moccasin",
  price: "$760.00"
  },
  {
    designer: "Gucci",
    name: "red leather laced sneakers",
    price: "$640.00"
  }
]

assertEquals(promotionOutput, expectedPromotion, `should return nested object with price reduce`)

const bargainOutput = currentBargain(currentInventory, 30);
const expectedBargain = "Brunello Cucinelli, plain olive suede moccasin, $997.50 \nGucci, red leather laced sneakers, $760.00 \n"
assertEquals(bargainOutput, expectedBargain, 'return a string of all items with price meeting criteria')

const brunelloOutput = brunelloProduct(currentInventory);
const brunelloExpected = {
   "Brunello Cucinelli":
  [
    {productName:"plain beige suede moccasin",productPrice:950,productQty:22},
    {productName:"tasselled black low-top lace-up",productPrice:1000,productQty:12},
    {productName:"plain olive suede moccasin",productPrice:1050,productQty:42},
    {productName:"tasselled green low-top lace-up",productPrice:1100,productQty:2}
  ]
}

assertEquals(brunelloOutput, brunelloExpected, 'return all of brunello product nested object in asceding order');

const gucciOutput = gucciProduct(currentInventory);
const gucciExpected = {
  "Gucci":
  [
    {productName: "red leather laced sneakers", productPrice: 800, productQty: 31},
    {productName: "black leather laced sneakers", productPrice: 900, productQty: 17},
  ]
};
assertEquals(gucciOutput, gucciExpected, 'return all of brunello product nested object in asceding order');







var currentInventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000, inStock: 12, timeInDays: 23},
      {name: 'tasselled green low-top lace-up', price: 1100, inStock: 2, timeInDays: 30},
      {name: 'plain beige suede moccasin', price: 950, inStock: 22, timeInDays: 90},
      {name: 'plain olive suede moccasin', price: 1050, inStock: 42, timeInDays: 45}
    ]
  },
  {
    name: 'Gucci',
    shoes: [
      {name: 'red leather laced sneakers', price: 800, inStock: 31, timeInDays: 45},
      {name: 'black leather laced sneakers', price: 900, inStock: 17, timeInDays: 60}
    ]
  }
];
