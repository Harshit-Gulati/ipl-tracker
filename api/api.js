async function getMatchData() {
    
    const url = 'https://free-cricket-live-score1.p.rapidapi.com/series/matches';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a019b47490mshb9bd48e91d3e675p159584jsn0bfa1bd65c17',
            'X-RapidAPI-Host': 'free-cricket-live-score1.p.rapidapi.com'
        },
        body: JSON.stringify({ key: 'ipl_2024' })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.status === 1) {
            const recentMatches = result.res.recent;
            const upcomingMatches = result.res.upcoming;

            const formattedRecentMatches = recentMatches.map(match => extractMatchData(match));
            const formattedUpcomingMatches = upcomingMatches.map(match => extractMatchData(match));
            const matchData = { recentMatches: formattedRecentMatches, upcomingMatches: formattedUpcomingMatches };
            localStorage.setItem('matchData', JSON.stringify(matchData));
            return matchData;
        } else {
            throw new Error("Failed to fetch match data");
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getPointsData() {

    const url = 'https://free-cricket-live-score1.p.rapidapi.com/series/pointstable';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a019b47490mshb9bd48e91d3e675p159584jsn0bfa1bd65c17',
            'X-RapidAPI-Host': 'free-cricket-live-score1.p.rapidapi.com'
        },
        body: JSON.stringify({ key: 'ipl_2024' })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.status === 1) {
            const pointsTableData = result.res.series.points;
            localStorage.setItem('pointsTableData', JSON.stringify(pointsTableData));
            return pointsTableData;
        } else {
            throw new Error("Failed to fetch points table data");
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

function extractMatchData(match) {
    const {
        _id: id,
        name,
        format: matchType,
        matchStatus: status,
        venue,
        time,
        teams,
        result,
    } = match;


    // extracting teams' info
    const team1 = {
        name: teams.t1.name,
        shortname: teams.t1.sName,
        score: teams.t1.score,
        img: teams.t1.logo
    };
    const team2 = {
        name: teams.t2.name,
        shortname: teams.t2.sName,
        score: teams.t2.score,
        img: teams.t2.logo
    };

    const resultMessage = result ? result.message : "";

    // Format date and time
    const formattedDateTime = new Date(time * 1000).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    return {
        id,
        name,
        matchType,
        status,
        venue,
        time: formattedDateTime,
        result: resultMessage,
        teams: [team1, team2],
    };
}

export { getMatchData, extractMatchData, getPointsData };