const { fork } = require('child_process');
const branch = fork('./src/fork/getRandom.js') 
//register
const getRegister = (req, res, next) => {
    try {
        res.render('registro');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const postRegister = (req, res, next) => {
    try {
        let user = req.user;
        console.log(user);
        res.render('pagina', { user })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getFailregister = (req, res) => {
    console.log('error en registro');
    res.render('failregister')
}

//Login
const getLogin = (req, res, next) => {
        try {
            if(req.isAuthenticated()){
                console.log(req);
                let user = req.user;
                console.log('user logueado');
                res.render('pagina', {user})
            } else {
                console.log('usuario no logueado');
                res.render('login');
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
}

const postLogin = (req, res, next) => {
    try {
        console.log('el req', req.body.username);
            let user = { username: req.body.username};
            res.render('pagina', { user });
    } catch (error) {
        next(error)
    }
}

const getFaillogin = (req, res) => {
    console.log('login fail');
    res.render('faillogin', {});
}

const getLogout = (req, res) => {
    req.logout();
    res.render('login');
}

const getInfo = (req, res) => {
    const args = {
        sistemaOperativo: process.platform,
        versionNode: process.version,
        argumentosEntrada: process.argv,
        memoriaReservada: process.memoryUsage,
        pathEjecucion: process.execPath,
        processId: process.pid,
        
    }
    res.render('info', {args});
}

const getRandom = (req, res) => {
    
    const { cant } = req.query;
    if(cant === undefined){
        branch.send('100000000')
    } else {
        branch.send(cant)
    }
    branch.on('message', obj => {
        const keys = Object.keys(obj);
        const values = Object.values(obj);
        console.log(keys);
        console.log(values);
        res.render('random', {keys, values})
    })
}

module.exports = { getRegister, postRegister, getFailregister, getLogin, postLogin, getFaillogin, getLogout, getInfo, getRandom}
