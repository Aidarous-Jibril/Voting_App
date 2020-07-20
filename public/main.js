
const form = document.getElementById('vote-form');
var event;

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    const userChoice = document.querySelector('input[name=bp]:checked').value;
    const data = {bp: userChoice};
    console.log(data)

    const url = 'http://localhost:3000/poll';
    const config = {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers ({'Content-Type': 'application/json'})
    }
    try {     
        const response = await fetch(url, config);
        const jsonData = await response.json();  
        console.log(jsonData)
    } catch (error) {
         console.log(err);
    }

});
    //Fetch all votes
    fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const votes = data.votes;
        const totalVotes = votes.length;
        //use reduce to count votes for each player
        countTotalEach = votes.reduce((tot, vote) => (
            (tot[vote.bp] = (tot[vote.bp] || 0) + parseInt(vote.points)), tot),
            {}
        );
        
        let dataPoints = [
            { label: 'Ronaldo', y: countTotalEach.Ronaldo },
            { label: 'Messi', y: countTotalEach.Messi},
            { label: 'Salah', y: countTotalEach.Salah },
            { label: 'Zlattan', y: countTotalEach.Zlattan }
        ];
                
    const chartContainer = document.querySelector('#chartContainer');
    
    if(chartContainer){
        // Listen for the event.
        document.addEventListener('votesAdded', function (e) { 
            document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
        });
                
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'theme1',
            title : {text: `Total votes ${totalVotes}` },
            data:[
                {
                    type: 'column',
                    dataPoints: dataPoints
                }
            ]
        });
        chart.render();
    
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var pusher = new Pusher('7d94e0f77ce8fbfcfe06', {
        cluster: 'eu'
        });

        var channel = pusher.subscribe('bp-poll');
        channel.bind('bp-vote', function(data) {
            dataPoints = dataPoints.map(element => {
                if(element.label == data.bp){
                    element.y += data.points;
                    return element
                } else {
                    return element
                }
            })
            chart.render();
        });
    }

});        
