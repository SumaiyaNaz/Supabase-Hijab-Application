// import supabase from "./config.js";

// //Supabse docs >> auth >> retrive a user
// //Check role 
// async function checkRole() {
//     //Check role  
//     const { data: { user } } = await supabase.auth.getUser();
//     console.log(user)
//     if(!user){
//         location.href = 'logIn.html';
//         return;
//     }
//     //Check role fetch database
//     ////Supabse docs >> database >> fetch data
//     try {
//       const { data, error } = await supabase
//   .from('Customers')
//   .select('*')
//   .eq('uid' , user.id)
//   .single()
//   if (data.role != 'admin') {
//     alert('Access denied')
//     // return(location.href = './signUp.html')
//   }
//     } catch (error) {
//       console.log(error);
//     }
// }
// checkRole()