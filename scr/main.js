// let totalCarrito = 0; 
                        // ARRAYS 
// const carrito = [];
const productos = [
{
    id: 1,
    titulo:"Mermelada de Arandanos",
    precio: 500,
    stock: 10,
    cantidad: 0,
    img: "../assets/mermeladas/arandanos.png"
},
{
    id: 2,
    titulo: "Mermelada de Ciruela",
    precio: 500,
    stock: 5,
    cantidad: 0,
    img: "../assets/mermeladas/ciruela.png"
},
{
    id: 3,
    titulo: "Mermelada de Durazno",
    precio: 500,
    stock: 100,
    cantidad: 0,
    img: "../assets/mermeladas/durazno.png"
},
{
    id: 4,
    titulo: "Mermelada de Frambuesa",
    precio: 500,
    stock: 100,
    cantidad: 0,
    img: "../assets/mermeladas/frambuesa.png"

},
{
    id: 5,
    titulo: "Mermelada de Frutilla",
    precio: 500,
    stock: 100,
    cantidad: 0,
    img: "../assets/mermeladas/frutilla.png"

},
{
    id: 6,
    titulo: "Mermelada de Kiwi",
    precio: 500,
    stock: 100,
    cantidad: 0,
    img: "../assets/mermeladas/kiwi.png"

},
{
    id: 7,
    titulo: "Mermelada de Mandarina",
    precio: 500,
    stock: 100,
    cantidad: 0,
    img: "../assets/mermeladas/mandarina.png"

},
{
    id: 8,
    titulo: "Mermelada de Naranja",
    precio: 500,
    stock: 6,
    cantidad: 0,
    img: ""

},
{
    id: 9,
    titulo: "Mermelada de Tomate",
    precio: 500,
    stock: 0,
    cantidad: 0,
    img: "../assets/mermeladas/tomate.png"

},
];
/*************************************************************************************************************************************                                                           DOM                       ************************************************************************************************************************************/
        // GENERADOR DE CARDS 
    fetch("/data.json")
    .then((response) => response.json())
    .then((data) => generarCards(data.productos))


function generarCards(productosAMostrar){
const divCards = document.getElementById('cards')
productosAMostrar.forEach(elemento => {
divCards.innerHTML += `
<div class="col mb-4">
        <div class="card ">
        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
            ${(elemento.stock > 0) ? 'Disponible' : 'Sin Stock'}
        </div>
            <img src="${(elemento.img === "")? '../assets/Nuna.png' : elemento.img}" class="card-img-top" alt="Mermelada de Arandanos">
            <div class="card-body">
            <h5 class="card-titulo">${elemento.titulo}</h5>
            <p><span>Precio: $${elemento.precio}</span></p>
            <input value= "1" min="1" class="cart-quantity-input" id="cantidad-${elemento.id}" type="number" name="cant" id="cant">
            <button type="button" class="boton btn btn-warning"
            ${(elemento.stock == 0) && "disabled"}
            onclick="agregarAlCarrito(${elemento.id})" >
            Añadir al Carrito
            </button>
            </div>
            </div>
            </div>
            `
});
};

                        //  GENERADOR DE CARDS EN MODAL CARRITO

function cardsEnCarrito (productosCarrito){
let acumuladorProductosCarrito = '';
productosCarrito.forEach((elemento) => {
acumuladorProductosCarrito +=`
    <div class="cart-items">
        <div class="cart-row">
            <div class="cart-item cart-column">
            <img src="${(elemento.img === "")? '../assets/Nuna.png' : elemento.img}" alt="Imagen producto ${elemento.titulo}" width="100" height="100">
                <span class="cart-item-title">${elemento.titulo}</span>
            </div>
            <span class="cart-price cart-column">$${elemento.precio}</span>
            <div class="cart-quantity cart-column">
                <button type="button" onclick="restarUno(${elemento.id})" class="badge btn btn-warning ms-1 rounded-pill">-</button>
                <input class="cart-quantity-input" id="cant" value= "${elemento.cantidad}">
                <button type="button" onclick="agregarUno(${elemento.id})" class="badge btn btn-warning ms-1 rounded-pill">+</button>
                <button onclick="removerUnProducto(${elemento.id})" class="btn btn-danger" type="button">QUITAR</button>
            </div>
        </div>
    </div>
`
});
mostrarProductosCarrito(acumuladorProductosCarrito);
};

