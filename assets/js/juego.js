//Juego de blackjack

/** Referencias
 * 2C = Two of Clubs (Dos de tréboles)
 * 2D = Two of Diamonds (Dos de diamantes)
 * 2H = Two of Hearts (Dos de Corazones)
 * 2S = Two of Spades (Dos de Espadas)
 *  */

//Patrón Modulo(Es para seguridad del codigo y que no puedan hacer uso de variables, funciones y más)

(() => {
    'use strict';

    //Creando las variables con arreglos

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosCrupier = 0;

    //Referencias de HTML
    //Botones
    const btnPedir = document.querySelector('#btnPedir');
    const btnPlantarse = document.querySelector('#btnPlantarse');
    const btnNuevoJuego = document.querySelector('#btnNuevo');

    //Participantes
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasCrupier = document.querySelector('#crupier-cartas');
    // const jugador = document.querySelector('small');
    // const crupier = document.querySelector('.ptsCrupier');
    //Alternativa
    const puntosSmall = document.querySelectorAll('small');

    //Creando el DECK o BARAJA

    const crearDeck = () => {
        //Con un for anidado a un for of creamos el nombre que tiene cada imagen de cada una de las cartas
        for (let i = 2; i <= 10; i++) {
            for (const tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        //Agregando las cartas que no tienen numero como los son A, J, Q, K
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        // console.log(deck); //Se muestra el deck ordenado

        deck = _.shuffle(deck);
        console.log(deck);
        return deck;
    };

    crearDeck();

    //Creando la función de pedir una carta

    const pedirCarta = () => {
        //Extrayendo una carta del deck (en este caso seria la ultima)
        const carta = deck.pop();
        //Creando un medida de seguridad o advertencia para cuando ya no tengamos cartas en el deck
        if (deck.length === 0) {
            //Throw se usa para dar un tipo error con algún mensaje
            throw 'No hya cartas en el deck';
        }

        // console.log(deck);
        // //Carta debe ser de la baraja
        // console.log(carta);
        return carta;
    };

    // pedirCarta();

    //Creando el valor de cada carta

    const valorCarta = carta => {
        //Extrayendo el valor de la carta en el deck
        const valor = carta.substring(0, carta.length - 1);
        // let puntos = 0;
        // idNaN = verifica si es un numero o no
        // if (isNaN(valor)) {
        //    /* Convirtiendo las letras a numeros */
        //     /* usando el operador ternario */
        //     puntos = valor === 'A' ? 11 : 10;
        // } else {
        //   /*   Ahora convertiremos el valor extraído que es un string convertirlo a un numero */
        //     /* Una vez obteniendo el valor lo debemos multiplicar por 1 para hacer la conversion de string a numero */
        //     puntos = valor * 1;
        // }

        //Simplificando el codigo usando el operador ternario
        return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
    };

    //Turno del crupier o computadora

    const turnoCrupier = puntosMinimos => {
        do {
            const carta = pedirCarta();

            puntosCrupier = puntosCrupier + valorCarta(carta);
            // jugador.innerHTML = puntosJugador;
            //Alternativa
            puntosSmall[1].innerText = puntosCrupier;

            //Creando el elemento de img
            // <img class="carta" src="assets/cartas/2C.png"></img>
            const imgCarta = document.createElement('img');
            //Indicando la ruta de la imagen
            imgCarta.src = `assets/cartas/${carta}.png`;
            //Agregando la clase de css
            imgCarta.classList.add('carta');

            //Mostrando o insertando la carta en HTML
            divCartasCrupier.append(imgCarta);

            //Implementando la lógica si los puntos mínimos son mayores a 21
            if (puntosMinimos > 21) {
                break;
            }
        } while (puntosCrupier < puntosMinimos && puntosMinimos <= 21);

        //Mostrando al ganador

        setTimeout(() => {
            if (puntosCrupier === puntosMinimos) {
                alert('Nadie Gano');
            } else if (puntosCrupier > 21) {
                alert('Haz Ganado');
            } else if (puntosCrupier < 21) {
                alert('Haz Perdido');
            } else {
                alert('Gano el Crupier');
            }
        }, 225);
    };

    //Eventos usando "addEventListener"

    //Boton pedir
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        // jugador.innerHTML = puntosJugador;
        //Alternativa
        puntosSmall[0].innerText = puntosJugador;

        //Creando el elemento de img
        // <img class="carta" src="assets/cartas/2C.png"></img>
        const imgCarta = document.createElement('img');
        //Indicando la ruta de la imagen
        imgCarta.src = `assets/cartas/${carta}.png`;
        //Agregando la clase de css
        imgCarta.classList.add('carta');

        const imgCarta2 = document.createElement('img');
        imgCarta2.src = 'assets/cartas/red_back.png';
        imgCarta2.classList.add('carta');

        //Mostrando o insertando la carta en HTML
        divCartasJugador.append(imgCarta);
        divCartasCrupier.append(imgCarta2);

        //Evaluación de los puntos
        if (puntosJugador > 21) {
            console.warn('La cagaste, haz perdido jauja');
            btnPedir.disabled = true;
            btnPlantarse.disabled = true;
            turnoCrupier(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('Bien hecho perro');
            btnPedir.disabled = true;
            btnPlantarse.disabled = true;
            turnoCrupier(puntosJugador);
        }
    });

    //Boton plantarse

    btnPlantarse.addEventListener('click', () => {
        //Deshabilitando los botones
        btnPedir.disabled = true;
        btnPlantarse.disabled = true;
        //removiendo la carta tapada
        divCartasCrupier.innerHTML = '';
        //Llamando al crupier
        turnoCrupier(puntosJugador);
    });

    //Boton nuevo juego

    btnNuevoJuego.addEventListener('click', () => {
        // console.clear();

        //Resetear el deck
        deck = [];
        deck = crearDeck();
        //Resetear los puntos
        puntosJugador = 0;
        puntosCrupier = 0;
        //Limpiando el html
        puntosSmall[0].innerText = 0;
        puntosSmall[1].innerText = 0;
        divCartasJugador.innerHTML = '';
        divCartasCrupier.innerHTML = '';
        //Habilitando botones
        btnPedir.disabled = false;
        btnPlantarse.disabled = false;
    });
})();
