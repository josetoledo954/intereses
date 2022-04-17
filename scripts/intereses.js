console.log("calculo de interes compuesto");
console.log("");

const montoInp = document.getElementById("inpMonto")

const mesesInp = document.getElementById("inpMeses")

const tasaInp = document.getElementById("inpTasa")

const nombreInp = document.getElementById("inpNombre")




// boton de buscar 
const boton = document.getElementById("boton")

boton.addEventListener("click", calcular)


// boton de calcular 
const botonBuscar = document.getElementById("botonBuscar")

botonBuscar.addEventListener("click", buscar)
// const tasaPer = []
let tasaPer = 0
// obtener datos de API
async function getBancos() {

    const URLbancos = `https://rickandmortyapi.com/api/character`
    const res = await fetch(URLbancos)
    const {results: data} = await res.json()
    console.log(data);
    data.forEach(async(e) => {
        const opcion = document.createElement("option")
        opcion.innerText = `${e.name} tasa ${e.episode.length} `
        opcion.value = e.id
        tasaInp.appendChild(opcion)
    })
}
getBancos()

// selector de personaje
const inpTasaM = document.getElementById("inpTasaM")
const img = document.getElementById("imgPer")
const dialogo = document.getElementById("dialogo")

tasaInp.addEventListener("click", function (e){
    if (tasaInp.value == "") {
        inpTasaM.disabled = false;
    }else{
        inpTasaM.disabled = true;
    }
    console.log("id" + tasaInp.value);

    async function getImg() {

        const URLbancos = `https://rickandmortyapi.com/api/character`
        const res = await fetch(URLbancos)
        const {results: data} = await res.json()
        console.log(data);
        const indice = data.findIndex((item) => item.id == tasaInp.value)
        console.log("indice", indice);
        if (tasaInp.value != "") {
            img.src = (data[indice].image)
            dialogo.innerText = `mi nombre es ${data[indice].name.split(" ")[0] } y voy a calcular tu interes`
            tasaPer = data[indice].episode.length
            console.log(tasaPer);
        }else{
            img.src = "https://rickandmortyapi.com/api/character/avatar/19.jpeg"
            dialogo.innerText = `puedes elegir un personaje`
        }
    }
    getImg()
})

const imp = document.getElementById("mostrar")
const mesLi = document.getElementById("mes")
const acumuladoLi = document.getElementById("acumulado")
const interesLi = document.getElementById("interes")
const nombreLi = document.getElementById("nombre")

// funcion de buscar
function buscar() {
    imp.innerHTML = ""
    mesLi.innerHTML = ""
    acumuladoLi.innerHTML = ""
    interesLi.innerHTML = ""
    nombreLi.innerHTML = ""
    img.src = "https://rickandmortyapi.com/api/character/avatar/19.jpeg"
    dialogo.innerText = `puedes elegir un personaje`
    
    const buscarInp = document.getElementById("inpBuscar")
    const buscar = buscarInp.value
    
    const nombreDiv = document.createElement ("div")
    nombreDiv.innerText = `seleccione una de las coincidencias para la busqueda de: ${buscarInp.value}`
    nombreLi.appendChild(nombreDiv)

    const bus = Object.keys(localStorage)
    const busq = bus.filter(p => p.includes(buscar))
    console.log("busq", busq);
    console.log("bus", bus);

    busq.forEach((e) => {
        const nombreDiv = document.createElement ("a")
        nombreDiv.className = "nombresLista"
        nombreDiv.href = ""
        nombreDiv.innerHTML = `
        <li id="nombresLista">${e}</li>       
        `
        nombreLi.appendChild(nombreDiv)
    })

    const nombresLi = document.querySelectorAll("#nombresLista")
    nombresLi.forEach((nombresLista) => nombresLista.addEventListener("click", mostrar))

    // funcion de mostrar busqueda
    function mostrar(e) {
        e.preventDefault()
        const nombreMostrar = e.target.innerText
        console.log(nombreMostrar);

        imp.innerHTML = ""
        mesLi.innerHTML = ""
        acumuladoLi.innerHTML = ""
        interesLi.innerHTML = ""
        nombreLi.innerHTML = ""

        const storage = JSON.parse(localStorage.getItem(nombreMostrar))
        
        storage.forEach((e) => {
        
            const mesDiv = document.createElement ("div")
            mesDiv.innerHTML = e.meses
            mesLi.appendChild(mesDiv)
                
            const acumuladoDiv = document.createElement ("div")
            acumuladoDiv.innerText = e.monto
            acumuladoLi.appendChild(acumuladoDiv)
                
            const interesDiv = document.createElement ("div")
            interesDiv.innerText = e.interes
            interesLi.appendChild(interesDiv)
        })

        const nombreDiv = document.createElement ("div")
        nombreDiv.innerText = `nombre: ${nombreMostrar}`
        nombreLi.appendChild(nombreDiv)
        
        console.log((storage));
    }
}

