document.addEventListener('click', (e) => {
    const {target} = e;
    if (!target.matches('a')) {
        return;
    }
    e.preventDefault();
    urlRoute();
})

const urlRoutes = {
    404: {
        template: "/templates/404.html",
        title: '',
        description: ''
    },
    "/": {
        template: "/templates/index.html",
        title: '',
        description: ''
    },
    "/about": {
        template: "/templates/about.html",
        title: '',
        description: ''
    },
    "/contact": {
        template: "/templates/contact.html",
        title: '',
        description: ''
    },
    "/create": {
        template: "/templates/create.html",
        title: '',
        description: ''
    },
    "/room": {
        template: "/templates/room.html",
        title: '',
        description: ''
    },

}

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href)
    urlLocationHandler();
}

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    if (location.length == 0) {
        location = "/";
    }

    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => {
        response.text().then((data) => {
            document.getElementById("content").innerHTML = data;
        });
    });
}

fetch('https://ctplmdc.herokuapp.com/api/user-in-room', { 
    method: 'GET',
    credentials: 'include',
    referrerPolicy:'unsafe-url',
    headers: {
        "accept": "application/json",
        'Content-Type': 'application/json'
    }
    }).then(response => response.json())
    .then(json => {
    console.log(json);
    if (json['code']) {
        fetch('/templates/room.html').then((response) => {
            response.text().then((data) => {
                document.getElementById("content").innerHTML = data;
                document.getElementById("code").innerHTML = json['code'];
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
                setInterval(function(){fetch('https://ctplmdc.herokuapp.com/spotify/current-song', { 
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "accept": "application/json",
                        'Content-Type': 'application/json'
                    }
                    }).then((response) => {
                        if (!response.ok){
                            return {}
                        } else {
                            return response.json()
                        }
                    })
                    .then(json => {
                        console.log(json);
                        document.getElementById("cover_art_url").innerHTML = json['image_url'];
                    })}, 3000);
            });
        });
    }
    else {
        urlLocationHandler();
    }
}).catch(err => alert(err))