const loadStandingsPageData = (data) => {
  const tbody = document.querySelector('.section-standings-page tbody');

  for (const club of data) {
    const position = document.createElement('td');
    position.classList.add('table-position');
    position.appendChild(document.createTextNode(club.position));
    
    const team = document.createElement('td');
    team.classList.add('table-team');
    const teamImgSpan = document.createElement('span');
    const teamImg = document.createElement('img');
    teamImg.src = clubLogos[club.code];
    teamImg.alt = `${club.code}-logo`;
    teamImgSpan.appendChild(teamImg);
    const teamNameSpan = document.createElement('span');
    teamNameSpan.appendChild(document.createTextNode(club.name));
    team.appendChild(teamImgSpan);
    team.appendChild(teamNameSpan);

    const played = document.createElement('td');
    played.appendChild(document.createTextNode(club.played));
    const won = document.createElement('td');
    won.appendChild(document.createTextNode(club.wins));
    const drawn = document.createElement('td');
    drawn.appendChild(document.createTextNode(club.draws));
    const lost = document.createElement('td');
    lost.appendChild(document.createTextNode(club.losses));

    const gf = document.createElement('td');
    gf.appendChild(document.createTextNode(club.gf));
    const ga = document.createElement('td');
    ga.appendChild(document.createTextNode(club.ga));
    const gd = document.createElement('td');
    gd.appendChild(document.createTextNode(club.goalDifference));
    const points = document.createElement('td');
    points.classList.add('table-points');
    points.appendChild(document.createTextNode(club.points));

    const formUl = document.createElement('ul');

    for (const form of club.form) {
      const abbr = document.createElement('abbr');
      abbr.appendChild(document.createTextNode(form));

      switch (form) {
        case 'W':
          abbr.title = 'Won';
          abbr.classList.add('won');
          break;
        case 'D':
          abbr.title = 'Draw';
          abbr.classList.add('draw');
          break;
        default:
          abbr.title = 'Lost';
          abbr.classList.add('lost');
      }

      const li = document.createElement('li');
      li.appendChild(abbr);

      formUl.appendChild(li);
    }

    const form = document.createElement('td');
    form.classList.add('table-form');
    form.appendChild(formUl);

    const nextFixture = club.nextFixture.split('-')[0];
    const next = document.createElement('td');
    const nextImg = document.createElement('img');
    nextImg.src = clubLogos[nextFixture];
    nextImg.alt = `${nextFixture}-logo`;
    next.appendChild(nextImg);

    const tr = document.createElement('tr');
    tr.appendChild(position);
    tr.appendChild(team);
    tr.appendChild(played);
    tr.appendChild(won);
    tr.appendChild(drawn);
    tr.appendChild(lost);
    tr.appendChild(gf);
    tr.appendChild(ga);
    tr.appendChild(gd);
    tr.appendChild(points);
    tr.appendChild(form);
    tr.appendChild(next);

    tr.addEventListener('click', (event) => {
      event.preventDefault();
      loadClubPopupData(club);
      openPopup();
    });

    tbody.appendChild(tr);
  }
};

setTimeout(() => {
  loadStandingsPageData(standingsPageData);
}, 100);
