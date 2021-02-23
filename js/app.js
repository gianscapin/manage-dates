import Dates from './classes/Date.js'
import UI from './classes/Ui.js'

// Variables

const petInput = document.getElementById('mascota')
const ownerInput = document.getElementById('propietario')
const phoneInput = document.getElementById('telefono')
const dateInput = document.getElementById('fecha')
const hourInput = document.getElementById('hora')
const symptomsInput = document.getElementById('sintomas')

const form = document.getElementById('nueva-cita')


export const containerDates = document.getElementById('citas')

let editing;

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

export function deleteDate(id){
    admDates.deleteDate(id);

    ui.printAlert('La cita se eliminó correctamente.');

    ui.printDates(admDates);
}

// Carga datos y edita la cita.

export function loadEdit(date){
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