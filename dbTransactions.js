const db = require('./models')
const item = require('./models/item')
const user = require('./models/user')

// db.user.findByPk(1)
// .then(foundUser => {
//     include: [{model: item}]
//     console.log(item.imgUrl)
// })

// user.getItems({
//     where: {
//       usrId: '1'
//     }
//   })


// db.user.create({name: "dino", email:"dino@dino.com", password:"dinodino"})
// .then(user=>{
//     console.log("adding pet to this user:", user.email)
//     user.createItem({
//         size: 'xl',
//         type: 'testing associations',
//         brand: 'TEST',
//         price: 1.25,
//         imgUrl: 'this url wont work',
//         available: true,
//     }).then(item=>{
//         console.log(item);
//     }).catch(error => {
//         console.log(error, "in item creation")
//     })
// }).catch(error => {
//     console.log(error, "in user retrieval")
// })