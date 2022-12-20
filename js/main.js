const URL = "https://apirestitpm.itpm.edu.bo/api/index.php/";

let updateRange = "";


//Inicio de sesión
const formularioLogin = document.getElementById("login-form");
formularioLogin.addEventListener("submit", function(e){
    e.preventDefault();
    let data = new FormData(formularioLogin);
    var pae = false;
    //peticion https
    fetch(URL + "Usuario/loginUsuario", {method: 'POST', body: data})
      .then(json=>json.json())
      .then(pack=>{
        if(pae === pack.err){
          if(pack.usuario.privilegio === '0'){
            document.getElementById('btnNuevoPriv').style.display="block";
          }
          document.getElementById("login").style.display="none";
          document.getElementById("contenido").style.display="block";
          document.getElementById('usuario').style.display="block";
          document.getElementById('closeSesion').style.display="block";
          capturaUsu();
          console.log(pack.usuario.privilegio);
        } else{
          document.getElementById('errorSesion').style.display="block";
        }

        document.getElementById("login-form").reset();  
      });
})

function cerrarSesion(){
  window.location.reload();
}

//Registro de nuevo postulante
const formularioRegistro = document.getElementById("Registro-form");
formularioRegistro.addEventListener("submit", function(e){
    e.preventDefault();
    let data = new FormData(formularioRegistro);
    var pae = false;
    //peticion https
    fetch(URL + "Alumnos/guardar", {method: 'POST', body: data})
      .then(json=>json.json())
      .then(pack=>{
        if(pack.estado === 'ok'){
          BorrarDatos();
          alert('Se registro con éxito');
        }else{
          BorrarDatos();
          alert('Registro fallido');
        }
      });
}) 


//Captura boton CERRAR de total
function cerrarTotal(){
    document.getElementById('Contenedor-Total').style.display="none";
}

//Captura el total de postulantes
function capturaTotal(inst){
  document.getElementById('Contenedor-Total').innerHTML ="";
    fetch(URL + "Alumnos/countGeneral", {method: 'GET'})
        .then(json=>json.json())
        .then(pack=>{
            let cuerpo ="";    
            let tot=pack.total.total_general;
            cuerpo += `<hr><a href="#" class="btn btn-danger" onclick="cerrarTotal()">Cerrar</a>
            <div class="card-header" id="cabeza" style="font-size:1.5rem; font-weight: bold;">
            ${inst}                   
            </div>
            <div class="card-body">
                <h5 class="card-title" style="margin-bottom:20px;" id="total">${tot} Postulantes </h5> 
            </div>`
            for (let index = 0; index < pack.carreras.length; index++) {
              const element = pack.carreras[index].nombre;
              cuerpo += `<div class="card-header" id="cabeza" style="font-size:1.5rem; font-weight: bold;">
              ${element}                   
              </div>
              <div class="card-body">
                  <h5 class="card-title" style="margin-bottom:20px;" id="total">${pack.carreras[index].datos.total} Postulantes </h5> 
              </div>`
            }           
            document.getElementById('Contenedor-Total').innerHTML += cuerpo;
            document.getElementById('Contenedor-Total').style.display="block";
        });
}


//Filtro - busqueda
const filtroBtn = document.getElementById("filtro-Btn");
filtroBtn.addEventListener("click", function(e){
    const txtFiltro = document.querySelector('#txtCiFiltro').value;
    document.querySelector('#txtCiFiltro').value ="";
    let data = new FormData();
    data.append("txtCiFiltro", txtFiltro);
    document.getElementById('Contenedor-Total').innerHTML ="";
    document.getElementById('resultado-Busqueda').innerHTML ="";
    fetch(URL + "Alumnos/filtroAlumnos", {method: 'POST', body: data})
      .then(json=>json.json())
      .then(pack=>{
        if(pack.err === true){
          alert("Postulante no registrado");
        }else{
          document.getElementById('resultado-Busqueda').innerHTML = `<p style="font-size: 2.8rem;
          font-weight: bold;">${pack.alumnos.nombre} ${pack.alumnos.paterno} ${pack.alumnos.materno}</p> 
          <button data-bs-toggle="modal" data-bs-target="#Editar" onclick="editar(${pack.alumnos.id})" class="btn btn-success">Editar</button>`
        }
      });
})

