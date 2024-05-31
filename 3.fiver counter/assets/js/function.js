/**
 * Alert function
 */

const setAlert = (msg, type = 'danger') => {
    return `<p class="alert alert-${type} d-flex justify-content-between"> ${msg} <button data-bs-dismiss="alert" class="btn-close"></button></p>`
}


/**
 * email check
 */

// const emailCheck = (email) => {
//     let emailPattern = /^[a-z0-9\._]{1,}@[a-z0-9]{1,}\.[a-z]{1,4}$/;
//     return emailPattern.test(email);
// }




/**
 * get all Ls data
 * @param {*} key 
 */

const readLsData = (key) => {

    if(localStorage.getItem(key)) {

        return JSON.parse(localStorage.getItem(key))
    }else {
        return false;
    }


}




/**
 * set values  LS
 */

const createLSData = (key, value) => {
// init val
    let data = [];
    //  chek key exists or not
    if(localStorage.getItem(key)){

         data = JSON.parse(localStorage.getItem(key));
    }
    // now push data to LS
    data.push(value);
    // Set data
    localStorage.setItem(key, JSON.stringify(data));

}



/**
 * Update our LS Data
 */

const updateLSData = (key, array) => {

    localStorage.setItem(key, JSON.stringify(array));

}


/**
 *       Time Counter
 */

const futureTimeCoundown = (date, time, counter, interval = null, alarm = null) =>{

    // interval && clearInterval(interval)

     //  get timestamp
     let start_time = Date.now();
     let end_time = new Date(date + ' ' + time)
     let order_time = Math.floor(Math.abs(end_time.getTime() - start_time));

     
     // get val form time

     let total_sec = Math.floor(order_time / 1000);
     let total_min = Math.floor(total_sec / 60);
     let total_hour = Math.floor(total_min / 60);
     let total_day = Math.floor(total_hour / 24);


     let hours = total_hour - (total_day * 24);
     let min = total_min - (total_day * 24 * 60) - (hours * 60);
     let sec = total_sec - (total_day * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60);


     if(total_sec <= 0){
       clearInterval(interval)
       alarm.play();
     }




     counter.innerHTML = ` <h1> ${total_day} Days: ${hours} Hours : ${min} Min : ${sec} sec</h1>`

}

/**
 * counter per
 */

const  counterPer = (start_time, end_time) =>{

   let time_diff = end_time - start_time;

   let time_change = end_time - Date.now();

    return Math.floor((100 * time_change) / time_diff);
}


