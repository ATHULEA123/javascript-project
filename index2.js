

 
 var viewDetials = new URLSearchParams(document.location.search);

 let id= viewDetials.get("id");
 console.log(id);


 asd()
function asd(){
  // let viewImg = document.getElementById("vieweDetailImg");
  // viewImg.src = `http://localhost:3000/employees/${id}/avatar`

  fetch(`http://localhost:3000/employees/${id}/avatar`,{
    
    method : 'GET',
    headers :{
      'content-type': 'application/json',
    }
  }) 

fetch(`http://localhost:3000/employees/${id}`, {

method: 'GET',
header :{
    'content-Type' : 'application/json',
}

})
.then(result => result.json())
.then(data => {

        // var ss = data.username ;

        const vieweDetailImg = document.getElementById("vieweDetailImg");
        vieweDetailImg.src =`http://localhost:3000/employees/${id}/avatar`;
    let userName = data.salutation +" " +data.firstName + " " + data.lastName;
    document.getElementById("username").innerHTML = userName;
    document.getElementById("useremail").innerHTML = data.email;
    document.getElementById("view-dob").innerHTML = data.dob;
    document.getElementById("view-age").innerHTML = viewage(data.dob);
    document.getElementById("view-mobile").innerHTML = data.phone;
    document.getElementById("view-address").innerHTML = data.address;
    document.getElementById("view-username").innerHTML = data.username.value;
    document.getElementById("view-qualifications").innerHTML = data.qualifications;
    document.getElementById("viewdetail-gender").innerHTML = data.gender;
     
    
    let fullName = data.firstName + " " + data.lastName;
    document.getElementById("view-username").innerHTML = fullName;
   
   


    function viewage (dob) {
        
         const datebirth = dob.split('-');
         var date = (datebirth[0]);
         var month = (datebirth[1]);
         var year = (datebirth[2]);

         const currentDate = new Date();

         var calcage = currentDate.getFullYear() - year;
         console.log(calcage);
         if(currentDate.getMonth()< month-1 ||currentDate.getMonth()===month-1 && currentDate.getDate() < date){
            calcage--
         }
         return calcage;
    }
    viewage(data.dob); 

})

}

// edit employeeeeeeeeeeeeeeeeeee 


