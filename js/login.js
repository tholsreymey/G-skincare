const Submit = () => {
    const email = document.getElementById('email').value
    const pss   = document.getElementById('password').value

    var error = ""
    if (!/^\S+@\S+\.\S+$/.test(email)){
        error += "Pleace enter a valid email address..."
    }else if (pss.length<8) {
        error +="Pleace enter a password bigger than 8 character..."
    }
    if(error){
        document.getElementById('demo').innerHTML=error
    }else {
        document.getElementById('demo').innerHTML=""
        alert("You Register Is Successfuly...")
    }
}

//comfirm password
const create = () => {
    const name = document.getElementById('name').value
    const password1 = document.getElementById('password1').value
    const comfirm = document.getElementById('comfirm').value
    const demo1 = document.getElementById('demo1');
    
    let error = "";

    if (name.length<6) {
        error+="Pleace enter your name bigger then 6 character..."
    } else if (password1.length < 8) {
        error += "Please enter a password with at least 8 characters";
    } else if (!comfirm) {
        error += "Please confirm your password.<br>";
    } else if (comfirm !== password1) {
        error += "Passwords do not match!";
    }

    if (error) {
      document.getElementById('demo1').innerHTML = error;
    } else {
      document.getElementById('demo1').innerHTML = "";
      // បង្ហាញ success alert
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You have registered successfully!",
        showConfirmButton: false,
        timer: 2000
      });
    }

};
