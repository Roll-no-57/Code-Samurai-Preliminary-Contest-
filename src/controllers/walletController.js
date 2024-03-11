const pool = require('./pool');

// GET request to retrieve a wallet
// URL = '/api/wallets/{wallet_id}'
async function get_wallet(req, res, next) {

    const wallet_id = req.params.wallet_id;

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [wallet_id]);
        const wallet = result.rows[0];

        if (!wallet) {
            return res.status(404).send({ "message": "Wallet with id: " + wallet_id + " was not found" });
        }

        const bal = wallet.balance;
        const nam = wallet.user_name;

        const ans = {
            "wallet_id": wallet_id,
            "balance": bal,
            "wallet_user": {
                "user_id": wallet_id,
                "user_name": nam
            }
        }

        return res.status(200).json(ans);

    } catch (err) {

        console.error('Error retrieving wallet:', err);
        res.status(500).send('Error retrieving wallet: ' + err.message);

    }
}


// put request to add balance to a wallet
// URL = '/api/wallets/{wallet_id}'
async function add_balance(req, res, next) {

    const wallet_id = req.params.wallet_id;
    const recharge = req.body.recharge;

    console.log('Adding balance to wallet:', wallet_id, recharge);

    try {

        if(recharge <100 || recharge > 10000){
            return res.status(400).send({ "message": "invalid amount: "+recharge  });
        }

        const result = await pool.query('UPDATE users SET balance = balance + $1 WHERE user_id = $2 RETURNING *', [recharge, wallet_id]);
        const wallet = result.rows[0];

        if (!wallet) {
            return res.status(404).send({ "message": "wallet with id: " + wallet_id + " was not found" });
        }



        const bal = wallet.balance;
        const nam = wallet.user_name;

        const ans = {
            "wallet_id": wallet_id,
            "wallet_balance": bal,
            "wallet_user": {
                "user_id": wallet_id,
                "user_name": nam
            }
        }

        return res.status(200).json(ans);

    } catch (err) {

        console.error('Error adding balance to wallet:', err);
        res.status(500).send('Error adding balance to wallet: ' + err.message);

    }
}

module.exports = {
    get_wallet,
    add_balance,
};
