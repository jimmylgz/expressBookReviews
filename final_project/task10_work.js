const axios = require('axios').default;

const req = axios.get("https://jimlovebao-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/");

req.then(resp => {
    let booklist = resp.data;
    console.log(booklist);
}).catch(err => {
    console.log(err.toString())
})