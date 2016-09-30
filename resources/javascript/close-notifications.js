export default function () {
  const alertDeleteBtns = document.querySelectorAll('.notification .delete');

  for (let i = 0; i < alertDeleteBtns.length; i++) {
    alertDeleteBtns[i].addEventListener('click', function (ev) {
      ev.preventDefault();

      this.parentNode.remove();
    });
  }
}
