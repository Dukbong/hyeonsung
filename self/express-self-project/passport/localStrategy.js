const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField : "email", // req.body.email
        passwordField : "password", // req.body.password
    }, async(email, password, done)=>{
        console.log("usernameField", usernameField);
        try{
            const exUser = await User.findOne({where : {email}});
            if (exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                }else{
                    done(null, false, {message : "비밀번호가 일치하지 않습니다."});
                }
            }else{
                done(null, false, {message : "가입되지 않은 회원입니다."});        
            }
            // 조건에 맞는 곳을 찾아간다음 done(?,?,?)에 도달하면
            // 다시 routes/auth 로 이동해서 마저 읽는다.
            // ★done(에러(기본은 null), 객체, 성공여부)
        } catch(err){
            console.error(err);
            done(err);
        }
    }));
};