var push = require('web-push');

window.create = () => {
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

window.join = () => {
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

window.exit = () => {
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

window.play = () => {
    fetch('https://ctplmdc.herokuapp.com/spotify/play', { 
            method: 'PUT',
            credentials: 'include',
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).catch(err => alert(err));
}

window.pause = () => {
    fetch('https://ctplmdc.herokuapp.com/spotify/pause', { 
            method: 'PUT',
            credentials: 'include',
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).catch(err => alert(err));
}

window.playPause = () => {
    if (document.getElementById('play-pause').classList.length > 1){
        if  (document.getElementById('play-pause').classList[1] == "amplitude-paused"){
            play();
        } else {
            pause();
        }
    }
}

window.vote = () => {
    fetch('https://ctplmdc.herokuapp.com/spotify/skip', { 
            method: 'POST',
            credentials: 'include',
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json'
            }
            }).then(response => response.json())
            .then(json =>{
                let vapidKeys = {
                    publicKey: 'BB2VclKxEI2khPyc0DZyhtlvhBYwfGKr-cd-PSk5-0h2xRL6vXNYF8kSXJe5s7L0lR2-YuBpVppGUYz4pEmsTeo',
                    privateKey: 'xS2VAkZqvGjGoLQIoJRdKrb1Sfy1ORLYAit3dY0cgvY'
                  } // hacer incognito esto
                push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey,  vapidKeys.privateKey);
                console.log(json);
                var obj = JSON.parse(JSON.stringify(json));
                for(var key in obj){
                    if (obj.hasOwnProperty(key)){
                        var sub=obj[key]; 
                    }
                    push.sendNotification(sub, 'test message 123');
                }

            });
}