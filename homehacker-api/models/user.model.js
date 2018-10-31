const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'The email is required',
        unique: 'This email already exists',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: 'The password is required'
    },
    name: {
        type: String
    },
    image: {
        type: String,
        default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAMFBMVEXx8fHCw8Xt7e2/wMLf4OHU1Nb09PTZ2drHyMrm5ubc3N3p6enLzM3R0tPj4+POztAdXyMCAAACAElEQVRYhe3Z0ZKDIAwFUEAEFbT//7erttOpS3ITUXf7YJ6XM5kUSTJrkrsoknHmonA3/X10CC5N3k/JhXAqHVzsbLOG7aJT4So69Hkm39E0uVfgKnr8cF/6eAYdki3k2bZJSlykw0TAKz4JtkSzsmxLdOLgJdIROiDZWpg2pkNky7GWJCIb0w4nbS08jGghaSFtTEtJw2pDOglJz2mDS4JosR64IpB+yAV51NGmk+mOP/1ftCxb+31ZX0dfeENCe9m9NnwbeNM9fxq/fHJBwGH8PI2SPNY+T8ZJj2r1ez2njbsMSlpsu5iGR6W2iy6JMC2Ic8jAzyHDsTmE7we4nWtoEzxpN/7wzLeMwF05qXbyGKybr4ct3lihzHraBONz846HN5q1YMcuk3xs2+jTybvMS19C/effsNxdQwcyDtMz0S8/3++IvjcCLzyqbnheuuKTWSIPcDeFbdeN1F73+emMAEd0LLMts48VtMsivOKZBTgabnXbYPZejt4hc/sjQ4ur1zZog6bzPjqracUSsw2ymZG0NNkQNqUQtDDYkDQx7FD0zt/wGQRT0mD0AGmX3ZKid16PZ2QNjec8Nm1NQfo6utgPSpqZlkS6mKYIeu/38qKLr4ag5b2LpFsNXSNbe9M3fdM3fdMUPTZVUUwiVG/0VaHojafFTf8lfd2/6H8A3/oYTLcYXXgAAAAASUVORK5CYII=',
    },
    description: {
        type: String,
        maxlength: 100
    }
}, {timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', function(next){
    if (!this.isModified('password')) {        
        next();
    } else{       
        bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt =>{
            return bcrypt.hash(this.password, salt);
        })
        .then(hash =>{
            this.password = hash;
            next();
        })
        .catch(error => {
            next(error);
        });
    }
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
