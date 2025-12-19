const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});

const productsData = [
  { id: 1, name: 'Portátil HP', price: 799, category: 'electrónica', stock: 15 },
  { id: 2, name: 'iPhone 14', price: 999, category: 'electrónica', stock: 25 },
  { id: 3, name: 'Camiseta Nike', price: 29, category: 'ropa', stock: 50 },
  { id: 4, name: 'Zapatillas Adidas', price: 89, category: 'ropa', stock: 30 },
  { id: 5, name: 'Mesa IKEA', price: 149, category: 'hogar', stock: 10 },
  { id: 6, name: 'Silla oficina', price: 199, category: 'hogar', stock: 20 },
  { id: 7, name: 'Auriculares Sony', price: 159, category: 'electrónica', stock: 40 },
  { id: 8, name: 'Teclado mecánico', price: 129, category: 'electrónica', stock: 18 },
  { id: 9, name: 'Pantalón Levi\'s', price: 79, category: 'ropa', stock: 35 },
  { id: 10, name: 'Chaqueta North Face', price: 199, category: 'ropa', stock: 22 },
  { id: 11, name: 'Lámpara LED', price: 45, category: 'hogar', stock: 60 },
  { id: 12, name: 'Alfombra', price: 69, category: 'hogar', stock: 15 },
  { id: 13, name: 'Tablet Samsung', price: 399, category: 'electrónica', stock: 12 },
  { id: 14, name: 'Smart TV LG 55"', price: 699, category: 'electrónica', stock: 8 },
  { id: 15, name: 'Sudadera Puma', price: 49, category: 'ropa', stock: 45 },
  { id: 16, name: 'Estantería', price: 89, category: 'hogar', stock: 14 },
  { id: 17, name: 'Ratón inalámbrico', price: 25, category: 'electrónica', stock: 70 },
  { id: 18, name: 'Gafas de sol Ray-Ban', price: 159, category: 'ropa', stock: 28 },
  { id: 19, name: 'Sofá 3 plazas', price: 599, category: 'hogar', stock: 5 },
  { id: 20, name: 'Cafetera Nespresso', price: 179, category: 'hogar', stock: 25 },
];

function getProductsByCategory(category) {
    return productsData.filter(
        products => products.category === category
    )
}

function renderProducts(products) {
    return products.map(p=>`
        <li>
        ${p.name} - ${p.price} (stock: ${p.stock})
        </li>
        `).join('')
}

app.get('/',(req,res) => {
    res.send(`
        <h1>Bienvenido a la tienda</h1>
        <ul>
            <li><a href="/electronica">Electrónica</a></li>
            <li><a href="/ropa">Ropa</a></li>
            <li><a href="/hogar">Hogar</a></li>
            <li><a href="/productos">Todos nuestros productos</a></li>
        </ul>
        
        `)
})

app.get('/electronica', (req,res) => {
    const products = getProductsByCategory('electrónica')

    res.end(`
        <h1>Productos Electrónica</h1>
        <p>Total productos:${products.length}</p>
        <ul>
            ${renderProducts(products)}
        </ul>
        `)
})

app.get('/ropa', (req,res) => {
    const products = getProductsByCategory('ropa')

    res.end(`
        <h1>Productos de ropa</h1>
        <p>Total productos:${products.length}</p>
        <ul>
            ${renderProducts(products)}
        </ul>
        `)
})


app.get('/hogar', (req,res) => {
    const products = getProductsByCategory('hogar')

    res.end(`
        <h1>Productos para el hogar</h1>
        <p>Total productos:${products.length}</p>
        <ul>
            ${renderProducts(products)}
        </ul>
        `)
})


app.get('/productos', (req,res) => {
   

    res.end(`
        <h1>Todos nuestros productos</h1>
        <a href="/productos/baratos">Ver productos baratos</a>
        <a href="/productos/caros">Ver productos caros</a>
        <p>Total productos:${productsData.length}</p>
        <ul>
            ${renderProducts(productsData)}
        </ul>
        `)
})

 
app.get('/productos/baratos', (req,res) =>{
    const baratos = productsData.filter(p => p.price < 100)
    res.end(`
        <h1>Productos baratos</h1>
        <p>Total:${baratos.length}</p>
        <ul>
            ${renderProducts(baratos)}
        </ul>
        `)
})


app.get('/productos/caros', (req,res) =>{
    const caros = productsData.filter(p => p.price >= 100)
    res.end(`
        <h1>Productos caros</h1>
        <p>Total:${caros.length}</p>
        <ul>
            ${renderProducts(caros)}
        </ul>
        `)
})


app.listen(PORT,()=>{
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
});











