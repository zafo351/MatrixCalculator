/*##############################################################################
############         PROYECTO FINAL MATEMATICAS DISCRETAS       ################
############         CALCULADORA GRAFICA DE MATRICES            ################ 
################################################################################*/

// Código para analizar propiedades de una matriz y mostrar los resultados en una página web.

// Función para manejar el cambio a la visualización de campos manuales
function handleChangeM() {
  document.getElementById("camposManuales").style.display = "block";
  document.getElementById("camposAutomaticos").style.display = "none";
}

// Función para manejar el cambio a la visualización de campos automáticos
function handleChangeA() {
  // Obtener el elemento "camposManuales" y ocultarlo
  document.getElementById("camposManuales").style.display = "none";

  // Obtener el elemento "camposAutomaticos" y mostrarlo
  document.getElementById("camposAutomaticos").style.display = "block";
}

// Función principal que se ejecuta al cargar la página
function main() {
  // Seccion de variables globales de la funcion
  var elem = document.getElementById("tableMatriz");
  var formato = document.getElementsByName("gender");
  var tipoFormato = "";

  // Condicional para elemento Nulo o no definido
  if (elem != null && elem != undefined) {
    elem.remove();
  }
  
  // Recorrido de los elementos de formato para obtener el tipo seleccionado
  for (var i = 0; i < formato.length; i++) {
    if (formato[i].checked) {
      tipoFormato = formato[i].value;
    }
  }

  // Verificar si se ha seleccionado un tipo de formato
  if (tipoFormato == "") {
    alert("Debe seleccionar el formato de ingreso de la matriz");
  } else if (tipoFormato == "manual") {
    // Obtener los valores de entrada para el formato manual
    var g = document.getElementById("g").value;
    var r = document.getElementById("relacion").value;
    var g_divida = g.split(",");
    var tamano = g_divida.length;
    if (g == null || g == undefined || g == "") {
      alert("Ingrese los elementos del conjunto");
      return;
    }
    if (r == null || r == undefined || r == "") {
      alert("Ingrese la relacion del conjunto");
      return;
    }
  } else {
    // Generar una matriz automáticamente
    var tamano = document.getElementById("tamanoA").value;
    if (tamano == null || tamano == undefined || tamano == "") {
      alert("Ingrese el tamaño de la matriz");
      return;
    }
    var data = generarMatrizAutomatica(tamano);
    var g = data.g;
    var r = data.r;
  }

  var matriz = llenadoMatriz(tamano, g, r);
  pintarMatriz(matriz);
  var is_reflexiva = reflexiva(matriz);
  document.getElementById("propiedades").style.display = "block";
  if (!is_reflexiva) {
    document.getElementById("is_reflexiva").style.display = "none";
    var is_irreflexiva = irreflexiva(matriz);
    if (is_irreflexiva) {
      document.getElementById("is_irreflexiva").style.display = "block";
      document.getElementById("is_irreflexiva").innerHTML = "Es irreflexiva";
    } else {
      document.getElementById("is_irreflexiva").style.display = "none";
    }
  } else {
    document.getElementById("is_irreflexiva").style.display = "none";
    document.getElementById("is_reflexiva").innerHTML = "Es reflexiva";
    document.getElementById("is_reflexiva").style.display = "block";
  }
  var is_simetrica = simetrica(matriz);
  if (is_simetrica) {
    document.getElementById("is_simetrica").style.display = "block";
    document.getElementById("is_simetrica").innerHTML = "Es simetrica";
  } else {
    document.getElementById("is_simetrica").style.display = "none";
  }
  var is_asimetrica = asimetrica(matriz);
  if (is_asimetrica) {
    document.getElementById("is_asimetrica").style.display = "block";
    document.getElementById("is_asimetrica").innerHTML = "Es asimetrica";
  } else {
    document.getElementById("is_asimetrica").style.display = "none";
  }
  var is_antisimetrica = antisimetrica(matriz);
  if (is_antisimetrica) {
    document.getElementById("is_antisimetrica").style.display = "block";
    document.getElementById("is_antisimetrica").innerHTML = "Es antisimetrica";
  } else {
    document.getElementById("is_antisimetrica").style.display = "none";
  }
  var is_transitiva = transitiva(matriz, g, r);
  if (is_transitiva) {
    document.getElementById("is_transitiva").style.display = "block";
    document.getElementById("is_transitiva").innerHTML = "Es transitiva";
  } else {
    document.getElementById("is_transitiva").style.display = "none";
  }

  var is_equivalencia = false;
  if (is_reflexiva && is_simetrica && is_transitiva) {
    is_equivalencia = true;
    document.getElementById("is_equivalencia").style.display = "block";
    document.getElementById("is_equivalencia").innerHTML = "Es equivalente";
  } else {
    document.getElementById("is_equivalencia").style.display = "none";
  }
  if (
    !is_reflexiva &&
    !is_irreflexiva &&
    !is_simetrica &&
    !is_asimetrica &&
    !is_antisimetrica &&
    !is_transitiva
  ) {
    document.getElementById("sin_propiedades").style.display = "block";
    document.getElementById("sin_propiedades").innerHTML =
      "No cumple ninguna propiedad.";
  } else {
    document.getElementById("sin_propiedades").style.display = "none";
  }
}


