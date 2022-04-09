const carrito = validarStorageCarrito();
// let totalCarrito = 0; 

function validarStorageCarrito(){
    if(localStorage.getItem("carrito") != null){
        const storageProductos = JSON.parse(localStorage.getItem("carrito"));
        return storageProductos;
    }else{
        return [];
    }
}

document.getElementById("cantidad-prod").innerHTML = carrito.length;

const totalCarrito = validarStorageTotal(); 

function validarStorageTotal(){
    if(localStorage.getItem("totalCarrito") != null){
        const storageTotal = JSON.parse(localStorage.getItem("totalCarrito"));
        document.getElementById("total-precio").innerHTML = `$${storageTotal}`;
        return storageTotal;
    }else{
        return [];
    }
};