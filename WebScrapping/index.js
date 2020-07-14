const cheerio = require('cheerio');
const request = require('request');
const fs = require("fs");

const json2csv = require("json2csv").Parser;

const movie = "https://www.imdb.com/title/tt0242519/?ref_=tt_sims_tt";

    (async () => {
        

        let misdate = [];

        const response = await request({

            uri: movie,
            headers: {
                accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "en-US,en;q=0.9"
                
            },
            gzip: true

        });

        let $ = cheerio.load(response);
        let title = $('div[class="title_wrapper"] > h1').text().trim();

        misdate.push({
            title
        });

        const j2cp = new json2csv();
        const csv = j2cp.parse(misdate);
        fs.writeFileSync("./image.csv", csv, "utf-8");
        

    }
    )();