// Example of closures from thoughsonscripts blog - 

for (var i = 1; i <= 10; i++) {
    (function(v){
        $('#Div' + v).click(function () {
            alert('Div' + v + " is kicked");
            return false;
        })

   })(i);
}
