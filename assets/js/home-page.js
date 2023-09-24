const loadFixtures = (fixtures, isPrevious = false, isUpcoming = false) => {
  let fixturesContentEl;

  if (isPrevious) {
    fixturesContentEl = document.querySelector('.previous-fixtures .fixtures-content');
  } else if (isUpcoming) {
    fixturesContentEl = document.querySelector('.upcoming-fixtures .fixtures-content');
  } else {
    fixturesContentEl = document.querySelector('.current-fixtures .fixtures-content');
  }

  const renderedDates = [];

  for (const fixture of fixtures) {
    let date;

    if ((isUpcoming || (!isUpcoming && !isPrevious)) && !renderedDates.includes(fixture.date)) {
      date = fixture.date;
      renderedDates.push(date);
    }

    if (date) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      const dateText = document.createTextNode(getDate(date));
      dateEl.appendChild(dateText);
      fixturesContentEl.appendChild(dateEl);
    }

    const homeTeam = document.createElement('div');
    homeTeam.classList.add('fixture-team');
    homeTeam.classList.add('home-team');
    const homeTeamParagraph = document.createElement('p');
    const homeTeamParagraphText = document.createTextNode(fixture.homeTeamCode);
    homeTeamParagraph.appendChild(homeTeamParagraphText);
    homeTeam.appendChild(homeTeamParagraph);
    const homeTeamImg = document.createElement('img');
    homeTeamImg.src = clubLogos[fixture.homeTeamCode];
    homeTeamImg.alt = `${fixture.homeTeamCode}-logo`;
    homeTeam.appendChild(homeTeamImg);

    const score = document.createElement('div');
    score.classList.add('fixture-score-time');
    const scoreText = isPrevious ?
      document.createTextNode(`${fixture.homeTeamGoals} - ${fixture.awayTeamGoals}`) :
      document.createTextNode(fixture.time);
    score.appendChild(scoreText);

    const awayTeam = document.createElement('div');
    awayTeam.classList.add('fixture-team');
    awayTeam.classList.add('away-team');
    const awayTeamImg = document.createElement('img');
    awayTeamImg.src = clubLogos[fixture.awayTeamCode];
    awayTeamImg.alt = `${fixture.awayTeamCode}-logo`;
    awayTeam.appendChild(awayTeamImg);
    const awayTeamParagraph = document.createElement('p');
    const awayTeamParagraphText = document.createTextNode(fixture.awayTeamCode);
    awayTeamParagraph.appendChild(awayTeamParagraphText);
    awayTeam.appendChild(awayTeamParagraph);

    const fixtureEl = document.createElement('div');
    fixtureEl.classList.add('fixture');

    if (isPrevious) {
      fixtureEl.classList.add('fixture-played');
    }

    fixtureEl.appendChild(homeTeam);
    fixtureEl.appendChild(score);
    fixtureEl.appendChild(awayTeam);

    if (isPrevious) {
      fixtureEl.addEventListener('click', (event) => {
        event.preventDefault();
        loadResultPopupData(fixture);
        openPopup();
      });
    }
    
    fixturesContentEl.appendChild(fixtureEl);
  }
};

const loadTable = (data) => {
  const tbody = document.querySelector('.table-wrapper tbody');

  for (const club of data.standings) {
    const position = document.createElement('th');
    position.appendChild(document.createTextNode(club.position));

    const clubEl = document.createElement('th');
    clubEl.classList.add('th-club');
    clubEl.classList.add('th-accent');
    const clubImg = document.createElement('img');
    clubImg.src = clubLogos[club.code];
    clubImg.alt = `${club.code}-logo`;
    const clubParagraph = document.createElement('p');
    clubParagraph.appendChild(document.createTextNode(club.name));
    clubEl.appendChild(clubImg);
    clubEl.appendChild(clubParagraph);

    const played = document.createElement('th');
    played.appendChild(document.createTextNode(club.played));
    const wins = document.createElement('th');
    wins.appendChild(document.createTextNode(club.wins));
    const draws = document.createElement('th');
    draws.appendChild(document.createTextNode(club.draws));
    const losses = document.createElement('th');
    losses.appendChild(document.createTextNode(club.losses));

    const points = document.createElement('th');
    points.classList.add('th-accent');
    points.appendChild(document.createTextNode(club.points));

    const tr = document.createElement('tr');
    tr.classList.add('table-row');
    tr.appendChild(position);
    tr.appendChild(clubEl);
    tr.appendChild(played);
    tr.appendChild(wins);
    tr.appendChild(draws);
    tr.appendChild(losses);
    tr.appendChild(points);

    tr.addEventListener('click', (event) => {
      event.preventDefault();
      loadClubPopupData(club);
      openPopup();
    });

    tbody.appendChild(tr);
  }
};

setTimeout(() => {
  loadFixtures(homePageData.fixtures.previous, true);
  loadFixtures(homePageData.fixtures.current);
  loadFixtures(homePageData.fixtures.upcoming, false, true);
  
  loadTable(homePageData);

  document.querySelector('.close-btn').addEventListener('click', closePopup);
  
  document.querySelector('.navigation').classList.remove('display-none');
  document.querySelector('.section-home-page').classList.remove('display-none');
  document.querySelector('.loader').classList.add('display-none');
}, 100);
