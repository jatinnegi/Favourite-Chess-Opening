import axios from "axios";
import ChessOpenings from "../openings";

export const getFavouriteOpening = (username) => {
  const api = `https://api.chess.com/pub/player/${username}/games/archives`;
  axios
    .get(api)
    .then((res) => {
      const data = res.data;
      let lastArchive = data.archives[data.archives.length - 1];
      const gamesApi = lastArchive;

      axios(gamesApi)
        .then((res) => {
          let openings = [];
          const data = res.data;
          const games = data.games;

          for (let i = games.length - 1; i >= 0; i--) {
            if (games[i].pgn.includes(`[White "${username}"]`)) {
              let move = "";
              let index = games[i].pgn.match(/1\. /).index;
              move += games[i].pgn[index + 3];
              move += games[i].pgn[index + 4];
              if (games[i].pgn[index + 5] !== " ")
                move += games[i].pgn[index + 5];

              openings.push(move);
            }
          }
          var map = {};
          var mostFrequentElement = openings[0];
          function findMostFrequent() {
            for (var i = 0; i < openings.length; i++) {
              if (!map[openings[i]]) {
                map[openings[i]] = 1;
              } else {
                ++map[openings[i]];
                if (map[openings[i]] > map[mostFrequentElement]) {
                  mostFrequentElement = openings[i];
                }
              }
            }
            const favouriteOpening = ChessOpenings[mostFrequentElement];
            if (favouriteOpening === undefined) {
              alert("No games found");
            } else {
              alert(favouriteOpening);
            }
          }
          findMostFrequent();
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
