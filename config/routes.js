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
  'POST /users': {
    controller: 'UserController',
    action: 'create'
  },
  'GET /users': {
    controller: 'UserController',
    action: 'find'
  },
  'GET /users/:id': {
    controller: 'UserController',
    action: 'findOne'
  },
  'PUT /users/:id': {
    controller: 'UserController',
    action: 'update'
  },
  'DELETE /users/:id': {
    controller: 'UserController',
    action: 'destroy'
  },
  
  // USER AS RESOURCE
  'PUT /users/:user_id/groups': {
    controller: 'UserController',
    action: 'addGroups'
  },

  'DELETE /users/:user_id/groups': {
    controller: 'UserController',
    action: 'removeGroups'
  },

  // SESSIONS
  'POST /sessions': {
    controller: 'SessionController',
    action: 'create'
  },
  
  'GET /sessions/:id': {
    controller: 'SessionController',
    action: 'findOne'
  },
  'DELETE /sessions/:id': {
    controller: 'SessionController',
    action: 'destroy'
  },
  
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
  'PUT /groups/:group_id/roles': {
    controller: 'GroupController',
    action: 'addRoles'
  },

  'DELETE /groups/:group_id/roles': {
    controller: 'GroupController',
    action: 'removeRoles'
  }

};
