const config = require('dotenv').config()

const TwitchPS = require('twitchps');
const sqlite3 = require('sqlite3');
const express = require('express');
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');

let topics = [{topic: 'community-points-channel-v1.'+process.env.CHANNEL}];
let ps = new TwitchPS({init_topics: topics, reconnect: true, debug: false});
let db = new sqlite3.Database('./giveaways.db');
let app = express();
let loader = new TwingLoaderFilesystem('./templates');
let twing = new TwingEnvironment(loader);

app.use(express.static('public'));

ps.on('reward-redeemed', (data) => {
    if(data.reward.id === process.env.REWARD) {
        db.run(`INSERT INTO tickets(uid, name, created_at) VALUES(?, ?, ?)`,
            [data.redemption.user.id, data.redemption.user.display_name, data.redeemed_at],
            function(error){
                console.log("Ticket Magique : " + data.redemption.user.display_name);
            }
        );
    }
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

app.get('/', (req,res) => {

    let sql = `SELECT * FROM tickets`;

    db.all(sql, [], (err, rows) => {

        if (err) {
            throw err;
        }

        let max = rows.length - 1;
        let i = Math.floor(Math.random() * max);
        let winner = rows[i];

        twing.render('index.twig', {winner: winner, total: rows.length}).then((output) => {
            res.end(output);
        });

    });

});

app.post('/remove/:id', (req, res) => {

    db.run(`DELETE FROM tickets WHERE id=?`, req.params.id, function(err) {

        if (err) {
            return console.error(err.message);
        }

        res.json({ status: 'ok' })
        console.log(`Ticket Magique n°${req.params.id} supprimé`);
    });

});

app.post('/reset', (req, res) => {

    db.run(`DELETE FROM tickets`, function(err) {

        if (err) {
            return console.error(err.message);
        }

        res.json({ status: 'ok' })
        console.log(`Tous les Tickets Magiques supprimés`);
    });

});

app.listen(process.env.PORT,() => {
    console.log("Le Bus comment à rouler...")
});
