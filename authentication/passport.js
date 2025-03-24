/* files shows the use case of passport js , how to use it for auth.
passport js is besth for Oauth , when we uthenticate usign gmail facebook github...etc


*/

const passport = require("passport");

// local stratery in passprot is used  to verify a specific style of data only (usename -password, email-password) and it has specific syntax


passport.use(new LocalStrategy( async (email, password, done) => {
    const user = await User.findOne({ email });// finding user with this email
    if (!user) 
        return done(null, false, { message: "User not found" }); // done is passed as msg (error , true/false, msg)

    const isMatch= user.password ===password? true:false;

    // const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: "Incorrect password" });

    return done(null, user);
}));




// this auth can be used as middleware in any route 
const auth = passport.authenticate( "local", { session: false }, (err, user, info) => {
    if (err || !user) return res.status(400).json({ error: info?.message || "Login failed" })  
});



// we will also hash the password before saving it and we will also add salt in it.

// this we will do in ./model/schema file

userSchema.pre("save", async function (next){

    // hash the password only if password if modifies or else no
    if (!this.isModified("password")) return next();// skip if  password is unchanged

    const salt= bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);

    next();
});