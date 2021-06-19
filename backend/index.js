const express = require('express');
const cors = require('cors');
const request = require('request')

const app = express();
app.use(cors());

app.get("/:pokemon", (req, res) => {
    const pokemon = req.params["pokemon"];
    request(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const parsedBody = JSON.parse(body);
            const pokemonInfo = {
                name: parsedBody["forms"][0]["name"],
                image: parsedBody["sprites"]["other"]["dream_world"]["front_default"],
                stats: {
                    attack: parsedBody["stats"][1]["base_stat"],
                    defense: parsedBody["stats"][2]["base_stat"],
                    speed: parsedBody["stats"][5]["base_stat"]
                }
            }
            res.send(pokemonInfo);
        }
        else {
            res.sendStatus(404);
        }
    })
})

app.listen(3001, () => {
    console.log("Listening on port 3001");
})
