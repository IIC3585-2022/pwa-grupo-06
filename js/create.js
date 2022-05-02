function create() {
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
          console.log(json['code']);
          fetch('/templates/room.html').then((response) => {
            response.text().then((data) => {
                document.getElementById("content").innerHTML = data;
                document.getElementById("code").innerHTML = json['code'];
                if (json['guest_can_pause'] == false || json['guest_can_pause'] == 'false') {
                    document.getElementById("icon_bool").innerHTML = "<img class=\"icono\" src=\"https://cdn-icons-png.flaticon.com/512/1810/1810746.png\" style=\"width: 60px;\" >";
                } else {
                    document.getElementById("icon_bool").innerHTML = "<img class=\"icono\" src=\"https://cdn-icons-png.flaticon.com/512/6276/6276686.png\" style=\"width: 60px;\" >";
                }
                if (json['is_host'] == true || json['is_host'] == 'true'){
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
                        }
                        });
                }
            });
        });
        }).catch(err => alert(err))
}

function join() {
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
          fetch('/templates/room.html').then((response) => {
            response.text().then((data) => {
                document.getElementById("content").innerHTML = data;
                document.getElementById("code").innerHTML = json['code'];
                if (json['guest_can_pause'] == false || json['guest_can_pause'] == 'false') {
                    document.getElementById("icon_bool").innerHTML = "<img class=\"icono\" src=\"https://cdn-icons-png.flaticon.com/512/1810/1810746.png\" style=\"width: 60px;\" >";
                } else {
                    document.getElementById("icon_bool").innerHTML = "<img class=\"icono\" src=\"https://cdn-icons-png.flaticon.com/512/6276/6276686.png\" style=\"width: 60px;\" >";
                }
            });
        });
        }).catch(err => alert(err))
}

function exit() {
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