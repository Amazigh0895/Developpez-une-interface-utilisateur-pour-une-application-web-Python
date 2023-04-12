/*  -------------------------------------- My functions-------------------------------- */

// Function slide_next
function slide_next(){
  // Get all buttons slide__next
  const btn_next = document.querySelectorAll('.btn-slide__next');
  // Get all categories
  const categories = document.querySelectorAll('.categorie');
  for (let i = 0; i < btn_next.length; i++) {
    const btn = btn_next[i];
    const categorie = categories[i];
    btn.onclick = function () {
      categorie.scrollLeft += 1105; 
    };
  }
}

// Function slide_back
function slide_back(){
  // Get all buttons slide__back
  const btn_back = document.querySelectorAll('.btn-slide__back');
  // Get all categories
  const categories = document.querySelectorAll('.categorie');
  for (let i = 0; i < btn_back.length; i++) {
    const btn = btn_back[i];
    const categorie = categories[i];
    btn.onclick = function () {
      categorie.scrollLeft -= 1105; 
    };
  }
}

// Function Open the modal
 function openModal(){
  // Get the modal
  const myModals = document.querySelectorAll("#myModal");
  // Get the button that opens the modal
  const myBtns = document.querySelectorAll("#myBtn");
  // When the user clicks the button, open the modal 
  for (let i = 0; i < myBtns.length; i++) {
    const myBtn = myBtns[i];
    const myModal = myModals[i]
    myBtn.onclick = function () {
      myModal.style.display = "block"; 
    };
}
}

// Function close the modal
function closeModal(){
  // Get the <span> element that closes the modal
  const spans = document.querySelectorAll(".close");
  // Get the modal
  const myModals = document.querySelectorAll("#myModal");
  // When the user clicks on <span> (x), close the modal
  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    const myModal = myModals[i]
    span.onclick = function() {
      myModal.style.display = "none";
    }
}


}


/*
// When the user clicks anywhere outside of the modal, close it

for (let i = 0; i < myModals.length; i++) {
  const myModal = myModals[i];
  console.log(myModal)
  
  window.onclick = function(event) {
    if (event.target == myModal) {
      myModal.style.display = "none";
      
    }
  }
  console.log(onclick)
  
}
*/
export{openModal,closeModal,slide_back,slide_next};