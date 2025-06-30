function parseData(html) {
  const $html = $('<div>' + html + '</div>');
  const results = [];

  $html.find('li').each(function () {
    const li = $(this);
    const rawText = li.text().replace(/\s+/g, ' ').trim();

    const paeseEl = li.find('strong').first();
    const paese = paeseEl.text().trim();
    const spanEl = li.find('span').first();

    // testo tra <strong> e <span>
    let regione = '';
    if (paeseEl.length && spanEl.length) {
      let node = paeseEl[0].nextSibling;
      while (node && node !== spanEl[0]) {
        if (node.nodeType === 3) regione += node.textContent;
        else regione += $(node).text();
        node = node.nextSibling;
      }
      regione = regione.replace(/\s+/g, ' ').trim();
    }

    const localita = spanEl.text().trim();

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

    const acronimiGenerici = [...new Set(rawText.match(/\b(TFR|CP)\b/g) || [])];
    const codiceAeroporto = (rawText.match(/\b(VRN|BGY|MXP)\b/) || [])[0] || '';

    // Cerca tutte le partenze e prezzi
    const offerta = [];
    const matches = [...rawText.matchAll(/il\s+(\d{2}\s\w+)\s+(da\s+[A-Z]+|senza trasporto).*?€\s*([\d\.]+)/gi)];

    for (const m of matches) {
      const durataMatch = rawText.match(/(\d+)\s+(giorni|notti)/i);
      const durata = durataMatch ? parseInt(durataMatch[1]) : null;

      offerta.push({
        paese,
        regione,
        struttura,
        stelle,
        localita,
        durata,
        data_partenza: m[1],
        trasporto: m[2].toLowerCase().includes('senza') ? 'non incl' : 'incl',
        prezzo: parseFloat(m[3].replace('.', '')),
        acronimi: acronimiGenerici.join(','),
        aeroporto: codiceAeroporto
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

    // prepara dropdown di filtro per regione
    const regioni = [...new Set(parsedResults.map(r => r.regione))].filter(r => r);
    $('#filterDropdown').html(regioni.map(r => `<label><input type="checkbox" class="filterCheckbox" value="${r}" checked> ${r}</label>`).join(''));

    const regioneIndex = headers.indexOf('regione');
    if (window._regioneFilter) {
      const idx = $.fn.dataTable.ext.search.indexOf(window._regioneFilter);
      if (idx !== -1) $.fn.dataTable.ext.search.splice(idx, 1);
    }
    window._regioneFilter = function(settings, data) {
      const selected = $('.filterCheckbox:checked').map(function(){return this.value;}).get();
      if (!selected.length) return true;
      return selected.includes(data[regioneIndex]);
    };
    $.fn.dataTable.ext.search.push(window._regioneFilter);

    table = $('#results').DataTable({ pageLength: 200 });
  });

  $('#filterToggle').click(function () {
    $('#filterContainer').toggleClass('show');
  });

  $(document).on('change', '.filterCheckbox', function () {
    if (table) table.draw();
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
