const { response } = require("express");

function ejercicio1(array){
  let resonse = {};
   for(let i=0; i<array.length; i++){
        console.log('--->',array[i].nombre);
        console.log('--->',array[i].nombre);
        retunr response.push(array[i].nombre)
   }
};
