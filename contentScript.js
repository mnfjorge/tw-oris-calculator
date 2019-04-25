function calculateTime(checkin, checkout) {
  if (!checkin || !checkout) {
    return (0).toFixed(2);
  }

  checkin = convertToDecimal(checkin);
  checkout = convertToDecimal(checkout);
  
  var lunch = 1;

  var result =  checkout - checkin - lunch;
  
  if (result < 0) {
    result = 0;
  }

  return result.toFixed(2);
}

function convertToDecimal(time) {
  var hhmm = time.split(":");
  var hours = parseInt(hhmm[0]);
  var minutes = parseInt(hhmm[1]);
  return hours + minutes / 60;
}

$('#tbApontamentoItens tbody tr').each(function () {
  var tr = $(this);

  var date = tr.find('td:eq(1)').text().trim();

  if (
    date.indexOf('FOLGA') !== -1 ||
    date.indexOf('FERIADO') !== -1
  ) {
    return;
  }

  var startTime = tr.find('input:text:eq(0)').val().trim();
  var endTime = tr.find('input:text:eq(1)').val().trim();

  var calculated = calculateTime(startTime, endTime).replace('.', ',');
  tr.find('td:eq(3)').css({ position: 'relative' }).append('<span class="calculated-time">' + calculated + '</span>');
});