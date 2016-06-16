var express = require('express')
var router = express()
var bodyparser = require('body-parser')
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');
var formidable = require('formidable')

router.use(bodyparser.json())
router.use(bodyparser.urlencoded())
router.use(express.static(__dirname + '/public'))

router.get('/accounts', function(req, res) {
    res.sendFile(__dirname + '/public/accounts.html')
})

router.post('/accounts', function(req, res) {
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        var date = fields.transDate
        var desc = fields.description
        var amount = fields.amount
        var type = fields.transTypeDD.toLowerCase()
        var mode = fields.transModeDD.toLowerCase()
        var file = files.image.name

        var transObj = {
            "date": date,
            "desc": desc,
            "amount": amount,
            "type": type,
            "mode": mode,
            "file": file
        }

        client.incr('counter')
        client.get('counter', function(err, reply) {
            var counter = parseInt(reply)
            set(counter, transObj)
        })
    })
    res.sendFile(__dirname + '/public/accounts.html')
})

function set(counter, transObj) {
    console.log(transObj);
    client.hset('Transaction:' + counter, 'date', transObj.date, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset('Transaction:' + counter, 'description', transObj.desc, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset('Transaction:' + counter, 'amount', transObj.amount, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset('Transaction:' + counter, 'type', transObj.type, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset('Transaction:' + counter, 'mode', transObj.mode, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset('Transaction:' + counter, 'file', transObj.file, function(err, reply) {
        console.log('set ' + reply);
    });
    setTotal(transObj.type, transObj.mode, transObj.amount)
    setcreditdebit(counter, transObj)
}

function setcreditdebit(counter, transObj) {
    if (transObj.type === 'expense') {
        client.incr('ExpenseCounter')
        client.get('ExpenseCounter', function(err, reply) {
            var ExpenseCounter = parseInt(reply)
            setTransaction('Expense', ExpenseCounter, 'cr', counter)
        })
        var AccountMode = transObj.mode.slice(0, 1).toUpperCase() + transObj.mode.slice(1)
        client.incr(AccountMode + "Counter")
        client.get(AccountMode + "Counter", function(err, reply) {
            var AccountCounter = parseInt(reply)
            setTransaction(AccountMode, AccountCounter, 'db', counter)
        })
    }
    if (transObj.type === 'income') {
        client.incr('IncomeCounter')
        client.get('IncomeCounter', function(err, reply) {
            var IncomeCounter = parseInt(reply)
            setTransaction('Income', IncomeCounter, 'db', counter)
        })
        var AccountMode = transObj.mode.slice(0, 1).toUpperCase() + transObj.mode.slice(1)
        client.incr(AccountMode + "Counter")
        client.get(AccountMode + "Counter", function(err, reply) {
            var AccountCounter = parseInt(reply)
            setTransaction(AccountMode, AccountCounter, 'cr', counter)
        })
    }

}

function setTransaction(Account, counter, TransType, TransCounter) {
    client.hset(Account + ':' + counter, 'date', transObj.date, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset(Account + ':' + counter, 'TransactionID', TransCounter, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset(Account + ':' + counter, 'description', transObj.desc, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset(Account + ':' + counter, 'amount', transObj.amount, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset(Account + ':' + counter, 'type', transObj.type, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset(Account + ':' + counter, 'mode', transObj.mode, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset(Account + ':' + counter, 'Cr/Db', TransTypw, function(err, reply) {
        console.log('set ' + reply);
    });
    client.hset(Account + ':' + counter, 'file', transObj.file, function(err, reply) {
        console.log('set ' + reply);
    });
}

function setTotal(type, mode, amount) {
    if (type === 'expense') {
        client.incrby('ExpenseTotal', amount)
        if (mode === 'cash') {
            client.decrby('CashTotal', amount)
        } else {
            client.decrby('BankTotal', amount)
        }
    } else {
        client.incrby('IncomeTotal', amount)
        if (mode === 'cash') {
            client.incrby('CashTotal', amount)
        } else {
            client.incrby('BankTotal', amount)
        }
    }
}


router.get("/cashbal", function(req, res) {
    client.get('CashBalance', function(err, reply) {
        res.send(reply)
    })
})

router.get("/cardbal", function(req, res) {
    client.get('BankBalance', function(err, reply) {
        res.send(reply)
    })
})

// Launch App
router.set('port', (process.env.PORT || 5000))
router.listen(router.get('port'), function() {
    console.log("Geekskool accounts app is running at localhost:" + router.get('port'))
})
