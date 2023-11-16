var branchcode="";
try{
    var spantag = document.querySelectorAll("span");  
    spantag.forEach(function(spantag) {
    if (spantag.className === "logged-in-branch-code content_hidden") {
       branchcode=spantag.innerHTML;
    }
    });   
} catch (e){
  console.error(e.name);    // registra 'Error'
  console.error(e.message);
}

try{
if (document.body.id=="circ_circulation"){
//  if (branchcode==="AR-YGF"){
var botones = document.querySelectorAll('button'); // Esto selecciona todos los botones en el documento, ajusta el selector según tus necesidades.
var valorBuscado = "Préstamo"; // El valor que deseas encontrar en el innerHTML de los botones.
var busqa=document.querySelector(".barcode");
  if(busqa!=null){
      busqa.disabled=true;
    }
  botones.forEach(function(boton) {
  if (boton.innerHTML === valorBuscado) {
    // Encuentra un botón cuyo innerHTML coincide con el valor buscado.
    //console.log("Valor encontrado en el botón:", boton);
    boton.disabled=true;
    // Realiza aquí la lógica que desees con el botón encontrado.
  }
});
//}
}
} catch (e){
  console.error(e.name);    // registra 'Error'
  console.error(e.message);
}

/* agregar como tipo prestamo */
try{
if (document.body.id=="circ_circulation"){
  //if (branchcode==="AR-YGF"){
    var busfs=document.getElementById("clearscreen");
    if (busfs!=null){
      busfs.outerHTML="<span id=\"configscreen\"><a href=\"#\" title=\"Configurar Préstamo\" onclick=\"mostrarConfiguracion()\"><i class=\"fa fa-cog\"></i></a></span>"+busfs.outerHTML;
    }
  //}
}  
} catch (e){
  console.error(e.name);    // registra 'Error'
  console.error(e.message);
}

try{
if (document.body.id=="circ_circulation"){
  //if (branchcode==="AR-YGF"){
  var busqa=document.querySelector(".barcode");
  var f = new Date();
  
  if(busqa!=null){
	busqa.outerHTML=" <select id=\"TipoPrestamo\" class=\"btn btn-default dropdown-toggle\" onChange=\"setearFecha(this.value)\" style=\"width:30%;\"><option disabled selected>Seleccione una opción</option><option value=\"Normal\">Normal</option><option value=\"Unico\">Único</option><option value=\"Sala\">Sala</option><option value=\"Dia\">Por el día</option></select><div id=\"modalConfiguracion\" class=\"modal\"><div class=\"modal-content\"><span class=\"close-button\" onclick=\"cerrarConfiguracion()\">&times;</span><h2>Configuración de Valores</h2><label for=\"horasInput\">Horas:</label><input type=\"text\" id=\"horasInput\" name=\"horasInput\" placeholder=\"Ej: 3\"><br><label for=\"unicoInput\">Unico:</label><input type=\"text\" id=\"unicoInput\" name=\"unicoInput\" placeholder=\"Ej: 09:00\"><br><label for=\"unico_inicioInput\">Unico Inicio:</label><input type=\"text\" id=\"unico_inicioInput\" name=\"unico_inicioInput\" placeholder=\"Ej: 18\"><br><label for=\"cierreInput\">Cierre:</label><input type=\"text\" id=\"cierreInput\" name=\"cierreInput\" placeholder=\"Ej: 20:00\"><br><button type=\"button\" onclick=\"guardarValoresEnCookies()\">Guardar</button><button type=\"button\" onclick=\"cargarValoresDesdeCookies()\">Cargar</button></div></div>&nbsp;"+busqa.outerHTML;
  	var selpres=document.getElementById("TipoPrestamo");
  	var valores=leerValoresDesdeCookies();
  	var hh = f.getHours();
  	if(hh<=Number(valores.unico_inicio)){
    		selpres[2].disabled=true;
  	}
}
//}
}  
} catch (e){
  console.error(e.name);    // registra 'Error'
  console.error(e.message);
}
/* fin agregar tipo prestamo */

function setearFecha(tipoPrestamo) {
  var botones = document.querySelectorAll('button'); 
  var valorBuscado = "Préstamo";
  //var dateText = '';
  var valores=leerValoresDesdeCookies();
  var f = new Date();
  var x = document.getElementById('duedatespec');
  var y = document.getElementsByTagName('div');
  var circset=document.querySelector(".circ-settings");
  var busqa=document.querySelector(".barcode");

  // Habilita boton prestamo y barcode 
  if (circset!=null){
	if(busqa!=null){
      busqa.disabled=false;
      busqa.focus();
    }
    circset.style.display="block";
    botones.forEach(function(boton) {
    if (boton.innerHTML === valorBuscado) {
       boton.disabled=false;
    }
    });  
  }

  if (tipoPrestamo == "Unico") {
      f.setDate(f.getDate() + 1);
      realizarPeticionesAjax(218, f, branchcode).then(function(resultadoFinal) {
      	realizarPeticionesAjax(217, resultadoFinal, branchcode).then(function(fechaFinal) {
        console.log("Valor final de dd:",fechaFinal);
      	x.value=formatearFecha(fechaFinal, valores.unico);
     });    
    });
  } else if (tipoPrestamo == 'Sala') {
    try {
      var hh = f.getHours() + Number(valores.horas);
      var mi = f.getMinutes();
      mi=redondearMin(mi);
      mi = (mi < 10) ? '0' + mi : mi;
      var hora = (hh <= 20) ? hh + ':' + mi : valores.cierre;
      x.value=formatearFecha(f, hora);
    } catch (err) {
      alert("Error:" + err);
    }
  } else if (tipoPrestamo == 'Normal') {
    x.value = null;
    circset.style.display="none";
  } else if (tipoPrestamo == 'Dia') {
    x.value=formatearFecha(f, valores.cierre);
  }
}

