/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // USERS
  'POST /users': 'User.create',
  'GET /users': 'User.find',
  'GET /users/:id': 'User.findOne',
  'PUT /users/:id': 'User.update',
  'PATCH /users/:id': 'User.patch',
  'DELETE /users/:id': 'User.destroy',
  

  // SESSIONS
  'POST /sessions': 'Session.create',
  
  'GET /sessions': 'Session.find',
  'GET /sessions/:id': 'Session.findOne',
  'DESTROY /sessions/:id': 'Session.destroy',
  
  // ROLES
  'POST /roles': {
    controller: 'RoleController',
    action: 'create'
  },
  'GET /roles': {
    controller: 'RoleController',
    action: 'find'
  },
  'GET /roles/:id': {
    controller: 'RoleController',
    action: 'findOne'
  },
  'PUT /roles/:id': {
    controller: 'RoleController',
    action: 'update'
  },
  'DELETE /roles/:id': {
    controller: 'RoleController',
    action: 'destroy'
  },

  // GROUPS
  'POST /groups': {
    controller: 'GroupController',
    action: 'create'
  },
  'GET /groups': {
    controller: 'GroupController',
    action: 'find'
  },
  'GET /groups/:id': {
    controller: 'GroupController',
    action: 'findOne'
  },
  'PUT /groups/:id': {
    controller: 'GroupController',
    action: 'update'
  },
  'DELETE /groups/:id': {
    controller: 'GroupController',
    action: 'destroy'
  },

  // GROUP AS RESOURCE
  'POST /groups/:group_id/roles': {
    controller: 'GroupController',
    action: 'addRoles'
  },

  'DELETE /groups/:group_id/roles': {
    controller: 'GroupController',
    action: 'removeRoles'
  }

};
