let homePageData = {
  standings:  [],
  fixtures: {
    previous: [],
    current: [],
    upcoming: []
  },
  dates: {
    current: [],
    upcoming: []
  }
};

let standingsPageData;
let fixturesPageData;
let resultsPageData;

// Data fetching
fetch('http://127.0.0.1:5500/data/data.json')
  .then((response) => response.json())
  .then((data) => {
    const standings = data.clubs
      .map((c) => {
        const players = data.players.filter((p) => p.club_code === c.club_code);

        return {
          name: c.name,
          code: c.club_code,
          position: c.position,
          played: c.games_played,
          wins: c.wins,
          draws: c.draws,
          losses: c.losses,
          gf: c.goals_scored,
          ga: c.goals_conceded,
          goalDifference: c.goals_difference,
          points: c.points,
          form: c.form,
          nextFixture: c.next_fixture,
          stadium: c.stadium,
          players,
          manager: `${c.manager} (${c.manager_nationality})`
        };
      })
      .sort((a, b) => {
        if (a.position > b.position) return 1;
        if (a.position < b.position) return -1;
        return 0;
      });
    homePageData.standings = [...standings];
    standingsPageData = [...standings];

    homePageData.fixtures = data.season_fixtures.reduce((acc, sf) => {
      if (sf.matchday === 4) {
        const fixtures = sf.fixtures.map((f) => {
          const timeArr = f.local_time.split(':');
          const time = `${timeArr[0]}:${timeArr[1]}`;

          return {
            homeTeam: f.home_team,
            homeTeamCode: f.home_team_code,
            homeTeamGoals: f.home_team_goals,
            homeTeamScorers: f.home_team_scorers,
            awayTeam: f.away_team,
            awayTeamCode: f.away_team_code,
            awayTeamGoals: f.away_team_goals,
            awayTeamScorers: f.away_team_scorers,
            stadium: f.venue,
            date: f.date,
            time
          }
        });

        acc.previous = fixtures;
      } else if (sf.matchday === 5 || sf.matchday === 6) {
        const fixtures = sf.fixtures.map((f) => {
          const timeArr = f.local_time.split(':');
          const time = `${timeArr[0]}:${timeArr[1]}`;

          return {
            homeTeam: f.home_team,
            homeTeamCode: f.home_team_code,
            awayTeam: f.away_team,
            awayTeamCode: f.away_team_code,
            date: f.date,
            time
          };
        });

        if (sf.matchday === 5) {
          acc.current = fixtures;
        } else {
          acc.upcoming = fixtures;
        }
      }

      return acc;
    }, { previous: [], current: [], upcoming: [] });

    homePageData.dates.current = homePageData.fixtures.current.reduce((acc, f) => {
      if (!acc.includes(f.date)) {
        acc.push(f.date);
      }

      return acc;
    }, []);

    homePageData.dates.upcoming = homePageData.fixtures.upcoming.reduce((acc, f) => {
      if (!acc.includes(f.date)) {
        acc.push(f.date);
      }

      return acc;
    }, []);

    fixturesPageData = data.season_fixtures
      .filter((f) => f.upcoming || (!f.upcoming && f.total_goals_scored === null))
      .reduce((acc, gw) => {
        for (const fixture of gw.fixtures) {
          acc.push({
            homeTeam: fixture.home_team,
            homeTeamCode: fixture.home_team_code,
            awayTeam: fixture.away_team,
            awayTeamCode: fixture.away_team_code,
            stadium: fixture.venue,
            date: fixture.date,
            time: fixture.local_time
          });
        }

        return acc;
      }, [])
      .reduce((acc, f, i) => {
        if (i === 0 || acc[acc.length - 1].date !== f.date) {
          acc.push({
            date: f.date,
            fixtures: [{ ...f }]
          });

          return acc;
        }

        acc[acc.length - 1].fixtures.push({ ...f });
        return acc;
      }, []);

    resultsPageData = data.season_fixtures
      .filter((f) => !f.upcoming && f.total_goals_scored !== null)
      .reduce((acc, gw) => {
        for (const fixture of gw.fixtures) {
          const timeArr = fixture.local_time.split(':');
          const time = `${timeArr[0]}:${timeArr[1]}`;

          acc.push({
            homeTeam: fixture.home_team,
            homeTeamCode: fixture.home_team_code,
            homeTeamGoals: fixture.home_team_goals,
            homeTeamScorers: fixture.home_team_scorers,
            awayTeam: fixture.away_team,
            awayTeamCode: fixture.away_team_code,
            awayTeamGoals: fixture.away_team_goals,
            awayTeamScorers: fixture.away_team_scorers,
            stadium: fixture.venue,
            date: fixture.date,
            time
          });
        }

        return acc;
      }, [])
      .reduce((acc, f, i) => {
        if (i === 0 || acc[acc.length - 1].date !== f.date) {
          acc.push({
            date: f.date,
            fixtures: [{ ...f }]
          });

          return acc;
        }

        acc[acc.length - 1].fixtures.push({ ...f });
        return acc;
      }, []);

    homePageData = homePageData;
  })
  .catch((error) => {
    console.log(error);
  });

const loader = document.querySelector('.loader');
const homePage = document.querySelector('.section-home-page');
const fixturesPage = document.querySelector('.section-fixtures-page');
const standingsPage = document.querySelector('.section-standings-page');
const resultsPage = document.querySelector('.section-results-page');

// Navigation events
const navigationOptions = document.querySelectorAll('.navigation-options a');
for (const option of navigationOptions) {
  option.addEventListener('click', (event) => {
    event.preventDefault();

    const sectionName = option.attributes.getNamedItem('section').nodeValue;
    
    loader.classList.remove('display-none');
    homePage.classList.add('display-none');
    fixturesPage.classList.add('display-none');
    standingsPage.classList.add('display-none');
    resultsPage.classList.add('display-none');

    document.querySelector(`.section-${sectionName}-page`).classList.remove('display-none');
    loader.classList.add('display-none');
  });
}
