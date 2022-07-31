//CREO LA CLASE

class Auto {
    constructor(marca, modelo, precio, stock){
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.stock = stock;
    }
}

//CREO EL ARRAY VACIO DONDE VOY A PUSHEAR CADA UNO DE LOS AUTOS 
let autos = []


//CREO EN EL LOCALSTORAGE LA KEY "autos" Y LA VINCULO CON EL ARRAY   
if(localStorage.getItem("autos")){
    autos = JSON.parse(localStorage.getItem("autos"))
} else{
    localStorage.setItem("autos", JSON.stringify(autos))
}

// CONSULTO CADA ID DEL DOM
const idForm = document.getElementById("idForm")
const idMarca = document.getElementById("idMarca")
const idModelo = document.getElementById("idModelo")
const idPrecio = document.getElementById("idPrecio")
const idStock = document.getElementById("idStock")
const btnListado = document.getElementById("btnListado")
const divListado = document.getElementById("divListado")


//AGREGO EL EVENTO AL FORM
idForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    let datosForm = new FormData(e.target)
    let auto = new Auto(datosForm.get("marca"), datosForm.get("modelo"), datosForm.get("precio"), datosForm.get("stock"))
    autos.push(auto)
    localStorage.setItem("autos", JSON.stringify(autos))

    idForm.reset()
})


//AGREGO LA CARD DONDE SE VA A VER EL LISTADO DE AUTOS MEDIANTE EL INNERHTML
btnListado.addEventListener("click", () => {
    let arrayStorge = JSON.parse(localStorage.getItem("autos"))

    divListado.innerHTML = ""
    
    arrayStorge.forEach((auto, indice) => {
        divListado.innerHTML += `
        <div class="card text-white bg-dark mb-3" id="auto${indice}" style="max-width: 20rem; margin:5px;">
            <div class="card-header"><h2>${auto.modelo}</h2></div>
                <div class="card-body">
                    <p class="card-text">Marca: ${auto.marca}</p>
                    <p class="card-text">Precio: ${auto.precio}</p>
                    <p class="card-text">Stock: ${auto.stock}</p>
                    <button class="btn btn-danger">Eliminar Auto</button>
                </div>
        </div>
        `
    });

 //BUSCO EL BOTON ELIMINAR MEDIANTE LA PROPIEDAD "lastElementChil" Y LE AGREGO UNA FUNCION LA CUAL VA A ELIMINAR EL OBJETO DEL DOM, DEL ARRAY Y DEL LOCAL STORAGE
    
    arrayStorge.forEach((auto, indice) =>{
        let btnEliminar = (document.getElementById(`auto${indice}`).lastElementChild.lastElementChild)

        btnEliminar.addEventListener("click", () => {
            document.getElementById(`auto${indice}`).remove()
            autos.splice(indice,1)
            localStorage.setItem("autos", JSON.stringify(autos))
        })
    })
})