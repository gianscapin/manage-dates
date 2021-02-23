import {deleteDate,loadEdit,containerDates} from '../app.js'

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

export default UI;