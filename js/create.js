import { app, messaging, getToken } from './index.js';

window.create = function () {
    let votes_to_skip = document.getElementById('votes_to_skip');
    let guest_can_pause = document.getElementById('guest_can_pause');
    let errorElement = document.getElementById('error');
    if (votes_to_skip.value == '' || votes_to_skip.value == null){
        errorElement.innerText = 'Tienes que ingresar un numero valido.'
    }
    if (votes_to_skip.value < 1) {
        votes_to_skip.value = 1
    }
    console.log(votes_to_skip.value);
    console.log(guest_can_pause.checked);
    fetch('https://ctplmdc.herokuapp.com/api/create-room', { 
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                votes_to_skip: votes_to_skip.value,
                guest_can_pause: guest_can_pause.checked
            }),
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).then(response => response.json())
      .then(json => {
          console.log('matiaas')
          console.log(json);
          fetch('/templates/room.html').then((response) => {
            response.text().then((data) => {
                document.getElementById("content").innerHTML = data;
                document.getElementById("code").innerHTML = json['code'];
                fetch('https://ctplmdc.herokuapp.com/spotify/is-authenticated', { 
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "accept": "application/json",
                        'Content-Type': 'application/json'
                    }
                    }).then(response => response.json())
                    .then(json => {
                    if (json['status'] == false || json['status'] == 'false'){
                        fetch('https://ctplmdc.herokuapp.com/spotify/get-auth-url', {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                "accept": "application/json",
                                'Content-Type': 'application/json'
                            }
                        }).then(response => response.json())
                        .then(json =>{
                            window.location.replace(json['url'])
                        });
                    } else {
                        window.location.replace('https://front-ctplmdc.herokuapp.com/');
                    }
                    });
            });
        });
        }).catch(err => alert(err))
}

window.join = function () {
    let room_pin = document.getElementById('room_pin');
    let errorElement = document.getElementById('error_join');
    if (room_pin.value == '' || room_pin.value == null){
        errorElement.innerText = 'Tienes que ingresar codigo valido.'
    }
    console.log(room_pin.value);
    fetch('https://ctplmdc.herokuapp.com/api/join-room', { 
            method: 'POST',
            body: JSON.stringify({
                code: room_pin.value.toUpperCase()
            }),
            credentials: 'include',
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).then(response => response.json())
      .then(json => {
          console.log(json);
          console.log(json['code']);
          if (json['code']){
              fetch('/templates/room.html').then((response) => {
                response.text().then((data) => {
                    document.getElementById("content").innerHTML = data;
                    document.getElementById("code").innerHTML = json['code'];
                });
            });
            window.location.replace('https://front-ctplmdc.herokuapp.com/');
          }
        }).catch(err => alert(err))
}

window.exit = function () {
    fetch('https://ctplmdc.herokuapp.com/api/leave-room', { 
            method: 'POST',
            credentials: 'include',
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).then(response => response.json())
      .then(json => {
          fetch('/templates/index.html').then((response) => {
            response.text().then((data) => {
                document.getElementById("content").innerHTML = data;
            });
        });
        }).catch(err => alert(err))
}

function play() {
    fetch('https://ctplmdc.herokuapp.com/spotify/play', { 
            method: 'PUT',
            credentials: 'include',
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).catch(err => alert(err));
}

function pause() {
    fetch('https://ctplmdc.herokuapp.com/spotify/pause', { 
            method: 'PUT',
            credentials: 'include',
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).catch(err => alert(err));
}

window.playPause = function () {
    if (document.getElementById('play-pause').classList.length > 1){
        if  (document.getElementById('play-pause').classList[1] == "amplitude-paused"){
            play();
        } else {
            pause();
        }
    }
}

window.vote = function () {
    fetch('https://ctplmdc.herokuapp.com/spotify/skip', { 
            method: 'POST',
            credentials: 'include',
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).then(response => response.json())
            .then(json =>{
                console.log(json);
            });
}

window.subscribe = async function () {
    getToken(messaging, {vapidKey: "BH9hcXXch_y225Shq9jYBWZVvOAGeDg5hAk_muDhmOtgQEMiLhLQUh5XDHjEfmkpmbj7B9sV9IgQPnuwkteVNhE"}).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
            document.getElementById("pregunta").innerHTML = '';
            fetch('https://ctplmdc.herokuapp.com/api/subscribe', { 
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({
                        info: currentToken
                    }),
                    headers: {
                        "accept": "application/json",
                        'Content-Type': 'application/json'
                    }
                    })
        } else {
        console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });;
}