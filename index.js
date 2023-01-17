
import mongoose from "mongoose";

mongoose.set('strictQuery', true);

// --- MENSAJES --- //
const mensajes = [{
    "date": "23-05-2023",
    "mail": "qwert@gmail.com",
    "sms": "dale"
}, {
    "date": "23-05-2023",
    "mail": "adaff@gmail.com",
    "sms": "ahiva"
}, {
    "date": "23-05-2023",
    "mail": "czxcxvcvgmail.com",
    "sms": "gg w"
}, {
    "date": "23-05-2023",
    "mail": "hjguyti@gmail.com",
    "sms": "pofavo"
}, {
    "date": "23-05-2023",
    "mail": "juju@gmail.com",
    "sms": "quiero una remera"
}, {
    "date": "23-05-2023",
    "mail": "asdasqwerty@gmail.com",
    "sms": "aaaaaa"
}, {
    "date": "23-05-2023",
    "mail": "proprerty@gmail.com",
    "sms": "sadfgy"
}, {
    "date": "23-05-2023",
    "mail": "calloftculhul@gmail.com",
    "sms": "holi"
}, {
    "date": "23-05-2023",
    "mail": "juabnjose@gmail.com",
    "sms": "mens"
}, {
    "date": "23-05-2023",
    "mail": "juancru@gmail.com",
    "sms": "ultima"
}]

const mensajesSchema = new mongoose.Schema({
    date: { type: String, required: true },
    mail: { type: String, required: true },
    sms: { type: String, required: true }
})

const mensajesDAO = mongoose.model('mensajes', mensajesSchema)

// --- PRODUCTOS --- //

const productos = [{
    "title": "Remera Balenciaga",
    "price": 5000,
    "stock": 50
}, {
    "title": "Remera Levis",
    "price": 4500,
    "stock": 500
}, {
    "title": "Remera Ona Saez",
    "price": 3550,
    "stock": 168
}, {
    "title": "Remera Zara",
    "price": 3890,
    "stock": 110
}, {
    "title": "Remera Volcom",
    "price": 2000,
    "stock": 500
}, {
    "title": "Remera Nike",
    "price": 2300,
    "stock": 230
}, {
    "title": "Remera Puma",
    "price": 2450,
    "stock": 99
}, {
    "title": "Remera Under Armour",
    "price": 1090,
    "stock": 45
}, {
    "title": "Remera Umbro",
    "price": 1000,
    "stock": 80
}, {
    "title": "Remera Diadora",
    "price": 990,
    "stock": 500
}]


const productosSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

const productosDAO = mongoose.model('productos', productosSchema)

// Conecto a base de datos -------------------------------- //

await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
    serverSelectionTimeoutMS: 5000,
})
console.log('Conexion a base de datos exitosa!')


// Escritura a base de datos (MENSAJES) //
const insercionesMens = []

for (const mensaje of mensajes) {
    insercionesMens.push(mensajesDAO.create(mensaje))
}

const resultMens = await Promise.allSettled(insercionesMens)
const rejectedMens = resultMens.filter(r => r.status == 'rejected')
if (rejectedMens.length > 0) {
    console.log('Error(es): ' + rejectedMens.length)
} else {
    console.log("Todo ok!")
}

// Escritura a base de datos (PRODUCTOS) //
const insercionesProd = []

for (const producto of productos) {
    insercionesProd.push(productosDAO.create(producto))
}

const resultProd = await Promise.allSettled(insercionesProd)
const rejectedProd = resultProd.filter(r => r.status == 'rejected')
if (rejectedProd.length > 0) {
    console.log('Error(es): ' + rejectedProd.length)
} else {
    console.log("Todo ok!")
}



// Muestra todos los docs de ambas colecciones //

mensajes.find(function (err, mensajes) {
    if (err) return console.error(err);
    console.log(mensajes);
})

productos.find(function (err, productos) {
    if (err) return console.error(err);
    console.log(productos);
})

// Muestra la cantidad de docs de cada colección //

mensajesDAO.countDocuments(function (err, mensajes) {
    if (err) return console.error(err);
    console.log(mensajes);
})

productosDAO.countDocuments(function (err, productos) {
    if (err) return console.error(err);
    console.log(productos);
})



// ----- CRUD ----- //

// a.
let nuevoProducto = new productosDAO({
    "title": "Camiseta AFA tres estrellas",
    "price": 3330,
    "stock": 4500
})
nuevoProducto.save(function (err) {
    if (err) return console.error(err);
});

const result = await Promise.allSettled(inserciones)
const rejected = result.filter(r => r.status == 'rejected')
if (rejected.length > 0) {
    console.log('Error(es): ' + rejected.length)
} else {
    console.log("Todo ok!")
}

// b.
// Listar los productos con precio menor a 1000 pesos

productosDAO.find({ "price": { $lt: 1000 } }, function (err, productos) {
    if (err) return console.error(err);
    console.log(productos);
})
// Listar los productos con precio entre los 1000 a 3000 pesos

productosDAO.find({ "price": { $gte: 1000, $lte: 3000 } }, function (err, productos) {
    if (err) return console.error(err);
    console.log(productos)
})

// Listar los productos con precio mayor a 3000 pesos

productosDAO.find({ "price": { $gt: 3000 } }, function (err, productos) {
    if (err) return console.error(err);
    console.log(productos)
})

// Consultar sólo el nombre del tercer producto más barato

productosDAO.find({}, { _id: 0, "title": 1 }).sort({ "price": 1 }).limit(1).skip(2)

// c.

productosDAO.updateMany({}, { $set: { "stock": 100 } }, function (err, productos) {
    if (err) return console.error(err);
    console.log(productos)
})
productosDAO.find(function (err, productos) {
    if (err) return console.error(err);
    console.log(productos);
})

// d.

productosDAO.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } }, function (err, productos) {
    if (err) return console.error(err);
    console.log(productos)
})

// e.

productosDAO.deleteMany({ price: { $lt: 1000 } }, function (err, productos) {
    if (err) return console.error(err);
    console.log(productos);
})

// -------------------------------------------------- //
// Creo usuario que lea base de datos pero no modifique info //

const usuarios = [
    { user: "pepe", pwd: "asd456", roles: [{ role: 'read', db: 'productos' }, { role: 'read', db: 'mensajes' }] }
]

const usuariosSchema = new mongoose.Schema({
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    roles: [{
        role: { type: String },
        role: { type: String }
    }]
})

const usuariosDAO = mongoose.model('usuarios', usuariosSchema)


// Conecto con base de datos (ADMIN) //

await mongoose.connect('mongodb://127.0.0.1:27017/admin', {
    serverSelectionTimeoutMS: 5000,
})
console.log('Base de datos conectada')

const insercionesUsua = []

for (const usuario of usuarios) {
    insercionesUsua.push(usuariosDAO.create(usuario))
}

const resultUsua = await Promise.allSettled(insercionesUsua)
const rejectedUsua = resultUsua.filter(r => r.status == 'rejected')
if (rejectedUsua.length > 0) {
    console.log('Error(es):' + rejectedUsua.length)
} else {
    console.log("Todo ok!")
}

// Cierro la conexión //
await mongoose.disconnect()