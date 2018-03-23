let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let mysql = require('mysql');
var nodemailer = require('nodemailer');
const {URL, URLSearchParams} = require('url');

let api = require('./api');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo',
    port: 8889
});


let conn = function () {
    server.listen(8010);

    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/index.html');
    });
};

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});


let fromClient = function () {
    io.on('connection', function (socket) {
        let arrElement = {};

        let referer = socket.request.headers.referer;
        const myURL = new URL(referer);

        let valid = myURL.searchParams.get('valid');
        let emailSender = myURL.searchParams.get('emailSender');
        let emailReceiver = myURL.searchParams.get('emailReceiver');
        if (valid !== null && emailSender !== null && emailReceiver !== null) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kind.hackathon@gmail.com',
                    pass: 'Kind123+-*'
                }
            });
            if (valid === "yes") {
                connection.query('SELECT * FROM user WHERE email = ?', [emailReceiver]
                    , function (err, rows, fields) {
                        if (err) {
                            console.log(err.code)
                        } else {
                            let mailOptions = {
                                from: emailReceiver,
                                to: emailSender,
                                subject: 'Kind t\'a trouvé une personne',
                                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
                                '<html xmlns="http://www.w3.org/1999/xhtml">\n' +
                                '\t\t\t<head>\n' +
                                '\t\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
                                '\t\t\t<title>Gamm vert | Newsletter</title>\n' +
                                '\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
                                '\t\t\t<style type="text/css">\n' +
                                'body {\n' +
                                '\theight: 100% !important;\n' +
                                '\tmargin: 0!important;\n' +
                                '\tpadding: 0!important;\n' +
                                '\twidth: 100% !important;\n' +
                                '}\n' +
                                'div[style*="margin: 16px 0"] {\n' +
                                '\tmargin: 0 !important;\n' +
                                '} /* marge android 4.4*/\n' +
                                'html {\n' +
                                '\t-webkit-text-size-adjust: 100%;\n' +
                                '\t-ms-text-size-adjust: 100%;\n' +
                                '}\n' +
                                'table {\n' +
                                '\tborder-collapse: collapse !important;\n' +
                                '}\n' +
                                '#outlook a {\n' +
                                '\tpadding: 0;\n' +
                                '}\n' +
                                '.ReadMsgBody {\n' +
                                '\twidth: 100%;\n' +
                                '}\n' +
                                '.ExternalClass {\n' +
                                '\twidth: 100%;\n' +
                                '}\n' +
                                '.ExternalClass * {\n' +
                                '\tline-height: 115% !important;\n' +
                                '}\n' +
                                '.gmailfix {\n' +
                                '\tdisplay: none;\n' +
                                '\tdisplay: none!important;\n' +
                                '}\n' +
                                'table, td {\n' +
                                '\tmso-table-lspace: 0pt;\n' +
                                '\tmso-table-rspace: 0pt;\n' +
                                '}\n' +
                                'img {\n' +
                                '\t-ms-interpolation-mode: bicubic;\n' +
                                '}\n' +
                                '/* iOS BLUE LINKS */\n' +
                                'a[x-apple-data-detectors] {\n' +
                                '\tcolor: inherit !important;\n' +
                                '\ttext-decoration: none !important;\n' +
                                '\tfont-size: inherit !important;\n' +
                                '\tfont-family: inherit !important;\n' +
                                '\tfont-weight: inherit !important;\n' +
                                '\tline-height: inherit !important;\n' +
                                '}\n' +
                                '#mail, #mail:active {\n' +
                                '\tcolor: #ffffff !important;\n' +
                                '}\n' +
                                '\n' +
                                '@media all and (max-width: 600px) {\n' +
                                'img {\n' +
                                '\theight: auto;\n' +
                                '}\n' +
                                '.marge20{\n' +
                                '\tmargin-top: 20px;\n' +
                                '}\n' +
                                'table[class=fluide] {\n' +
                                '\twidth: 100% !important;\n' +
                                '\tmin-width: 0 !important;\n' +
                                '}\n' +
                                'td[class=fluide] {\n' +
                                '\twidth: 100% !important;\n' +
                                '\tmin-width: 0 !important;\n' +
                                '\tfloat: left;\n' +
                                '}\n' +
                                '.fluide {\n' +
                                '\twidth: 100% !important;\n' +
                                '\tmin-width: 0 !important;\n' +
                                '\tfloat: left;\n' +
                                '}\n' +
                                '.margemob {\n' +
                                '\twidth: 90% !important;\n' +
                                '\tmargin: auto;\n' +
                                '}\n' +
                                '.paddingmob {\n' +
                                '\tpadding-left: 5%!important;\n' +
                                '\tpadding-right: 5%!important;\n' +
                                '}\n' +
                                '.nomobile {\n' +
                                '\tdisplay: none !important;\n' +
                                '}\n' +
                                '.aligncenter {\n' +
                                '\ttext-align: center;\n' +
                                '}\n' +
                                '.alignleft {\n' +
                                '\ttext-align: left;\n' +
                                '}\n' +
                                '.block {\n' +
                                '\tdisplay: block !important;\n' +
                                '}\n' +
                                '.font16 {\n' +
                                '\tfont-size: 16px!important;\n' +
                                '}\n' +
                                '.font18 {\n' +
                                '\tfont-size: 18px!important;\n' +
                                '}\n' +
                                '.avtge {\n' +
                                '\tmargin-bottom: 20px;\n' +
                                '}\n' +
                                '.margintop {\n' +
                                '\tmargin-top: 20px;\n' +
                                '}\n' +
                                '}\n' +
                                '</style>\n' +
                                '\t\t\t</head>\n' +
                                '\t\t\t<body bgcolor="#E5F6F5">\n' +
                                '<table id="conteneur" bgcolor="#E5F6F5" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;">\n' +
                                '              <tr>\n' +
                                '    <td align="center"><table width="600" class="fluide" border="0" cellspacing="0" cellpadding="0">\n' +
                                '        <tr>\n' +
                                '          <td><table  width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                '              <tr>\n' +
                                '                <td><table bgcolor="#00A69C" width="100%" border="0" cellspacing="0" cellpadding="0" >\n' +
                                '                    <tr >\n' +
                                '                      <td>&nbsp;</td>\n' +
                                '                    </tr>\n' +
                                '                    <tr>\n' +
                                '                      <td  align="left"><table class="margemob"  bgcolor="#00A69C"   width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                '                          <tr>\n' +
                                '                            <td align="left" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/Logo_White.png" alt="Kindness" width="100" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                '\n' +
                                '                            <td align="right" width="45" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/logo-djingo.png" alt="Djingo" width="45" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                '                            <td align="right" width="45" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/logo-Orange.png" alt="Orange" width="45" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                '                          </tr>\n' +
                                '                        </table></td>\n' +
                                '                    </tr>\n' +
                                '\n' +
                                '                    <tr bgcolor="#00A69C">\n' +
                                '                      <td height="20">&nbsp;</td>\n' +
                                '                    </tr>\n' +
                                '                    \n' +
                                '                  </table></td>\n' +
                                '              </tr>\n' +
                                '<tr>\n' +
                                '  <td height="30">&nbsp;</td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '\t<td align="center" class="paddingmob" style="font-family:Arial, Helvetica, sans-serif; font-size:24px;color:#00654b;line-height: 18px;"><a href="#" style="color:#00654b; text-decoration:none;" target="_blank"><span style="font-weight: bold;color:#00A69C;">Hello !</span></a></td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '  <td align="center"><a href="lienTitre" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:16px;color:#100000; line-height:100px;"><img src="http://elomaridouae.ovh/univers01.png" alt="Kind Univers" style="display:block;width:295px;"  border="0"/></a></td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '  <td align="center" class="paddingmob" style="font-family:Arial, Helvetica, sans-serif; font-size:24px;color:#00654b;line-height: 34px;"><a href="#" style="color:#00654b; text-decoration:none;" target="_blank"><span style="font-weight: bold;color:#00A69C;">'+rows[0].firstname+' est disponible pour t\'apporter ce que tu as demandé ! Voici ses coordonnées : <br><br>\n' +
                                '  \tEtage : ' + rows[0].stage + '<br>\n' +
                                '    Numéro de porte : ' + rows[0].ndoor + '</span></a></td>\n' +
                                '</tr>\n' +
                                '\n' +
                                '\n' +
                                '<!-- FIN doubles produits -->\n' +
                                '\t\t\t  \n' +
                                '\t\t\t  \n' +
                                '\t\t\t  <tr>\n' +
                                '<td height="30">&nbsp;</td>\n' +
                                '</tr>\n' +
                                '\t\t\t  \n' +
                                '\t\t\t \n' +
                                '\n' +
                                '\n' +
                                '</body>\n' +
                                '</html>\n'
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                    });
                connection.query('SELECT * FROM user WHERE email = ?', [emailSender]
                    , function (err, rows, fields) {
                        if (err) {
                            console.log(err.code)
                        } else {
                            let mailOptions = {
                                from: emailSender,
                                to: emailReceiver,
                                subject: ' Kind a validé',
                                html: 'Tu as validé  ! Voici ses coordonnées : \n' +
                                'Prénom : ' + rows[0].firstname +
                                '\nNom : ' + rows[0].lastname +
                                '\nEtage : ' + rows[0].stage + '\n' +
                                'Numéro de porte :' + rows[0].ndoor
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                    });
            } else {
                connection.query('SELECT * FROM user WHERE email = ?', [emailReceiver]
                    , function (err, rows, fields) {
                        if (err) {
                            console.log(err.code)
                        } else {
                            let mailOptions = {
                                from: emailReceiver,
                                to: emailSender,
                                subject: 'Kind t\'a trouvé personne',
                                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
                                '<html xmlns="http://www.w3.org/1999/xhtml">\n' +
                                '\t\t\t<head>\n' +
                                '\t\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
                                '\t\t\t<title>Gamm vert | Newsletter</title>\n' +
                                '\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
                                '\t\t\t<style type="text/css">\n' +
                                'body {\n' +
                                '\theight: 100% !important;\n' +
                                '\tmargin: 0!important;\n' +
                                '\tpadding: 0!important;\n' +
                                '\twidth: 100% !important;\n' +
                                '}\n' +
                                'div[style*="margin: 16px 0"] {\n' +
                                '\tmargin: 0 !important;\n' +
                                '} /* marge android 4.4*/\n' +
                                'html {\n' +
                                '\t-webkit-text-size-adjust: 100%;\n' +
                                '\t-ms-text-size-adjust: 100%;\n' +
                                '}\n' +
                                'table {\n' +
                                '\tborder-collapse: collapse !important;\n' +
                                '}\n' +
                                '#outlook a {\n' +
                                '\tpadding: 0;\n' +
                                '}\n' +
                                '.ReadMsgBody {\n' +
                                '\twidth: 100%;\n' +
                                '}\n' +
                                '.ExternalClass {\n' +
                                '\twidth: 100%;\n' +
                                '}\n' +
                                '.ExternalClass * {\n' +
                                '\tline-height: 115% !important;\n' +
                                '}\n' +
                                '.gmailfix {\n' +
                                '\tdisplay: none;\n' +
                                '\tdisplay: none!important;\n' +
                                '}\n' +
                                'table, td {\n' +
                                '\tmso-table-lspace: 0pt;\n' +
                                '\tmso-table-rspace: 0pt;\n' +
                                '}\n' +
                                'img {\n' +
                                '\t-ms-interpolation-mode: bicubic;\n' +
                                '}\n' +
                                '/* iOS BLUE LINKS */\n' +
                                'a[x-apple-data-detectors] {\n' +
                                '\tcolor: inherit !important;\n' +
                                '\ttext-decoration: none !important;\n' +
                                '\tfont-size: inherit !important;\n' +
                                '\tfont-family: inherit !important;\n' +
                                '\tfont-weight: inherit !important;\n' +
                                '\tline-height: inherit !important;\n' +
                                '}\n' +
                                '#mail, #mail:active {\n' +
                                '\tcolor: #ffffff !important;\n' +
                                '}\n' +
                                '\n' +
                                '@media all and (max-width: 600px) {\n' +
                                'img {\n' +
                                '\theight: auto;\n' +
                                '}\n' +
                                '.marge20{\n' +
                                '\tmargin-top: 20px;\n' +
                                '}\n' +
                                'table[class=fluide] {\n' +
                                '\twidth: 100% !important;\n' +
                                '\tmin-width: 0 !important;\n' +
                                '}\n' +
                                'td[class=fluide] {\n' +
                                '\twidth: 100% !important;\n' +
                                '\tmin-width: 0 !important;\n' +
                                '\tfloat: left;\n' +
                                '}\n' +
                                '.fluide {\n' +
                                '\twidth: 100% !important;\n' +
                                '\tmin-width: 0 !important;\n' +
                                '\tfloat: left;\n' +
                                '}\n' +
                                '.margemob {\n' +
                                '\twidth: 90% !important;\n' +
                                '\tmargin: auto;\n' +
                                '}\n' +
                                '.paddingmob {\n' +
                                '\tpadding-left: 5%!important;\n' +
                                '\tpadding-right: 5%!important;\n' +
                                '}\n' +
                                '.nomobile {\n' +
                                '\tdisplay: none !important;\n' +
                                '}\n' +
                                '.aligncenter {\n' +
                                '\ttext-align: center;\n' +
                                '}\n' +
                                '.alignleft {\n' +
                                '\ttext-align: left;\n' +
                                '}\n' +
                                '.block {\n' +
                                '\tdisplay: block !important;\n' +
                                '}\n' +
                                '.font16 {\n' +
                                '\tfont-size: 16px!important;\n' +
                                '}\n' +
                                '.font18 {\n' +
                                '\tfont-size: 18px!important;\n' +
                                '}\n' +
                                '.avtge {\n' +
                                '\tmargin-bottom: 20px;\n' +
                                '}\n' +
                                '.margintop {\n' +
                                '\tmargin-top: 20px;\n' +
                                '}\n' +
                                '}\n' +
                                '</style>\n' +
                                '\t\t\t</head>\n' +
                                '\t\t\t<body bgcolor="#E5F6F5">\n' +
                                '<table id="conteneur" bgcolor="#E5F6F5" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;">\n' +
                                '              <tr>\n' +
                                '    <td align="center"><table width="600" class="fluide" border="0" cellspacing="0" cellpadding="0">\n' +
                                '        <tr>\n' +
                                '          <td><table  width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                '              <tr>\n' +
                                '                <td><table bgcolor="#00A69C" width="100%" border="0" cellspacing="0" cellpadding="0" >\n' +
                                '                    <tr >\n' +
                                '                      <td>&nbsp;</td>\n' +
                                '                    </tr>\n' +
                                '                    <tr>\n' +
                                '                      <td  align="left"><table class="margemob"  bgcolor="#00A69C"   width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                '                          <tr>\n' +
                                '                            <td align="left" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/Logo_White.png" alt="Kindness" width="100" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                '\n' +
                                '                            <td align="right" width="45" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/logo-djingo.png" alt="Djingo" width="45" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                '                            <td align="right" width="45" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/logo-Orange.png" alt="Orange" width="45" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                '                          </tr>\n' +
                                '                        </table></td>\n' +
                                '                    </tr>\n' +
                                '\n' +
                                '                    <tr bgcolor="#00A69C">\n' +
                                '                      <td height="20">&nbsp;</td>\n' +
                                '                    </tr>\n' +
                                '                    \n' +
                                '                  </table></td>\n' +
                                '              </tr>\n' +
                                '<tr>\n' +
                                '  <td height="30">&nbsp;</td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '\t<td align="center" class="paddingmob" style="font-family:Arial, Helvetica, sans-serif; font-size:24px;color:#00654b;line-height: 18px;"><a href="#" style="color:#00654b; text-decoration:none;" target="_blank"><span style="font-weight: bold;color:#00A69C;">Hello !</span></a></td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '  <td align="center"><a href="lienTitre" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:16px;color:#100000; line-height:100px;"><img src="http://elomaridouae.ovh/univers01.png" alt="Kind Univers" style="display:block;width:295px;"  border="0"/></a></td>\n' +
                                '</tr>\n' +
                                '<tr>\n' +
                                '  <td align="center" class="paddingmob" style="font-family:Arial, Helvetica, sans-serif; font-size:24px;color:#00654b;line-height: 34px;"><a href="#" style="color:#00654b; text-decoration:none;" target="_blank"><span style="font-weight: bold;color:#00A69C;">Personne n\'est disponible, Mais tu peux continuer ta recherche en l\'élargissant\n' +
                                ' </a></td>\n' +
                                '</tr>\n' +
                                '\n' +
                                '\n' +
                                '<!-- FIN doubles produits -->\n' +
                                '\t\t\t  \n' +
                                '\t\t\t  \n' +
                                '\t\t\t  <tr>\n' +
                                '<td height="30">&nbsp;</td>\n' +
                                '</tr>\n' +
                                '\t\t\t  \n' +
                                '\t\t\t \n' +
                                '\n' +
                                '\n' +
                                '</body>\n' +
                                '</html>\n'
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                    });
            }
        }


        socket.on('fromClient', function (data) {
            console.log(data);
            connection.query('INSERT INTO user SET firstname = ?, lastname = ?, email = ?, password = ?, gender = ?, age = ?, address = ?, stage = ?, ndoor = ?', [
                data.client.firstname, data.client.lastname, data.client.email, data.client.password, data.client.gender, data.client.age, data.client.address, data.client.stage, data.client.ndoor
            ], function (err) {
                if (err) {
                    console.log(err.code)
                } else {
                }
            });
            if (data.isConnected === 1) {
                api.getRes(data.client).then(function (res) {
                    socket.emit('fromServer', {server: res});
                    //console.log(res);
                });
            }

        });
        socket.on('fromClientLogin', function (data) {
            connection.query('SELECT * FROM user WHERE email = ? and password = ?', [data.client.email, data.client.password]
                , function (err, rows, fields) {
                    if (err) {
                        console.log(err.code)
                    } else {
                        console.log(rows.length);
                        socket.emit('fromLogin', {isLogged: rows.length});
                        if (rows.length !== 0) {
                            if (rows[0].firstlogin === 0) {
                                socket.emit('firstLogin', {data: rows[0].email})
                            }
                        }
                    }
                });
        });
        socket.on('fromClientGetElements', function (data) {
            connection.query('SELECT * FROM user WHERE email = ?', [data.data]
                , function (err, rows, fields) {
                    if (err) {
                        console.log(err.code)
                    } else {
                        // console.log(rows[0]);
                        socket.emit('getElementsByEmail', {data: rows[0]});
                    }

                });
        });
        socket.on('demandeUser', function (data) {
            connection.query('INSERT INTO user_demande SET email = ?, type = ?, element = ?', [
                data.user, data.type, data.parameter
            ], function (err) {
                if (err) {
                    console.log(err.code)
                } else {
                }
            });
        });
        socket.on('sendInform', function (data) {
            console.log(data);
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kind.hackathon@gmail.com',
                    pass: 'Kind123+-*'
                }
            });

            connection.query('SELECT * FROM user WHERE email = ?', [data.user]
                , function (err, rows, fields) {
                    if (err) {
                        console.log(err.code)
                    } else {

                        connection.query('SELECT * FROM user WHERE address = ? AND email != ?', [rows[0].address, rows[0].email]
                            , function (err, rows_clients, fields) {
                                if (err) {
                                    console.log(err.code)
                                } else {
                                    if (rows_clients.length === 0) {
                                        socket.emit('noUserAdress');
                                    } else {
                                        for (let i = 0; i < rows_clients.length; i++) {
                                            let mailOptions = {
                                                from: rows[0].email,
                                                to: rows_clients[i].email,
                                                subject: 'Kind t\'informe !',
                                                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
                                                '<html xmlns="http://www.w3.org/1999/xhtml">\n' +
                                                '\t\t\t<head>\n' +
                                                '\t\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
                                                '\t\t\t<title>Gamm vert | Newsletter</title>\n' +
                                                '\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
                                                '\t\t\t<style type="text/css">\n' +
                                                'body {\n' +
                                                '\theight: 100% !important;\n' +
                                                '\tmargin: 0!important;\n' +
                                                '\tpadding: 0!important;\n' +
                                                '\twidth: 100% !important;\n' +
                                                '}\n' +
                                                'div[style*="margin: 16px 0"] {\n' +
                                                '\tmargin: 0 !important;\n' +
                                                '} /* marge android 4.4*/\n' +
                                                'html {\n' +
                                                '\t-webkit-text-size-adjust: 100%;\n' +
                                                '\t-ms-text-size-adjust: 100%;\n' +
                                                '}\n' +
                                                'table {\n' +
                                                '\tborder-collapse: collapse !important;\n' +
                                                '}\n' +
                                                '#outlook a {\n' +
                                                '\tpadding: 0;\n' +
                                                '}\n' +
                                                '.ReadMsgBody {\n' +
                                                '\twidth: 100%;\n' +
                                                '}\n' +
                                                '.ExternalClass {\n' +
                                                '\twidth: 100%;\n' +
                                                '}\n' +
                                                '.ExternalClass * {\n' +
                                                '\tline-height: 115% !important;\n' +
                                                '}\n' +
                                                '.gmailfix {\n' +
                                                '\tdisplay: none;\n' +
                                                '\tdisplay: none!important;\n' +
                                                '}\n' +
                                                'table, td {\n' +
                                                '\tmso-table-lspace: 0pt;\n' +
                                                '\tmso-table-rspace: 0pt;\n' +
                                                '}\n' +
                                                'img {\n' +
                                                '\t-ms-interpolation-mode: bicubic;\n' +
                                                '}\n' +
                                                '/* iOS BLUE LINKS */\n' +
                                                'a[x-apple-data-detectors] {\n' +
                                                '\tcolor: inherit !important;\n' +
                                                '\ttext-decoration: none !important;\n' +
                                                '\tfont-size: inherit !important;\n' +
                                                '\tfont-family: inherit !important;\n' +
                                                '\tfont-weight: inherit !important;\n' +
                                                '\tline-height: inherit !important;\n' +
                                                '}\n' +
                                                '#mail, #mail:active {\n' +
                                                '\tcolor: #ffffff !important;\n' +
                                                '}\n' +
                                                '\n' +
                                                '@media all and (max-width: 600px) {\n' +
                                                'img {\n' +
                                                '\theight: auto;\n' +
                                                '}\n' +
                                                '.marge20{\n' +
                                                '\tmargin-top: 20px;\n' +
                                                '}\n' +
                                                'table[class=fluide] {\n' +
                                                '\twidth: 100% !important;\n' +
                                                '\tmin-width: 0 !important;\n' +
                                                '}\n' +
                                                'td[class=fluide] {\n' +
                                                '\twidth: 100% !important;\n' +
                                                '\tmin-width: 0 !important;\n' +
                                                '\tfloat: left;\n' +
                                                '}\n' +
                                                '.fluide {\n' +
                                                '\twidth: 100% !important;\n' +
                                                '\tmin-width: 0 !important;\n' +
                                                '\tfloat: left;\n' +
                                                '}\n' +
                                                '.margemob {\n' +
                                                '\twidth: 90% !important;\n' +
                                                '\tmargin: auto;\n' +
                                                '}\n' +
                                                '.paddingmob {\n' +
                                                '\tpadding-left: 5%!important;\n' +
                                                '\tpadding-right: 5%!important;\n' +
                                                '}\n' +
                                                '.nomobile {\n' +
                                                '\tdisplay: none !important;\n' +
                                                '}\n' +
                                                '.aligncenter {\n' +
                                                '\ttext-align: center;\n' +
                                                '}\n' +
                                                '.alignleft {\n' +
                                                '\ttext-align: left;\n' +
                                                '}\n' +
                                                '.block {\n' +
                                                '\tdisplay: block !important;\n' +
                                                '}\n' +
                                                '.font16 {\n' +
                                                '\tfont-size: 16px!important;\n' +
                                                '}\n' +
                                                '.font18 {\n' +
                                                '\tfont-size: 18px!important;\n' +
                                                '}\n' +
                                                '.avtge {\n' +
                                                '\tmargin-bottom: 20px;\n' +
                                                '}\n' +
                                                '.margintop {\n' +
                                                '\tmargin-top: 20px;\n' +
                                                '}\n' +
                                                '}\n' +
                                                '</style>\n' +
                                                '\t\t\t</head>\n' +
                                                '\t\t\t<body bgcolor="#E5F6F5">\n' +
                                                '<table id="conteneur" bgcolor="#E5F6F5" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;">\n' +
                                                '              <tr>\n' +
                                                '    <td align="center"><table width="600" class="fluide" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '        <tr>\n' +
                                                '          <td><table  width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '              <tr>\n' +
                                                '                <td><table bgcolor="#00A69C" width="100%" border="0" cellspacing="0" cellpadding="0" >\n' +
                                                '                    <tr >\n' +
                                                '                      <td>&nbsp;</td>\n' +
                                                '                    </tr>\n' +
                                                '                    <tr>\n' +
                                                '                      <td  align="left"><table class="margemob"  bgcolor="#00A69C"   width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '                          <tr>\n' +
                                                '                            <td align="left" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/Logo_White.png" alt="Kindness" width="100" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                                '\n' +
                                                '                            <td align="right" width="45" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/logo-djingo.png" alt="Djingo" width="45" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                                '                            <td align="right" width="45" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/logo-Orange.png" alt="Orange" width="45" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                                '                          </tr>\n' +
                                                '                        </table></td>\n' +
                                                '                    </tr>\n' +
                                                '\n' +
                                                '                    <tr bgcolor="#00A69C">\n' +
                                                '                      <td height="20">&nbsp;</td>\n' +
                                                '                    </tr>\n' +
                                                '                    \n' +
                                                '                  </table></td>\n' +
                                                '              </tr>\n' +
                                                '<tr>\n' +
                                                '  <td height="30">&nbsp;</td>\n' +
                                                '</tr>\n' +
                                                '<tr>\n' +
                                                '\t<td align="center" class="paddingmob" style="font-family:Arial, Helvetica, sans-serif; font-size:24px;color:#00654b;line-height: 18px;"><a href="#" style="color:#00654b; text-decoration:none;" target="_blank"><span style="font-weight: bold;color:#00A69C;">Hello !</span></a></td>\n' +
                                                '</tr>\n' +
                                                '<tr>\n' +
                                                '  <td align="center"><a href="lienTitre" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:16px;color:#100000; line-height:100px;"><img src="http://elomaridouae.ovh/univers01.png" alt="Kind Univers" style="display:block;width:295px;"  border="0"/></a></td>\n' +
                                                '</tr>\n' +
                                                '<tr>\n' +
                                                '  <td align="center" class="paddingmob" style="font-family:Arial, Helvetica, sans-serif; font-size:24px;color:#00654b;line-height: 34px;"><a href="#" style="color:#00654b; text-decoration:none;" target="_blank"><span style="font-weight: bold;color:#00A69C;">J\'informe qu\'il y\'aura du bruit. Désolé pour la gêne.pour me contacter :  <br><br>\n' +
                                                '  \tPrénom : ' + rows[0].firstname + '<br>\n' +
                                                '  \tEtage : ' + rows[0].stage + '<br>\n' +
                                                '    Numéro de porte : ' + rows[0].ndoor + '</span></a></td>\n' +
                                                '</tr>\n' +
                                                '\n' +
                                                '\n' +
                                                '<!-- FIN doubles produits -->\n' +
                                                '\t\t\t  \n' +
                                                '\t\t\t  \n' +
                                                '\t\t\t  <tr>\n' +
                                                '<td height="30">&nbsp;</td>\n' +
                                                '</tr>\n' +
                                                '\t\t\t  \n' +
                                                '\t\t\t \n' +
                                                '\n' +
                                                '\n' +
                                                '</body>\n' +
                                                '</html>\n'
                                            };
                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    console.log(error);
                                                } else {
                                                    console.log('Email sent: ' + info.response);
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                    }

                });


        });
        socket.on('sendEmailToAll', function (data) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kind.hackathon@gmail.com',
                    pass: 'Kind123+-*'
                }
            });
            connection.query('SELECT * FROM user WHERE email = ?', [data.data]
                , function (err, rows, fields) {
                    if (err) {
                        console.log(err.code)
                    } else {

                        connection.query('SELECT * FROM user WHERE address = ? AND email != ?', [rows[0].address, rows[0].email]
                            , function (err, rows_clients, fields) {
                                if (err) {
                                    console.log(err.code)
                                } else {
                                    if (rows_clients.length === 0) {
                                        socket.emit('noUserAdress');
                                    } else {
                                        for (let i = 0; i < rows_clients.length; i++) {
                                            let mailOptions = {
                                                from: rows[0].email,
                                                to: rows_clients[i].email,
                                                subject: 'Kind te demande !',
                                                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
                                                '<html xmlns="http://www.w3.org/1999/xhtml">\n' +
                                                '\t\t\t<head>\n' +
                                                '\t\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
                                                '\t\t\t<title>Gamm vert | Newsletter</title>\n' +
                                                '\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
                                                '\t\t\t<style type="text/css">\n' +
                                                'body {\n' +
                                                '\theight: 100% !important;\n' +
                                                '\tmargin: 0!important;\n' +
                                                '\tpadding: 0!important;\n' +
                                                '\twidth: 100% !important;\n' +
                                                '}\n' +
                                                'div[style*="margin: 16px 0"] {\n' +
                                                '\tmargin: 0 !important;\n' +
                                                '} /* marge android 4.4*/\n' +
                                                'html {\n' +
                                                '\t-webkit-text-size-adjust: 100%;\n' +
                                                '\t-ms-text-size-adjust: 100%;\n' +
                                                '}\n' +
                                                'table {\n' +
                                                '\tborder-collapse: collapse !important;\n' +
                                                '}\n' +
                                                '#outlook a {\n' +
                                                '\tpadding: 0;\n' +
                                                '}\n' +
                                                '.ReadMsgBody {\n' +
                                                '\twidth: 100%;\n' +
                                                '}\n' +
                                                '.ExternalClass {\n' +
                                                '\twidth: 100%;\n' +
                                                '}\n' +
                                                '.ExternalClass * {\n' +
                                                '\tline-height: 115% !important;\n' +
                                                '}\n' +
                                                '.gmailfix {\n' +
                                                '\tdisplay: none;\n' +
                                                '\tdisplay: none!important;\n' +
                                                '}\n' +
                                                'table, td {\n' +
                                                '\tmso-table-lspace: 0pt;\n' +
                                                '\tmso-table-rspace: 0pt;\n' +
                                                '}\n' +
                                                'img {\n' +
                                                '\t-ms-interpolation-mode: bicubic;\n' +
                                                '}\n' +
                                                '/* iOS BLUE LINKS */\n' +
                                                'a[x-apple-data-detectors] {\n' +
                                                '\tcolor: inherit !important;\n' +
                                                '\ttext-decoration: none !important;\n' +
                                                '\tfont-size: inherit !important;\n' +
                                                '\tfont-family: inherit !important;\n' +
                                                '\tfont-weight: inherit !important;\n' +
                                                '\tline-height: inherit !important;\n' +
                                                '}\n' +
                                                '#mail, #mail:active {\n' +
                                                '\tcolor: #ffffff !important;\n' +
                                                '}\n' +
                                                '\n' +
                                                '@media all and (max-width: 600px) {\n' +
                                                'img {\n' +
                                                '\theight: auto;\n' +
                                                '}\n' +
                                                '.marge20{\n' +
                                                '\tmargin-top: 20px;\n' +
                                                '}\n' +
                                                'table[class=fluide] {\n' +
                                                '\twidth: 100% !important;\n' +
                                                '\tmin-width: 0 !important;\n' +
                                                '}\n' +
                                                'td[class=fluide] {\n' +
                                                '\twidth: 100% !important;\n' +
                                                '\tmin-width: 0 !important;\n' +
                                                '\tfloat: left;\n' +
                                                '}\n' +
                                                '.fluide {\n' +
                                                '\twidth: 100% !important;\n' +
                                                '\tmin-width: 0 !important;\n' +
                                                '\tfloat: left;\n' +
                                                '}\n' +
                                                '.margemob {\n' +
                                                '\twidth: 90% !important;\n' +
                                                '\tmargin: auto;\n' +
                                                '}\n' +
                                                '.paddingmob {\n' +
                                                '\tpadding-left: 5%!important;\n' +
                                                '\tpadding-right: 5%!important;\n' +
                                                '}\n' +
                                                '.nomobile {\n' +
                                                '\tdisplay: none !important;\n' +
                                                '}\n' +
                                                '.aligncenter {\n' +
                                                '\ttext-align: center;\n' +
                                                '}\n' +
                                                '.alignleft {\n' +
                                                '\ttext-align: left;\n' +
                                                '}\n' +
                                                '.block {\n' +
                                                '\tdisplay: block !important;\n' +
                                                '}\n' +
                                                '.font16 {\n' +
                                                '\tfont-size: 16px!important;\n' +
                                                '}\n' +
                                                '.font18 {\n' +
                                                '\tfont-size: 18px!important;\n' +
                                                '}\n' +
                                                '.avtge {\n' +
                                                '\tmargin-bottom: 20px;\n' +
                                                '}\n' +
                                                '.margintop {\n' +
                                                '\tmargin-top: 20px;\n' +
                                                '}\n' +
                                                '}\n' +
                                                '</style>\n' +
                                                '\t\t\t</head>\n' +
                                                '\t\t\t<body bgcolor="#E5F6F5">\n' +
                                                '<table id="conteneur" bgcolor="#E5F6F5" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;">\n' +
                                                '              <tr>\n' +
                                                '    <td align="center"><table width="600" class="fluide" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '        <tr>\n' +
                                                '          <td><table  width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '              <tr>\n' +
                                                '                <td><table bgcolor="#00A69C" width="100%" border="0" cellspacing="0" cellpadding="0" >\n' +
                                                '                    <tr >\n' +
                                                '                      <td>&nbsp;</td>\n' +
                                                '                    </tr>\n' +
                                                '                    <tr>\n' +
                                                '                      <td  align="left"><table class="margemob"  bgcolor="#00A69C"   width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '                          <tr>\n' +
                                                '                            <td align="left" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/Logo_White.png" alt="Kindness" width="100" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                                '\n' +
                                                '                            <td align="right" width="45" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/logo-djingo.png" alt="Djingo" width="45" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                                '                            <td align="right" width="45" ><a href="#" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; font-style:italic;color:#00654b; line-height:47px;"><img src="http://elomaridouae.ovh/logo-Orange.png" alt="Orange" width="45" height="45" style="display:block;"  border="0"/></a></td>\n' +
                                                '                          </tr>\n' +
                                                '                        </table></td>\n' +
                                                '                    </tr>\n' +
                                                '\n' +
                                                '                    <tr bgcolor="#00A69C">\n' +
                                                '                      <td height="20">&nbsp;</td>\n' +
                                                '                    </tr>\n' +
                                                '                    \n' +
                                                '                  </table></td>\n' +
                                                '              </tr>\n' +
                                                '<tr>\n' +
                                                '  <td height="30">&nbsp;</td>\n' +
                                                '</tr>\n' +
                                                '<tr>\n' +
                                                '\t<td align="center" class="paddingmob" style="font-family:Arial, Helvetica, sans-serif; font-size:24px;color:#00654b;line-height: 18px;"><a href="#" style="color:#00654b; text-decoration:none;" target="_blank"><span style="font-weight: bold;color:#00A69C;">Hello ' + rows[0].firstname + ' !</span></a></td>\n' +
                                                '</tr>\n' +
                                                '<tr>\n' +
                                                '  <td align="center"><a href="lienTitre" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:16px;color:#100000; line-height:100px;"><img src="http://elomaridouae.ovh/univers01.png" alt="Kind Univers" style="display:block;width:295px;"  border="0"/></a></td>\n' +
                                                '</tr>\n' +
                                                '<tr>\n' +
                                                '  <td align="center" class="paddingmob" style="font-family:Arial, Helvetica, sans-serif; font-size:24px;color:#00654b;line-height: 34px;"><a href="#" style="color:#00654b; text-decoration:none;" target="_blank"><span style="font-weight: bold;color:#00A69C;">' + rows_clients[i].firstname + ' à besoin de toi,<br>es-tu disponible?</span></a></td>\n' +
                                                '</tr>\n' +
                                                '\n' +
                                                '     <tr>\n' +
                                                '           <td><table class="margemob" width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '             <tr>\n' +
                                                '               <td width="10" class="nomobile">&nbsp;</td>\n' +
                                                '               <td width="143" valign="top" ><table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '                  <tr>\n' +
                                                '                    <td align="right" style="padding-bottom:20px;"><a href="http://localhost:3000/?valid=yes&emailSender=' + rows[0].email + '&emailReceiver=' + rows_clients[i].email + '" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-style:italic; line-height:100px;color:#454545;"><img src="http://elomaridouae.ovh/oui.png" alt="Oui" width="143" height="43" style="display:block;width:100%; max-width:143px;" border="0"/></a></td>\n' +
                                                '                  </tr>\n' +
                                                '                  \n' +
                                                '                </table>\n' +
                                                '                </td>\n' +
                                                '               <td width="10" height="30" class="fluide">&nbsp;</td>\n' +
                                                '               <td width="143" valign="top" ><table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
                                                '                  <tr>\n' +
                                                '                    <td align="left" style="padding-bottom:20px;"><a href="http://localhost:3000/?valid=no&emailSender=' + rows[0].email + '&emailReceiver=' + rows_clients[i].email + '" target="_blank" style="font-family:Arial, Helvetica, sans-serif; font-size:13px; font-style:italic; line-height:100px;color:#454545;"><img src="http://elomaridouae.ovh/non.png" alt="Non" width="143" height="43" style="display:block;width:100%; max-width:143px;" border="0"/></a></td>\n' +
                                                '                  </tr>\n' +
                                                '                </table>\n' +
                                                '                </td>\n' +
                                                '               <td width="10" class="nomobile">&nbsp;</td>\n' +
                                                '             </tr>\n' +
                                                '           </table></td>\n' +
                                                '         </tr>\n' +
                                                '\n' +
                                                '<!-- FIN doubles produits -->\n' +
                                                '\t\t\t  \n' +
                                                '\t\t\t  \n' +
                                                '\t\t\t  <tr>\n' +
                                                '<td height="30">&nbsp;</td>\n' +
                                                '</tr>\n' +
                                                '\t\t\t  \n' +
                                                '\t\t\t \n' +
                                                '\n' +
                                                '\n' +
                                                '</body>\n' +
                                                '</html>\n'
                                            };
                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    console.log(error);
                                                } else {
                                                    console.log('Email sent: ' + info.response);
                                                }
                                            });

                                        }
                                    }
                                }

                            });
                    }

                });
            /**
             * EMAIL
             */


            /**
             *
             */

        })
    });
};
module.exports = {conn, fromClient};
