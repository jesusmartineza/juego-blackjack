//Juego de blackjack

/** Referencias
 * 2C = Two of Clubs (Dos de tréboles)
 * 2D = Two of Diamonds (Dos de diamantes)
 * 2H = Two of Hearts (Dos de Corazones)
 * 2S = Two of Spades (Dos de Espadas)
 *  */

//Patrón Modulo(Es para seguridad del codigo y que no puedan hacer uso de variables, funciones y más)

/* const moduloBlackjack =  */ (() => {
    'use strict';

    //Creando las variables con arreglos

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Referencias de HTML
    //Botones
    const btnPedir = document.querySelector('#btnPedir'),
        btnPlantarse = document.querySelector('#btnPlantarse'),
        btnNuevoJuego = document.querySelector('#btnNuevo');

    //Participantes
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosSmall = document.querySelectorAll('small');

    //Esta es la primer función la cual da inicio al juego
    const inicializarJuego = (numeroJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0);
        }

        //Limpiando los puntos del html
        puntosSmall.forEach(elem => (elem.innerText = 0));

        //Limpiando las cartas del html
        divCartasJugadores.forEach(elem => (elem.innerHTML = ''));

        //Habilitando botones
        btnPedir.disabled = false;
        btnPlantarse.disabled = false;
    };

    //Creando el DECK o BARAJA

    const crearDeck = () => {
        deck = [];
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

        return _.shuffle(deck);
    };

    //Creando la función de pedir una carta

    const pedirCarta = () => {
        //Creando un medida de seguridad o advertencia para cuando ya no tengamos cartas en el deck
        if (deck.length === 0) {
            //Throw se usa para dar un tipo error con algún mensaje
            throw 'No hya cartas en el deck';
        }
        //Extrayendo una carta del deck (en este caso seria la ultima)
        return deck.pop();
    };

    //Creando el valor de cada carta

    const valorCarta = carta => {
        //Extrayendo el valor de la carta en el deck
        const valor = carta.substring(0, carta.length - 1);

        return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
    };

    //Turno: 0 = primer jugador y el ultimo "0" sera el crupier(computadora)
    const acumularPuntos = (carta, turno) => {
        //puntosJugadores[turno] indicara tanto el jugador como sus respectivos puntos
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosSmall[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };

    //Creando la carta en el html

    const crearCarta = (carta, turno) => {
        //Creando el elemento de img
        // <img class="carta" src="assets/cartas/2C.png"></img>
        const imgCarta = document.createElement('img');
        //Indicando la ruta de la imagen
        imgCarta.src = `assets/cartas/${carta}.png`;
        //Agregando la clase de css
        imgCarta.classList.add('carta');
        //Mostrando o insertando la carta en HTML
        divCartasJugadores[turno].append(imgCarta);
    };

    /* const crearCarta2 = turno => {
        const imgCarta2 = document.createElement('img');
        imgCarta2.src = 'assets/cartas/red_back.png';
        imgCarta2.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta2);
    }; */

    //Mostrando al ganador

    const determinarGanador = () => {
        const [puntosMinimos, puntosCrupier] = puntosJugadores;

        setTimeout(() => {
            if (puntosCrupier === puntosMinimos) {
                Swal.fire('Nadie Gano Lastima');
            } else if (puntosCrupier > 21) {
                Swal.fire('Haz Ganado, Directo A Las Vegas');
            } else if (puntosCrupier < 21) {
                Swal.fire('Haz Perdido, Mejor Juega Al Tetris');
            } else {
                Swal.fire('Ssss Te Gano Una Computadora');
            }
        }, 300);
    };

    //Turno del crupier o computadora

    const turnoCrupier = puntosMinimos => {
        let puntosCrupier = 0;

        do {
            const carta = pedirCarta();

            //Contador de puntos y mostrarlos en el html
            //puntosJugadores.length - 1 nos sirve para indicar que sera jugador crupier siempre sera el último
            puntosCrupier = acumularPuntos(carta, puntosJugadores.length - 1);
            //Creando la carta en el html
            crearCarta(carta, puntosJugadores.length - 1);
        } while (puntosCrupier < puntosMinimos && puntosMinimos <= 21);

        //Mostrando al ganador

        determinarGanador();
    };

    //Eventos usando "addEventListener"

    //Boton pedir
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta, 0);

        //Creando la carta en el html
        crearCarta(carta, 0);
        // crearCarta(carta, crupier);
        // crearCarta2(puntosJugadores.length - 1);

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
        // divCartasCrupier.innerHTML = '';
        //Llamando al crupier
        turnoCrupier(puntosJugadores[0]);
    });

    //Boton nuevo juego

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    /* return {
        nuevoJuego: inicializarJuego,
    }; */
})();
