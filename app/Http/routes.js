'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.get('/signup', 'UserController.create')
Route.post('/signup', 'UserController.store')

Route.get('/login', 'SessionController.create')
Route.post('/login', 'SessionController.store')

Route.any('/logout', 'SessionController.destroy')

Route.get('/songs/search-spotify', 'SongSpotifyController.create')
  .middleware('auth')
Route.post('/songs/search-spotify', 'SongSpotifyController.store')
  .middleware('auth')
Route.resource('/songs', 'SongController')
  .except('delete')
  .middleware('auth')

Route.resource('/set-lists', 'SetListController')
  .middleware('auth')

Route.get('/set-lists/:id/add-song', 'SetList/PracticeSongController.create')
  .middleware('auth')
Route.post('/set-lists/:id/add-song', 'SetList/PracticeSongController.store')
  .middleware('auth')

Route.get('/profile', 'ProfileController.edit')
  .middleware('auth')
