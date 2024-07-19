import { getMatchData, extractMatchData, getPointsData } from '../api/api.js';

const liveBlock = document.getElementById('live');
const upcomingBlock = document.getElementById('upcoming');
const recentBlock = document.getElementById('recent');
const pointsBlock = document.getElementById('points-div');

document.getElementById('liveTab').addEventListener('click', async function () {
    try {
        document.getElementById('liveTab').style.color = '#FF4D4D';
        document.getElementById('upcomingTab').style.color = '#FFFFFF';
        document.getElementById('recentTab').style.color = '#FFFFFF';
        document.getElementById('pointsTableTab').style.color = '#FFFFFF';
        recentBlock.style.display = 'none';
        upcomingBlock.style.display = 'none';
        pointsBlock.style.display = 'none';
        liveBlock.style.display = 'block';
        // Fetch match data
        const matchData = await getMatchData();
        if (matchData.recentMatches.length > 0 && matchData.recentMatches[0].status === "Live") {
            // Populate live match
            populateLiveMatch(matchData.recentMatches[0]);
        } else {
            // No live matches or no match is currently live
            liveBlock.innerHTML = "";
            const noLiveMatchesMessage = document.createElement('p');
            noLiveMatchesMessage.classList.add('capitalize', 'bg-[#0F1C2E]', 'w-[99%]', 'rounded-lg', 'p-1', 'box-border', 'text-center');
            noLiveMatchesMessage.style.marginTop = '2px';
            noLiveMatchesMessage.style.marginBottom = '2px';
            noLiveMatchesMessage.textContent = "No live matches currently.";
            liveBlock.appendChild(noLiveMatchesMessage);
        }
    } catch (error) {
        console.error('Error fetching match data:', error);
    }
});

document.getElementById('recentTab').addEventListener('click', async function () {
    try {
        document.getElementById('recentTab').style.color = '#FF4D4D';
        document.getElementById('liveTab').style.color = '#FFFFFF';
        document.getElementById('upcomingTab').style.color = '#FFFFFF';
        document.getElementById('pointsTableTab').style.color = '#FFFFFF';
        liveBlock.style.display = 'none';
        upcomingBlock.style.display = 'none';
        pointsBlock.style.display = 'none';
        recentBlock.style.display = 'block';
        // Fetch match data
        const matchData = await getMatchData();
        // Populate previous matches
        populateRecentMatches(matchData.recentMatches);
    } catch (error) {
        console.error('Error fetching match data:', error);
    }
});

document.getElementById('upcomingTab').addEventListener('click', async function () {
    try {
        document.getElementById('upcomingTab').style.color = '#FF4D4D';
        document.getElementById('liveTab').style.color = '#FFFFFF';
        document.getElementById('recentTab').style.color = '#FFFFFF';
        document.getElementById('pointsTableTab').style.color = '#FFFFFF';
        liveBlock.style.display = 'none';
        recentBlock.style.display = 'none';
        pointsBlock.style.display = 'none';
        upcomingBlock.style.display = 'block';

        // Fetch match data
        const matchData = await getMatchData();

        // Populate previous matches
        populateUpcomingMatches(matchData.upcomingMatches);
    } catch (error) {
        console.error("Error fetching match data: ", error);
    }
});

document.getElementById('pointsTableTab').addEventListener('click', async function () {
    try {
        document.getElementById('liveTab').style.color = '#FFFFFF';
        document.getElementById('upcomingTab').style.color = '#FFFFFF';
        document.getElementById('recentTab').style.color = '#FFFFFF';
        document.getElementById('pointsTableTab').style.color = '#FF4D4D';
        liveBlock.style.display = 'none';
        recentBlock.style.display = 'none';
        upcomingBlock.style.display = 'none';
        pointsBlock.style.display = 'block';

        const pointsData = await getPointsData();

        populatePointsData(pointsData);
    } catch (error) {
        console.error("Error fetching points data: ", error);
    }
});

