export class Utility {

    getHours(date: any){
        const d = new Date(date * 1000);
        let hour = d.getUTCHours();
        var ampm = hour >= 12 ? 'PM' : 'AM';
        var strTime = hour + ':00' + ' ' + ampm;
        return strTime;
    }
    getDay(date: any){
        const day = (new Date(date * 1000)).toString();
        const split = day.slice(0, 10)
        return split;
    }

}