const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../../.env');
const result = dotenv.config({ path: envPath });
if (result.error) {
    throw result.error;
}
const { parsed: envVariables } = result;
module.exports = envVariables;
