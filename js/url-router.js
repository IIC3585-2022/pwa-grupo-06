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
    console.log(document.cookie);
    console.log(json['code']);
    console.log(json);
    if (json['code']) {
        fetch('/templates/room.html').then((response) => {
            response.text().then((data) => {
                document.getElementById("content").innerHTML = data;
                document.getElementById("code").innerHTML = json['code'];
            });
        });
    }
    else {
        urlLocationHandler();
    }
}).catch(err => alert(err))