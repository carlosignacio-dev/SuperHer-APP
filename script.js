
let btnBuscar = document.querySelector("#btnBuscar");
btnBuscar.addEventListener("click", function() {
    let txtID = document.querySelector("#txtID");
    console.log(txtID)
    solicitud(txtID);
});

let txtID = document.querySelector("#txtID");
txtID.addEventListener("keypress", function(e) {
    
    if(e.key === "Enter") {
        e.preventDefault();
        let txtID = document.querySelector("#txtID");
        solicitud(txtID);
    }
})

function solicitud(txtID) {
    $.ajax({
    type: "GET",
    url: `https://superheroapi.com/api.php/b903d97f7af25f4bca7a6dffee394e6c/${txtID.value}`,
    dataType: "json",
    success: function (response) {
        console.log(response);
        crearGrafico(response);        
        crearTarjeta(response);        
    },
    error: function(error) {
        console.log("Error en la petición");
        
    }
});
}


function crearGrafico(response) {
    var chart = new CanvasJS.Chart("chartContainer", {
    
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title:{
            text: response.name
        },
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "pie",
            dataPoints: [
                { label: "Intelligence",  y: parseInt(response.powerstats.intelligence) },
                { label: "strength", y: parseInt(response.powerstats.strength) },
                { label: "speed", y: parseInt(response.powerstats.speed) },
                { label: "durability",  y: parseInt(response.powerstats.durability) },
                { label: "power",  y: parseInt(response.powerstats.power) },
                { label: "combat",  y: parseInt(response.powerstats.combat) }
            ]
        }
        ]
    });
    chart.render();
    
    }

    function crearTarjeta(response) {
        console.log(response)
        let cardContainer = document.querySelector("#cardContainer");
        cardContainer.innerHTML = `<img src="${response.image.url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${response.name}</h5>
                <p class="card-text">${response.biography["first-appearance"]}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Full Name: ${response.biography["full-name"]}</li>
                <li class="list-group-item">Publisher: ${response.biography.publisher}</li>
                <li class="list-group-item">Alter Ego: ${response.biography["alter-egos"]}</li>
            </ul>`;
    }

    /* Validar Numeros */
    function validarNumeros(valorCaja){
        if(!isNaN(valorCaja))   {
            return true;
        }     
        return false;
    }

    function validarNumerosRegex(valorCaja){
        let regex = new RegExp("^[0-9](3)$");
        if(regex.test(valorCaja)){
            return true;
        }
        return false;
    }

    function validarRangoNumerico(valorCaja){
        if(valorCaja >= 1 && valorCaja <= 732){
            return true;
        }
        return false;
    }

    function validarRangoError(response){
        if(response.response === "success"){
            return true;
        } 
        return false;
    }

    function validaVacio(valorCaja){
        if(valorCaja === "") {
            return false;
        }
        return true;
    }