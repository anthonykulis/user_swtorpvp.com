// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy,
//     bcrypt = require('bcrypt');

// function findById(id, fn){
//   User.findOne(id).done(function(err, user){
//     console.log('found by id', user);
//     if(err) return fn(err, null);
//     else return fn(null, user);
//   });
// }

// function findByEmail(email, fn){
//   User.findOne({
//     email: email
//   }).done(function(err, user){
//     console.log('found by email', user);
//     if(err) return fn(err, null);
//     else return fn(null, user);
//   })
// }

// passport.serializeUser(function(user, done){
//   console.log('serializing', user);
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done){
//   findById(id, function(err, user){
//     console.log('deserializing', user);
//     done(err, user);
//   })
// });

// passport.use(new LocalStrategy(
//   function(email, password, done){
//     console.log('looking at', email, password);
//     process.nextTick(function(){
//       console.log('finding by email');
//       findByEmail(email, function(err, user){
//         if(err){ return done(err, null);}
//         if(!user){ return done(null, false, {message: 'Email Unknown'})}
//         bcrypt.compare(password, user.password, function(err, res){
//           if(!res){ return done(null, false, {message: 'Invalid Password'})}
//           var user = {
//             email: user.email,
//             id: user.id
//           }
//           return done(null, user)
//         })
//       })
//     })
//   }
// ))