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

export default Dates;