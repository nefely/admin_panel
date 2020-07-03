$(document).ready(function(){

var x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.setAttribute('value', selElmnt.options[j].getAttribute('value'));
    c.addEventListener("click", function(e) {
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
    a.setAttribute("value", c.getAttribute('value') );
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(el) {
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (el == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);
});
/* хрень яка фіксить дерьмово написаний плагін custom select (нахуй ООП ебашим мануально) */
$(document).ready(function(){
  $('body').delegate(".custom-select .select-items div", "click", function(){
    $(this).parent('.select-items').parent('.custom-select').children('.select-selected').attr('value', $(this).attr('value'));
  });
  let active_select_value = 0;
  $('.custom-select .select-selected').each(function(){
    active_select_value = 0;
    active_select_value = $(this).parent('.custom-select').children('select').children('option:selected').attr('value');
    $(this).attr('value', active_select_value);
    $(this).parent('.custom-select').children('.select-items').children('div[value="'+active_select_value+'"]').addClass('same-as-selected');
  });
  let active_div_value = 0;
  $('body').delegate(".custom-select .select-items > div", "click", function(){
    active_div_value = 0;
    active_div_value = $(this).attr('value');
    $(this).parent('.select-items').parent('.custom-select').children('select').children('option').removeAttr('selected');
    $(this).parent('.select-items').parent('.custom-select').children('select').children('option[value="'+active_div_value+'"]').attr('selected','selected');
  });
});