function populateLiveMatch(liveMatch) {
    liveBlock.innerHTML = "";
    const tab = document.getElementById('liveTab');
    tab.innerHTML = `<span>Live</span>
        <div class="h-1 rounded-full w-full">
            <div class="h-1 rounded-full bg-red-600 animate-[propel_5s_linear_infinite]"></div></div>`;
    const matchElement = document.createElement('div');
    matchElement.classList.add('container', 'w-[520px]', 'h-48', 'mt-2', 'mx-auto', 'bg-[#374357]', 'flex', 'flex-col', 'content-center', 'items-center', 'justify-evenly', 'text-white', 'font-semibold', 'rounded-lg', 'pt-2');

    const teamsContainer = document.createElement('div');
    teamsContainer.classList.add('container', 'h-[80%]', 'h-36', 'mx-auto', 'bg-[#374357]', 'flex', 'justify-evenly', 'content-center', 'items-center');

    // Add team 1
    const team1Container = document.createElement('div');
    team1Container.classList.add('bg-[#0F1C2E]', 'w-64', 'h-[100%]', 'rounded-lg', 'flex', 'flex-col', 'justify-center', 'content-center', 'items-center', 'p-2');

    const team1Image = document.createElement('img');
    team1Image.classList.add('rounded-lg', 'h-auto', 'max-w-[86px]');
    team1Image.src = `../images/${liveMatch.teams[0].img}`;
    team1Image.alt = liveMatch.teams[0].name;
    team1Container.appendChild(team1Image);

    const team1Name = document.createElement('div');
    team1Name.textContent = liveMatch.teams[0].name;
    team1Container.appendChild(team1Name);

    const team1Score = document.createElement('div');
    team1Score.classList.add('score');
    team1Score.textContent = liveMatch.teams[0].score;
    team1Container.appendChild(team1Score);

    teamsContainer.appendChild(team1Container);

    // Add team 2
    const team2Container = document.createElement('div');
    team2Container.classList.add('bg-[#0F1C2E]', 'w-64', 'h-[100%]', 'rounded-lg', 'flex', 'flex-col', 'justify-center', 'content-center', 'items-center', 'p-2');

    const team2Image = document.createElement('img');
    team2Image.classList.add('rounded-lg', 'h-auto', 'max-w-[86px]');
    team2Image.src = `../images/${liveMatch.teams[1].img}`;
    team2Image.alt = liveMatch.teams[1].name;
    team2Container.appendChild(team2Image);

    const team2Name = document.createElement('div');
    team2Name.textContent = liveMatch.teams[1].name;
    team2Container.appendChild(team2Name);

    const team2Score = document.createElement('div');
    team2Score.classList.add('score');
    team2Score.textContent = liveMatch.teams[1].score;
    team2Container.appendChild(team2Score);

    teamsContainer.appendChild(team2Container);

    matchElement.appendChild(teamsContainer);

    const matchStatusParagraph = document.createElement('p');
    matchStatusParagraph.classList.add('capitalize', 'bg-[#0F1C2E]', 'w-[99%]', 'rounded-lg', 'p-1', 'box-border', 'text-center');
    matchStatusParagraph.style.color = '#FF4D4D';
    matchStatusParagraph.style.marginTop = '2px';
    matchStatusParagraph.style.marginBottom = '2px';
    matchStatusParagraph.textContent = "Live";
    matchElement.appendChild(matchStatusParagraph);

    liveBlock.appendChild(matchElement);
}


function populateRecentMatches(recentMatches) {
    recentBlock.innerHTML = "";

    recentMatches.forEach(match => {
        if (match.status === "Live") {
            return;
        }
        const matchElement = document.createElement('div');
        matchElement.classList.add('container', 'w-[520px]', 'h-48', 'mt-2', 'mx-auto', 'bg-[#374357]', 'flex', 'flex-col', 'content-center', 'items-center', 'justify-evenly', 'text-white', 'font-semibold', 'rounded-lg', 'pt-2');

        const teamsContainer = document.createElement('div');
        teamsContainer.classList.add('container', 'h-[80%]', 'h-36', 'mx-auto', 'bg-[#374357]', 'flex', 'justify-evenly', 'content-center', 'items-center');

        match.teams.forEach(team => {
            const teamContainer = document.createElement('div');
            teamContainer.classList.add('bg-[#0F1C2E]', 'w-64', 'h-[100%]', 'rounded-lg', 'flex', 'flex-col', 'justify-center', 'content-center', 'items-center', 'p-2');

            const teamImage = document.createElement('img');
            teamImage.classList.add('rounded-lg', 'h-auto', 'max-w-[86px]');
            teamImage.src = `../images/${team.img}`;
            teamImage.alt = team.name;
            teamContainer.appendChild(teamImage);

            const teamName = document.createElement('div');
            teamName.textContent = team.name;
            teamContainer.appendChild(teamName);

            const teamScore = document.createElement('div');
            teamScore.classList.add('score');
            teamScore.textContent = team.score;
            teamContainer.appendChild(teamScore);

            teamsContainer.appendChild(teamContainer);
        });

        matchElement.appendChild(teamsContainer);

        const resultParagraph = document.createElement('p');
        resultParagraph.classList.add('capitalize', 'bg-[#0F1C2E]', 'w-[99%]', 'rounded-lg', 'p-1', 'box-border', 'text-center');
        resultParagraph.style.marginTop = '2px';
        resultParagraph.style.marginBottom = '2px';
        resultParagraph.textContent = match.result;
        matchElement.appendChild(resultParagraph);

        recentBlock.appendChild(matchElement);
    });
}

