function parseData(html) {
  const $html = $('<div>' + html + '</div>');
  const results = [];

  $html.find('li').each(function () {
    const li = $(this);
    const rawText = li.text().replace(/\s+/g, ' ').trim();

    const paese = li.find('strong').first().text().trim();

    // Estrarre struttura e stelle
    const link = li.find('a[href*="Offerte-Viaggio"]').first();
    let struttura = link.length ? link.text().trim() : '';
    let stelle = null;

    // Cerca stelle nel testo, anche se non parte del link
    const matchStelle = struttura.match(/\*{1,5}/) || li.text().match(/\*{1,5}/);
    if (matchStelle) {
      stelle = matchStelle[0].length;
      struttura = struttura.replace(/\*{1,5}/, '').trim();
    }

    // Cerca tutte le partenze e prezzi
    const offerta = [];
    const matches = [...rawText.matchAll(/il\s+(\d{2}\s\w+)\s+(da\s+[A-Z]+|senza trasporto).*?€\s*([\d\.]+)/gi)];

    for (const m of matches) {
      const durataMatch = rawText.match(/(\d+)\s+(giorni|notti)/i);
      const durata = durataMatch ? parseInt(durataMatch[1]) : null;

      offerta.push({
        paese,
        regione: '', // se vorrai potrai mapparla
        struttura,
        stelle,
        localita: '', // può essere estratta da URL o testo se necessario
        durata,
        data_partenza: m[1],
        trasporto: m[2].toLowerCase().includes('senza') ? 'non incl' : 'incl',
        prezzo: parseFloat(m[3].replace('.', ''))
      });
    }

    results.push(...offerta);
  });

  return results;
}

$(document).ready(function () {
  let table;
  let parsedResults = [];

  $('#parseBtn').click(function () {
    const text = $('#inputText').val();
    parsedResults = parseData(text);
    if (table) table.destroy();
    $('#results').empty();

    const headers = Object.keys(parsedResults[0] || {});
    const thead = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
    const tbody = `<tbody>${parsedResults.map(r => `<tr>${headers.map(h => `<td>${r[h]}</td>`).join('')}</tr>`).join('')}</tbody>`;
    $('#results').html(thead + tbody);
    table = $('#results').DataTable();
  });

  $('#uploadBtn').click(function () {
    if (parsedResults.length === 0) return alert("Nessun dato da caricare.");
    $.ajax({
      url: 'php/sync_db.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(parsedResults),
      success: res => alert("Dati caricati con successo!"),
      error: err => alert("Errore durante il caricamento.")
    });
  });
});
