const dayOfWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfWeeksShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const clubLogos = {
  ARS: 'https://resources.premierleague.com/premierleague/badges/rb/t3.svg',
  MCI: 'https://resources.premierleague.com/premierleague/badges/rb/t43.svg',
  TOT: 'https://resources.premierleague.com/premierleague/badges/rb/t6.svg',
  LIV: 'https://resources.premierleague.com/premierleague/badges/rb/t14.svg',
  WHU: 'https://resources.premierleague.com/premierleague/badges/rb/t21.svg',
  CRY: 'https://resources.premierleague.com/premierleague/badges/rb/t31.svg',
  MUN: 'https://resources.premierleague.com/premierleague/badges/rb/t1.png',
  CHE: 'https://resources.premierleague.com/premierleague/badges/rb/t8.svg',
  FUL: 'https://resources.premierleague.com/premierleague/badges/rb/t54.svg',
  NEW: 'https://resources.premierleague.com/premierleague/badges/rb/t4.png',
  WOL: 'https://resources.premierleague.com/premierleague/badges/rb/t39.svg',
  BHA: 'https://resources.premierleague.com/premierleague/badges/rb/t36.svg',
  BOU: 'https://resources.premierleague.com/premierleague/badges/rb/t91.svg',
  EVE: 'https://resources.premierleague.com/premierleague/badges/rb/t11.svg',
  BUR: 'https://resources.premierleague.com/premierleague/badges/rb/t90.svg',
  LEI: 'https://crests.gc.eflservices.co.uk/t13.png',
  SOU: 'https://crests.gc.eflservices.co.uk/t20.png',
  HUD: 'https://crests.gc.eflservices.co.uk/t38.png',
  CAR: 'https://crests.gc.eflservices.co.uk/t97.png',
  WAT: 'https://crests.gc.eflservices.co.uk/t57.png'
};

const clubColors = {
  ARS: '#f00001',
  MCI: '#98c5e9',
  TOT: '#101836',
  LIV: '#dc0813',
  WHU: '#7c2c3b',
  CRY: '#dd1d11',
  MUN: '#c70202',
  CHE: '#001489',
  FUL: '#d2d2d2',
  NEW: '#2e2a2a',
  WOL: '#fdb913',
  BHA: '#0054a6',
  BOU: '#d71921',
  EVE: '#0d0794',
  BUR: '#0d0794',
  LEI: '#0b56a4',
  SOU: '#ff0029',
  HUD: '#0660ae',
  CAR: '#093ad6',
  WAT: '#fcf003'
}

const body = document.querySelector('body');
const shadow = document.querySelector('.shadow');
let isPopupOpen = false;

const getDate = (dateStr, useShort = false) => {
  const [day, month, year] = dateStr.split('-');
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(day);

  if (useShort) {
    return `${dayOfWeeksShort[date.getDay()]} ${day} ${monthsShort[date.getMonth()]}`;
  }

  return `${dayOfWeeks[date.getDay()]} ${day} ${months[date.getMonth()]}`;
};

const openPopup = () => {
  body.style.width = window.getComputedStyle(body).width;
  body.style.overflow = 'hidden';
  shadow.classList.remove('display-none');
};

const closePopup = (event) => {
  event.preventDefault();

  body.style.removeProperty('width');
  body.style.removeProperty('overflow');
  shadow.classList.add('display-none');
};

