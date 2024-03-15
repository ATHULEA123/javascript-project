// employeeeeeeeee pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

function formopen() {
  const addemployeeform = document.getElementById("employeeform");
  addemployeeform.style.display = "block";
  overlayOn();
}
function formclose() {
  const addemployeeform = document.getElementById("employeeform");
  addemployeeform.style.display = "none";
  overlayOff();
}

function overlayOn() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
}
function overlayOff() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}

// get dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

var itemsperpage = 5;

var table = [];
formList();
async function formList() {
  
  try {
   
    const response = await fetch("http://localhost:3000/employees");
   
    if (!response.ok) {
      throw new Error("Network response was not ok");
      
    }
    const data = await response.json();
    employeinfo = data;
    table = data.reverse();
    searchData(data)
    displayData(1)
    renderpagination() 

  } catch (error) {
    console.error("Error:", error);
  }
}

    var datacount = document.getElementById("floatingselect");
    datacount.addEventListener("change", function () {
      itemsperpage = parseInt(datacount.value);
      formList();

    });

    
    var currentpage = 1;
    //paginationnnnnnnnnnnnnnnn 1

 const totalemployee = document.getElementById("totalemployeee");
//  totalemployee.innerHTML = `of ${employeinfo.length}`;

    function displayData(page) {
      
      const start = (page - 1) * itemsperpage;
      const end = start + itemsperpage;

      const paginatedData = table.slice(start, end);

      let outputHTML = "";
      
      paginatedData.forEach((element, index) => {
        const id = element.id;
        

        outputHTML += `  
        <tr>

          <th scope="row"># ${index + start + 1}</th>
          <td><img  class="addimage" src="http://localhost:3000/employees/${element.id}/avatar"
           
           alt="" height = "30px "width = "30px">${element.salutation}.${
          element.firstName
        } ${element.lastName}</td>
          <td>${element.email}</td>
          <td>${element.phone}</td>
          <td>${element.gender}</td>
          <td>${element.dob}</td>
          <td>${element.country}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-" type="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-ellipsis"></i>
              </button>
              <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="index2.html?id=${id}" onclick="viewDetial"><i class="fa-regular fa-eye"></i> View
                          Details</a></li>
                  <li><a class="dropdown-item" href="#" onclick="editformopen('${
                    element.id
                  }')"><i class="fa-solid fa-pencil"></i>
                          Edit</a></li>
                  <li><a class="dropdown-item" href="#" onclick="dele('${id}')"><i class="fa-solid fa-trash"></i>
                          Delete</a></li>
              </ul>
            </div>
          </td>
        </tr>`;
        //starting paginationnnnnnnnnnnnnnnnnnnnnnnnnnnnn
      });

      let output = document.querySelector(".table-body");
      output.innerHTML = outputHTML;
      console.log(table);
    }
    //paginationnnnnnnnnnnnnnnn 1 enddd
    
    function renderpagination() {

      const pagination = document.getElementById("pagination"); //pagination leftclickkkkkk
      pagination.innerHTML = "";

      var doubleclick = document.createElement("li");
      doubleclick.innerHTML = '<i class="fa-solid fa-angles-left" style="color: #2B3674";></i>';
      pagination.appendChild(doubleclick);
      doubleclick.addEventListener("click",() => {
        if (currentpage >=3) {
          
          currentpage = currentpage-2 ;
        }else{
          currentpage
        }
        displayData(currentpage);
        highlightbtn(currentpage);
      })

      
      var leftclick = document.createElement('li');
      leftclick.innerHTML = '<i class="fa-solid fa-chevron-left" style="color: #2B3674;"></i>';
      pagination.appendChild(leftclick);

      leftclick.addEventListener("click",() => {
         if(currentpage > 1){
           
          currentpage-- 
         }else{
             currentpage = 1;
         }
         displayData(currentpage);
         highlightbtn(currentpage);
      })

     
      totalpage = Math.ceil(table.length / itemsperpage);////////////////////////////////////////////////
     
      
      for (let i = 1; i <= totalpage; i++) {
        const pageitem = document.createElement("li");
        pageitem.textContent = i;

        pagination.appendChild(pageitem);

        pageitem.addEventListener("click", () => {
          currentpage = i;

          displayData(currentpage);
          highlightbtn(currentpage);
        });
      }

      var rightclick = document.createElement('li');
      rightclick.innerHTML = '<i class="fa-solid fa-angle-right" style="color: #2B3674;"></i>';
      pagination.appendChild(rightclick);

      rightclick.addEventListener("click",() => {
         if(currentpage < totalpage){
           
          currentpage++
         }else{
             currentpage = totalpage;
         }
         displayData(currentpage);
         highlightbtn(currentpage);
      })
      //rightdoubleclck

      var rightdoubleclick = document.createElement('li');
      rightdoubleclick.innerHTML = `<i class="fa-solid fa-angles-right" style="color: #2B3674;"></i>`;
      pagination.appendChild(rightdoubleclick);
      rightdoubleclick.addEventListener("click",() => {
        if(currentpage <= totalpage-2){

          currentpage = currentpage+2 ;
          
        }else{
          currentpage;
        }
        displayData(currentpage);
        highlightbtn(currentpage);
      })
      const activebutton = document.getElementById(`page`);

    }
    

    renderpagination();
    displayData(currentpage);
 
