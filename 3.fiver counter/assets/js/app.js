const fiverr_form = document.getElementById('fiverr');
const counter = document.querySelector('.counter');
const alarm = document.querySelector('#alarm');
const stop = document.querySelector('#stop');
const bar = document.querySelector('.bar');

let coun;
// submit form

fiverr_form.onsubmit = (e) => {
  e.preventDefault();
  clearInterval(coun)
  // get form val
  const form_data = new FormData(e.target)
  const { date, time} = Object.fromEntries(form_data.entries())
  
   //  get timestamp
   let start_time = Date.now();
   let end_time = new Date(date + ' ' + time)

  // form submit count


 coun = setInterval(() => {
       
    futureTimeCoundown(date, time, counter, coun, alarm);

    let per = counterPer(start_time, end_time);

      if(per > 0 && per < 30){
        bar.style.backgroundColor = `red`
      }else if(per > 30 && per < 60){
        bar.style.backgroundColor = `blue`
      }else {
        bar.style.backgroundColor = `green`
      }


      per && (bar.style.display = 'block');
      bar.style.width = `${100 - per}%`

      
  }, 1000)


}


// stop alerm

stop.onclick = (e) => {
  e.preventDefault()
  alarm.pause();
}