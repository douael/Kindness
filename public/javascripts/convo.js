let botui = new BotUI('api-bot');

let socket = io.connect('http://localhost:8010');


let arrElement = {
    gender: "",
    lastname: "",
    firstname: "",
    age: "",
    address: "",
    stage: "",
    ndoor: "",
    email: "",
    password: ""
};

let arrLogin = {
    email: "",
    password: ""
};

botui.message.add({
    content: 'Bonjour ! Bienvenue chez Kindness :) Je m’appelle Kind et je vais être ton meilleur ami hihi\n',
    delay: 1500,
}).then(function () {

    $("a.botui-message-content-link").html("test");
    let img = document.createElement("img");
    img.src = "src/images/picto_kund(1).png";
    img.className = 'picto';

    let src = document.querySelectorAll(".botui-message-content");

    src[src.length - 1].after(img);
});

botui.message
    .bot({
        delay: 1500,
        content: 'Que veux tu faire ?\n'
    }).then(function () {
    $("a.botui-message-content-link").html("test");
    let img = document.createElement("img");
    img.src = "src/images/picto_kund(1).png";
    img.className = 'picto';

    let src = document.querySelectorAll(".botui-message-content");

    src[src.length - 1].after(img);

});

botui.action.button({
        delay: 1700,
        addMessage: false,
        action: [{
            text: 'M\'inscrire',
            value: 'register'
        }, {
            text: 'Me connecter',
            value: 'connexion'
        }]
    }
).then(function (res) {
    if (res.value === "register") {
        genderOfClient();
    } else {
        loginUserOfClient();
    }
});


/**
 *
 *
 * LOGIN
 *
 *
 */

let loginUserOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'Renseigne-moi ton email'
        })
        .then(function () {
            return botui.action.text({
                delay: 1000,
                action: {
                    sub_type: 'email',
                    value: arrLogin.email,
                    placeholder: 'E-mail'
                }
            })
        }).then(function (res) {

        arrLogin.email = res.value;
        passwordUserOfClient();

    })


};


let passwordUserOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'Ainsi que ton mot de passe'
        }).then(function () {

        $("a.botui-message-content-link").html("test");
        let img = document.createElement("img");
        img.src = "src/images/picto_kund(1).png";
        img.className = 'picto';

        let src = document.querySelectorAll(".botui-message-content");

        src[src.length - 1].after(img);
    }).then(function () {
        return botui.action.text({
            delay: 1000,
            addMessage: false,
            action: {
                sub_type: 'password',
                value: arrLogin.password,
                placeholder: 'Mot de passe'
            }
        })
    }).then(function (res) {

        arrLogin.password = res.value;
        finishLogin();

    });
};

let finishLogin = function () {
    socket.emit('fromClientLogin', {client: arrLogin});


    socket.on('firstLogin', function (data) {
        botui.message
            .bot({
                delay: 1200,
                content: '<a href="#" onclick="return test();">Paramètre</a>',
            }).then(function () {

            $("a.botui-message-content-link").html("test");
            let img = document.createElement("img");
            img.src = "src/images/picto_kund(1).png";
            img.className = 'picto';

            let src = document.querySelectorAll(".botui-message-content");

            src[src.length - 1].after(img);
        });
    })


};


socket.on('fromLogin', function (data) {
    if (data.isLogged === 0) {
        botui.message
            .bot({
                delay: 500,
                content: 'Tu t\'es trompé dans tes identifiants'
            }).then(function () {

            $("a.botui-message-content-link").html("test");
            let img = document.createElement("img");
            img.src = "src/images/picto_kund(1).png";
            img.className = 'picto';

            let src = document.querySelectorAll(".botui-message-content");

            src[src.length - 1].after(img);
        });
        botui.message
            .bot({
                type: 'embed',
                delay: 400,
                cssClass: 'custom-class',
                content: '/src/images/picto_kund(5).png'

            });
        loginUserOfClient();
    } else {
        botui.message
            .bot({
                delay: 1000,
                content: 'Tu es connecté, tu peux maintenant faire ta demande a KindBot ou informer les gens aux alentours  '
            })
        botui.message
            .bot({
                type: 'embed',
                delay: 1100,
                cssClass: 'custom-class',
                content: '/src/images/picto_kund(3).png'

            });
    }
});


/**
 *
 * Register
 */

let genderOfClient = function () {

    botui.message
        .bot({
            delay: 1500,
            content: 'Mais avant tout.. dis moi si tu es un homme ou une femme\n'
        });
    botui.action.button({
            delay: 1700,
            addMessage: false,
            action: [{
                text: 'Homme',
                value: 'homme'
            }, {
                text: 'Femme',
                value: 'femme'
            }]
        }
    ).then(function (res) {
        if (res.value === "homme") {
            botui.message.human({
                delay: 500,
                content: "Humm un gentleman.."
            }).then(function () {

                let img = document.createElement("img");
                img.src = "src/images/picto_homme.png";
                img.className = 'picto-human';

                let src = document.querySelectorAll(".human");

                src[src.length - 1].after(img);

            });
        } else {
            botui.message.human({
                delay: 500,
                content: "Humm une gente dame.."
            }).then(function () {

                let img = document.createElement("img");
                img.src = "src/images/picto_femme.png";
                img.className = 'picto-human';

                let src = document.querySelectorAll(".human");

                src[src.length - 1].after(img);

            });
            ;
        }
        arrElement.gender = res.value;
        nameOfClient();

    })
};

let nameOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'Quel est ton nom ?'
        })
        .then(function () {

            $("a.botui-message-content-link").html("test");
            let img = document.createElement("img");
            img.src = "src/images/picto_kund(1).png";
            img.className = 'picto';

            let src = document.querySelectorAll(".botui-message-content");

            src[src.length - 1].after(img);
        }).then(function () {
        return botui.action.text({
            delay: 1000,
            action: {
                value: arrElement.lastname,
                placeholder: 'Nom'
            }
        })
    }).then(function (res) {

        arrElement.lastname = res.value;
        firstnameOfClient();

    })
};

let firstnameOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'Quel est ton prénom ?'
        })
        .then(function () {
            return botui.action.text({
                delay: 1000,
                action: {
                    value: arrElement.firstname,
                    placeholder: 'Prénom'
                }
            })
        }).then(function (res) {

        arrElement.firstname = res.value;
        ageOfClient();

    })
};


let ageOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'Enchanté ' + arrElement.firstname + '. Quel age as tu ?'
        }).then(function () {

        $("a.botui-message-content-link").html("test");
        let img = document.createElement("img");
        img.src = "src/images/picto_kund(1).png";
        img.className = 'picto';

        let src = document.querySelectorAll(".botui-message-content");

        src[src.length - 1].after(img);
    })
        .then(function () {
            return botui.action.text({
                delay: 1000,
                action: {
                    sub_type: 'number',
                    value: arrElement.age,
                    placeholder: 'Age'
                }
            })
        }).then(function (res) {

        arrElement.age = res.value;
        adressOfClient();
    });
};

let adressOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'Parfait ! Je souhaite faire plus ample connaissance avec toi maintenant. Donnes moi ton adresse \n'
        })
        .then(function () {
            return botui.action.text({
                delay: 1000,
                action: {
                    size: 30,
                    icon: 'map-marker',
                    value: arrElement.address,
                    placeholder: 'Adresse'
                }
            })
        }).then(function (res) {

        arrElement.address = res.value;
        etageOfClient();
    });
};


let etageOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'Super ! Et ton étage \n'
        })
        .then(function () {
            return botui.action.text({
                delay: 1000,
                action: {
                    sub_type: 'number',
                    value: arrElement.stage,
                    placeholder: 'Ton étage'
                }
            })
        }).then(function (res) {

        arrElement.stage = res.value;
        numberDorsOfClient();
    });
};

let numberDorsOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'On se connait déjà bien.. Plus que ton numéro de porte s’il te plaît\n'
        })
        .then(function () {
            return botui.action.text({
                delay: 1000,
                action: {
                    sub_type: 'number',
                    value: arrElement.ndoor,
                    placeholder: 'Numéro de porte'
                }
            })
        }).then(function (res) {

        arrElement.ndoor = res.value;
        emailOfClient();
    });
};


let emailOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: ' Pour que je puisse te contacter si un de tes voisin solicite ton aide j’aurai besoin de ton adresse mail !\n'
        })
        .then(function () {
            return botui.action.text({
                delay: 1000,
                action: {
                    sub_type: 'email',
                    value: arrElement.email,
                    placeholder: 'Ton e-mail'
                }
            })
        }).then(function (res) {
        arrElement.email = res.value;
        passwordOfClient();
    });
};

let passwordOfClient = function () {
    botui.message
        .bot({
            delay: 500,
            content: ' Et n\'oublie pas de nous donner ton mot de passe pour que tu puisse te connecter ;)\n'
        })
        .then(function () {
            return botui.action.text({
                delay: 1000,
                addMessage: false,
                action: {
                    sub_type: 'password',
                    value: arrElement.password,
                    placeholder: ''
                }
            })
        }).then(function (res) {

        arrElement.password = res.value;
        finishRegister();
    });
};


let finishRegister = function () {
    botui.message
        .bot({
            delay: 1000,
            content: 'Félicitations ' + arrElement.firstname + ' :) :) Tu fais maintenant parti du réseau Kindness !  '
        }).then(function () {

        $("a.botui-message-content-link").html("test");
        let img = document.createElement("img");
        img.src = "src/images/picto_kund(3).png";
        img.className = 'picto';

        let src = document.querySelectorAll(".botui-message-content");

        src[src.length - 1].after(img);
    });


    socket.emit('fromClient', {client: arrElement, isConnected: 1});

    socket.on('firstLogin', function (data) {
        botui.message
            .bot({
                delay: 1200,
                content: '<a href="#" onclick="return test();">Paramètre</a>',
            }).then(function () {

            $("a.botui-message-content-link").html("test");
            let img = document.createElement("img");
            img.src = "src/images/picto_kund(1).png";
            img.className = 'picto';

            let src = document.querySelectorAll(".botui-message-content");

            src[src.length - 1].after(img);
        });
    })

};


