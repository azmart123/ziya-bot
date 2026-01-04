const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// ഫേസ്ബുക്കിന് നമ്മളെ തിരിച്ചറിയാനുള്ള രഹസ്യ കോഡ്
const VERIFY_TOKEN = "ziya_secret_token_123"; 

app.use(bodyParser.json());

// വെറുതെ ആരെങ്കിലും ലിങ്ക് നോക്കിയാൽ കാണാൻ
app.get('/', (req, res) => {
    res.send('Ziya Bot is Working! 🚀');
    });

    // ഫേസ്ബുക്ക് വെരിഫിക്കേഷൻ (ഇതാണ് പ്രധാനം)
    app.get('/webhook', (req, res) => {
        let mode = req.query['hub.mode'];
            let token = req.query['hub.verify_token'];
                let challenge = req.query['hub.challenge'];

                    if (mode && token) {
                            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                                        console.log('WEBHOOK_VERIFIED');
                                                    res.status(200).send(challenge);
                                                            } else {
                                                                        res.sendStatus(403);
                                                                                }
                                                                                    }
                                                                                    });

                                                                                    // ഇൻസ്റ്റാഗ്രാമിൽ നിന്ന് മെസ്സേജ് വരുമ്പോൾ
                                                                                    app.post('/webhook', (req, res) => {
                                                                                        let body = req.body;
                                                                                            console.log("Message Received:", JSON.stringify(body));

                                                                                                if (body.object === 'instagram') {
                                                                                                        res.status(200).send('EVENT_RECEIVED');
                                                                                                            } else {
                                                                                                                    res.sendStatus(404);
                                                                                                                        }
                                                                                                                        });

                                                                                                                        app.listen(PORT, () => {
                                                                                                                            console.log(`Server is running on port ${PORT}`);
                                                                                                                            });