

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
          price: shoePrice
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
  console.log('bargainResult', bargainResult);
  return bargainResult
}

reductByFive = product => product.price * .95;

/*
GUCCI AND Brunello BUTTONES EXACTLY THE SAME
OUTPUT => ARRAY { GUCCI: [PRODUCT IN ASCENDING ORDER], BRUELLO: [PRODUCT IN ASCENDING ORDER]]
AsSCEND BY COST
*/

const brunelloProduct = (inventory) => {
  const brunelloObj = {}
  const designers = inventory.filter( (product) => {
    const designerName = product.name;
    const shoesArray = product.shoes;

  const sortedByPrice = shoesArray.sort( (a, b) => {
      return a.price - b.price
    });

    const productInfo = shoesArray.map ( (description) => {
      const productName = description.name;
      const productPrice = description.price;


    })
    if (designerName === 'Brunello Cucinelli')
    brunelloObj[designerName] = sortedByPrice;
  })
  console.log('return', brunelloObj)
}


const gucciProduct = (inventory) => {
  //buttonid='brunello'
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

const assertObject = (actual, expected, mssg) => {
  actual = JSON.stringify(actual);
  expected = JSON.stringify(expected);

  if (actual === expected) {
    console.log('passed');
  } else {
    console.log(`FAILED ${mssg}, [EXPECTED: ${expected}] => ${actual}`)
  }
}


//make one test to test all functions keep it simple and clean
const assertEqual = (actual, expected, mssg) => {
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
    designer: 'Brunello Cucinelli',
    name: 'plain beige suede moccasin',
    price: 760
  },
  {
    designer: 'Gucci',
    name: 'black leather laced sneakers',
    price: 720
  }
]

// assertObject(promotionOutput, expectedPromotion, `should return 2 objects with designers, and any product in stuck for more than 60 days`);

const bargainOutput = currentBargain(currentInventory, 30);
const expectedBargain = "Brunello Cucinelli, plain olive suede moccasin, 1050 \n Gucci, red leather laced sneakers, 800\n"
// assertEqual(bargainOutput, expectedBargain, 'should return a string of all items in stock greater than 30')

const gucciOutput = gucciProduct(currentInventory);
const gucciExpected = [
  {
    Gucci: [
      {name: 'tasselled black low-top lace-up', price: 1000},
      {name: 'tasselled green low-top lace-up', price: 1100},
      {name: 'plain olive suede moccasin', price: 1050},
      {name: 'plain beige suede moccasin', price: 950}
    ]
  },
];
// assertObject(gucciOutput, gucciExpected, `should return array of objects all gucci products in ascending price order`);


const brunelloOutput = brunelloProduct(currentInventory);
const brunelloExpected = [
  {
    Brunello: [
      {name: 'black leather laced sneakers', price: 900},
      {name: 'red leather laced sneakers', price: 800},
    ]
  }
]
// assertObject(brunelloOutput, brunelloExpected, `should return array of objects all brunello products in ascending price order`);




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
