const auth = require('./auth/index')
const InviteCode = require('./invite-code/index')
module.exports = (app)=>{
    app.use(auth.routes())
    app.use(InviteCode.routes())
}