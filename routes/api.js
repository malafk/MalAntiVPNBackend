import express from 'express'

let router = express.Router();

import config from '../config.js'

import {isIP, isIPv4} from 'is-ip';
import fetch from 'node-fetch';

router.get('/', (req,res) => {
    res.json({
        success: true,
        message: "MalAntiVPN api route is online"
    })
})

router.get('/check/:ip', async(req,res) => {
    if(req.params.ip === undefined) {
        return res.json({
            success: false,
            message: "An IP wasn't supplied"
        })
    }
    let ip = req.params.ip;
    if(!isIP(ip)) return res.json({success: false, message: "Not a valid IP address"});
    
    const response = await fetch('https://ipinfo.io/' + ip + "?token=" + config.token); // ipinfo token
    const body = await response.text(); 

    let json = JSON.parse(body);

    console.log(json)

    let as = json.org.split(' ')[0]

    console.log("as: " + as)
    if(config.ans.includes(as)) {
        return res.json({
            error: false,
            vpn: true
        })
    }
    res.json({
        error: false,
        vpn: false
    })
})

export default router;