// Función para dibujar la matriz en la página web
function pintarMatriz(m1) {
  var body = document.getElementById("resultado");
  var tbl = document.createElement("table");
  tbl.style.width = "100%";
  tbl.style.padding = "0% 40%";
  tbl.setAttribute("border", "1");
  tbl.setAttribute("id", "tableMatriz");
  var tbdy = document.createElement("tbody");
  for (var i = 0; i < m1.length; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < m1[i].length; j++) {
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(m1[i][j]));
      td.style.width = "15px";
      tbl.style["text-align"] = "center";
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

/* esta función genera un número entero aleatorio entre min y max, 
ambos incluidos como posibles valores de salida. */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generarMatrizAutomatica(tamano) {
  var newg = "";
  for (var i = 0; i < tamano; i++) {
    newg += i + 1;
    newg += i + 1 == tamano ? "" : ",";
  }

  var g_divida = newg.split(",");
  var newr = "";
  for (var i = 0; i < tamano; i++) {
    for (var j = 0; j < tamano; j++) {
      var ramd = getRandomInt(0, 9);
      if (ramd % 2 == 1) {
        for (var k = 0; k < g_divida.length; k++) {
          newr += "(" + g_divida[i] + "," + g_divida[j] + ")";
          if (!(i + 1 == tamano && j + 1 == tamano && k + 1 == tamano)) {
            newr += ",";
          }
        }
      }
    }
  }
  return {
    g: newg,
    r: newr,
  };
}

function validarMatriz(m1) {
  // Es reflexiva?
  var is_reflexiva = reflexiva(m1);
  if (!is_reflexiva) {
    // Es irreflexiva?
    var is_irreflexiva = irreflexiva(m1);
  }
}

function equals(m1, m2) {
  var is_equals = true;
  for (var i = 0; i < m1.length; i++) {
    for (var j = 0; j < m1.length; j++) {
      if (m1[i][j] != m2[i][j]) {
        is_equals = false;
      }
    }
  }
  return is_equals;
}

function llenadoMatriz(tamano, g, r) {
  var matriz = [];
  // descomponer R
  var r_divida = r.split("),(");
  // descomponer G
  var g_divida = g.split(",");
  // descomponer subconjutnos
  for (var i = 0; i < tamano; i++) {
    var array_j = [];
    for (var j = 0; j < tamano; j++) {
      for (var k = 0; k < r_divida.length; k++) {
        var sub_r = r_divida[k].split(",");
        if (
          g_divida[i] == sub_r[0].replace("(", "") &&
          g_divida[j] == sub_r[1].replace(")", "")
        ) {
          array_j[j] = 1;
        } else if (array_j[j] != 1) {
          array_j[j] = 0;
        }
      }
    }
    matriz[i] = array_j;
  }
  return matriz;
}

function transponer(m1) {
  var matrizT = [];

  // Recorre la fila de la matriz
  for (var i = 0; i < m1[0].length; i++) {
    var array_j = [];
    // Recorre la fila de la matriz
    for (var j = 0; j < m1[i].length; j++) {
      array_j.push(m1[j][i]);
    }
    matrizT[i] = array_j;
  }
  return matrizT;
}

function tabular(g1, r1) {
  var new_relacion = "";
  var r_divida = r1.split("),(");
  var g_divida = g1.split(",");
  var tamano = g_divida.length;

  for (var i = 0; i < r_divida.length; i++) {
    var sub_ri = r_divida[i].split(",");
    var ri0 = sub_ri[0].replace("(", "");
    var ri1 = sub_ri[1].replace(")", "");
    for (var j = 0; j < r_divida.length; j++) {
      var sub_rj = r_divida[j].split(",");
      var rj0 = sub_rj[0].replace("(", "");
      var rj1 = sub_rj[1].replace(")", "");
      var relacion = "";
      if (ri1 == rj0) {
        var coma = ",";
        if (i == r_divida.length - 1 && j == r_divida.length - 1) {
          coma = "";
        }
        relacion += "(" + ri0 + "," + rj1 + ")" + coma;
        new_relacion += relacion;
      }
    }
  }
  return new_relacion;
}

function reflexiva(m1) {
  var valor_base = 1;
  var is_reflexiva = true;
  for (var i = 0; i < m1.length; i++) {
    if (valor_base != m1[i][i]) {
      is_reflexiva = false;
    }
  }
  return is_reflexiva;
}

function irreflexiva(m1) {
  var valor_base = 0;
  var is_irreflexiva = true;
  for (var i = 0; i < m1.length; i++) {
    if (valor_base != m1[i][i]) {
      is_irreflexiva = false;
    }
  }
  return is_irreflexiva;
}

function simetrica(m1) {
  var matrizT = transponer(m1);
  if (equals(m1, matrizT)) {
    return true;
  } else {
    return false;
  }
}

function asimetrica(m1) {
  var matrizT = transponer(m1);
  var is_asimetrica = true;
  for (var i = 0; i < m1.length; i++) {
    for (var j = 0; j < m1[i].length; j++) {
      if (i == j) {
        if (m1[i][j] == 1) {
          is_asimetrica = false;
        }
      } else if (m1[i][j] == matrizT[i][j]) {
        is_asimetrica = false;
      }
    }
  }
  return is_asimetrica;
}

function antisimetrica(m1) {
  var matrizT = transponer(m1);
  var is_antisimetrica = true;
  for (var i = 0; i < m1.length; i++) {
    for (var j = 0; j < m1[i].length; j++) {
      if (i != j) {
        if (m1[i][j] == matrizT[i][j] && m1[i][j] != 0) {
          is_antisimetrica = false;
        }
      }
    }
  }
  return is_antisimetrica;
}

function transitiva(m1, g, r) {
  var tabulacion = tabular(g, r);
  var g_divida = g.split(",");
  var matrizTabulada = llenadoMatriz(g_divida.length, g, tabulacion);

  if (equals(m1, matrizTabulada)) {
    return true;
  } else {
    return false;
  }
}
