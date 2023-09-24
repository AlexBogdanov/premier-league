const loadFixturesResultsPageData = (querySelector, data, isFixturesPage = false) => {
  const dateWrapper = document.querySelector(querySelector);
  const dateEl = document.createElement('div');
  dateEl.classList.add('date');

  for (const date of data) {
    const dateSpan = document.createElement('span');
    dateSpan.appendChild(document.createTextNode(getDate(date.date)));
    const dateH4 = document.createElement('h4');
    dateH4.appendChild(document.createTextNode('Premier '));
    const dateImg = document.createElement('img');
    dateImg.src = './assets/images/pl-main-logo.png';
    dateImg.alt = 'pl-main-logo';
    dateH4.appendChild(dateImg);
    dateH4.appendChild(document.createTextNode(' League'));
    const dateHeader = document.createElement('div');
    dateHeader.classList.add('date-header');
    dateHeader.appendChild(dateSpan);
    dateHeader.appendChild(dateH4);

    dateEl.appendChild(dateHeader);
    
    const dateFixtures = document.createElement('div');
    dateFixtures.classList.add('date-fixtures');

    for (const fixture of date.fixtures) {
      const homeTeam = document.createElement('div');
      homeTeam.classList.add('fixture-team');
      homeTeam.classList.add('home-team');
      const homeTeamP = document.createElement('p');
      homeTeamP.appendChild(document.createTextNode(fixture.homeTeam));
      const homeTeamImg = document.createElement('img');
      homeTeamImg.src = clubLogos[fixture.homeTeamCode];
      homeTeamImg.alt = `${fixture.homeTeamCode}-logo`;
      homeTeam.appendChild(homeTeamP);
      homeTeam.appendChild(homeTeamImg);

      let timeScoreText;

      if (isFixturesPage) {
        const timeArr = fixture.time.split(':');
        timeScoreText = `${timeArr[0]}:${timeArr[1]}`;
      } else {
        timeScoreText = `${fixture.homeTeamGoals} - ${fixture.awayTeamGoals}`;
      }

      const timeScore = document.createElement('div');
      timeScore.classList.add('fixture-score-time');
      timeScore.appendChild(document.createTextNode(timeScoreText));

      const awayTeam = document.createElement('div');
      awayTeam.classList.add('fixture-team');
      awayTeam.classList.add('away-team');
      const awayTeamImg = document.createElement('img');
      awayTeamImg.src = clubLogos[fixture.awayTeamCode];
      awayTeamImg.alt = `${fixture.awayTeamCode}-logo`;
      const awayTeamP = document.createElement('p');
      awayTeamP.appendChild(document.createTextNode(fixture.awayTeam));
      awayTeam.appendChild(awayTeamImg);
      awayTeam.appendChild(awayTeamP);

      const divFixture = document.createElement('div');
      divFixture.appendChild(homeTeam);
      divFixture.appendChild(timeScore);
      divFixture.appendChild(awayTeam);

      const spanStadiumImg = document.createElement('span');
      const stadiumImg = document.createElement('img');
      stadiumImg.src = './assets/images/stadium.svg';
      stadiumImg.alt = 'stadium-svg';
      spanStadiumImg.appendChild(stadiumImg);
      const spanStadium = document.createElement('span');
      spanStadium.appendChild(document.createTextNode(fixture.stadium));

      const divStadium = document.createElement('div');
      divStadium.append(spanStadiumImg);
      divStadium.append(spanStadium);

      const fixtureEl = document.createElement('div');
      fixtureEl.classList.add('fixture');
      fixtureEl.appendChild(divFixture);
      fixtureEl.appendChild(divStadium);

      fixtureEl.addEventListener('click', (event) => {
        event.preventDefault();
        loadResultPopupData(fixture);
        openPopup();
      });

      dateFixtures.appendChild(fixtureEl);
    }

    dateEl.appendChild(dateFixtures);
    dateWrapper.appendChild(dateEl);
  }
}

const loadFixturesPageData = (data) => {
  loadFixturesResultsPageData('.section-fixtures-page .wrapper', data, true);
};

const loadResultsPageData = (data) => {
  loadFixturesResultsPageData('.section-results-page .wrapper', data);
};

setTimeout(() => {
  loadFixturesPageData(fixturesPageData);
  loadResultsPageData(resultsPageData);
}, 100);