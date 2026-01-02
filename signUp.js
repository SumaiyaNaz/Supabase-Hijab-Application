import supabase from "./config.js";
let signUp = document.getElementById("signUp");

async function signUpUser(e) {
  e.preventDefault();

  let sname = document.getElementById("exampleInputName1");
  let sphone = document.getElementById("exampleInputPhone1");
  let semail = document.getElementById("exampleInputEmail1");
  let spaass = document.getElementById("exampleInputPassword1");

  try {
    if (!sname.value) {
      alert("Enter your name");
      return;
    } else if (!sphone.value) {
      alert("Enter your phone number");
      return;
    } else if (!semail.value) {
      alert("Enter your email");
      return;
    } else if (!spaass.value) {
      alert("Enter your password");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: semail.value,
      password: spaass.value,
      options: {
        data: {
          name: sname.value,
          phone: sphone.value,
          role:'user'
        },
      },
    });
    if (data) {
      console.log(data);
      
      //Insert data into table
      try {
        let {name , phone , email ,role} = data.user.user_metadata
        const { error:tableError } = await supabase
          .from("Customers")
          .insert({ name: name, number: phone, email : email , role :role});
          if(tableError){
            console.log('Error in adding data to table ' + tableError)
          }
          else{
            alert('Sign up succesfully')
            location.href = './index.html'
            }
      } catch (error) {
        console.log(error, "Error in inserting data into table");
      }

    } else {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

signUp && signUp.addEventListener("submit", signUpUser);

// logout functionality___________________________________
let logoutBtn = document.getElementById("logBtn");

async function logout(e) {
  e.preventDefault()
  
  try {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      alert("Log Out succesfully");
    }
  } catch (er) {
    console.log(er);
  }
}

logoutBtn && logoutBtn.addEventListener("click", logout);