//Editar 
const editar = id =>{
  document.getElementById('editar-text').value = id;
}
const formularioEditar = document.getElementById("editar-form");
formularioEditar.addEventListener("submit", function(e){
    e.preventDefault();
    let data = new FormData(formularioEditar);
    var pae = false;
    fetch(URL + "Alumnos/update", {method: 'POST', body: data})
      .then(json=>json.json())
      .then(pack=>{
        if(pack.estado === 'ok'){
          document.getElementById('editar-form').reset();
          document.getElementById('resultado-Busqueda').innerHTML="";
          alert('Datos actualizados');
        }else{
          document.getElementById('editar-form').reset();
          alert('No se editó');
        }
      });
}) 

//Total por carreras
const filtroTotalCarreras = (id,inst) =>{
  let data = new FormData();
  data.append("filtroCarrera", id);
  document.getElementById('Contenedor-Total').innerHTML ="";
  fetch(URL + "Alumnos/countStudent", {method: 'POST', body:data})
        .then(json=>json.json())
        .then(pack=>{
            let cuerpo="";
            let tot=pack.total;
            cuerpo += `<div class="card-header" id="cabeza" style="font-size:1.5rem; font-weight: bold;">
            ${inst}                   
            </div>
            <div class="card-body">
                <h5 class="card-title" style="margin-bottom:20px;" id="total">${tot} Postulantes </h5> 
            </div>
            <a href="#" class="btn btn-danger" onclick="cerrarTotal()">Cerrar</a>
            <hr>`

            document.getElementById('Contenedor-Total').innerHTML += cuerpo;
            document.getElementById('Contenedor-Total').style.display="block";
        });

}

//Editar rango por carreras

const editarRango = (id, nombre) => {
  updateRange = id;
  document.getElementById('cuerpoCarrera').innerHTML = `<h3>${nombre}</h3> `
}

const rangoBtn = document.getElementById('guardarRango');
rangoBtn.onclick =()=>{
  let valorRango = document.getElementById('rango').value;
  
  console.log(updateRange, valorRango);

  let data = new FormData();
  data.append("id", updateRange);
  data.append("rango", valorRango);
  if(document.getElementById('rango').value != ""){
    fetch(URL + "Grado/update", {method: 'POST', body:data})
    .then(json=>json.json())
    .then(pack=>{
      if(pack.estado === 'ok'){
        document.getElementById('cuerpoCarrera').innerHTML = "";
        document.getElementById('rango').value ="";
        alert('Rango de nota actualizado');
      }else{
        alert('No se editó el rango de nota');
      }
    });
  }
  else{
    alert('Es obligatorio llenar el campo');
  }
}

//Reporte por carreras
const reporteCarreras = (id,inst) =>{
  window.location = "https://apirestitpm.itpm.edu.bo/pdf/fpdf/tutorial/reportAlumnosRepApro.php?id_carr="+id+"&carr="+inst;
}

//Reporte para alumnos
const reporteAlumnos = (id,inst) =>{
  window.location = "https://apirestitpm.itpm.edu.bo/pdf/fpdf/tutorial/reportAlumnos.php?id_carr="+id+"&carr="+inst;
}



//Abre la ventana para buscar
function buscar(){
  document.getElementById('Contenido-Buscar').style.display = "block";
}

//Cierra cancela la ventana para buscar
function cierraBuscar(){
  document.getElementById('Contenido-Buscar').style.display = "none";
  document.getElementById('resultado-Busqueda').innerHTML ="";
}

//Captura el correo del inicio de sesión correcto 
var capturar = "";
function capturaUsu(){
    capturar = document.getElementById('floatingInput').value;
    document.getElementById('nombreUsu').innerHTML = capturar;
}

//Limpia o resetea la ventana modal de registro de postulante nuevo
function BorrarDatos(){
    document.getElementById('Registro-form').reset();
}