if (document.layers) {
    document.captureEvents(Event.KEYDOWN);
}

document.onkeydown = function (evt) {
    let keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
    if (keyCode === 13) {
        socket.emit('fromClient', {client: document.getElementById('test123').value, isConnected: 1});
        botui.message.add({
            delay: 500,
            human: true, // show it as right aligned to UI
            content: document.getElementById('test123').value
        }).then(function () {

            let img = document.createElement("img");
            img.src = "src/images/picto_homme.png";
            img.className = 'picto-human';

            let src = document.querySelectorAll(".human");

            src[src.length - 1].after(img);

        });
        document.getElementById('test123').value = "";
    }
};

socket.on('fromServer', function (data) {
    //console.log(data.server);
    botui.message.add({
        content: data.server.fulfillment.speech,
        delay: 500,
    }).then(function () {

        $("a.botui-message-content-link").html("test");
        let img = document.createElement("img");
        img.src = "src/images/picto_kund(1).png";
        img.className = 'picto';

        let src = document.querySelectorAll(".botui-message-content");

        src[src.length - 1].after(img);
    });

    if (data.server.action === "besoin") {
        if (data.server.parameters.cuisine.length !== 0) {
            console.log('cuisine');

            socket.emit('demandeUser', {
                type: 'cuisine',
                parameter: data.server.parameters.cuisine,
                user: arrLogin.email
            });

            botui.action.button({
                    delay: 1700,
                    action: [{
                        text: 'Oui',
                        value: 'oui'
                    }, {
                        text: 'Non',
                        value: 'non'
                    }]
                }
            ).then(function (res) {
                if (res.value === "oui") {
                    ouiCuisine();
                } else {
                    nonCuisine();
                }
            });
        }
        if (data.server.parameters.outils.length !== 0) {
            socket.emit('demandeUser', {
                type: 'outils',
                parameter: data.server.parameters.outils,
                user: arrLogin.email
            });
            botui.action.button({
                    delay: 1700,
                    addMessage: false,
                    action: [{
                        text: 'Oui',
                        value: 'oui'
                    }, {
                        text: 'Non',
                        value: 'non'
                    }]
                }
            ).then(function (res) {
                if (res.value === "oui") {
                    ouiCuisine();
                } else {
                    nonCuisine();
                }
            });
        }
    }

    if (data.server.parameters.evenement === "bruits" || data.server.parameters.evenement === "bruit") {
        socket.emit('sendInform', {user: arrLogin.email});
    }
});


let ouiCuisine = function () {
    botui.message
        .bot({
            delay: 500,
            content: 'Très bien je vais envoyer une notification à tes voisins ;)'
        }).then(function () {

        $("a.botui-message-content-link").html("test");
        let img = document.createElement("img");
        img.src = "src/images/picto_kund(1).png";
        img.className = 'picto';

        let src = document.querySelectorAll(".botui-message-content");

        src[src.length - 1].after(img);
    });
    socket.emit('sendEmailToAll', {data: arrLogin.email});
    socket.on('noUserAdress', function (data) {
        botui.message
            .bot({
                type: 'embed',
                delay: 400,
                cssClass: 'custom-class',
                content: '/src/images/picto_kund(6).png'

            });
        botui.message
            .bot({
                delay: 500,
                content: 'Il n\'y a personne dans ton voisinage.. Veux-tu élargir la recherche ?'
            });
    });
};


let nonCuisine = function () {

    botui.message
        .bot({
            delay: 500,
            content: 'Je vais te montrer des magasins à côté de chez toi'
        }).then(function () {

        let img = document.createElement("img");
        img.src = "src/images/picto_homme.png";
        img.className = 'picto-human';

        let src = document.querySelectorAll(".human");

        src[src.length - 1].after(img);

    });


    socket.emit('fromClientGetElements', {data: arrLogin.email});

    socket.on('getElementsByEmail', function (data) {
        botui.message
            .bot({
                type: 'embed',
                delay: 500,
                content: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDsNrpyymFff-s24KXdYgo88LcBg1E3OwY&q=' + data.data.address + ''
            });
    });


};


function test() {
    $("#myModal").modal('show');
}

function save() {
    let allSetting = [];
    let toto = document.querySelectorAll(".hovered1");
    for (i = 0; i < toto.length; ++i) {
        let bla = toto[i];
        allSetting.push(bla.id);
        console.log(allSetting);

    }
    socket.emit('parameters', {data: allSetting});
    $('#myModal').modal('hide');
}

function changeImage(id) {
    //console.log(id);
    let img = document.getElementById(id);
    let link = img.src;
    let strArray = link.split("src");

    // Display array values on page
    //console.log(strArray[0]);
    if (img.src === strArray[0] + "src/images/categories/categorie(" + id + ").png") {
        img.src = "src/images/categories/categorie-over(" + id + ").png";
        img.classList.add("hovered1");
        // console.log('bla');
    }
    else {
        img.src = "src/images/categories/categorie(" + id + ").png";
        img.classList.remove("hovered1");
    }
}
