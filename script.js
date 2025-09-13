const NUM_MESAS = 8;
let mesas = [];
let reservas = [];

function init(){
  const select = document.getElementById("mesaSelect");

  for(let i=1; i<=NUM_MESAS; i++){
    mesas.push({ num:i, estado:"disponible", reserva:null });

    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = "Mesa " + i;
    select.appendChild(opt);
  }
  renderMesas();
}

function renderMesas(){
  const grid = document.getElementById("gridMesas");
  grid.innerHTML = "";

  mesas.forEach(m => {
    let div = document.createElement("div");
    div.className = "mesa " + m.estado;
    div.textContent = "Mesa " + m.num + "\n(" + m.estado + ")";
    grid.appendChild(div);
  });

  renderReservas();
}

function renderReservas(){
  const lista = document.getElementById("listaReservas");
  lista.innerHTML = "";

  reservas.forEach(r => {
    let li = document.createElement("li");
    li.innerHTML = `<b>${r.nombre}</b> - Mesa ${r.mesa} - ${r.personas} personas - ${r.fecha} ${r.hora}
      <div class="acciones">
        <button class="btn-success" onclick="ocuparReserva(${r.mesa})">Ocupar</button>
        <button class="btn-danger" onclick="cancelarReserva(${r.mesa})">Cancelar</button>
      </div>`;
    lista.appendChild(li);
  });
}

function crearReserva(){
  const nombre = document.getElementById("nombre").value.trim();
  const personas = document.getElementById("personas").value;
  const mesa = parseInt(document.getElementById("mesaSelect").value);
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  if(!nombre || !fecha || !hora){
    alert("Completa todos los datos");
    return;
  }

  let m = mesas.find(x => x.num === mesa);
  if(m.estado !== "disponible"){
    alert("La mesa no está disponible");
    return;
  }

  reservas.push({ nombre, personas, mesa, fecha, hora });
  m.estado = "reservada";

  renderMesas();
  document.getElementById("formReserva").reset();
}

function ocuparReserva(mesaNum){
  let m = mesas.find(x => x.num === mesaNum);
  if(m) m.estado = "ocupada";

  reservas = reservas.filter(r => r.mesa !== mesaNum);
  renderMesas();
}

function cancelarReserva(mesaNum){
  let m = mesas.find(x => x.num === mesaNum);
  if(m) m.estado = "disponible";

  reservas = reservas.filter(r => r.mesa !== mesaNum);
  renderMesas();
}

init();