const loadResultPopupData = (fixture) => {
  document.querySelector('.popup-content .popup-stats').classList.add('display-none');
  document.querySelector('.popup-content .popup-club-members').classList.add('display-none');

  const logo = document.querySelector('.popup-header .logo img');
  logo.src = './assets/images/pl-main-logo.png';
  logo.alt = 'pl-main-logo';

  const popupHeaderTitle = document.querySelector('.popup-header .title');
  popupHeaderTitle.classList.remove('title-club');
  popupHeaderTitle.style.background = '#53baff';
  popupHeaderTitle.replaceChildren();

  const titleDateImg = document.createElement('img');
  titleDateImg.src = './assets/images/calendar.svg';
  titleDateImg.alt = 'calendar-svg';
  const titleDateSpan = document.createElement('span');
  titleDateSpan.appendChild(titleDateImg);
  titleDateSpan.appendChild(document.createTextNode(getDate(fixture.date, true)));

  const titleTimeImg = document.createElement('img');
  titleTimeImg.src = './assets/images/clock.svg';
  titleTimeImg.alt = 'clock-svg';
  const titleTimeSpan = document.createElement('span');
  titleTimeSpan.appendChild(titleTimeImg);
  titleTimeSpan.appendChild(document.createTextNode(fixture.time));

  const titleStadiumImg = document.createElement('img');
  titleStadiumImg.src = './assets/images/stadium-white.svg';
  titleStadiumImg.alt = 'stadium-white-svg';
  const titleStadiumSpan = document.createElement('span');
  titleStadiumSpan.appendChild(titleStadiumImg);
  titleStadiumSpan.appendChild(document.createTextNode(fixture.stadium));

  popupHeaderTitle.appendChild(titleDateSpan);
  popupHeaderTitle.appendChild(titleTimeSpan);
  popupHeaderTitle.appendChild(titleStadiumSpan);

  const popupTeams = document.querySelector('.popup-content .popup-teams');
  popupTeams.classList.remove('display-none');
  popupTeams.replaceChildren();

  const homeTeamImg = document.createElement('img');
  homeTeamImg.src = clubLogos[fixture.homeTeamCode];
  homeTeamImg.alt = `${fixture.homeTeamCode}-logo`;
  const homeTeamSpan = document.createElement('span');
  homeTeamSpan.appendChild(document.createTextNode(fixture.homeTeam));
  const homeTeam = document.createElement('div');
  homeTeam.classList.add('team');
  homeTeam.classList.add('home-team');
  homeTeam.appendChild(homeTeamImg);
  homeTeam.appendChild(homeTeamSpan);

  const score = document.createElement('div');
  score.classList.add('score');
  score.appendChild(document.createTextNode(`${fixture.homeTeamGoals} - ${fixture.awayTeamGoals}`));

  const awayTeamSpan = document.createElement('span');
  awayTeamSpan.appendChild(document.createTextNode(fixture.awayTeam));
  const awayTeamImg = document.createElement('img');
  awayTeamImg.src = clubLogos[fixture.awayTeamCode];
  awayTeamImg.alt = `${fixture.awayTeamCode}-logo`;
  const awayTeam = document.createElement('div');
  awayTeam.classList.add('team');
  awayTeam.classList.add('away-team');
  awayTeam.appendChild(awayTeamSpan);
  awayTeam.appendChild(awayTeamImg);

  popupTeams.appendChild(homeTeam);
  popupTeams.appendChild(score);
  popupTeams.appendChild(awayTeam);
  
  const popupScorers = document.querySelector('.popup-content .popup-scorers');
  popupScorers.classList.remove('display-none');
  popupScorers.replaceChildren();

  const homeScorers = document.createElement('div');
  homeScorers.classList.add('scorers');
  homeScorers.classList.add('home-scorers');

  for (const scorer of fixture.homeTeamScorers) {
    const [name, minute] = scorer.split(' ');

    const scorerSpan = document.createElement('span');
    scorerSpan.appendChild(document.createTextNode(`${name} ${minute}`));
    const scorerImg = document.createElement('img');
    scorerImg.src = './assets/images/ball.svg';
    scorerImg.alt = 'ball-svg';
    const scorerDiv = document.createElement('div');
    scorerDiv.appendChild(scorerSpan);
    scorerDiv.appendChild(scorerImg);

    homeScorers.appendChild(scorerDiv);
  }
  
  const awayScorers = document.createElement('div');
  awayScorers.classList.add('scorers');
  awayScorers.classList.add('away-scorers');

  for (const scorer of fixture.awayTeamScorers) {
    const [name, minute] = scorer.split(' ');

    const scorerImg = document.createElement('img');
    scorerImg.src = './assets/images/ball.svg';
    scorerImg.alt = 'ball-svg';
    const scorerSpan = document.createElement('span');
    scorerSpan.appendChild(document.createTextNode(`${minute} ${name}`));
    const scorerDiv = document.createElement('div');
    scorerDiv.appendChild(scorerImg);
    scorerDiv.appendChild(scorerSpan);

    awayScorers.appendChild(scorerDiv);
  }

  popupScorers.appendChild(homeScorers);
  popupScorers.appendChild(awayScorers);
};

