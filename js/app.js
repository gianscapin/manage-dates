// Variables

const petInput = document.getElementById('mascota')
const ownerInput = document.getElementById('propietario')
const phoneInput = document.getElementById('telefono')
const dateInput = document.getElementById('fecha')
const hourInput = document.getElementById('hora')
const symptomsInput = document.getElementById('sintomas')

const form = document.getElementById('nueva-cita')


const containerDates = document.getElementById('citas')

let editing;

// Clases

class Dates{
    constructor(){
        this.dates = [];
    }

    addDates(date){
        this.dates.push(date);
    }

    deleteDate(id){
        this.dates = this.dates.filter( date => date.id != id);
    }

    editDate(dateEditated){
        this.dates = this.dates.map( date => date.id === dateEditated.id ? dateEditated : date);
    }
}

class UI{

    printAlert(message,type){

        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center','alert', 'd-block', 'col-12');

        if(type){
            divMessage.classList.add('alert-danger');
        }else{
            divMessage.classList.add('alert-success');
        }

        divMessage.textContent = message;

        document.getElementById('contenido').insertBefore(divMessage, document.querySelector('.agregar-cita'));

        setTimeout(()=>{
            divMessage.remove();
        },3000)
    }

    printDates({dates}){
        containerDates.innerHTML=``;
        dates.forEach(date =>{
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = date;

            const divDate = document.createElement('div');
            divDate.classList.add('cita','p-3');
            divDate.setAttribute('data-id',id);

            // Scripting de elementos de la cita

            const petP = document.createElement('h2');
            petP.classList.add('card-title','font-weight-bolder');
            petP.textContent = mascota;

            const ownerP = document.createElement('p');
            ownerP.innerHTML=`
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const phoneP = document.createElement('p');
            phoneP.innerHTML =`
            <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const dateP = document.createElement('p');
            dateP.innerHTML=`
            <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const hourP = document.createElement('p');
            hourP.innerHTML=`
            <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const symptomsP = document.createElement('p');
            symptomsP.innerHTML=`
            <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
            btnDelete.textContent = 'Eliminar';
            btnDelete.onclick = () => deleteDate(id);

            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn','btn-info');
            btnEdit.innerHTML = 'Editar';
            btnEdit.onclick = () => loadEdit(date);
            


            // Agregar los parrafos al div
            divDate.appendChild(petP);
            divDate.appendChild(ownerP);
            divDate.appendChild(phoneP);
            divDate.appendChild(dateP);
            divDate.appendChild(hourP);
            divDate.appendChild(symptomsP);
            divDate.appendChild(btnDelete);
            divDate.appendChild(btnEdit);


            // agregar las citas al HTML

            containerDates.appendChild(divDate);
        })
    }

}

const ui = new UI();
const admDates = new Dates();

// Funciones

eventListeners();

function eventListeners(){
    petInput.addEventListener('change', datesData)
    ownerInput.addEventListener('change',datesData)
    phoneInput.addEventListener('change',datesData)
    dateInput.addEventListener('change',datesData)
    hourInput.addEventListener('change',datesData)
    symptomsInput.addEventListener('change',datesData)

    form.addEventListener('submit', newDate)
}

const dateObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

function datesData(e){
    dateObj[e.target.name] = e.target.value;
    console.log(dateObj)
}

function newDate(e){
    e.preventDefault()

    const {mascota,propietario,telefono,fecha,hora,sintomas} = dateObj;

    // Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.printAlert('Todos los campos son obligatorios.','error')
        return;
    }


    if(editing){
        ui.printAlert('Datos editados correctamente.')

        admDates.editDate({...dateObj});

        form.querySelector('button[type="submit"]').textContent = 'CREAR CITA';

        editing = false;



    }else{
        ui.printAlert('Datos agregados correctamente.')
        // Crear id de la cita
        dateObj.id = Date.now();

        // Agregar cita
        admDates.addDates({...dateObj});

       
    }

    // Reiniciar objeto
     resetObjetc()

    // Reiniciar el formulario

    form.reset();

    // Mostrar en el HTML las citas
    ui.printDates(admDates)
}

function resetObjetc(){
    dateObj.mascota = '';
    dateObj.propietario = '';
    dateObj.telefono = '';
    dateObj.fecha = '';
    dateObj.hora = '';
    dateObj.sintomas = '';
}

// Elimina la cita

function deleteDate(id){
    admDates.deleteDate(id);

    ui.printAlert('La cita se eliminó correctamente.');

    ui.printDates(admDates);
}

// Carga datos y edita la cita.

function loadEdit(date){
    // Llenar input
    const {mascota,propietario,telefono,fecha,hora,sintomas,id} = date;

    petInput.value = mascota;
    ownerInput.value = propietario;
    phoneInput.value = telefono;
    dateInput.value = fecha;
    hourInput.value = hora;
    symptomsInput.value = sintomas;

    // LLenar objeto
    dateObj.mascota = mascota;
    dateObj.propietario = propietario;
    dateObj.telefono = telefono;
    dateObj.fecha = fecha;
    dateObj.hora = hora;
    dateObj.sintomas = sintomas;
    dateObj.id = id;

    // Cambiar texto del boton

    form.querySelector('button[type="submit"]').textContent = 'GUARDAR CAMBIO';

    editing = true;


}