function mostrarProductosCarrito(cards){
document.getElementById("modalCarrito").innerHTML = cards;
}

cardsEnCarrito(carrito);

        //      BUSCADOR 

function buscador(){
const nombreProductoBuscado = document.getElementById('productoBuscado').value.toUpperCase().trim();
const productosEncontrados = productos.filter((producto) => {
    return producto.titulo.toUpperCase().match(nombreProductoBuscado);
});
if (nombreProductoBuscado != ''){
    document.getElementById("cards").innerHTML = `<div class="col-lg-12"><h2>Resultados que coinciden con "${nombreProductoBuscado}"</h2></div>`;
    generarCards(productosEncontrados);
}
}
//*************************************************************************************************************************************                                                 F U N C I O N E S *************************************************************************************************************************************

const agregarAlCarrito = (idProducto) =>{

const valorDeCantidad = document.getElementById(`cantidad-${idProducto}`).value; //VALOR DE LA CANTIDAD DE PRODUCTOS SELECCIONADA
const productoAgregado = productos.find(producto => producto.id === idProducto ); //ACCEDO AL PRODUCTO SELECCIONADO
productoAgregado.cantidad = valorDeCantidad;
if (productoAgregado.stock > productoAgregado.cantidad){            //COMPRUEBO SI HAY STOCK
carrito.push (productoAgregado);
localStorage.setItem("carrito", JSON.stringify(carrito));           // ACTUALIZO STORAGE
productoAgregado.stock - (Number(valorDeCantidad)) ;
cantProdCarrito();                //TOTAL PRODUCTOS EN CARRITO
cardsEnCarrito(carrito);         //  ENVIO CARD AL CARRITO
totalDelCarrito();
// SWEET ALERT
swal({
    title: `Agregaste ${productoAgregado.titulo} al Carrito!`,
    icon: "success",
    button: "Continuar comprando",
});
}else{                  // SI NO HAY STOCK
swal({
    title: `No tenemos Stock suficiente de ${productoAgregado.titulo}`,
    text: "Intenta con una cantidad menor",
    icon: "success",
    button: "Continuar comprando",
});;
};
}

//  remover del carrito

function removerUnProducto(idProducto) {
const productoARemover = carrito.find(producto => producto.id === idProducto);
let indexDelProducto = carrito.indexOf(productoARemover);
    carrito.splice((indexDelProducto), 1);
    productoARemover.stock++;
    productoARemover.cantidad--;
cardsEnCarrito(carrito);
totalDelCarrito();
cantProdCarrito();
localStorage.setItem('carrito', JSON.stringify(carrito));
//    TOASTIFY
Toastify({
    text: `Eliminaste ${productoARemover.titulo}`,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right", 
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){}
}).showToast();
};

//             FUNCION AUMENTAR CANTIDAD EN MODAL CARRITO

function agregarUno(idProducto){
    const productoAgregado = carrito.findIndex(producto => producto.id === idProducto );
    carrito[productoAgregado].cantidad ++;
    cardsEnCarrito(carrito);
    totalDelCarrito();
};

//             FUNCION RESTAR CANTIDAD EN MODAL CARRITO


function restarUno(idProducto){
    const productoAgregado = carrito.findIndex(producto => producto.id === idProducto );
    if(carrito[productoAgregado].cantidad > 0) carrito[productoAgregado].cantidad --;
    cardsEnCarrito(carrito);
    totalDelCarrito();
};

