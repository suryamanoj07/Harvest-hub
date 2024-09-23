const express = require('express');
const router = express.Router();

const adminModel = require('../models/admin_model');
const UserAuth = require('../models/user_auth_model');
const UserDetails = require('../models/user_model');

const multer = require('multer');
const upload = multer();

const path = require('path');
const { type } = require('os');

// Generate a random alphanumeric token
const generateToken = () => {
    const length = 20; // Specify the length of the token
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
};

router.get('/ping', (req, res) => {
    console.log('Request at /ping');
    res.status(200).send('pong');
});

router.post('/verify-admin', upload.none(), async (req, res) => {
    console.log('Request at /verify-admin');
    const token = req.body.token;
    let user = await adminModel.findOne({ token: token });
    console.log(token)
    if (user) {
        console.log("verified");
        return res.status(200).json({ status: 'ok' });
    } else {
        console.log("failed");
        return res.status(200).json({ status: 'failed' });
    }
});


router.post('/create-superuser', upload.none(), async (req, res) => {
    console.log("/create-superuser");

    const email = req.body.email;
    const password = req.body.password;

    console.log(email + password);

    // const token = generateToken();

    try {
        let user = new adminModel({
            email: email,
            password: password,
            admin_type: 'superuser',
            update_product_permission: true,
            update_user_permission: true,
            delete_user_permission: true,
            // token: token,
        });

        await user.save();

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    return res.status(200).json({
        status: 'ok',
    });
})

router.post('/create-manager', upload.none(), async (req, res) => {
    console.log("/create-manager");

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name + email + password);

    try {
        let user = new adminModel({
            name: name,
            email: email,
            password: password,
            admin_type: 'manager',
        });

        await user.save();

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    return res.status(200).json({
        status: 'ok',
    });
})

router.post('/get-managers', upload.none(), async (req, res) => {

    let managers = await adminModel.find({ admin_type: 'manager' });
    console.log(managers);
    return res.status(200).json({
        managers: managers,
        status: 'ok',
    });
});

router.post('/update-manager-permissions', upload.none(), async (req, res) => {
    console.log("/update-manager-permissions");

    const email = req.body.email;
    const delete_user_permission = req.body.delete_user_permission;
    const update_user_permission = req.body.update_user_permission;
    const update_product_permission = req.body.update_product_permission;

    try {
        let user = await adminModel.findOne({ email: email });
        user.delete_user_permission = delete_user_permission;
        user.update_user_permission = update_user_permission;
        user.update_product_permission = update_product_permission;
        await user.save();

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    console.log("updated")
    return res.status(200).json({
        status: 'ok',
    });
});

router.post('/delete-manager', upload.none(), async (req, res) => {
    console.log("/delete-manager");

    const email = req.body.email;

    try {
        await adminModel.deleteOne({ email: email });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    console.log("deleted")
    return res.status(200).json({
        status: 'ok',
    });
});


router.post('/admin-login', upload.none(), async (req, res) => {
    console.log("/admin-login");

    const email = req.body.email;
    const password = req.body.password;

    console.log(email + password);

    const token = generateToken();
    try {
        let user = await adminModel.findOne({ email });
        let verified_user = false;
        if (user.password == password) {
            verified_user = true;
            user.token = token;
            await user.save();
        }

        if (verified_user) {
            console.log("loggedin")
            return res.status(200).json({
                token: user.token,
                admin_type: user.admin_type,
                status: 'ok',
            });
        } else {
            console.log("wrong credentials");
            return res.status(200).json({
                status: 'failed',
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/get-user', upload.none(), async (req, res) => {
    console.log("/get-user");

    const personal_contact_number = req.body.personal_contact_number;

    console.log(personal_contact_number);

    try {
        let user = await UserDetails.findOne({ personal_contact_number: personal_contact_number });
        if (user) {
            console.log("found");
            return res.status(200).json({
                status: 'ok',
                first_name: user.first_name,
                last_name: user.last_name,
                personal_email: user.personal_email,
                personal_contact_number: user.personal_contact_number,
                personal_address: user.personal_address,
            });
        } else {
            console.log("not found");
            return res.status(200).json({
                status: 'failed',
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/update-user', upload.none(), async (req, res) => {
    console.log("/update-user");

    const personal_contact_number = req.body.personal_contact_number;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const personal_email = req.body.personal_email;
    const personal_address = req.body.personal_address;
    const token = req.body.token;

    console.log(personal_contact_number + first_name + last_name + personal_email + personal_address);

    try {
        let adminUser = await adminModel.findOne({ token: token });
        console.log(adminUser);
        console.log(adminUser.update_user_permission);
        console.log(typeof adminUser.update_user_permission);
        if (!adminUser.update_user_permission) {
            return res.status(200).json({
                status: 'denied',
            });
        }

        let user = await UserDetails.findOne({ personal_contact_number: personal_contact_number });
        user.first_name = first_name;
        user.last_name = last_name;
        user.personal_email = personal_email;
        user.personal_address = personal_address;
        await user.save();

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    console.log("updated")
    return res.status(200).json({
        status: 'ok',
    });
});

router.post('/delete-user', upload.none(), async (req, res) => {
    console.log("/delete-user");
    const personal_contact_number = req.body.personal_contact_number;
    const token = req.body.token;

    try {
        let user = await adminModel.findOne({ token: token });
        console.log(user);
        console.log(user.delete_user_permission);
        console.log(typeof user.delete_user_permission);
        if (!user.delete_user_permission) {
            return res.status(200).json({
                status: 'denied',
            });
        }

        await UserDetails.deleteOne({ personal_contact_number: personal_contact_number });
        await UserAuth.deleteOne({ personal_contact_number: personal_contact_number });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    console.log("deleted")
    return res.status(200).json({
        status: 'ok',
    });
});


module.exports = router;