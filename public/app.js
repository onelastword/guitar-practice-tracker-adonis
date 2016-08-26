(function() {
  var alertDeleteBtns = document.querySelectorAll('.notification .delete');

  for (var i = 0; i < alertDeleteBtns.length; i++) {
    alertDeleteBtns[i].addEventListener('click', function(ev) {
      ev.preventDefault();

      this.parentNode.remove();
    });
  }
})();
