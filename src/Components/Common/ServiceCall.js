export function makeServiceCall(reqData,callback) {
    console.log("reqData",reqData)
    let options = {
        method: reqData.method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
       
      };
      if(reqData.method==="POST"){
        options.body= JSON.stringify(reqData.body);
      }
      fetch(`${reqData.url}`,options)
      .then(response=>response.json())
      .then(data=>{

          console.log("The data is ---",data);
          callback(data);
      })

}

export function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dateVal = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  let ampm = 'am';
  if(hour>12) {
      console.log("inside hr gre")
    hour = hour-12;
    ampm='pm'
  }
  if(hour===12) {
    ampm="pm"
  }
  if(minute<10) {
    minute = `0${minute}`
  }
  let dateFormat = `${dateVal}/${monthIndex}/${year}`
 

  return `${dateFormat} ${hour}:${minute}${ampm}`

}
