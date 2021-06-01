/**
 * The method sets the required attributes to the table.
 * @param {Element} table
 */
function highlight(table) {
  // ваш код...
  for (let i = 1; i < table.rows.length; i += 1) {
    let status = table.rows[i].cells[3].dataset.available;
    let gender = table.rows[i].cells[2].textContent;
    let age = Number(table.rows[i].cells[1].textContent);

    status === "true" && table.rows[i].classList.add('available');
    status === "false" && table.rows[i].classList.add('unavailable');
    status === undefined && table.rows[i].setAttribute('hidden', true);

    gender === 'm' && table.rows[i].classList.add('male');
    gender === 'f' && table.rows[i].classList.add('female');

    table.rows[i].style.textDecoration = age < 18 && 'line-through';
  }
}