//pagination buttonnsssssssss colorrr changeeeeeeeeee
function highlightbtn(currentpage){
  let paginationcontainer = document.getElementById("pagination");
  let button = paginationcontainer.querySelectorAll("li");
  button.forEach((li) =>{
    if (parseInt(li.textContent) === currentpage) {
      li.classList.add("selected");
    }else{
      li.classList.remove("selected");
    }
  })
 
}



//  form submittttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt

const form = document.getElementById("postForm");

function add()  {
  // e.preventDefault();

  var salutation = document.getElementById("salutation")?.value;
  let firstName = document.getElementById("firstName")?.value;
  var lastName = document.getElementById("lastName")?.value;
  var email = document.getElementById("email")?.value;
  var phone = document.getElementById("phone")?.value;
  var dob = document.getElementById("dob")?.value;
  var address = document.getElementById("address")?.value;
  var country = document.getElementById("country")?.value;
  var state = document.getElementById("state")?.value;
  var city = document.getElementById("city")?.value;
  var qualifications = document.getElementById("qulafi")?.value;
  var password = document.getElementById("password")?.value;
  var maleradio = document.getElementById("maleradio");
  username = "jhjhbjb";
  

  var formatedDate = changeformat(dob);
  function changeformat(dob) {
    dateArr = dob.split("-");
    let date = dateArr[2];
    let mont = dateArr[1];
    let year = dateArr[0];
    const showFormat = date + "-" + mont + "-" + year;
    console.log("updated format is", showFormat);
    return showFormat;
  }

  const newForm = {
    salutation,
    lastName,
    firstName,
    email,
    phone,
    gender: maleradio.checked ? "Male" : "Female",
    address,
    country,
    state,
    city,
    qualifications,
    username:firstName + lastName,
    dob: formatedDate,
    password
  };

   console.log(newForm);

    fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newForm),
  })
    .then((resData) => {
      if(!resData.ok){
        throw new error("errorrr");
      }else{
        formclose() 
      }
       return resData.json()

})


    .then(  (data) => {
      console.log("success", data);
      
      
      //image

      let uploadImg = document.getElementById("exampleInputfile"); //imageee uploaddddddddddd
      const formData = new FormData();
      formData.append("avatar", uploadImg.files[0]);

      // var user = data;


      
      fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
        method: "POST",
        body: formData,
      }   );
      
      
      // if(data.ok){
       
        newForm.id = data.id;

        table.unshift(newForm);
        console.log(table);
        displayData(1);
       
        // Swal.fire({
        //   icon:"success",
    
        //   title: "add employee success",
        //   showconfirmButton:false,
        //   timer:1500,
        // });
      // }
      // else{
      //   console.log("sdfghj");
      // }
     
   
      
      

  })
  .then(()=>{
    Swal.fire({
      icon:"success",

      title: "add employee success",
      showconfirmButton:false,
      timer:1500,
    });
  })
 
 
  
    
  
 };




