// A commonly cited example is jQuery.


(function( window, undefined ) {

    var jQuery = (function() {

    });

    // Expose jQuery to the global object
    window.jQuery = window.$ = jQuery;

})(window);
// reasons why to use annon - The above ensures the function is called immediately; it also ensures every variable declared in the anonymous function is a private variable, therefore won't spill into and pollute the global scope, which is extremely important from a library's perspective; it also ensures that the scope chain is destroyed after the function finishes execution. 