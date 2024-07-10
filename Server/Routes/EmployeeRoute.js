import express from 'express';
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
const Router = express.Router();

//employee Login API
Router.post('/employee_login', (req, res) => {
    console.log(req.body)
    const sql = 'SELECT * FROM employee WHERE email=?';
    con.query(sql, [req.body.email], (err, result) => {
        console.log(result)
        if (err) return res.json({ status: false, error: "Query error" + err });
        if (result.length > 0) {
            //compairing password
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return req.json({ status: false, error: "Wrong password" });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign({
                        role: 'employee',
                        email: email,
                        id: result[0].id
                    },
                        "jwt_secret_key",
                        {
                            expiresIn: "1d"
                        }
                    );
                    res.cookie('token',token);
                    return res.json({status:true,id:result[0].id})
                }else {
                    return res.json({ status: false, error:"wrong password" });
                }
                
            });
        }else {
            return res.json({ status: false, error:"wrong email not registerd" });
        }
    });
});

Router.get('/detail/:id',(req,res)=>{
    const id=req.params.id;
    const sql =`SELECT * FROM employee WHERE id=?`
    con.query(sql,[id],(err,result)=>{
        console.log(result)
        if(err) return res.json({status:false,error:"Query error"+err});
        return res.json({status:true,result:result});       

    })
})


export { Router as employeeRouter }