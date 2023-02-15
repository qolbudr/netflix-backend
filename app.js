const express = require('express')
const axios = require("axios")
const fs = require('fs')
const app = express()
const port = 3000
const path = require('path')
const utils = require('./utils.js')

app.get("/api/player", async (req, res) => {
	const url = req.query.url
	res.send(`
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<style>
					iframe {
						width: 100vw;
						height: 100vh;
					}

					body {
						margin: 0;
						padding: 0;
					}
				</style>
			</head>
			<body>
				<iframe src="${req.query.subtitle ? url + '&subtitle=' + req.query.subtitle : url}" frameborder="0" allow="fullscreen"/>
			</body>
			</body>
		</html>

	`)
})

app.get("/api/home", async (req, res) => {
	const data = await utils.getHome();
	res.send(data)
})

app.get("/api/detail", async (req, res) => {
	const tmdb = req.query.tmdb
	const type = req.query.type
	const data = await utils.getDetail(tmdb, type);
	res.send(data)
})

app.get("/api/episode", async (req, res) => {
	const tmdb = req.query.tmdb
	const season = req.query.season
	const data = await utils.getEpisode(tmdb, season);
	res.send(data)
})

app.get("/api/search", async (req, res) => {
	try {
		const title = req.query.title
		const page = req.query.page
		const data = await utils.getSearch(title, page);
		res.send(data)
	} catch {
		return res.send([])
	}
})

app.get("/api/genre", async (req, res) => {
	try {
		const genre = req.query.genre
		const page = req.query.page
		const data = await utils.getGenre(genre, page);
		res.send(data)
	} catch {
		return res.send([])
	}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;