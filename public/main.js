
const taskItem= document.querySelectorAll(".taskList");
const trash  = document.getElementsByClassName("fa-trash");


Array.from(taskItem).forEach(function(element) {
      element.addEventListener('click', function(){
        
        const taskCompleted = this.childNodes[1].innerText
        console.log(taskCompleted,'this is the task')
        fetch('/update', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'task': taskCompleted,
           
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          // console.log(data)
          window.location.reload(true)
        })
      });
});


// trash 
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    // console.log("click working for trash")
    
   const task= this.parentNode.parentNode.childNodes[1].innerText


   ///fetching api delete ...
    fetch('/remove',{
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      'task':task
  
      })
    }).then(function (response) {
      console.log(response)
     
    })
  });
});





