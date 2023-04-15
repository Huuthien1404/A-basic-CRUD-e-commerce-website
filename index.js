const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const client = require('./configs/api');
const multer = require('multer');
const flash = require('express-flash');
const session = require('express-session');
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
var storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, './public');
    },
    filename: (req, file, res) => {
        res(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});
app.use(new session({
    resave: false,
    saveUninitialized: false,
    secret: 'Nhuquynh89#',
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}));
app.use(flash());
client.connect();
app.get('/', (req, res) => {
    client.query(`select count(*) from public."Products"`, (err, results) => {
        if (err) throw err;
        var totalPage;
        var countItem = Number(results.rows[0].count);
        totalPage = Math.ceil(countItem / 8);
        if (totalPage == 0) {
            client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                if (err) throw err;
                var msg_item_delete = '';
                for (var i = 0; i < results.rows.length; i++) {
                    msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                }
                res.render('dashboard', {
                    list_item_to_delete: msg_item_delete,
                    list_item_to_fix: msg_item_delete,
                });
            })
        }
        if (totalPage == 1) {
            client.query(`select* from public."Products" as a where a."ProID" between 1 and 8 order by a."ProID"`, (err, results) => {
                if (err) throw err;
                var msg_item = '';
                for (var i = 0; i < results.rows.length; i++) {
                    var posOfDot = results.rows[i].Price.lastIndexOf('.');
                    results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                    msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                    <div class="card__item">
                        <div class="card__item-img">
                            <img src="${results.rows[i].LinkImg}" alt="">
                        </div>
                        <div class="card__item-content">
                            <span>${results.rows[i].ProName}</span>
                            <span>Số lượng: ${results.rows[i].Quantity}</span>
                            <span>Giá tiền: ${results.rows[i].Price}đ</span>
                        </div>
                    </div>
                </div>`;
                }
                var msg_page = '';
                msg_page = msg_page + `<div class="page__button page__first" style="background-color: #007bff; color: white" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">1</div>`;
                var sum = '1';
                client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                    if (err) throw err;
                    var msg_item_delete = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                    }
                    res.render('dashboard', {
                        list_item: msg_item,
                        list_page: msg_page,
                        sum_page: sum,
                        list_item_to_delete: msg_item_delete,
                        list_item_to_fix: msg_item_delete,
                    });
                })
            });
        }
        if (totalPage == 2) {
            client.query(`select* from public."Products" as a where a."ProID" between 1 and 8 order by a."ProID"`, (err, results) => {
                if (err) throw err;
                var msg_item = '';
                for (var i = 0; i < results.rows.length; i++) {
                    var posOfDot = results.rows[i].Price.lastIndexOf('.');
                    results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                    msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                    <div class="card__item">
                        <div class="card__item-img">
                            <img src="${results.rows[i].LinkImg}" alt="">
                        </div>
                        <div class="card__item-content">
                            <span>${results.rows[i].ProName}</span>
                            <span>Số lượng: ${results.rows[i].Quantity}</span>
                            <span>Giá tiền: ${results.rows[i].Price}đ</span>
                        </div>
                    </div>
                </div>`
                }
                var msg_page = '';
                msg_page = msg_page + `<div class="page__button page__first" style="background-color: #007bff; color: white" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">1</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">2</div>`;
                var sum = '2';
                client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                    if (err) throw err;
                    var msg_item_delete = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                    }
                    res.render('dashboard', {
                        list_item: msg_item,
                        list_page: msg_page,
                        sum_page: sum,
                        list_item_to_delete: msg_item_delete,
                        list_item_to_fix: msg_item_delete,
                    });
                })
            });
        }
        if (totalPage == 3) {
            client.query(`select* from public."Products" as a where a."ProID" between 1 and 8 order by a."ProID"`, (err, results) => {
                if (err) throw err;
                var msg_item = '';
                for (var i = 0; i < results.rows.length; i++) {
                    var posOfDot = results.rows[i].Price.lastIndexOf('.');
                    results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                    msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                    <div class="card__item">
                        <div class="card__item-img">
                            <img src="${results.rows[i].LinkImg}" alt="">
                        </div>
                        <div class="card__item-content">
                            <span>${results.rows[i].ProName}</span>
                            <span>Số lượng: ${results.rows[i].Quantity}</span>
                            <span>Giá tiền: ${results.rows[i].Price}đ</span>
                        </div>
                    </div>
                </div>`
                }
                var msg_page = '';
                msg_page = msg_page + `<div class="page__button page__first" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()" style="background-color: #007bff; color: white" onclick="handle_click_page_first()">1</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">2</div><div class="page__button page__third" onclick="handle_click_page_third()" onmousemove="handle_mouse_move_page_third()" onmouseleave="handle_mouse_leave_page_third()">3</div>`;
                var sum = '3';
                client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                    if (err) throw err;
                    var msg_item_delete = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                    }
                    res.render('dashboard', {
                        list_item: msg_item,
                        list_page: msg_page,
                        sum_page: sum,
                        list_item_to_delete: msg_item_delete,
                        list_item_to_fix: msg_item_delete,
                    });
                })
            });
        }
        if (totalPage > 3) {
            client.query(`select* from public."Products" as a where a."ProID" between 1 and 8 order by a."ProID"`, (err, results) => {
                if (err) throw err;
                var msg_item = '';
                for (var i = 0; i < results.rows.length; i++) {
                    var posOfDot = results.rows[i].Price.lastIndexOf('.');
                    results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                    msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                    <div class="card__item">
                        <div class="card__item-img">
                            <img src="${results.rows[i].LinkImg}" alt="">
                        </div>
                        <div class="card__item-content">
                            <span>${results.rows[i].ProName}</span>
                            <span>Số lượng: ${results.rows[i].Quantity}</span>
                            <span>Giá tiền: ${results.rows[i].Price}đ</span>
                        </div>
                    </div>
                </div>`
                }
                var msg_page = '';
                msg_page = msg_page + `<div class="prev__button" onclick="handle_click_page_prev()">Previous</div><div class="page__button page__first" style="background-color: #007bff; color: white" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">1</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">2</div><div class="page__button page__third" onclick="handle_click_page_third()" onmousemove="handle_mouse_move_page_third()" onmouseleave="handle_mouse_leave_page_third()">3</div><div class="next__button" onclick="handle_click_page_next()">Next</div>`;
                var sum = `${totalPage}`;
                client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                    if (err) throw err;
                    var msg_item_delete = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                    }
                    res.render('dashboard', {
                        list_item: msg_item,
                        list_page: msg_page,
                        sum_page: sum,
                        list_item_to_delete: msg_item_delete,
                        list_item_to_fix: msg_item_delete,
                    });
                });
            });
        }
    });
});
app.post('/', upload.single('linkImg'), (req, res) => {
    if (req.body.selectToDelete != undefined) {
        client.query(`DELETE FROM public."Products"
        WHERE "ProID"=${req.body.selectToDelete};`, (err, results) => {
            if (err) throw err;
        });
        client.query(`UPDATE public."Products"
            SET "ProID"="ProID"-1
            WHERE "ProID">${req.body.selectToDelete}`, (err, results) => {
            if (err) throw err;
            req.flash("notificationFromSever", `<p class="notification_from_sever">Xoá thành công</p>`);
            res.redirect('/');
        });
    }
    if (req.body.proName != undefined) {
        client.query(`select* from public."Products" as a where a."ProName"='${req.body.proName}'`, (err, results) => {
            if (err) throw err;
            if (results.rows.length > 0) {
                req.flash("notificationFromSever", `<p class="notification_from_sever">Thêm thất bại</p>`);
                res.redirect('/');
            }
            else {
                client.query(`select count(*) from public."Products"`, (err, results) => {
                    if (err) throw err;
                    var proID = Number(results.rows[0].count) + 1;
                    client.query(`insert into public."Products"(
                        "ProID", "ProName", "TinyDes", "FullDes", "Price", "CatID", "Quantity", "LinkImg")VALUES (${proID},'${req.body.proName}','${req.body.tinyDes}','${req.body.fullDes}',${req.body.price},${req.body.catID},${req.body.quantity},'http://localhost:3000/${req.file.originalname}');`, (err, results) => {
                        if (err) throw err;
                        req.flash("notificationFromSever", `<p class="notification_from_sever">Thêm thành công</p>`);
                        res.redirect('/');
                    })
                })
            }
        })
    }
    if (req.body.list_item_page_first != undefined) {
        client.query(`select* from public."Products" as a where a."ProID" between ${Number(req.body.list_item_page_first) * 8 - 7} and ${Number(req.body.list_item_page_first) * 8} order by a."ProID"`, (err, results) => {
            if (err) throw err;
            var msg_item = '';
            for (var i = 0; i < results.rows.length; i++) {
                var posOfDot = results.rows[i].Price.lastIndexOf('.');
                results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                <div class="card__item">
                    <div class="card__item-img">
                        <img src="${results.rows[i].LinkImg}" alt="">
                    </div>
                    <div class="card__item-content">
                        <span>${results.rows[i].ProName}</span>
                        <span>Số lượng: ${results.rows[i].Quantity}</span>
                        <span>Giá tiền: ${results.rows[i].Price}đ</span>
                    </div>
                </div>
            </div>`
            }
            client.query(`select count(*) from public."Products"`, (err, results) => {
                if (err) throw err;
                var totalPage;
                var countItem = Number(results.rows[0].count);
                totalPage = Math.ceil(countItem / 8);
                if (totalPage == 1) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first" style="background-color: #007bff; color: white" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">${Number(req.body.list_item_page_first)}</div>`;
                    var sum = '1';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
                if (totalPage == 2) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first" style="background-color: #007bff; color: white" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">${Number(req.body.list_item_page_first)}</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">${Number(req.body.list_item_page_first) + 1}</div>`;
                    var sum = '2';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
                if (totalPage == 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()" style="background-color: #007bff; color: white" onclick="handle_click_page_first()">${Number(req.body.list_item_page_first)}</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">${Number(req.body.list_item_page_first) + 1}</div><div class="page__button page__third" onclick="handle_click_page_third()" onmousemove="handle_mouse_move_page_third()" onmouseleave="handle_mouse_leave_page_third()">${Number(req.body.list_item_page_first) + 2}</div>`;
                    var sum = '3';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
                if (totalPage > 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="prev__button" onclick="handle_click_page_prev()">Previous</div><div class="page__button page__first" style="background-color: #007bff; color: white" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">${Number(req.body.list_item_page_first)}</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">${Number(req.body.list_item_page_first) + 1}</div><div class="page__button page__third" onclick="handle_click_page_third()" onmousemove="handle_mouse_move_page_third()" onmouseleave="handle_mouse_leave_page_third()">${Number(req.body.list_item_page_first) + 2}</div><div class="next__button" onclick="handle_click_page_next()">Next</div>`;
                    var sum = `${totalPage}`;
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
            });
        });
    }
    if (req.body.list_item_page_second != undefined) {
        client.query(`select* from public."Products" as a where a."ProID" between ${Number(req.body.list_item_page_second) * 8 - 7} and ${Number(req.body.list_item_page_second) * 8} order by a."ProID"`, (err, results) => {
            if (err) throw err;
            var msg_item = '';
            for (var i = 0; i < results.rows.length; i++) {
                var posOfDot = results.rows[i].Price.lastIndexOf('.');
                results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                <div class="card__item">
                    <div class="card__item-img">
                        <img src="${results.rows[i].LinkImg}" alt="">
                    </div>
                    <div class="card__item-content">
                        <span>${results.rows[i].ProName}</span>
                        <span>Số lượng: ${results.rows[i].Quantity}</span>
                        <span>Giá tiền: ${results.rows[i].Price}đ</span>
                    </div>
                </div>
            </div>`
            }
            client.query(`select count(*) from public."Products"`, (err, results) => {
                if (err) throw err;
                var totalPage;
                var countItem = Number(results.rows[0].count);
                totalPage = Math.ceil(countItem / 8);
                if (totalPage == 2) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">${Number(req.body.list_item_page_second) - 1}</div><div class="page__button page__second" style="background-color: #007bff; color: white" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">${Number(req.body.list_item_page_second)}</div>`;
                    var sum = '2';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
                if (totalPage == 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()" onclick="handle_click_page_first()">${Number(req.body.list_item_page_second) - 1}</div><div class="page__button page__second" onclick="handle_click_page_second()" style="background-color: #007bff; color: white" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">${Number(req.body.list_item_page_second)}</div><div class="page__button page__third" onclick="handle_click_page_third()" onmousemove="handle_mouse_move_page_third()" onmouseleave="handle_mouse_leave_page_third()">${Number(req.body.list_item_page_second) + 1}</div>`;
                    var sum = '3';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
                if (totalPage > 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="prev__button" onclick="handle_click_page_prev()">Previous</div><div class="page__button page__first" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">${Number(req.body.list_item_page_second) - 1}</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" style="background-color: #007bff; color: white" onmouseleave="handle_mouse_leave_page_second()">${Number(req.body.list_item_page_second)}</div><div class="page__button page__third" onclick="handle_click_page_third()" onmousemove="handle_mouse_move_page_third()" onmouseleave="handle_mouse_leave_page_third()">${Number(req.body.list_item_page_second) + 1}</div><div class="next__button" onclick="handle_click_page_next()">Next</div>`;
                    var sum = `${totalPage}`;
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
            });
        });
    }
    if (req.body.list_item_page_third != undefined) {
        client.query(`select* from public."Products" as a where a."ProID" between ${Number(req.body.list_item_page_third) * 8 - 7} and ${Number(req.body.list_item_page_third) * 8} order by a."ProID"`, (err, results) => {
            if (err) throw err;
            var msg_item = '';
            for (var i = 0; i < results.rows.length; i++) {
                var posOfDot = results.rows[i].Price.lastIndexOf('.');
                results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                <div class="card__item">
                    <div class="card__item-img">
                        <img src="${results.rows[i].LinkImg}" alt="">
                    </div>
                    <div class="card__item-content">
                        <span>${results.rows[i].ProName}</span>
                        <span>Số lượng: ${results.rows[i].Quantity}</span>
                        <span>Giá tiền: ${results.rows[i].Price}đ</span>
                    </div>
                </div>
            </div>`
            }
            client.query(`select count(*) from public."Products"`, (err, results) => {
                if (err) throw err;
                var totalPage;
                var countItem = Number(results.rows[0].count);
                totalPage = Math.ceil(countItem / 8);
                if (totalPage == 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()" onclick="handle_click_page_first()">${Number(req.body.list_item_page_third) - 2}</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">${Number(req.body.list_item_page_third) - 1}</div><div class="page__button page__third" onclick="handle_click_page_third()" onmousemove="handle_mouse_move_page_third()" onmouseleave="handle_mouse_leave_page_third()" style="background-color: #007bff; color: white">${Number(req.body.list_item_page_third)}</div>`;
                    var sum = '3';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
                if (totalPage > 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="prev__button" onclick="handle_click_page_prev()">Previous</div><div class="page__button page__first" onclick="handle_click_page_first()" onmousemove="handle_mouse_move_page_first()" onmouseleave="handle_mouse_leave_page_first()">${Number(req.body.list_item_page_third) - 2}</div><div class="page__button page__second" onclick="handle_click_page_second()" onmousemove="handle_mouse_move_page_second()" onmouseleave="handle_mouse_leave_page_second()">${Number(req.body.list_item_page_third) - 1}</div><div class="page__button page__third" onclick="handle_click_page_third()" onmousemove="handle_mouse_move_page_third()" onmouseleave="handle_mouse_leave_page_third()" style="background-color: #007bff; color: white">${Number(req.body.list_item_page_third)}</div><div class="next__button" onclick="handle_click_page_next()">Next</div>`;
                    var sum = `${totalPage}`;
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                        });
                    })
                }
            });
        });
    }
    if (req.body.selectToFix != undefined) {
        client.query(`select* from public."Products" as a where a."ProID"=${req.body.selectToFix}`, (err, results) => {
            if (err) throw err;
            var pod = results.rows[0].Price.lastIndexOf('.');
            var msg = `<form action="/" style="top: 18%; border-top: 1px solid white;" method="post" class="form__update-product" onsubmit="event.preventDefault(); handle_submit_form_update();" enctype="multipart/form-data">
            <input type="text" class="input__add-product input__ProNameBefore-fix-product" name="proNameBeforeFix" placeholder="Tên sản phẩm trước khi cập nhật" value="${results.rows[0].ProName}" style="opacity:0; visibility: hidden; position: absolute; top: 0; left: 0; user-select: none; pointer-events: none;">
            <input type="text" class="input__add-product input__ProName-fix-product" name="proNameFix" placeholder="Tên sản phẩm" required autocomplete="off" onclick="handle_click_input_proNameFix()" value="${results.rows[0].ProName}">
            <p class="error__proName1">Độ dài tên sản phẩm không được vượt quá 40 ký tự</p>
            <input type="text" class="input__add-product input__TinyDes-fix-product" name="tinyDesFix" placeholder="Mô tả ngắn gọn" required autocomplete="off" onclick="handle_click_input_tinyDesFix()" value="${results.rows[0].TinyDes}">
            <p class="error__tinyDes1">Độ dài của mô tả ngắn gọn không được vượt quá 80 ký tự</p>
            <input type="text" class="input__add-product input__FullDes-fix-product" name="fullDesFix" placeholder="Mô tả chi tiết" required autocomplete="off" value="${results.rows[0].FullDes}">
            <input type="text" class="input__add-product input__Price-fix-product" name="priceFix" placeholder="Giá tiền" required autocomplete="off" onclick="handle_click_input_priceFix()" value="${results.rows[0].Price.slice(0, pod)}">
            <p class="error__price1">Giá tiền phải là 1 con số lớn hơn 0 và nhỏ hơn 9999999999999999999.9999</p>
            <select name="catIDFix" id="" class="input__add-product input__CatID-fix-product" required autocomplete="off">
                <option value="1">Sách</option>
                <option value="2">Điện thoại</option>
                <option value="3">Máy chụp hình</option>
                <option value="4">Quần áo - Giày dép</option>
                <option value="5">Máy tính</option>
                <option value="6">Đồ trang sức</option>
                <option value="7">Khác</option>
            </select>
            <input type="text" class="input__add-product input__Quantity-fix-product" name="quantityFix" placeholder="Số lượng" required autocomplete="off" onclick="handle_click_input_quantityFix()" value="${results.rows[0].Quantity}">
            <p class="error__quantity1">Số lượng phải là 1 con số không âm và nhỏ hơn 2147483648</p>
            <input type="file" class="input__add-product input__LinkImg-fix-product" name="linkImg" accept="image/*" required autocomplete="off">
            <input type="submit" value="Cập nhật thông tin cho sản phẩm" class="input__add-product"></form>`;
            req.flash("list_item_to_update", msg);
            req.flash("styleForFormFix", `<style>.container__form-fix{display:block}</style>`);
            res.redirect('/');
        })
    }
    if (req.body.proNameFix != undefined) {
        client.query(`UPDATE public."Products"
        SET "ProName"='${req.body.proNameFix}', "TinyDes"='${req.body.tinyDesFix}', "FullDes"='${req.body.fullDesFix}', "Price"='${req.body.priceFix}', "CatID"=${req.body.catIDFix}, "Quantity"=${req.body.quantityFix}, "LinkImg"='http://localhost:3000/${req.file.originalname}'
        WHERE "ProName"='${req.body.proNameBeforeFix}';`, (err, results) => {
            if (err) throw err;
            req.flash("notificationFromSever", `<p class="notification_from_sever">Cập nhật thành công</p>`);
            res.redirect('/');
        })
    }
    if (req.body.view_type != undefined) {
        client.query(`select count(*) from public."Products" where "CatID"=${req.body.view_type}`, (err, results) => {
            if (err) throw err;
            var totalPage;
            var countItem = Number(results.rows[0].count);
            totalPage = Math.ceil(countItem / 8);
            if (totalPage == 0) {
                client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                    if (err) throw err;
                    var msg_item_delete = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                    }
                    res.render('dashboard', {
                        list_item_to_delete: msg_item_delete,
                        list_item_to_fix: msg_item_delete,
                    });
                })
            }
            if (totalPage == 1) {
                client.query(`SELECT*
                FROM public."Products"
                where "CatID"=${req.body.view_type}
                order by "ProID"
            limit 8
            offset 0`, (err, results) => {
                    if (err) throw err;
                    var msg_item = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        var posOfDot = results.rows[i].Price.lastIndexOf('.');
                        results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                        msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                            <div class="card__item">
                                <div class="card__item-img">
                                    <img src="${results.rows[i].LinkImg}" alt="">
                                </div>
                                <div class="card__item-content">
                                    <span>${results.rows[i].ProName}</span>
                                    <span>Số lượng: ${results.rows[i].Quantity}</span>
                                    <span>Giá tiền: ${results.rows[i].Price}đ</span>
                                </div>
                            </div>
                        </div>`;
                    }
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" style="background-color: #007bff; color: white" onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()">1</div>`;
                    var sum = '1';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.view_type}`
                        });
                    })
                });
            }
            if (totalPage == 2) {
                client.query(`SELECT*
                FROM public."Products"
                where "CatID"=${req.body.view_type}
                order by "ProID"
            limit 8
            offset 0`, (err, results) => {
                    if (err) throw err;
                    var msg_item = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        var posOfDot = results.rows[i].Price.lastIndexOf('.');
                        results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                        msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                            <div class="card__item">
                                <div class="card__item-img">
                                    <img src="${results.rows[i].LinkImg}" alt="">
                                </div>
                                <div class="card__item-content">
                                    <span>${results.rows[i].ProName}</span>
                                    <span>Số lượng: ${results.rows[i].Quantity}</span>
                                    <span>Giá tiền: ${results.rows[i].Price}đ</span>
                                </div>
                            </div>
                        </div>`
                    }
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" style="background-color: #007bff; color: white" onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()">1</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()">2</div>`;
                    var sum = '2';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.view_type}`
                        });
                    })
                });
            }
            if (totalPage == 3) {
                client.query(`SELECT*
                FROM public."Products"
                where "CatID"=${req.body.view_type}
                order by "ProID"
            limit 8
            offset 0`, (err, results) => {
                    if (err) throw err;
                    var msg_item = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        var posOfDot = results.rows[i].Price.lastIndexOf('.');
                        results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                        msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                            <div class="card__item">
                                <div class="card__item-img">
                                    <img src="${results.rows[i].LinkImg}" alt="">
                                </div>
                                <div class="card__item-content">
                                    <span>${results.rows[i].ProName}</span>
                                    <span>Số lượng: ${results.rows[i].Quantity}</span>
                                    <span>Giá tiền: ${results.rows[i].Price}đ</span>
                                </div>
                            </div>
                        </div>`
                    }
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()" style="background-color: #007bff; color: white" onclick="handle_click_page_first_view()">1</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()">2</div><div class="page__button page__third-view" onclick="handle_click_page_third_view()" onmousemove="handle_mouse_move_page_third_view()" onmouseleave="handle_mouse_leave_page_third_view()">3</div>`;
                    var sum = '3';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.view_type}`
                        });
                    })
                });
            }
            if (totalPage > 3) {
                client.query(`SELECT*
                FROM public."Products"
                where "CatID"=${req.body.view_type}
                order by "ProID"
            limit 8
            offset 0`, (err, results) => {
                    if (err) throw err;
                    var msg_item = '';
                    for (var i = 0; i < results.rows.length; i++) {
                        var posOfDot = results.rows[i].Price.lastIndexOf('.');
                        results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                        msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                            <div class="card__item">
                                <div class="card__item-img">
                                    <img src="${results.rows[i].LinkImg}" alt="">
                                </div>
                                <div class="card__item-content">
                                    <span>${results.rows[i].ProName}</span>
                                    <span>Số lượng: ${results.rows[i].Quantity}</span>
                                    <span>Giá tiền: ${results.rows[i].Price}đ</span>
                                </div>
                            </div>
                        </div>`
                    }
                    var msg_page = '';
                    msg_page = msg_page + `<div class="prev__button-view" onclick="handle_click_page_prev_view()">Previous</div><div class="page__button page__first-view" style="background-color: #007bff; color: white" onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first()">1</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()">2</div><div class="page__button page__third-view" onclick="handle_click_page_third_view()" onmousemove="handle_mouse_move_page_third_view()" onmouseleave="handle_mouse_leave_page_third_view()">3</div><div class="next__button-view" onclick="handle_click_page_next_view()">Next</div>`;
                    var sum = `${totalPage}`;
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.view_type}`
                        });
                    });
                });
            }
        });
    }
    if (req.body.list_item_page_first_view!=undefined){
        var count=(Number(req.body.list_item_page_first_view)-1)*8;
        client.query(`select* from public."Products" as a where a."CatID"=${req.body.type_product_view} order by "ProID" limit 8 offset ${count}`, (err, results) => {
            if (err) throw err;
            var msg_item = '';
            for (var i = 0; i < results.rows.length; i++) {
                var posOfDot = results.rows[i].Price.lastIndexOf('.');
                results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                <div class="card__item">
                    <div class="card__item-img">
                        <img src="${results.rows[i].LinkImg}" alt="">
                    </div>
                    <div class="card__item-content">
                        <span>${results.rows[i].ProName}</span>
                        <span>Số lượng: ${results.rows[i].Quantity}</span>
                        <span>Giá tiền: ${results.rows[i].Price}đ</span>
                    </div>
                </div>
            </div>`
            }
            client.query(`select count(*) from public."Products" where "CatID"=${req.body.type_product_view}`, (err, results) => {
                if (err) throw err;
                var totalPage;
                var countItem = Number(results.rows[0].count);
                totalPage = Math.ceil(countItem / 8);
                if (totalPage == 1) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" style="background-color: #007bff; color: white" onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()">${Number(req.body.list_item_page_first_view)}</div>`;
                    var sum = '1';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view}`
                        });
                    })
                }
                if (totalPage == 2) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" style="background-color: #007bff; color: white" onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()">${Number(req.body.list_item_page_first_view)}</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()">${Number(req.body.list_item_page_first_view) + 1}</div>`;
                    var sum = '2';  
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view}`
                        });
                    })
                }
                if (totalPage == 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()" style="background-color: #007bff; color: white" onclick="handle_click_page_first_view()">${Number(req.body.list_item_page_first_view)}</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()">${Number(req.body.list_item_page_first_view) + 1}</div><div class="page__button page__third-view" onclick="handle_click_page_third_view()" onmousemove="handle_mouse_move_page_third_view()" onmouseleave="handle_mouse_leave_page_third_view()">${Number(req.body.list_item_page_first_view) + 2}</div>`;
                    var sum = '3';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view}`
                        });
                    })
                }
                if (totalPage > 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="prev__button-view" onclick="handle_click_page_prev_view()">Previous</div><div class="page__button page__first-view" style="background-color: #007bff; color: white" onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()">${Number(req.body.list_item_page_first_view)}</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()">${Number(req.body.list_item_page_first_view) + 1}</div><div class="page__button page__third-view" onclick="handle_click_page_third_view()" onmousemove="handle_mouse_move_page_third_view()" onmouseleave="handle_mouse_leave_page_third_view()">${Number(req.body.list_item_page_first_view) + 2}</div><div class="next__button-view" onclick="handle_click_page_next_view()">Next</div>`;
                    var sum = `${totalPage}`;
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view}`
                        });
                    })
                }
            });
        });
    }
    if (req.body.list_item_page_second_view!=undefined){
        var count=(Number(req.body.list_item_page_second_view)-1)*8;
        client.query(`select* from public."Products" as a where a."CatID"=${req.body.type_product_view_2} order by "ProID" limit 8 offset ${count}`, (err, results) => {
            if (err) throw err;
            var msg_item = '';
            for (var i = 0; i < results.rows.length; i++) {
                var posOfDot = results.rows[i].Price.lastIndexOf('.');
                results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                <div class="card__item">
                    <div class="card__item-img">
                        <img src="${results.rows[i].LinkImg}" alt="">
                    </div>
                    <div class="card__item-content">
                        <span>${results.rows[i].ProName}</span>
                        <span>Số lượng: ${results.rows[i].Quantity}</span>
                        <span>Giá tiền: ${results.rows[i].Price}đ</span>
                    </div>
                </div>
            </div>`
            }
            client.query(`select count(*) from public."Products" where "CatID"=${req.body.type_product_view_2}`, (err, results) => {
                if (err) throw err;
                var totalPage;
                var countItem = Number(results.rows[0].count);
                totalPage = Math.ceil(countItem / 8);
                if (totalPage == 2) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()">${Number(req.body.list_item_page_second_view)-1}</div><div class="page__button page__second-view" style="background-color: #007bff; color: white" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()">${Number(req.body.list_item_page_second_view)}</div>`;
                    var sum = '2';  
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view_2}`
                        });
                    })
                }
                if (totalPage == 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()"  onclick="handle_click_page_first_view()">${Number(req.body.list_item_page_second_view)-1}</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()" style="background-color: #007bff; color: white">${Number(req.body.list_item_page_second_view)}</div><div class="page__button page__third-view" onclick="handle_click_page_third_view()" onmousemove="handle_mouse_move_page_third_view()" onmouseleave="handle_mouse_leave_page_third_view()">${Number(req.body.list_item_page_second_view) + 1}</div>`;
                    var sum = '3';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view_2}`
                        });
                    })
                }
                if (totalPage > 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="prev__button-view" onclick="handle_click_page_prev_view()">Previous</div><div class="page__button page__first-view"  onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()">${Number(req.body.list_item_page_second_view)-1}</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()" style="background-color: #007bff; color: white">${Number(req.body.list_item_page_second_view)}</div><div class="page__button page__third-view" onclick="handle_click_page_third_view()" onmousemove="handle_mouse_move_page_third_view()" onmouseleave="handle_mouse_leave_page_third_view()">${Number(req.body.list_item_page_second_view) + 1}</div><div class="next__button-view" onclick="handle_click_page_next_view()">Next</div>`;
                    var sum = `${totalPage}`;
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view_2}`
                        });
                    })
                }
            });
        });
    }
    if (req.body.list_item_page_third_view!=undefined){
        var count=(Number(req.body.list_item_page_third_view)-1)*8;
        client.query(`select* from public."Products" as a where a."CatID"=${req.body.type_product_view_3} order by "ProID" limit 8 offset ${count}`, (err, results) => {
            if (err) throw err;
            var msg_item = '';
            for (var i = 0; i < results.rows.length; i++) {
                var posOfDot = results.rows[i].Price.lastIndexOf('.');
                results.rows[i].Price = results.rows[i].Price.slice(0, posOfDot);
                msg_item = msg_item + `<div class="col l-3 m-6 c-12">
                <div class="card__item">
                    <div class="card__item-img">
                        <img src="${results.rows[i].LinkImg}" alt="">
                    </div>
                    <div class="card__item-content">
                        <span>${results.rows[i].ProName}</span>
                        <span>Số lượng: ${results.rows[i].Quantity}</span>
                        <span>Giá tiền: ${results.rows[i].Price}đ</span>
                    </div>
                </div>
            </div>`
            }
            client.query(`select count(*) from public."Products" where "CatID"=${req.body.type_product_view_3}`, (err, results) => {
                if (err) throw err;
                var totalPage;
                var countItem = Number(results.rows[0].count);
                totalPage = Math.ceil(countItem / 8);
                if (totalPage == 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="page__button page__first-view" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()"  onclick="handle_click_page_first_view()">${Number(req.body.list_item_page_third_view)-2}</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()">${Number(req.body.list_item_page_third_view)-1}</div><div class="page__button page__third-view" onclick="handle_click_page_third_view()" onmousemove="handle_mouse_move_page_third_view()" onmouseleave="handle_mouse_leave_page_third_view()" style="background-color: #007bff; color: white">${Number(req.body.list_item_page_third_view)}</div>`;
                    var sum = '3';
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view_3}`
                        });
                    })
                }
                if (totalPage > 3) {
                    var msg_page = '';
                    msg_page = msg_page + `<div class="prev__button-view" onclick="handle_click_page_prev_view()">Previous</div><div class="page__button page__first-view"  onclick="handle_click_page_first_view()" onmousemove="handle_mouse_move_page_first_view()" onmouseleave="handle_mouse_leave_page_first_view()">${Number(req.body.list_item_page_third_view)-2}</div><div class="page__button page__second-view" onclick="handle_click_page_second_view()" onmousemove="handle_mouse_move_page_second_view()" onmouseleave="handle_mouse_leave_page_second_view()" >${Number(req.body.list_item_page_third_view)-1}</div><div class="page__button page__third-view" onclick="handle_click_page_third_view()" onmousemove="handle_mouse_move_page_third_view()" onmouseleave="handle_mouse_leave_page_third_view()" style="background-color: #007bff; color: white">${Number(req.body.list_item_page_third_view)}</div><div class="next__button-view" onclick="handle_click_page_next_view()">Next</div>`;
                    var sum = `${totalPage}`;
                    client.query(`select* from public."Products" order by "ProID"`, (err, results) => {
                        if (err) throw err;
                        var msg_item_delete = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            msg_item_delete = msg_item_delete + `<option value="${results.rows[i].ProID}">${results.rows[i].ProName}</option>`;
                        }
                        res.render('dashboard', {
                            list_item: msg_item,
                            list_page: msg_page,
                            sum_page: sum,
                            list_item_to_delete: msg_item_delete,
                            list_item_to_fix: msg_item_delete,
                            type_product: `${req.body.type_product_view_3}`
                        });
                    })
                }
            });
        });
    }
});
app.listen(3000);