function populateUpcomingMatches(upcomingMatches) {
    upcomingBlock.innerHTML = '';

    upcomingMatches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('container', 'w-[520px]', 'box-content', 'min-h-80', 'mt-2', 'mx-auto', 'bg-[#374357]', 'flex', 'flex-col', 'content-center', 'items-center', 'justify-evenly', 'text-white', 'font-semibold', 'rounded-lg', 'py-4');

        const teamsContainer = document.createElement('div');
        teamsContainer.classList.add('container', 'max-w-2xl', 'h-[225px]', 'mt-1', 'mx-auto', 'bg-[#374357]', 'flex', 'justify-evenly', 'content-center', 'items-center');

        match.teams.forEach(team => {
            const teamContainer = document.createElement('div');
            teamContainer.classList.add('bg-[#0F1C2E]', 'w-64', 'h-[100%]', 'rounded-lg', 'flex', 'flex-col', 'justify-center', 'content-center', 'items-center', 'p-2');

            const teamImage = document.createElement('img');
            teamImage.classList.add('rounded-lg', 'h-auto', 'max-w-[86px]');
            teamImage.src = `../images/${team.img}`;
            teamImage.alt = team.name;
            teamContainer.appendChild(teamImage);

            const teamName = document.createElement('div');
            teamName.textContent = team.name;
            teamContainer.appendChild(teamName);

            const teamScore = document.createElement('div');
            teamScore.classList.add('score');
            teamScore.textContent = team.score;
            teamContainer.appendChild(teamScore);

            teamsContainer.appendChild(teamContainer);
        });

        matchElement.appendChild(teamsContainer);

        const venueTimeParagraph = document.createElement('p');
        venueTimeParagraph.classList.add('capitalize', 'bg-[#0F1C2E]', 'w-[99%]', 'rounded-lg', 'p-1', 'box-border', 'text-center');
        venueTimeParagraph.style.marginTop = '2px';
        venueTimeParagraph.style.marginBottom = '2px';
        venueTimeParagraph.textContent = `${match.venue} - ${match.time}`;
        matchElement.appendChild(venueTimeParagraph);

        upcomingBlock.appendChild(matchElement);
    });
}

function populatePointsData(teamData) {
    const tableBody = document.querySelector('#points-table tbody');
    tableBody.innerHTML = '';
    teamData[0].teams.forEach(team => {
        const row = document.createElement('tr');
        row.classList.add('odd:bg-[#0F1C2E]', 'even:bg-[#374357]');
        row.innerHTML = `
          <td class="px-4 py-2"><div class="flex justify-evenly content-center items-center max-w-[16px]"><img
                class="h-auto" style="max-width:70%; margin-right:4px;"
                src="../images/${team.logo}"
                alt="${team.sName}"
            />  ${team.sName}</div></td>
          <td class="px-4 py-2">${team.matches}</td>
          <td class="px-4 py-2">${team.won}</td>
          <td class="px-4 py-2">${team.lost}</td>
          <td class="px-4 py-2">${team.nrr}</td>
          <td class="px-4 py-2">${team.pts}</td>
          <td class="px-4 py-2">${team.lastFive.slice().reverse().map(result => result === 'won' ? 'W' : 'L').join(' | ')}</td>
        `;
        tableBody.appendChild(row);
    });
}

window.onload = async function () {
    try {
        document.getElementById('liveTab').style.color = '#FF4D4D';
        document.getElementById('upcomingTab').style.color = '#FFFFFF';
        document.getElementById('recentTab').style.color = '#FFFFFF';
        document.getElementById('pointsTableTab').style.color = '#FFFFFF';
        recentBlock.style.display = 'none';
        upcomingBlock.style.display = 'none';
        pointsBlock.style.display = 'none';
        liveBlock.style.display = 'block';
        // Fetch match data
        const matchData = await getMatchData();
        if (matchData.recentMatches.length > 0 && matchData.recentMatches[0].status === "Live") {
            // Populate live match
            populateLiveMatch(matchData.recentMatches[0]);
        } else {
            // if no live match is there
            liveBlock.innerHTML = "";
            const noLiveMatchesMessage = document.createElement('p');
            noLiveMatchesMessage.classList.add('capitalize', 'bg-[#0F1C2E]', 'w-[99%]', 'rounded-lg', 'p-1', 'box-border', 'text-center');
            noLiveMatchesMessage.style.marginTop = '2px';
            noLiveMatchesMessage.style.marginBottom = '2px';
            noLiveMatchesMessage.textContent = "No live matches currently.";
            liveBlock.appendChild(noLiveMatchesMessage);
        }
    } catch (error) {
        console.error('Error fetching match data:', error);
    }
};