function mostrarConfiguracion() {
      var modal = document.getElementById('modalConfiguracion');
      modal.style.display = 'block';
}

function cerrarConfiguracion() {
      var modal = document.getElementById('modalConfiguracion');
      modal.style.display = 'none';
}

// Función para guardar los valores en cookies
function guardarValoresEnCookies() {
  var modal = document.getElementById('modalConfiguracion');
  var horas = document.getElementById('horasInput').value;
  var unico = document.getElementById('unicoInput').value;
  var unico_inicio = document.getElementById('unico_inicioInput').value;
  var cierre = document.getElementById('cierreInput').value;

  // Guardar los valores en cookies
  document.cookie = `horas=${horas}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  document.cookie = `unico=${unico}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  document.cookie = `unico_inicio=${unico_inicio}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  document.cookie = `cierre=${cierre}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  modal.style.display = 'none';
}

// Función para cargar los valores desde las cookies
function cargarValoresDesdeCookies() {
  var cookies = document.cookie.split('; ');
  var cookieData = {};

  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split('=');
    cookieData[parts[0]] = parts[1];
  }

  var horas = cookieData.horas || '3';
  var unico = cookieData.unico || '09:00';
  var cierre = cookieData.cierre || '19:45';
  var unico_inicio = cookieData.unico_inicio || '18';

  // Asignar los valores a los elementos de la pantalla de configuración
  document.getElementById('horasInput').value = horas;
  document.getElementById('unicoInput').value = unico;
  document.getElementById('unico_inicioInput').value = unico_inicio;
  document.getElementById('cierreInput').value = cierre;
}

function leerValoresDesdeCookies() {
  var cookies = document.cookie.split('; ');
  var cookieData = {};
  var val = {horas:"",unico:"",cierre:"",unico_inicio:""};
  
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split('=');
    cookieData[parts[0]] = parts[1];
  }

  val.horas = cookieData.horas || '3';
  val.unico = cookieData.unico || '09:00';
  val.cierre = cookieData.cierre || '19:45';
  val.unico_inicio = cookieData.unico_inicio || '18';
  return val;
}

function realizarPeticionesAjax(idrepo,f, branchcode) {
var m = f.getMonth() + 1;
var d = f.getDate();
var aaaa = f.getFullYear();
  
  return new Promise(function(resolve, reject) {
    // Definir una función para realizar la petición AJAX
    function hacerPeticion() {
      var strJson ="";
      if (idrepo==218){
      strJson = "/cgi-bin/koha/svc/report?id="+idrepo+"?param_name=month&sql_params=" + m + "&param_name=day&sql_params=" + d + "&param_name=branchcode&sql_params=" + branchcode;
      }else{
       strJson = "/cgi-bin/koha/svc/report?id="+idrepo+"?param_name=year&sql_params=" + aaaa + "param_name=month&sql_params=" + m + "&param_name=day&sql_params=" + d + "&param_name=branchcode&sql_params=" + branchcode;
      }

      $.getJSON(strJson, function(data) {
        var resultado = data[0][0];

        if (resultado == 1) {
          // Realiza el procesamiento que necesitas con el resultado

          // Incrementa dd para la próxima iteración
          
		  do{
			  f.setDate(f.getDate() + 1);
			  ds = f.getDay();
          }while (ds==0 || ds==6);
			m = f.getMonth() + 1;
			d = f.getDate();
			aaaa = f.getFullYear();
          // Llama nuevamente a hacerPeticion para la siguiente iteración
          hacerPeticion();
        } else {
          // Fin del bucle, resultado no es igual a 1
          console.log("Fin del bucle");
          resolve(f);  // Resuelve la promesa con el valor final de dd
        }
      });
    }
    // Llamada inicial al bucle
    hacerPeticion();
  });
}

function formatearFecha(f,h){
  var m = f.getMonth() + 1;
  var mm = (m < 10) ? '0' + m : m;
  var d = f.getDate();
  var dd = (d < 10) ? '0' + d : d;
  var aaaa = f.getFullYear();
  dateText = dd + '/' + mm + '/' + aaaa;
  return dateText + " " + h;
}

function redondearMin(n) {
  if (n >= 0 && n <= 59) {
    // Utilizamos la división entera para determinar el grupo al que pertenece el número.
    var grupo = Math.floor(n / 10);
    
    // Multiplicamos el grupo por 15 para obtener el valor deseado.
    return grupo * 10;
  } else {
    // Manejar el caso en el que el número no está en el rango especificado.
    console.error("El número debe estar en el rango de 0 a 59.");
    return null; // o podrías devolver un valor predeterminado, dependiendo de tus necesidades.
  }
}
