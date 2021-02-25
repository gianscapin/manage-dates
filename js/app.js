import Dates from './classes/Date.js'
import UI from './classes/Ui.js'

// Variables

export let DB;

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




window.onload = () =>{
    eventListeners();
    createDB();
}

// Funciones


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

        admDates.editDate({...dateObj});

        // Edita en IndexDB
        const transaction = DB.transaction(['dates'],'readwrite');
        const objectStore = transaction.objectStore('dates');

        objectStore.put(dateObj)

        transaction.oncomplete = () =>{
            ui.printAlert('Datos editados correctamente.')

            form.querySelector('button[type="submit"]').textContent = 'CREAR CITA';

            editing = false;

        }

        transaction.onerror = () =>{
            console.log('Hubo un error');
        }



    }else{
        
        // Crear id de la cita
        dateObj.id = Date.now();

        // Agregar cita
        admDates.addDates({...dateObj});

        // Insertar Registro en IndexedDB
        const transaction = DB.transaction(['dates'],'readwrite');

        const objectStore = transaction.objectStore('dates');
        
        objectStore.add(dateObj);

        transaction.oncomplete = function(){
            console.log('Cita agregada')
            
            ui.printAlert('Datos agregados correctamente.')
        }

       
    }

    // Reiniciar objeto
     resetObjetc()

    // Reiniciar el formulario

    form.reset();

    // Mostrar en el HTML las citas
    ui.printDates()
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
    
    const transaction = DB.transaction(['dates'],'readwrite');
    const objectStore = transaction.objectStore('dates');

    objectStore.delete(id);

    transaction.oncomplete = () =>{
        ui.printAlert('La cita se eliminó correctamente.');
        ui.printDates();
    }

    transaction.onerror = () =>{
        console.log('Hubo un error');
    }

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

function createDB(){
    const createDB = window.indexedDB.open('dates',1);

    // Si hay error
    createDB.onerror = function(){
        console.log('Hubo un error')
    }

    // Si sale todo bien

    createDB.onsuccess = function(){
        console.log('Base de datos creada')

        DB = createDB.result;

        ui.printDates();
    }


    // Definir esquema

    createDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('dates',{
            keyPath: 'id',
            autoincrement: true
        });

        // Definir todas las columnas

        objectStore.createIndex('pet','pet',{unique:false})
        objectStore.createIndex('owner','owner',{unique:false})
        objectStore.createIndex('phone','phone',{unique:false})
        objectStore.createIndex('date','date',{unique:false})
        objectStore.createIndex('hour','hour',{unique:false})
        objectStore.createIndex('sympthoms','sympthoms',{unique:false})
        objectStore.createIndex('id','id',{unique:true})

        console.log('DB creada y lista')
    }
}