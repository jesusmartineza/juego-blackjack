(() => {
    'use strict';
    let d = [],
        e = ['C', 'D', 'H', 'S'],
        f = ['A', 'J', 'Q', 'K'],
        g = [],
        a = document.querySelector('#btnPedir'),
        b = document.querySelector('#btnPlantarse'),
        c = document.querySelector('#btnNuevo'),
        h = document.querySelectorAll('.divCartas'),
        i = document.querySelectorAll('small'),
        j = (e = 2) => {
            (d = k()), (g = []);
            for (let c = 0; c < e; c++) g.push(0);
            i.forEach(a => (a.innerText = 0)),
                h.forEach(a => (a.innerHTML = '')),
                (a.disabled = !1),
                (b.disabled = !1);
        },
        k = () => {
            d = [];
            for (let a = 2; a <= 10; a++) for (let b of e) d.push(a + b);
            for (let c of e) for (let g of f) d.push(g + c);
            return _.shuffle(d);
        },
        l = () => {
            if (0 === d.length) throw 'No hya cartas en el deck';
            return d.pop();
        },
        m = b => {
            let a = b.substring(0, b.length - 1);
            return isNaN(a) ? ('A' === a ? 11 : 10) : 1 * a;
        },
        n = (b, a) => ((g[a] = g[a] + m(b)), (i[a].innerText = g[a]), g[a]),
        o = (b, c) => {
            let a = document.createElement('img');
            (a.src = `assets/cartas/${b}.png`),
                a.classList.add('carta'),
                h[c].append(a);
        },
        p = () => {
            let [a, b] = g;
            setTimeout(() => {
                b === a
                    ? Swal.fire('Nadie Gano Lastima')
                    : b > 21
                    ? Swal.fire('Haz Ganado, Directo A Las Vegas')
                    : b < 21
                    ? Swal.fire('Haz Perdido, Mejor Juega Al Tetris')
                    : Swal.fire('Ssss Te Gano Una Computadora');
            }, 300);
        },
        q = a => {
            let b = 0;
            do {
                let c = l();
                (b = n(c, g.length - 1)), o(c, g.length - 1);
            } while (b < a && a <= 21);
            p();
        };
    a.addEventListener('click', () => {
        let d = l(),
            c = n(d, 0);
        o(d, 0),
            c > 21
                ? (console.warn('La cagaste, haz perdido jauja'),
                  (a.disabled = !0),
                  (b.disabled = !0),
                  q(c))
                : 21 === c &&
                  (console.warn('Bien hecho perro'),
                  (a.disabled = !0),
                  (b.disabled = !0),
                  q(c));
    }),
        b.addEventListener('click', () => {
            (a.disabled = !0), (b.disabled = !0), q(g[0]);
        }),
        c.addEventListener('click', () => {
            j();
        });
})();
