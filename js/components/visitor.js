
const firebaseConfig = {
  databaseURL: "https://banaa-z-personal-wb-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


window.addEventListener('load', function() {
 
  let uid = localStorage.getItem("site-uid");
  if (!uid) {
    uid = "user_" + Date.now() + Math.random().toString(36).substr(2);
    localStorage.setItem("site-uid", uid);
  }

  
  db.ref("/pv").transaction((currentVal) => {
    return (currentVal || 0) + 1;
  });

 
  db.ref("/users/" + uid).once("value", (snapshot) => {
    if (!snapshot.exists()) {
      
      db.ref("/users/" + uid).set(true);
      db.ref("/uv").transaction((currentVal) => {
        return (currentVal || 0) + 1;
      });
    }
  });

  
  db.ref("/pv").on("value", (snapshot) => {
    const pvEl = document.getElementById("cloud-pv");
    if (pvEl) pvEl.innerText = snapshot.val() || 0;
  });
  db.ref("/uv").on("value", (snapshot) => {
    const uvEl = document.getElementById("cloud-uv");
    if (uvEl) uvEl.innerText = snapshot.val() || 0;
  });
});