//             FUNCION TOTAL CARRITO


function totalDelCarrito() {
const precioTotalCarrito = carrito.reduce((acc, productoAgregado) => ( acc + (productoAgregado.precio * productoAgregado.cantidad )), 0);
document.getElementById("total-precio").innerHTML = `$${precioTotalCarrito}`;
localStorage.setItem("totalCarrito", JSON.stringify(precioTotalCarrito));
};

//             FUNCION TOTAL CANTIDAD CARRITO


function cantProdCarrito(){
const cantidadTotalCarrito = carrito.reduce((acc, productoAgregado) => ( acc + Number(productoAgregado.cantidad)), 0);
document.getElementById("cantidad-prod").innerHTML = cantidadTotalCarrito;
}

            // FUNCION VACIAR CARRITO  (NO ME FUNCIONA AUN)

// function vaciarCarrito() {
//     carrito.splice(0, carrito.length);
//     cardsEnCarrito(carrito);
//     totalDelCarrito();
//     cantProdCarrito();
//     localStorage.setItem('carrito', JSON.stringify(carrito));
// };

// function vaciar(){
// const vaciar = document.getElementById("vaciarCarrito");
// vaciar.addEventListener("click",vaciarCarrito());}





            // FUNCION AGREGAR AL CARRITO CON VALIDACION SI EL PRODUCTO EXISTE YA EN EL CARRITO 


            // const agregarAlCarrito = (idProducto) =>{

            //     const valorDeCantidad = document.getElementById(`cantidad-${idProducto}`).value; //VALOR DE LA CANTIDAD DE PRODUCTOS SELECCIONADA
            //     const productoAgregado = productos.find(producto => producto.id === idProducto ); //ACCEDO AL PRODUCTO SELECCIONADO
            //     productoAgregado.cantidad = valorDeCantidad;
            //     const productoExistente = carrito.find(producto => producto.id === idProducto ); //ACCEDO AL PRODUCTO SELECCIONADO
                
            //     if ((productoAgregado.stock > productoAgregado.cantidad) && (productoExistente === undefined)){            //COMPRUEBO SI HAY STOCK
            //     carrito.push (productoAgregado);
            //     localStorage.setItem("carrito", JSON.stringify(carrito));           // ACTUALIZO STORAGE
            //     productoAgregado.stock - (Number(valorDeCantidad)) ;
            //     cantProdCarrito();                //TOTAL PRODUCTOS EN CARRITO
            //     cardsEnCarrito(carrito);         //  ENVIO CARD AL CARRITO
            //     totalDelCarrito();
            //     // SWEET ALERT
            //     swal({
            //         title: `Agregaste ${productoAgregado.titulo} al Carrito!`,
            //         icon: "success",
            //         button: "Continuar comprando",
            //     });
                
            //     }else if((productoAgregado.stock > productoAgregado.cantidad) && (productoExistente =! undefined)){
            //         productoExistente.cantidad ++;
            //     localStorage.setItem("carrito", JSON.stringify(carrito));           // ACTUALIZO STORAGE
            //     productoAgregado.stock - (Number(valorDeCantidad)) ;
            //     cantProdCarrito();                //TOTAL PRODUCTOS EN CARRITO
            //     cardsEnCarrito(carrito);         //  ENVIO CARD AL CARRITO
            //     totalDelCarrito();
            //     // SWEET ALERT
            //     swal({
            //         title: `Agregaste ${productoAgregado.titulo} al Carrito!`,
            //         icon: "success",
            //         button: "Continuar comprando",
            //     });
            //     }else{                  // SI NO HAY STOCK
            //     swal({
            //         title: `No tenemos Stock suficiente de ${productoAgregado.titulo}`,
            //         text: "Intenta con una cantidad menor",
            //         icon: "success",
            //         button: "Continuar comprando",
            //     });;
            //     };
            //     }