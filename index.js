const axios = require('axios');
const jsdom = require('jsdom');
const express = require('express');
const cors = require('cors');
const { JSDOM } = jsdom;

const app = express();
app.use(cors());

app.get('/:handle', async (req, res) => {
    try {
        const handle = req.params.handle
        const response = await axios.get(`https://codeforces.com/profile/${handle}`);

        if (response.status === 200) {
            const html = response.data;
            const dom = new JSDOM(html);
            const document = dom.window.document;

            const userGrayElements = document.querySelectorAll('.user-gray[style="font-weight:bold;"]');
            const userLastVisitElemts = document.querySelectorAll('.format-humantime');
            const userSolvedCountTot = document.querySelectorAll('._UserActivityFrame_counterValue');
            const ratings = [];

            userGrayElements.forEach(element => {
                if (element.textContent) {
                    const ratingText = element.textContent.trim();
                    const numericRating = extractNumericRating(ratingText);
                    if (numericRating !== null) {
                        ratings.push(numericRating);
                    }
                }
            });

            userLastVisitElemts.forEach(element => {
                if(element.textContent) {
                    const ratingText = element.textContent.trim();
                    ratings.push(ratingText);
                }
            })

            userSolvedCountTot.forEach(element => {
                if(element.textContent) {
                    const ratingText = element.textContent.trim();
                    ratings.push(ratingText);
                }
            })

            if (ratings.length > 0) {
                res.status(200).json({
                    success: true, 
                    curr_rating: ratings[0],
                    max_raing: ratings[1],
                    lat_visit: ratings[2],
                    registered: ratings[3],
                    tot_probs: ratings[4],
                    probs_last_month: ratings[5],
                });
            } else {
                res.status(404).json({ success: false, error: 'No ratings found' });
            }
        } else {
            res.status(500).json({ success: false, error: `Failed to load: ${response.status}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

function extractNumericRating(text) {
    const matches = text.match(/\d+/);
    return matches ? parseInt(matches[0], 10) : null;
}

app.get('/', (req, res) => {
    res.status(200).send("Hi, you are at the right endpoint. Append /handle_of_user to the URL. For more information, visit the GitHub repo: https://github.com/RK-Karthik14/codeforces-api. Thanks for 🌟");
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
