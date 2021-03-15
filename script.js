//COMINCIA A LEGGERE IL CODICE DALLA RIGA 105

//gestisce il funzionamento del bottone Nuova Partita (per iniziare a giocare)
//che genera il numero da indovinare
function gestoreNuovaPartita() {
  try {
    inizioPartita = true;
    nodoViteCorrente.value = nodoVite.value;
    //genera un numero casuale tra 1 e 50
    num = 1 + Math.floor(Math.random() * 50);

    //questa variabile temporanea, adesso inizializzata a 0, 
    //diverrà una copia del valore generato casualmente (cfr. funzione gestoreProva())
    temp = 0;

  } catch (e) {
    alert("gestoreNuovaPartita " + e);
  }
}

function gestoreProva() {
  try {
    //evita che si guadagnino punti cliccando più volte dopo aver indovinato
    if (nodoNumero.value == temp) {
      alert("Per continuare, clicca su Nuova Partita o su Ricomincia");
      return;
    }
    //lancia un errore se non viene inserito un numero
    if (isNaN(nodoNumero.value) || nodoNumero.value == "") {
      alert("Inserisci un numero!");
      return;
    }
    //lancia un errore se non si è cliccato su Nuova Partita
    if (!inizioPartita) {
      alert("Per continuare, clicca su Nuova Partita");
      return;
    }
    //gestisce il comportamento del programma nel caso in cui si indovini un numero
    if (nodoNumero.value == num) {
      nodoEsito.value = "Hai indovinato!"
      nodoViteCorrente.value = nodoVite.value;
      temp = num;
      nodoPunti.value++;

    //gestisce il comportamento del programma nel caso in cui si inserisca un numero sbagliato
    } else if (nodoNumero.value < num && nodoViteCorrente.value != 0) {
      nodoEsito.value = "Troppo basso!";
      nodoViteCorrente.value--;

      //come sopra
    } else if (nodoNumero.value > num && nodoViteCorrente.value != 0) {
      nodoEsito.value = "Troppo alto!";
      nodoViteCorrente.value--;

      //se si verificano le condizioni di vittoria o di sconfitta, lancia il gestoreImmagine()
    } if (nodoViteCorrente.value == 0 || nodoPunti.value == 3) {
      gestoreImmagine();
    }
  } catch (e) {
    alert("gestoreProva " + e);
  }
}

//gestisce il funzionamento del bottone "Ricomincia", per ricominciare a giocare
//nasconde il contatore vittoriaFacile che, una volta raggiunta una certa soglia, fa vincere automaticamente il giocatore
//(si può dunque imbrogliare e arrivare alla vittoria cliccando per 15 volte su Ricomincia)
function gestoreRicomincia() {
  try {

    nodoPunti.value = 0;
    //queste due linee servono a nascondere le immagini di vittoria e sconfitta
    nodoHaivinto.style.display = "none";
    nodoHaiperso.style.display = "none";

    /* un contatore che, al raggiungimento di 15,
    fa vincere automaticamente il giocatore */
    vittoriaFacile++;
    
    //se si verifica una delle due condizioni di vittoria, lancia la funzione gestoreImmagine()
    if (vittoriaFacile >= 15) {
      nodoPunti.value = 3;
      gestoreImmagine();
}
  } catch (e) {
    alert("gestoreRicomincia " + e)
  }
}

//raggiunto il punteggio (3 vittoria, 0 sconfitta) viene mostrata un'immagine corrispondente
function gestoreImmagine() {
  try {

    if (nodoPunti.value == 3) {
      nodoHaivinto.style.display = "block";

    } else if (nodoViteCorrente.value == 0) {
      nodoHaiperso.style.display = "block";

    }
  } catch (e) {
    alert("gestoreImmagine " + e);
  }
}

//COMINCIA A LEGGERE IL CODICE DA QUI
//Segue una lista delle variabili che useremo
var nodoVite;
var nodoViteCorrente;
var nodoNuovaPartita;
var nodoRicomincia;
var nodoNumero;
var nodoProva;
var nodoEsito;
var nodoPunti;

var num;
var temp;
var inizioPartita;
var vittoriaFacile;

//questa funzione inizializza le variabili e collega html a js
function gestoreLoad() {
  try {
    //inizializza a valori di default
    nodoVite = "";
    nodoViteCorrente = "";
    nodoNuovaPartita = "";
    nodoRicomincia = "";
    nodoNumero = "";
    nodoProva = "";
    nodoEsito = "";
    nodoPunti = "";
    nodoHaivinto = "";
    nodoHaiperso = "";

    //le variabili vengono collegate a elementi dell'html mediante un identificatore univoco (id)
    nodoVite = document.getElementById("vite");
    nodoViteCorrente = document.getElementById("viteCorrente");
    nodoNuovaPartita = document.getElementById("nuovaPartita");
    nodoRicomincia = document.getElementById("ricomincia");
    nodoNumero = document.getElementById("numero");
    nodoProva = document.getElementById("prova");
    nodoEsito = document.getElementById("esito");
    nodoPunti = document.getElementById("punti");

    nodoHaivinto = document.getElementById("vittoria");
    nodoHaiperso = document.getElementById("sconfitta");


    inizioPartita = false;
    vittoriaFacile = 0;
    nodoPunti.value = 0;

    //i comandi che seguono stabiliscono che quando in un punto specifico (es. nodoProva)
    //si verifica un'azione (on click), deve essere fatta partire una funzione (gestoreProva)
    //NB: i nomi delle funzioni qui vanno senza parentesi!!!
    nodoNuovaPartita.onclick = gestoreNuovaPartita;

    nodoProva.onclick = gestoreProva;

    nodoRicomincia.onclick = gestoreRicomincia;

  } catch (e) {
    alert("gestoreLoad " + e);
  }
}

//comando fondamentale: quando la pagina si carica, viene fatto partire il gestoreLoad,
//che inizializza le variabili e collega html e js
window.onload = gestoreLoad;