const loadClubPopupData = (club) => {
  document.querySelector('.popup-content .popup-teams').classList.add('display-none');
  document.querySelector('.popup-content .popup-scorers').classList.add('display-none');

  const logo = document.querySelector('.popup-header .logo img');
  logo.src = clubLogos[club.code];
  logo.alt = `${club.code}-logo`;

  const popupHeaderTitle = document.querySelector('.popup-header .title');
  popupHeaderTitle.classList.add('title-club');
  popupHeaderTitle.style.background = clubColors[club.code];
  popupHeaderTitle.replaceChildren();

  const spanName = document.createElement('span');
  spanName.appendChild(document.createTextNode(club.name));
  const spanStadium = document.createElement('span');
  spanStadium.append(document.createTextNode(club.stadium));

  popupHeaderTitle.appendChild(spanName);
  popupHeaderTitle.appendChild(spanStadium);

  const popupStats = document.querySelector('.popup-content .popup-stats');
  popupStats.classList.remove('display-none');
  popupStats.replaceChildren();

  const playedLabel = document.createElement('span');
  playedLabel.appendChild(document.createTextNode('Matches Played'));
  const playedValue = document.createElement('span');
  playedValue.appendChild(document.createTextNode(club.played));
  const played = document.createElement('div');
  played.appendChild(playedLabel);
  played.appendChild(playedValue);

  const winsLabel = document.createElement('span');
  winsLabel.appendChild(document.createTextNode('Wins'));
  const winsValue = document.createElement('span');
  winsValue.appendChild(document.createTextNode(club.wins));
  const wins = document.createElement('div');
  wins.appendChild(winsLabel);
  wins.appendChild(winsValue);

  const lossesLabel = document.createElement('span');
  lossesLabel.appendChild(document.createTextNode('Losses'));
  const lossesValue = document.createElement('span');
  lossesValue.appendChild(document.createTextNode(club.losses));
  const losses = document.createElement('div');
  losses.appendChild(lossesLabel);
  losses.appendChild(lossesValue);

  const goalsLabel = document.createElement('span');
  goalsLabel.appendChild(document.createTextNode('Goals'));
  const goalsValue = document.createElement('span');
  goalsValue.appendChild(document.createTextNode(club.gf));
  const goals = document.createElement('div');
  goals.appendChild(goalsLabel);
  goals.appendChild(goalsValue);

  const goalsConcededLabel = document.createElement('span');
  goalsConcededLabel.appendChild(document.createTextNode('Goals Conceded'));
  const goalsConcededValue = document.createElement('span');
  goalsConcededValue.appendChild(document.createTextNode(club.ga));
  const goalsConceded = document.createElement('div');
  goalsConceded.appendChild(goalsConcededLabel);
  goalsConceded.appendChild(goalsConcededValue);

  popupStats.appendChild(played);
  popupStats.appendChild(wins);
  popupStats.appendChild(losses);
  popupStats.appendChild(goals);
  popupStats.appendChild(goalsConceded);

  const popupClubMembers = document.querySelector('.popup-content .popup-club-members');
  popupClubMembers.classList.remove('display-none');
  popupClubMembers.replaceChildren();

  const players = document.createElement('div');
  const playersLabel = document.createElement('span');
  playersLabel.classList.add('header');
  playersLabel.appendChild(document.createTextNode('Players:'));
  players.appendChild(playersLabel);

  for (const player of club.players) {
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(`${player.jersey_number} ${player.first_name} ${player.last_name} (${player.nationality})`));
    players.appendChild(span);
  }

  const manager = document.createElement('div');
  const managerLabel = document.createElement('span');
  managerLabel.classList.add('header');
  managerLabel.appendChild(document.createTextNode('Manager:'));
  const managerValue = document.createElement('span');
  managerValue.appendChild(document.createTextNode(club.manager));
  manager.appendChild(managerLabel);
  manager.appendChild(managerValue);

  popupClubMembers.appendChild(players);
  popupClubMembers.appendChild(manager);
};