function addImg() {
  var preview = document.getElementById("imginfo");

  preview.s
  src = URL.createObjectURL(event.target.files[0]);
}

// delete sectionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

function deleteFormopen() {
  const deleteemployeeform = document.getElementById("deleteForm");
  deleteemployeeform.style.display = "block";
  overlayOn();
}
function deleteFormclose() {
  const addemployeeform = document.getElementById("deleteForm");
  addemployeeform.style.display = "none";
  overlayOff();
}

function dele(id) {
  deleteFormopen();
  // const personalId = id;
  const del = document.getElementById("conformDelete");
  del.addEventListener("click", function conformDelete() {
    fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
      
    });
    deleteFormclose();
    arrDele(id);
  });
 
}

function arrDele(id){
  table = table.filter(element => element.id !== id)
  displayData(1)
}

// ediitttttttttt pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

function editformclose() {
  const addemployeeform = document.getElementById("editemployeeform");
  addemployeeform.style.display = "none";
  overlayOff();
}
var editId;
function editformopen(id) {
  const addemployeeform = document.getElementById("editemployeeform");
  addemployeeform.style.display = "block";
  overlayOn();

  editId = id;
 

  fetch(`http://localhost:3000/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())

    .then((data) => {
      console.log("setttt", data);

      const formatedDate = changeformat(data.dob);
      function changeformat() {
        dateArr = data.dob.split("-");
        let date = dateArr[2];
        let mont = dateArr[1];
        let year = dateArr[0];
        const showFormat = date + "-" + mont + "-" + year;
        console.log("updated format is", showFormat);
        return showFormat;
      }

      let changeimg = document.getElementById("changeImg"); //changeeeeeeeeee imgggggggggggggggggg
      changeimg.src = `http://localhost:3000/employees/${data.id}/avatar`;

      document.getElementById("edit-salutation").value = data.salutation;
      document.getElementById("edit-FirstName").value = data.firstName;
      document.getElementById("edit-lastName").value = data.lastName;
      document.getElementById("edit-email").value = data.email;
      document.getElementById("edit-phone").value = data.phone;
      document.getElementById("edit-dob").value = formatedDate;
      document.getElementById("edit-qualifications").value =
      data.qualifications;
      document.getElementById("edit-address").value = data.address;
      document.getElementById("edit-country").value = data.country;
      document.getElementById("edit-state").value = data.state;
      document.getElementById("edit-city").value = data.city;
      document.getElementById("edit-pinzip").value = data.pin;

      const maleradio = document.getElementById("edit-maleradio");
      const femaleradio = document.getElementById("edit-femradio");
      const gender = data.gender;

      if (gender === "Male") {
        console.log(gender);
        maleradio.checked = true;
      } else if (gender === "Female") {
        console.log(gender);
        femaleradio.checked = true;
      }
      console.log(gender);
    });
  }
  // const saveEdits = document.getElementById("save-btn");
  const formedit = document.getElementById("formedit");
  // saveEdits.addEventListener("click", (e) => {
  //   e.preventDefault();

  function employeeedit(){
    var salutation = document.getElementById("edit-salutation");
    var firstName = document.getElementById("edit-FirstName");
    var lastName = document.getElementById("edit-lastName");
    var email = document.getElementById("edit-email");
    var phone = document.getElementById("edit-phone");
    var dob = document.getElementById("edit-dob").value;
    var address = document.getElementById("edit-address");
    var city = document.getElementById("edit-city");
    var state = document.getElementById("edit-state");
    var country = document.getElementById("edit-country");
    var qualifications = document.getElementById("edit-qualifications");
    var password = document.getElementById("edit-password");
    var editmaleradio = document.getElementById("edit-maleradio");
    var editfemradio = document.getElementById("edit-femradio");

    var formatedDate = changeformat(dob);
    function changeformat(dob) {
      dateArr = dob.split("-");
      let date = dateArr[2];
      let mont = dateArr[1];
      let year = dateArr[0];
      const showFormat = date + "-" + mont + "-" + year;
      console.log("updated format is", showFormat);
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
      qualifications: qualifications.value,
      username: firstName + email,
      password: dob + lastName,
      gender: editmaleradio.checked ? "Male" : "Female",
    };
    console.log(saveDetails);


    const newId = editId;

    fetch(`http://localhost:3000/employees/${newId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(saveDetails),
    });
    editformclose();

    let editImg = document.getElementById("exampleInputfile"); //editttttttttt imgeeeeeeeeeeeeeeeeeeeeeeee
    const editData = new FormData();
    editData.append("avatar", editImg.files[0]);

    return fetch(`http://localhost:3000/employees/${newId}/avatar`, {
      method: "POST",
      body: editData,
    });
    
  };
 