// funcion de calcular
function calcular() {
    
    // define que tasa usar
    let tasaUso = 0

    if (tasaInp.value == "") {
        tasaUso = inpTasaM.value
    }else {
        tasaUso = tasaPer 
    } 
    
    montoInp.value == "" && Swal.fire('ingrese un monto')
    mesesInp.value == "" && Swal.fire('ingrese cantidad de meses')
    tasaUso.value == ""  && Swal.fire('ingrese una tasa')
    nombreInp.value == "" && Swal.fire('ingrese un nombre')
    
    const bus = Object.keys(localStorage)
    const indice = bus.findIndex((item) => item == nombreInp.value)
    
    // verifica si el nombre esta en uso
    if (indice >= 0) {
        Swal.fire('el nombre nombre esta en uso')
    }

    // verifica que esten los datos completos
    if (montoInp.value != "" && mesesInp.value != "" && tasaUso.value != "" && nombreInp.value != "" && indice <= 0) {

        let monto = parseInt(montoInp.value)
        let meses = parseInt(mesesInp.value)
        let tasaN = parseInt(tasaUso)
        let nombre = nombreInp.value
        
        let j = 0
        let intAcum = 0
        let tasa = tasaN / 100 / 12
        let interes = 0
        
        interesesTotales = []
        mesesTotales = []
        montosTotales = []

        imp.innerHTML = ""
        mesLi.innerHTML = ""
        acumuladoLi.innerHTML = ""
        interesLi.innerHTML = ""
        nombreLi.innerHTML = ""
        
        // calcula el interes
        for (let i = monto; j < meses ; i = i + (i * tasa)) {
            
            j ++
            interes = i * tasa
            let acumulado = i + interes
            intAcum = intAcum + interes
            interesesTotales.push (intAcum.toFixed(2))
            mesesTotales.push (j)
            montosTotales.push (acumulado.toFixed(2))
            console.log("mes " + j);
            console.log("acumulado " + acumulado.toFixed(2));
            console.log("interes " + interes.toFixed(2));
            console.log("intereses acumulados " + intAcum.toFixed(2));
            console.log("");
        }
        
        console.log("se calcularon intereses para " + monto + " a " + meses + " meses " + "con una tasa del " + tasaN);
        console.log("");
        
        let interesObtenido = interesesTotales[interesesTotales.length - 1] / monto * 100
        
        console.log("el interes obtenido es de " + interesObtenido.toFixed(2));
        
        class Intereses {
            constructor (monto, meses, intereses){
                this.monto = monto
                this.meses = meses
                this.interes = intereses
            }
        }
        
        let lista = []
        for (const mes of mesesTotales) {
            let posicion = mes - 1 
            let monT = parseFloat(montosTotales[posicion])
            let intT = parseFloat(interesesTotales[posicion])
            lista.push(new Intereses(monT,mes, intT))
        }
        console.log(lista);
        
        // muestra los datos obtenidos
        lista.forEach((e) => {
            
            const mesDiv = document.createElement ("div")
            mesDiv.innerHTML = e.meses
            mesLi.appendChild(mesDiv)
                
            const acumuladoDiv = document.createElement ("div")
            acumuladoDiv.innerText = e.monto
            acumuladoLi.appendChild(acumuladoDiv)
                
            const interesDiv = document.createElement ("div")
            interesDiv.innerText = e.interes
            interesLi.appendChild(interesDiv)
        })

        const nombreDiv = document.createElement ("div")
        nombreDiv.innerText = `nombre: ${nombre}`
        nombreLi.appendChild(nombreDiv)

        // muestra el interes obtenido
        dialogo.innerHTML = `
        <p>para un monto de ${monto} a ${meses} meses el con una tasa del ${tasaN}</p>
        <p>el interes obtenido es de ${interesObtenido.toFixed(2)} </p>
        ` 

        montoInp.value = ""
        mesesInp.value = ""
        tasaInp.value = ""
        nombreInp.value = ""
        inpTasaM.value = ""
        
        // guarda los datos
        localStorage.setItem(nombre, JSON.stringify(lista))
        console.log(nombre.replace(/ /g, ""));
    }
}










