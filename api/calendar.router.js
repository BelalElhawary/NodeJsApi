const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

var db = new JsonDB(new Config("myDataBase", true, false, '/'));

const post = async (req, res) => {
    const body = req.body.value

    await db.push("/calendar", body);

    return res.json({
        success: true
    })
}

const get = async (req, res) => {
    try {
        var data = {}
        var data = await db.getData("/calendar");
        return res.json({
            success: true,
            result: data
        })
    } catch(error) {
        return res.json({
            success: false,
            result: error
        })
    };
}

router.post('/save', checkToken, post)
router.get('/load', get)

module.exports = router;