function vieweditformclose(){
    const viewemployeeform = document.getElementById("vieweditemployeeform");
    viewemployeeform.style.display="none";
    // overlayOff(); 
  }
  
  var globPassword = "";
  function vieweditformopen(){
    const viewemployeeform = document.getElementById("vieweditemployeeform");
    viewemployeeform.style.display ="block";
    // overlayOn();
  
  
  
  
   fetch(`http://localhost:3000/employees/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type' : 'application/json',
    }
   })
   .then(response =>response.json())
  
   .then(data => {
 
  console.log("dataa",data)
  
  globPassword = data.password;
  const formatedDate = changeformat(data.dob);
  function changeformat(){
     dateArr = data.dob.split("-");
     let date = dateArr[2];
     let mont = dateArr[1];
     let year = dateArr[0];
     const showFormat = date + "-" +  mont + "-" + year;
     console.log("updated format is",showFormat)
         return showFormat;
         
  }
  

        
  const editviewimage = document.getElementById("editviewimage");
  editviewimage.src =`http://localhost:3000/employees/${id}/avatar`;

          document.getElementById("salutation").value = data.salutation;
          document.getElementById("firstName").value = data.firstName;
          document.getElementById("lastName").value = data.lastName;
          document.getElementById("email").value = data.email;
          document.getElementById("phone").value = data.phone;
          document.getElementById("dob").value = formatedDate;
          document.getElementById("qulafi").value = data.qualifications;
          document.getElementById("address").value = data.address;
          document.getElementById("country").value = data.country;
          document.getElementById("state").value = data.state;
          document.getElementById("city").value =  data.city;
          // document.getElementById("pinzip").value =  data.pin;
          
  
      const maleradio = document.getElementById("maleradio");
      const femaleradio = document.getElementById("femradio");
      const gender = data.gender;
  
      if(gender === "Male"){
        console.log(gender);
        maleradio.checked = true;
      }else if(gender ==="Female"){ 

        console.log(gender);
        femaleradio.checked = true;
      }
      console.log(gender);
  })
}
  const saveEdits = document.getElementById("save-btn");
  // saveEdits.addEventListener("click",(e)=> {
  //   e.preventDefault(); 
   function viewEdit(){
    var salutation = document.getElementById("salutation");
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
     var dob = document.getElementById("dob").value;
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var state = document.getElementById("state");
    var country = document.getElementById("country");
    var qualifications = document.getElementById("qualifi");
    // var password = document.getElementById("password");
    var maleradio = document.getElementById("maleradio");
    var femaleradio = document.getElementById("femradio");
    
   
 
    var formatedDate = changeformat(dob);
  function changeformat(dob){
     dateArr = dob.split("-");
     let date = dateArr[2];
     let mont = dateArr[1];
     let year = dateArr[0];
     const showFormat = date + "-" +  mont + "-" + year;
     console.log("updated format is",showFormat)
         return showFormat;
  
  
  }
    var saveDetails = {
      salutation: salutation.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
       dob: formatedDate,
      address: address.value,
      city: city.value,
      state: state.value,
      country: country.value,
      qualifications: qulafi.value,
      username :firstName + email,
      gender: maleradio.checked ? "Male" : "Female",
      password: globPassword,
  };
  console.log(globPassword);
   
              
              fetch(`http://localhost:3000/employees/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(saveDetails)
                
            })
            .then(response =>response.json())
  
  .then(data => {
 
    console.log("Updated employee data:", data);
    // Assuming you have a function to update the UI with the new data
    // updateUI(data);
    asd();
  })
           
           
  }

  // }

  // deleteeeeeeeeeeeeeeeeeeeeeeeeee sectionnnnnnnnnnnn


  function viewdeleteFormopen(){
    const deleteemployeeform = document.getElementById("deleteForm");
    deleteemployeeform.style.display ="block";
    // overlayOn();
  }
  function viewdeleteFormclose(){
    const addemployeeform = document.getElementById("deleteForm");
    addemployeeform.style.display="none";
    // overlayOff(); 
  }
  
  function dele(){
    viewdeleteFormopen();
    const personalId = id;
    
    const del = document.getElementById("conformDelete");
    del.addEventListener('click',  function conformDelete(){
            fetch(`http://localhost:3000/employees/${personalId}`, {
              method: 'DELETE',
    
          })
          .then(response =>response.json())

          .then(data =>{
             console.log("page",data);
             window.location.href = "index.html";
          })
        
  
  
  })
  }
  // vLIDATIONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

  const errorMsg = document.getElementsByClassName("errorMsg");
  const submitButton = document.getElementById("save-btn");
  submitButton.addEventListener("click", (e) => {
     e.preventDefault();
     var qualifications = document.getElementById("qualifi");
    validateInput(salutation, 0, "Select Salutation");
    validateInput(firstName, 1, "Enter first name");
    validateInput(lastName, 2, "Enter last name");
    validateInput(email, 3, "Enter Email");
    validateInput(phone, 4, "Enter Mobile Number");
    validateInput(dob, 5, "Enter Date of Birth");
    validateGender();
    
     validateInput(qulafi, 7, "Enter Qualification");
    
    validateInput(address, 8, "Enter Address");
    validateInput(country, 9, "Select country");
    validateInput(state, 10, "Select State");
    validateInput(city, 11, "Enter City");
    // validateInput(pin, 12, "Enter Pin/Zip");
    // add()
    viewEdit();
   
    
  });
  
  
  const validateInput = (input, serial, msg) => {
    if (input.value.trim() === "") {
      errorMsg[serial].innerHTML = msg;
    } else {
      errorMsg[serial].innerHTML = "";
    }
    
  };
  
  const validateGender = () => {
    if (!maleradio.checked && !femradio.checked) {
      errorMsg[6].innerHTML = "Select gender";
    } else {
      errorMsg[6].innerHTML = "";
    }
  };
  
  
  // Add event listeners for input fields in the edit form
  salutation.addEventListener("input", () => removeValidationErrors(0));
  firstName.addEventListener("input", () => removeValidationErrors(1));
  lastName.addEventListener("input", () => removeValidationErrors(2));
  email.addEventListener("input", () => removeValidationErrors(3));
  phone.addEventListener("input", () => removeValidationErrors(4));
  dob.addEventListener("input", () => removeValidationErrors(5));
  qulafi.addEventListener("input", () => removeValidationErrors(7));
 
  address.addEventListener("input", () => removeValidationErrors(8));
  country.addEventListener("input", () => removeValidationErrors(9));
  state.addEventListener("input", () => removeValidationErrors(10));
  city.addEventListener("input", () => removeValidationErrors(11));
  // pinEdit.addEventListener("input", () => removeValidationErrors(12));
  
  // Function to remove validation error messages in the edit form
  function removeValidationErrors(serial) {
    const errorMsgs = document.querySelectorAll(".errorMsg");
    errorMsgs[serial].innerHTML = ""; // Remove the validation error message
  }
  
  
  
  
  
  
  
  
  

 