document
  .getElementById("exampleInputfile")
  .addEventListener("change", function (event) {
    const input = event.target;
    const preview = document.getElementById("changeImg");


    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  });

// searchhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh barrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr



        function searchData(data){
        let backendData = data;
        function populateTable(data) {

            const tableBody = document.getElementById('user-detial-body');

           
            tableBody.innerHTML = '';

            data.forEach((element, i) => {

                id = element.id;
                const row = document.createElement('tr');
                row.innerHTML =`  
                <tr>
        
                
                  <td><img  class="addimage" src="http://localhost:3000/employees/${element.id}/avatar"
                   
                   alt="" height = "30px "width = "30px">${element.salutation}.${
                  element.firstName
                }${element.lastName}</td>
                  <td>${element.email}</td>
                  <td>${element.phone}</td>
                  <td>${element.gender}</td>
                  <td>${element.dob}</td>
                  <td>${element.country}</td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-" type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="fa-solid fa-ellipsis"></i>
                      </button>
                      <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="index2.html?id=${id}" onclick="viewDetial"><i class="fa-regular fa-eye"></i> View
                                  Details</a></li>
                          <li><a class="dropdown-item" href="#" onclick="editformopen('${
                            element.id
                          }')"><i class="fa-solid fa-pencil"></i>
                                  Edit</a></li>
                          <li><a class="dropdown-item" href="#" onclick="dele('${id}')"><i class="fa-solid fa-trash"></i>
                                  Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>`;
                tableBody.appendChild(row);
            });

        }

        function filterData(searchTerm) {
            const filteredData = backendData.filter(item =>
                item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            populateTable(filteredData);
        }
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', handleSearchInput);


        

        function handleSearchInput() {

            const searchInput = document.getElementById('searchInput');
            const searchTerm = searchInput.value;
            filterData(searchTerm);
            if (searchTerm === "") {
                window.location.href = "index.html";
            }
        }
    
      }
// validaationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn


const errorMsg = document.getElementsByClassName("errorMsg");
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", (e) => {
   e.preventDefault();
  validateInput(salutation, 0, "Select Salutation");
  validateInput(firstName, 1, "Enter first name");
  validateInput(lastName, 2, "Enter last name");
  validateInput(email, 3, "Enter Email");
  validateInput(phone, 4, "Enter Mobile Number");
  validateInput(dob, 5, "Enter Date of Birth");
  validateGender();
  validateInput(qulafi, 7, "Enter Qualification");
  validateInput(password, 8, "Enter password");
  validateInput(address, 9, "Enter Address");
  validateInput(country, 10, "Select country");
  validateInput(state, 11, "Select State");
  validateInput(city, 12, "Enter City");
  // validateInput(pin, 12, "Enter Pin/Zip");
  add()
 
  
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
password.addEventListener("input", () => removeValidationErrors(8));
address.addEventListener("input", () => removeValidationErrors(9));
country.addEventListener("input", () => removeValidationErrors(10));
state.addEventListener("input", () => removeValidationErrors(11));
city.addEventListener("input", () => removeValidationErrors(12));
// pinEdit.addEventListener("input", () => removeValidationErrors(12));


function removeValidationErrors(serial) {
  const errorMsgs = document.querySelectorAll(".errorMsg");
  errorMsgs[serial].innerHTML = " "; 
}



// editerrorrrrrrrrrrrrrmsggggggggggggggggggggggggggg



const editerrormsg = document.getElementsByClassName("editerrormsg");
const savebtn = document.getElementById("savebtn");
  savebtn.addEventListener("click", (e) => {


    e.preventDefault();


    const editvalidateInput = (input, serial, msg) => {
      if (input.value === "") {
        editerrormsg[serial].innerHTML = msg;
      }
      
      
      else {
        editerrormsg[serial].innerHTML = "";
      }
      
    }
  
    var validatemaleradio = document.getElementById("edit-maleradio");
    var validatefemaleradio = document.getElementById("edit-femradio");
    const editvalidateGender = () => {
      if (!validatemaleradio.checked && !validatefemaleradio.checked) {
        editerrormsg[6].innerHTML = "Select gender";
      } 
      
      
      else {
        editerrormsg[6].innerHTML = "";
      }

    }
    


        
    var editsalutation = document.getElementById("edit-salutation");
    var editFirstName = document.getElementById("edit-FirstName");
    var editlastName = document.getElementById("edit-lastName");
    var editemail = document.getElementById("edit-email");
    var editphone = document.getElementById("edit-phone");
    var editdob= document.getElementById("edit-dob");
    var editqualifications = document.getElementById("edit-qualifications");
    var editaddress = document.getElementById("edit-address");
    var editcountry = document.getElementById("edit-country");
    var editstate = document.getElementById("edit-state");
    var editcity = document.getElementById("edit-city");


    editvalidateInput(editsalutation, 0, "Select Salutation");
    editvalidateInput(editFirstName, 1, "Enter first name");
    editvalidateInput(editlastName, 2, "Enter last name");
    editvalidateInput(editemail, 3, "Enter Email");
    editvalidateInput(editphone, 4, "Enter Mobile Number");
    editvalidateInput(editdob, 5, "Enter Date of Birth");
    editvalidateGender();
    editvalidateInput(editqualifications, 7, "Enter Qualification");
    editvalidateInput(editaddress, 8, "Enter Address");
    editvalidateInput(editcountry, 9, "Select country");
    editvalidateInput(editstate, 10, "Select State");
    editvalidateInput(editcity, 11, "Enter City");
   
    employeeedit();
   
    
  })
  
  

  
  //Add event listeners for input fields in the edit form
  // editsalutation.addEventListener("input", () => removeeditValidationErrors(14));
  // editFirstName.addEventListener("input", () => removeeditValidationErrors(15));
  // editlastName.addEventListener("input", () => removeeditValidationErrors(2));
  // editemail.addEventListener("input", () => removeeditValidationErrors(3));
  // editphone.addEventListener("input", () => removeeditValidationErrors(4));
  // editdob.addEventListener("input", () => removeeditValidationErrors(5));
  // editqualifications.addEventListener("input", () => removeValidationErrors(7));
 
  // editaddress.addEventListener("input", () => removeeditValidationErrors(8));
  // editcountry.addEventListener("input", () => removeeditValidationErrors(9));
  // editstate.addEventListener("input", () => removeeditValidationErrors(10));
  // editcity.addEventListener("input", () => removeeditValidationErrors(11));
  // // pinEdit.addEventListener("input", () => removeValidationErrors(12));
  
  // // Function to remove validation error messages in the edit form
  // function removeeditValidationErrors(serial) {
  //   const errorMsgs = document.querySelectorAll("#editerrormsg");
  //   errorMsgs[serial].innerHTML = ""; // Remove the validation error message
  // }
 