# Rehacktor - Documentazione del Progetto
## Descrizione
Rehacktor è un applicazione web sviluppata con React che permette agli utenti di navigare, cercare e interagire con una vasta collezione di giochi. L'applicazione permette di autenticarsi, visualizzare nel dettaglio i giochi, chattare in tempo reale, scrivere recensioni e la possibilità di salvare i giochi preferiti per gli utenti autenticati.

## API
Il progetto utilizza l'API di RAWG.io(https://rawg.io/) per ottenere dati sui giochi e Supabase come BaaS per autenticazione, archiviazione del database e chat in tempo reale.

## Stile
L'applicazione è realizzata con elementi di css per lo stile

## Pagine
1. Home Page - Mostra tutti i giochi, i giochi più popolari e le ultime uscite.
2. Pagina Dettaglio - Visualizza informazioni complete su un gioco specifico, inclusi descrizione, recensioni, screenshot e chat in tempo reale.
3. Risultati di Ricerca - Mostra giochi filtrati in base ai criteri di ricerca dell'utente come genere e piattaforme.
4. Pagine di Autenticazione - Pagine per registrazione e accesso
5. Pagina Profilo - Visualizza le informazioni dell'utente, i giochi aggiunti ai preferiti, le recensioni fatte e un form per la modifica dei dati.
## User Interactions
### Utenti non autenticati:
1. Navigare tra tutti i giochi presenti nella piattaforma
2. Cercare giochi per nome
3. Filtrare giochi per vari criteri
4. Visualizzare informazioni dettagliate su giochi specifici
5. Leggere recensioni di altri utenti
6. Leggere chat in tempo reale
7. Registrarsi con email e password
### Utenti autenticati:
1. Creare e gestire una lista di giochi preferiti
2. Inviare e eliminare recensioni
3. Chattare con altri utenti nella chat in tempo reale
4. Visualizzare e aggiornare le informazioni del proprio profilo
## Context
1. Session Context - Gestisce lo stato di autenticazione dell'utente
2. Fav Context - Gestisce la lista dei giochi preferiti dell'utente
## Dipendenze
Lista delle dipendenze usate nel progetto:

- "@supabase/supabase-js"
- "boostrap-icons"
- "dayjs"
- "@vercel/analytics"
- "primereact"
- "react"
- "react-dom"
- "react-spinner"
- "react-router"

## Funzionalità principali
1. Sistema di autenticazione - Registrazione e Accesso
2. Chat in tempo reale - Funzionalità di chat in tempo reale
3. Filtro giochi - Filtrare per genere, nome, piattaforme
4. Design responsive - Sito responsive con adattamenti in base alle dimensioni dello schermo
5. Recensioni utente - Possibilità di leggere, scrivere e eliminare recensioni dei giochi
6. Gestione preferiti - Aggiungere o togliere un gioco dai preferiti

## Struttura di progetto
### La struttura del progetto è organizzata con:
1. Cartella components per elementi riutilizzabili (Navbar, Sidebar, Footer, Filter, ecc.)
2. Cartella pages per le pagine principali dell'applicazione
3. Cartella context per la gestione dello stato
4. Cartella utils per gestione dei formati delle date
5. Cartella hooks per la gestione degli hooks
6. Cartella layout per il contenuto ripetuto nelle pagine
## Link del progetto
https://rehack-progetto-finalefrancecsoiannaccone.vercel.app/
