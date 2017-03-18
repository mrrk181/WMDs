var require = meteorInstall({"imports":{"api":{"documents":{"documents.js":["meteor/mongo","meteor/aldeed:simple-schema","meteor/dburles:factory",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/documents/documents.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.import('meteor/mongo', {                                                                                      // 1
  "Mongo": function (v) {                                                                                            // 1
    Mongo = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.import('meteor/aldeed:simple-schema', {                                                                       // 1
  "SimpleSchema": function (v) {                                                                                     // 1
    SimpleSchema = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Factory = void 0;                                                                                                // 1
module.import('meteor/dburles:factory', {                                                                            // 1
  "Factory": function (v) {                                                                                          // 1
    Factory = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Documents = new Mongo.Collection('Documents');                                                                   // 5
module.export("default", exports.default = Documents);                                                               // 1
Documents.allow({                                                                                                    // 8
  insert: function () {                                                                                              // 9
    return false;                                                                                                    // 9
  },                                                                                                                 // 9
  update: function () {                                                                                              // 10
    return false;                                                                                                    // 10
  },                                                                                                                 // 10
  remove: function () {                                                                                              // 11
    return false;                                                                                                    // 11
  }                                                                                                                  // 11
});                                                                                                                  // 8
Documents.deny({                                                                                                     // 14
  insert: function () {                                                                                              // 15
    return true;                                                                                                     // 15
  },                                                                                                                 // 15
  update: function () {                                                                                              // 16
    return true;                                                                                                     // 16
  },                                                                                                                 // 16
  remove: function () {                                                                                              // 17
    return true;                                                                                                     // 17
  }                                                                                                                  // 17
});                                                                                                                  // 14
Documents.schema = new SimpleSchema({                                                                                // 20
  title: {                                                                                                           // 21
    type: String,                                                                                                    // 22
    label: 'The title of the document.'                                                                              // 23
  },                                                                                                                 // 21
  body: {                                                                                                            // 25
    type: String,                                                                                                    // 26
    label: 'The body of the document.'                                                                               // 27
  }                                                                                                                  // 25
});                                                                                                                  // 20
Documents.attachSchema(Documents.schema);                                                                            // 31
Factory.define('document', Documents, {                                                                              // 33
  title: function () {                                                                                               // 34
    return 'Factory Title';                                                                                          // 34
  },                                                                                                                 // 34
  body: function () {                                                                                                // 35
    return 'Factory Body';                                                                                           // 35
  }                                                                                                                  // 35
});                                                                                                                  // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"methods.js":["meteor/aldeed:simple-schema","meteor/mdg:validated-method","./documents","../../modules/rate-limit.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/documents/methods.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  upsertDocument: function () {                                                                                      // 1
    return upsertDocument;                                                                                           // 1
  },                                                                                                                 // 1
  removeDocument: function () {                                                                                      // 1
    return removeDocument;                                                                                           // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var SimpleSchema = void 0;                                                                                           // 1
module.import('meteor/aldeed:simple-schema', {                                                                       // 1
  "SimpleSchema": function (v) {                                                                                     // 1
    SimpleSchema = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var ValidatedMethod = void 0;                                                                                        // 1
module.import('meteor/mdg:validated-method', {                                                                       // 1
  "ValidatedMethod": function (v) {                                                                                  // 1
    ValidatedMethod = v;                                                                                             // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.import('./documents', {                                                                                       // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var rateLimit = void 0;                                                                                              // 1
module.import('../../modules/rate-limit.js', {                                                                       // 1
  "default": function (v) {                                                                                          // 1
    rateLimit = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var upsertDocument = new ValidatedMethod({                                                                           // 6
  name: 'documents.upsert',                                                                                          // 7
  validate: new SimpleSchema({                                                                                       // 8
    _id: {                                                                                                           // 9
      type: String,                                                                                                  // 9
      optional: true                                                                                                 // 9
    },                                                                                                               // 9
    title: {                                                                                                         // 10
      type: String,                                                                                                  // 10
      optional: true                                                                                                 // 10
    },                                                                                                               // 10
    body: {                                                                                                          // 11
      type: String,                                                                                                  // 11
      optional: true                                                                                                 // 11
    }                                                                                                                // 11
  }).validator(),                                                                                                    // 8
  run: function (document) {                                                                                         // 13
    return Documents.upsert({                                                                                        // 14
      _id: document._id                                                                                              // 14
    }, {                                                                                                             // 14
      $set: document                                                                                                 // 14
    });                                                                                                              // 14
  }                                                                                                                  // 15
});                                                                                                                  // 6
var removeDocument = new ValidatedMethod({                                                                           // 18
  name: 'documents.remove',                                                                                          // 19
  validate: new SimpleSchema({                                                                                       // 20
    _id: {                                                                                                           // 21
      type: String                                                                                                   // 21
    }                                                                                                                // 21
  }).validator(),                                                                                                    // 20
  run: function (_ref) {                                                                                             // 23
    var _id = _ref._id;                                                                                              // 23
    Documents.remove(_id);                                                                                           // 24
  }                                                                                                                  // 25
});                                                                                                                  // 18
rateLimit({                                                                                                          // 28
  methods: [upsertDocument, removeDocument],                                                                         // 29
  limit: 5,                                                                                                          // 33
  timeRange: 1000                                                                                                    // 34
});                                                                                                                  // 28
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"startup":{"client":{"index.js":["meteor/themeteorchef:bert","bootstrap/dist/css/bootstrap.min.css","./routes.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/client/index.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Bert = void 0;                                                                                                   // 1
module.import('meteor/themeteorchef:bert', {                                                                         // 1
  "Bert": function (v) {                                                                                             // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
module.import('bootstrap/dist/css/bootstrap.min.css');                                                               // 1
module.import('./routes.js');                                                                                        // 1
Bert.defaults.style = 'growl-top-right';                                                                             // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"routes.js":["react","react-dom","react-router","meteor/meteor","../../ui/layouts/App.js","../../ui/pages/Documents.js","../../ui/pages/NewDocument.js","../../ui/containers/EditDocument.js","../../ui/containers/ViewDocument.js","../../ui/pages/Index.js","../../ui/pages/Login.js","../../ui/pages/NotFound.js","../../ui/pages/RecoverPassword.js","../../ui/pages/ResetPassword.js","../../ui/pages/Signup.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/client/routes.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var render = void 0;                                                                                                 // 1
module.import('react-dom', {                                                                                         // 1
  "render": function (v) {                                                                                           // 1
    render = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Router = void 0,                                                                                                 // 1
    Route = void 0,                                                                                                  // 1
    IndexRoute = void 0,                                                                                             // 1
    browserHistory = void 0;                                                                                         // 1
module.import('react-router', {                                                                                      // 1
  "Router": function (v) {                                                                                           // 1
    Router = v;                                                                                                      // 1
  },                                                                                                                 // 1
  "Route": function (v) {                                                                                            // 1
    Route = v;                                                                                                       // 1
  },                                                                                                                 // 1
  "IndexRoute": function (v) {                                                                                       // 1
    IndexRoute = v;                                                                                                  // 1
  },                                                                                                                 // 1
  "browserHistory": function (v) {                                                                                   // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.import('meteor/meteor', {                                                                                     // 1
  "Meteor": function (v) {                                                                                           // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var App = void 0;                                                                                                    // 1
module.import('../../ui/layouts/App.js', {                                                                           // 1
  "default": function (v) {                                                                                          // 1
    App = v;                                                                                                         // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.import('../../ui/pages/Documents.js', {                                                                       // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 5);                                                                                                               // 1
var NewDocument = void 0;                                                                                            // 1
module.import('../../ui/pages/NewDocument.js', {                                                                     // 1
  "default": function (v) {                                                                                          // 1
    NewDocument = v;                                                                                                 // 1
  }                                                                                                                  // 1
}, 6);                                                                                                               // 1
var EditDocument = void 0;                                                                                           // 1
module.import('../../ui/containers/EditDocument.js', {                                                               // 1
  "default": function (v) {                                                                                          // 1
    EditDocument = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 7);                                                                                                               // 1
var ViewDocument = void 0;                                                                                           // 1
module.import('../../ui/containers/ViewDocument.js', {                                                               // 1
  "default": function (v) {                                                                                          // 1
    ViewDocument = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 8);                                                                                                               // 1
var Index = void 0;                                                                                                  // 1
module.import('../../ui/pages/Index.js', {                                                                           // 1
  "default": function (v) {                                                                                          // 1
    Index = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 9);                                                                                                               // 1
var Login = void 0;                                                                                                  // 1
module.import('../../ui/pages/Login.js', {                                                                           // 1
  "default": function (v) {                                                                                          // 1
    Login = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 10);                                                                                                              // 1
var NotFound = void 0;                                                                                               // 1
module.import('../../ui/pages/NotFound.js', {                                                                        // 1
  "default": function (v) {                                                                                          // 1
    NotFound = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 11);                                                                                                              // 1
var RecoverPassword = void 0;                                                                                        // 1
module.import('../../ui/pages/RecoverPassword.js', {                                                                 // 1
  "default": function (v) {                                                                                          // 1
    RecoverPassword = v;                                                                                             // 1
  }                                                                                                                  // 1
}, 12);                                                                                                              // 1
var ResetPassword = void 0;                                                                                          // 1
module.import('../../ui/pages/ResetPassword.js', {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    ResetPassword = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 13);                                                                                                              // 1
var Signup = void 0;                                                                                                 // 1
module.import('../../ui/pages/Signup.js', {                                                                          // 1
  "default": function (v) {                                                                                          // 1
    Signup = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 14);                                                                                                              // 1
                                                                                                                     //
var authenticate = function (nextState, replace) {                                                                   // 19
  if (!Meteor.loggingIn() && !Meteor.userId()) {                                                                     // 20
    replace({                                                                                                        // 21
      pathname: '/login',                                                                                            // 22
      state: {                                                                                                       // 23
        nextPathname: nextState.location.pathname                                                                    // 23
      }                                                                                                              // 23
    });                                                                                                              // 21
  }                                                                                                                  // 25
};                                                                                                                   // 26
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 28
  render(React.createElement(                                                                                        // 29
    Router,                                                                                                          // 30
    {                                                                                                                // 30
      history: browserHistory                                                                                        // 30
    },                                                                                                               // 30
    React.createElement(                                                                                             // 31
      Route,                                                                                                         // 31
      {                                                                                                              // 31
        path: "/",                                                                                                   // 31
        component: App                                                                                               // 31
      },                                                                                                             // 31
      React.createElement(IndexRoute, {                                                                              // 32
        name: "index",                                                                                               // 32
        component: Index                                                                                             // 32
      }),                                                                                                            // 32
      React.createElement(Route, {                                                                                   // 33
        name: "documents",                                                                                           // 33
        path: "/documents",                                                                                          // 33
        component: Documents,                                                                                        // 33
        onEnter: authenticate                                                                                        // 33
      }),                                                                                                            // 33
      React.createElement(Route, {                                                                                   // 34
        name: "newDocument",                                                                                         // 34
        path: "/documents/new",                                                                                      // 34
        component: NewDocument,                                                                                      // 34
        onEnter: authenticate                                                                                        // 34
      }),                                                                                                            // 34
      React.createElement(Route, {                                                                                   // 35
        name: "editDocument",                                                                                        // 35
        path: "/documents/:_id/edit",                                                                                // 35
        component: EditDocument,                                                                                     // 35
        onEnter: authenticate                                                                                        // 35
      }),                                                                                                            // 35
      React.createElement(Route, {                                                                                   // 36
        name: "viewDocument",                                                                                        // 36
        path: "/documents/:_id",                                                                                     // 36
        component: ViewDocument,                                                                                     // 36
        onEnter: authenticate                                                                                        // 36
      }),                                                                                                            // 36
      React.createElement(Route, {                                                                                   // 37
        name: "login",                                                                                               // 37
        path: "/login",                                                                                              // 37
        component: Login                                                                                             // 37
      }),                                                                                                            // 37
      React.createElement(Route, {                                                                                   // 38
        name: "recover-password",                                                                                    // 38
        path: "/recover-password",                                                                                   // 38
        component: RecoverPassword                                                                                   // 38
      }),                                                                                                            // 38
      React.createElement(Route, {                                                                                   // 39
        name: "reset-password",                                                                                      // 39
        path: "/reset-password/:token",                                                                              // 39
        component: ResetPassword                                                                                     // 39
      }),                                                                                                            // 39
      React.createElement(Route, {                                                                                   // 40
        name: "signup",                                                                                              // 40
        path: "/signup",                                                                                             // 40
        component: Signup                                                                                            // 40
      }),                                                                                                            // 40
      React.createElement(Route, {                                                                                   // 41
        path: "*",                                                                                                   // 41
        component: NotFound                                                                                          // 41
      })                                                                                                             // 41
    )                                                                                                                // 31
  ), document.getElementById('react-root'));                                                                         // 30
});                                                                                                                  // 46
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"ui":{"components":{"AppNavigation.js":["react","react-bootstrap","react-router","./PublicNavigation.js","./AuthenticatedNavigation.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/AppNavigation.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Navbar = void 0;                                                                                                 // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Navbar": function (v) {                                                                                           // 1
    Navbar = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Link = void 0;                                                                                                   // 1
module.import('react-router', {                                                                                      // 1
  "Link": function (v) {                                                                                             // 1
    Link = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var PublicNavigation = void 0;                                                                                       // 1
module.import('./PublicNavigation.js', {                                                                             // 1
  "default": function (v) {                                                                                          // 1
    PublicNavigation = v;                                                                                            // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var AuthenticatedNavigation = void 0;                                                                                // 1
module.import('./AuthenticatedNavigation.js', {                                                                      // 1
  "default": function (v) {                                                                                          // 1
    AuthenticatedNavigation = v;                                                                                     // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var renderNavigation = function (hasUser) {                                                                          // 7
  return hasUser ? React.createElement(AuthenticatedNavigation, null) : React.createElement(PublicNavigation, null);
};                                                                                                                   // 7
                                                                                                                     //
var AppNavigation = function (_ref) {                                                                                // 9
  var hasUser = _ref.hasUser;                                                                                        // 9
  return React.createElement(                                                                                        // 9
    Navbar,                                                                                                          // 10
    null,                                                                                                            // 10
    React.createElement(                                                                                             // 11
      Navbar.Header,                                                                                                 // 11
      null,                                                                                                          // 11
      React.createElement(                                                                                           // 12
        Navbar.Brand,                                                                                                // 12
        null,                                                                                                        // 12
        React.createElement(                                                                                         // 13
          Link,                                                                                                      // 13
          {                                                                                                          // 13
            to: "/"                                                                                                  // 13
          },                                                                                                         // 13
          "Application Name"                                                                                         // 13
        )                                                                                                            // 13
      ),                                                                                                             // 12
      React.createElement(Navbar.Toggle, null)                                                                       // 15
    ),                                                                                                               // 11
    React.createElement(                                                                                             // 17
      Navbar.Collapse,                                                                                               // 17
      null,                                                                                                          // 17
      renderNavigation(hasUser)                                                                                      // 18
    )                                                                                                                // 17
  );                                                                                                                 // 10
};                                                                                                                   // 9
                                                                                                                     //
AppNavigation.propTypes = {                                                                                          // 23
  hasUser: React.PropTypes.object                                                                                    // 24
};                                                                                                                   // 23
module.export("default", exports.default = AppNavigation);                                                           // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"AuthenticatedNavigation.js":["react","react-router","react-router-bootstrap","react-bootstrap","meteor/meteor",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/AuthenticatedNavigation.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var browserHistory = void 0;                                                                                         // 1
module.import('react-router', {                                                                                      // 1
  "browserHistory": function (v) {                                                                                   // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var LinkContainer = void 0;                                                                                          // 1
module.import('react-router-bootstrap', {                                                                            // 1
  "LinkContainer": function (v) {                                                                                    // 1
    LinkContainer = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Nav = void 0,                                                                                                    // 1
    NavItem = void 0,                                                                                                // 1
    NavDropdown = void 0,                                                                                            // 1
    MenuItem = void 0;                                                                                               // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Nav": function (v) {                                                                                              // 1
    Nav = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "NavItem": function (v) {                                                                                          // 1
    NavItem = v;                                                                                                     // 1
  },                                                                                                                 // 1
  "NavDropdown": function (v) {                                                                                      // 1
    NavDropdown = v;                                                                                                 // 1
  },                                                                                                                 // 1
  "MenuItem": function (v) {                                                                                         // 1
    MenuItem = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.import('meteor/meteor', {                                                                                     // 1
  "Meteor": function (v) {                                                                                           // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var handleLogout = function () {                                                                                     // 7
  return Meteor.logout(function () {                                                                                 // 7
    return browserHistory.push('/login');                                                                            // 7
  });                                                                                                                // 7
};                                                                                                                   // 7
                                                                                                                     //
var userName = function () {                                                                                         // 9
  var user = Meteor.user();                                                                                          // 10
  var name = user && user.profile ? user.profile.name : '';                                                          // 11
  return user ? name.first + " " + name.last : '';                                                                   // 12
};                                                                                                                   // 13
                                                                                                                     //
var AuthenticatedNavigation = function () {                                                                          // 15
  return React.createElement(                                                                                        // 15
    "div",                                                                                                           // 16
    null,                                                                                                            // 16
    React.createElement(                                                                                             // 17
      Nav,                                                                                                           // 17
      null,                                                                                                          // 17
      React.createElement(                                                                                           // 18
        LinkContainer,                                                                                               // 18
        {                                                                                                            // 18
          to: "/documents"                                                                                           // 18
        },                                                                                                           // 18
        React.createElement(                                                                                         // 19
          NavItem,                                                                                                   // 19
          {                                                                                                          // 19
            eventKey: 2,                                                                                             // 19
            href: "/documents"                                                                                       // 19
          },                                                                                                         // 19
          "Documents"                                                                                                // 19
        )                                                                                                            // 19
      )                                                                                                              // 18
    ),                                                                                                               // 17
    React.createElement(                                                                                             // 22
      Nav,                                                                                                           // 22
      {                                                                                                              // 22
        pullRight: true                                                                                              // 22
      },                                                                                                             // 22
      React.createElement(                                                                                           // 23
        NavDropdown,                                                                                                 // 23
        {                                                                                                            // 23
          eventKey: 3,                                                                                               // 23
          title: userName(),                                                                                         // 23
          id: "basic-nav-dropdown"                                                                                   // 23
        },                                                                                                           // 23
        React.createElement(                                                                                         // 24
          MenuItem,                                                                                                  // 24
          {                                                                                                          // 24
            eventKey: 3.1,                                                                                           // 24
            onClick: handleLogout                                                                                    // 24
          },                                                                                                         // 24
          "Logout"                                                                                                   // 24
        )                                                                                                            // 24
      )                                                                                                              // 23
    )                                                                                                                // 22
  );                                                                                                                 // 16
};                                                                                                                   // 15
                                                                                                                     //
module.export("default", exports.default = AuthenticatedNavigation);                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"DocumentEditor.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-bootstrap","../../modules/document-editor.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/DocumentEditor.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return DocumentEditor;                                                                                           // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var FormGroup = void 0,                                                                                              // 1
    ControlLabel = void 0,                                                                                           // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.import('react-bootstrap', {                                                                                   // 1
  "FormGroup": function (v) {                                                                                        // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  "ControlLabel": function (v) {                                                                                     // 1
    ControlLabel = v;                                                                                                // 1
  },                                                                                                                 // 1
  "FormControl": function (v) {                                                                                      // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  "Button": function (v) {                                                                                           // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var documentEditor = void 0;                                                                                         // 1
module.import('../../modules/document-editor.js', {                                                                  // 1
  "default": function (v) {                                                                                          // 1
    documentEditor = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var DocumentEditor = function (_React$Component) {                                                                   //
  (0, _inherits3.default)(DocumentEditor, _React$Component);                                                         //
                                                                                                                     //
  function DocumentEditor() {                                                                                        //
    (0, _classCallCheck3.default)(this, DocumentEditor);                                                             //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  DocumentEditor.prototype.componentDidMount = function () {                                                         //
    function componentDidMount() {                                                                                   //
      documentEditor({                                                                                               // 9
        component: this                                                                                              // 9
      });                                                                                                            // 9
      setTimeout(function () {                                                                                       // 10
        document.querySelector('[name="title"]').focus();                                                            // 10
      }, 0);                                                                                                         // 10
    }                                                                                                                // 11
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  DocumentEditor.prototype.render = function () {                                                                    //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 13
                                                                                                                     //
      var doc = this.props.doc;                                                                                      // 13
      return React.createElement(                                                                                    // 15
        "form",                                                                                                      // 15
        {                                                                                                            // 15
          ref: function (form) {                                                                                     // 16
            return _this2.documentEditorForm = form;                                                                 // 16
          },                                                                                                         // 16
          onSubmit: function (event) {                                                                               // 17
            return event.preventDefault();                                                                           // 17
          }                                                                                                          // 17
        },                                                                                                           // 15
        React.createElement(                                                                                         // 19
          FormGroup,                                                                                                 // 19
          null,                                                                                                      // 19
          React.createElement(                                                                                       // 20
            ControlLabel,                                                                                            // 20
            null,                                                                                                    // 20
            "Title"                                                                                                  // 20
          ),                                                                                                         // 20
          React.createElement(FormControl, {                                                                         // 21
            type: "text",                                                                                            // 22
            name: "title",                                                                                           // 23
            defaultValue: doc && doc.title,                                                                          // 24
            placeholder: "Oh, The Places You'll Go!"                                                                 // 25
          })                                                                                                         // 21
        ),                                                                                                           // 19
        React.createElement(                                                                                         // 28
          FormGroup,                                                                                                 // 28
          null,                                                                                                      // 28
          React.createElement(                                                                                       // 29
            ControlLabel,                                                                                            // 29
            null,                                                                                                    // 29
            "Body"                                                                                                   // 29
          ),                                                                                                         // 29
          React.createElement(FormControl, {                                                                         // 30
            componentClass: "textarea",                                                                              // 31
            name: "body",                                                                                            // 32
            defaultValue: doc && doc.body,                                                                           // 33
            placeholder: "Congratulations! Today is your day. You're off to Great Places! You're off and away!"      // 34
          })                                                                                                         // 30
        ),                                                                                                           // 28
        React.createElement(                                                                                         // 37
          Button,                                                                                                    // 37
          {                                                                                                          // 37
            type: "submit",                                                                                          // 37
            bsStyle: "success"                                                                                       // 37
          },                                                                                                         // 37
          doc && doc._id ? 'Save Changes' : 'Add Document'                                                           // 38
        )                                                                                                            // 37
      );                                                                                                             // 15
    }                                                                                                                // 41
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return DocumentEditor;                                                                                             //
}(React.Component);                                                                                                  //
                                                                                                                     //
DocumentEditor.propTypes = {                                                                                         // 44
  doc: React.PropTypes.object                                                                                        // 45
};                                                                                                                   // 44
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"DocumentsList.js":["react","react-router","react-bootstrap",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/DocumentsList.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var browserHistory = void 0;                                                                                         // 1
module.import('react-router', {                                                                                      // 1
  "browserHistory": function (v) {                                                                                   // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var ListGroup = void 0,                                                                                              // 1
    ListGroupItem = void 0,                                                                                          // 1
    Alert = void 0;                                                                                                  // 1
module.import('react-bootstrap', {                                                                                   // 1
  "ListGroup": function (v) {                                                                                        // 1
    ListGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  "ListGroupItem": function (v) {                                                                                    // 1
    ListGroupItem = v;                                                                                               // 1
  },                                                                                                                 // 1
  "Alert": function (v) {                                                                                            // 1
    Alert = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var handleNav = function (_id) {                                                                                     // 5
  browserHistory.push("/documents/" + _id);                                                                          // 6
};                                                                                                                   // 7
                                                                                                                     //
var DocumentsList = function (_ref) {                                                                                // 9
  var documents = _ref.documents;                                                                                    // 9
  return documents.length > 0 ? React.createElement(                                                                 // 9
    ListGroup,                                                                                                       // 10
    {                                                                                                                // 10
      className: "DocumentsList"                                                                                     // 10
    },                                                                                                               // 10
    documents.map(function (_ref2) {                                                                                 // 11
      var _id = _ref2._id,                                                                                           // 11
          title = _ref2.title;                                                                                       // 11
      return React.createElement(                                                                                    // 11
        ListGroupItem,                                                                                               // 12
        {                                                                                                            // 12
          key: _id,                                                                                                  // 12
          onClick: function () {                                                                                     // 12
            return handleNav(_id);                                                                                   // 12
          }                                                                                                          // 12
        },                                                                                                           // 12
        title                                                                                                        // 13
      );                                                                                                             // 12
    })                                                                                                               // 11
  ) : React.createElement(                                                                                           // 10
    Alert,                                                                                                           // 17
    {                                                                                                                // 17
      bsStyle: "warning"                                                                                             // 17
    },                                                                                                               // 17
    "No documents yet."                                                                                              // 17
  );                                                                                                                 // 17
};                                                                                                                   // 9
                                                                                                                     //
DocumentsList.propTypes = {                                                                                          // 20
  documents: React.PropTypes.array                                                                                   // 21
};                                                                                                                   // 20
module.export("default", exports.default = DocumentsList);                                                           // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"Loading.js":["react",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/Loading.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
                                                                                                                     //
var Loading = function () {                                                                                          // 3
  return React.createElement(                                                                                        // 3
    "svg",                                                                                                           // 4
    {                                                                                                                // 4
      version: "1.1",                                                                                                // 5
      className: "Loading",                                                                                          // 6
      xmlns: "http://www.w3.org/2000/svg",                                                                           // 7
      x: "0px",                                                                                                      // 8
      y: "0px",                                                                                                      // 9
      width: "40px",                                                                                                 // 10
      height: "40px",                                                                                                // 11
      viewBox: "0 0 40 40",                                                                                          // 12
      enableBackground: "new 0 0 40 40"                                                                              // 13
    },                                                                                                               // 4
    React.createElement("path", {                                                                                    // 14
      opacity: "1.0",                                                                                                // 15
      fill: "#eee",                                                                                                  // 16
      d: "M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946, 14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201, 5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425, 5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834, 26.541,26.626,31.749,20.201,31.749z"
    }),                                                                                                              // 14
    React.createElement("path", {                                                                                    // 22
      fill: "#da5347",                                                                                               // 23
      d: "M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"
    })                                                                                                               // 22
  );                                                                                                                 // 4
};                                                                                                                   // 3
                                                                                                                     //
module.export("default", exports.default = Loading);                                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"PublicNavigation.js":["react","react-router-bootstrap","react-bootstrap",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/components/PublicNavigation.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var LinkContainer = void 0;                                                                                          // 1
module.import('react-router-bootstrap', {                                                                            // 1
  "LinkContainer": function (v) {                                                                                    // 1
    LinkContainer = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Nav = void 0,                                                                                                    // 1
    NavItem = void 0;                                                                                                // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Nav": function (v) {                                                                                              // 1
    Nav = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "NavItem": function (v) {                                                                                          // 1
    NavItem = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var PublicNavigation = function () {                                                                                 // 5
  return React.createElement(                                                                                        // 5
    Nav,                                                                                                             // 6
    {                                                                                                                // 6
      pullRight: true                                                                                                // 6
    },                                                                                                               // 6
    React.createElement(                                                                                             // 7
      LinkContainer,                                                                                                 // 7
      {                                                                                                              // 7
        to: "signup"                                                                                                 // 7
      },                                                                                                             // 7
      React.createElement(                                                                                           // 8
        NavItem,                                                                                                     // 8
        {                                                                                                            // 8
          eventKey: 1,                                                                                               // 8
          href: "/signup"                                                                                            // 8
        },                                                                                                           // 8
        "Sign Up"                                                                                                    // 8
      )                                                                                                              // 8
    ),                                                                                                               // 7
    React.createElement(                                                                                             // 10
      LinkContainer,                                                                                                 // 10
      {                                                                                                              // 10
        to: "login"                                                                                                  // 10
      },                                                                                                             // 10
      React.createElement(                                                                                           // 11
        NavItem,                                                                                                     // 11
        {                                                                                                            // 11
          eventKey: 2,                                                                                               // 11
          href: "/login"                                                                                             // 11
        },                                                                                                           // 11
        "Log In"                                                                                                     // 11
      )                                                                                                              // 11
    )                                                                                                                // 10
  );                                                                                                                 // 6
};                                                                                                                   // 5
                                                                                                                     //
module.export("default", exports.default = PublicNavigation);                                                        // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"containers":{"AppNavigation.js":["react-komposer","meteor/meteor","../components/AppNavigation.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/containers/AppNavigation.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var composeWithTracker = void 0;                                                                                     // 1
module.import('react-komposer', {                                                                                    // 1
  "composeWithTracker": function (v) {                                                                               // 1
    composeWithTracker = v;                                                                                          // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.import('meteor/meteor', {                                                                                     // 1
  "Meteor": function (v) {                                                                                           // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var AppNavigation = void 0;                                                                                          // 1
module.import('../components/AppNavigation.js', {                                                                    // 1
  "default": function (v) {                                                                                          // 1
    AppNavigation = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var composer = function (props, onData) {                                                                            // 5
  return onData(null, {                                                                                              // 5
    hasUser: Meteor.user()                                                                                           // 5
  });                                                                                                                // 5
};                                                                                                                   // 5
                                                                                                                     //
module.export("default", exports.default = composeWithTracker(composer, {}, {}, {                                    // 1
  pure: false                                                                                                        // 7
})(AppNavigation));                                                                                                  // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"DocumentsList.js":["react-komposer","meteor/meteor","../../api/documents/documents.js","../components/DocumentsList.js","../components/Loading.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/containers/DocumentsList.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var composeWithTracker = void 0;                                                                                     // 1
module.import('react-komposer', {                                                                                    // 1
  "composeWithTracker": function (v) {                                                                               // 1
    composeWithTracker = v;                                                                                          // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.import('meteor/meteor', {                                                                                     // 1
  "Meteor": function (v) {                                                                                           // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.import('../../api/documents/documents.js', {                                                                  // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var DocumentsList = void 0;                                                                                          // 1
module.import('../components/DocumentsList.js', {                                                                    // 1
  "default": function (v) {                                                                                          // 1
    DocumentsList = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var Loading = void 0;                                                                                                // 1
module.import('../components/Loading.js', {                                                                          // 1
  "default": function (v) {                                                                                          // 1
    Loading = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var composer = function (params, onData) {                                                                           // 7
  var subscription = Meteor.subscribe('documents.list');                                                             // 8
                                                                                                                     //
  if (subscription.ready()) {                                                                                        // 9
    var documents = Documents.find().fetch();                                                                        // 10
    onData(null, {                                                                                                   // 11
      documents: documents                                                                                           // 11
    });                                                                                                              // 11
  }                                                                                                                  // 12
};                                                                                                                   // 13
                                                                                                                     //
module.export("default", exports.default = composeWithTracker(composer, Loading)(DocumentsList));                    // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"EditDocument.js":["meteor/meteor","react-komposer","../../api/documents/documents.js","../pages/EditDocument.js","../components/Loading.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/containers/EditDocument.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.import('meteor/meteor', {                                                                                     // 1
  "Meteor": function (v) {                                                                                           // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var composeWithTracker = void 0;                                                                                     // 1
module.import('react-komposer', {                                                                                    // 1
  "composeWithTracker": function (v) {                                                                               // 1
    composeWithTracker = v;                                                                                          // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.import('../../api/documents/documents.js', {                                                                  // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var EditDocument = void 0;                                                                                           // 1
module.import('../pages/EditDocument.js', {                                                                          // 1
  "default": function (v) {                                                                                          // 1
    EditDocument = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var Loading = void 0;                                                                                                // 1
module.import('../components/Loading.js', {                                                                          // 1
  "default": function (v) {                                                                                          // 1
    Loading = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var composer = function (_ref, onData) {                                                                             // 7
  var params = _ref.params;                                                                                          // 7
  var subscription = Meteor.subscribe('documents.view', params._id);                                                 // 8
                                                                                                                     //
  if (subscription.ready()) {                                                                                        // 10
    var doc = Documents.findOne(params._id);                                                                         // 11
    onData(null, {                                                                                                   // 12
      doc: doc                                                                                                       // 12
    });                                                                                                              // 12
  }                                                                                                                  // 13
};                                                                                                                   // 14
                                                                                                                     //
module.export("default", exports.default = composeWithTracker(composer, Loading)(EditDocument));                     // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ViewDocument.js":["meteor/meteor","react-komposer","../../api/documents/documents.js","../pages/ViewDocument.js","../components/Loading.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/containers/ViewDocument.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.import('meteor/meteor', {                                                                                     // 1
  "Meteor": function (v) {                                                                                           // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var composeWithTracker = void 0;                                                                                     // 1
module.import('react-komposer', {                                                                                    // 1
  "composeWithTracker": function (v) {                                                                               // 1
    composeWithTracker = v;                                                                                          // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Documents = void 0;                                                                                              // 1
module.import('../../api/documents/documents.js', {                                                                  // 1
  "default": function (v) {                                                                                          // 1
    Documents = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var ViewDocument = void 0;                                                                                           // 1
module.import('../pages/ViewDocument.js', {                                                                          // 1
  "default": function (v) {                                                                                          // 1
    ViewDocument = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var Loading = void 0;                                                                                                // 1
module.import('../components/Loading.js', {                                                                          // 1
  "default": function (v) {                                                                                          // 1
    Loading = v;                                                                                                     // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var composer = function (_ref, onData) {                                                                             // 7
  var params = _ref.params;                                                                                          // 7
  var subscription = Meteor.subscribe('documents.view', params._id);                                                 // 8
                                                                                                                     //
  if (subscription.ready()) {                                                                                        // 10
    var doc = Documents.findOne(params._id);                                                                         // 11
    onData(null, {                                                                                                   // 12
      doc: doc                                                                                                       // 12
    });                                                                                                              // 12
  }                                                                                                                  // 13
};                                                                                                                   // 14
                                                                                                                     //
module.export("default", exports.default = composeWithTracker(composer, Loading)(ViewDocument));                     // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"layouts":{"App.js":["react","react-bootstrap","../containers/AppNavigation.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/layouts/App.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Grid = void 0;                                                                                                   // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Grid": function (v) {                                                                                             // 1
    Grid = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var AppNavigation = void 0;                                                                                          // 1
module.import('../containers/AppNavigation.js', {                                                                    // 1
  "default": function (v) {                                                                                          // 1
    AppNavigation = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var App = function (_ref) {                                                                                          // 5
  var children = _ref.children;                                                                                      // 5
  return React.createElement(                                                                                        // 5
    "div",                                                                                                           // 6
    null,                                                                                                            // 6
    React.createElement(AppNavigation, null),                                                                        // 7
    React.createElement(                                                                                             // 8
      Grid,                                                                                                          // 8
      null,                                                                                                          // 8
      children                                                                                                       // 9
    )                                                                                                                // 8
  );                                                                                                                 // 6
};                                                                                                                   // 5
                                                                                                                     //
App.propTypes = {                                                                                                    // 14
  children: React.PropTypes.node                                                                                     // 15
};                                                                                                                   // 14
module.export("default", exports.default = App);                                                                     // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"pages":{"Documents.js":["react","react-router","react-bootstrap","../containers/DocumentsList.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/Documents.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Link = void 0;                                                                                                   // 1
module.import('react-router', {                                                                                      // 1
  "Link": function (v) {                                                                                             // 1
    Link = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Button = void 0;                                                                                                 // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Row": function (v) {                                                                                              // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "Col": function (v) {                                                                                              // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "Button": function (v) {                                                                                           // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var DocumentsList = void 0;                                                                                          // 1
module.import('../containers/DocumentsList.js', {                                                                    // 1
  "default": function (v) {                                                                                          // 1
    DocumentsList = v;                                                                                               // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var Documents = function () {                                                                                        // 6
  return React.createElement(                                                                                        // 6
    "div",                                                                                                           // 7
    {                                                                                                                // 7
      className: "Documents"                                                                                         // 7
    },                                                                                                               // 7
    React.createElement(                                                                                             // 8
      Row,                                                                                                           // 8
      null,                                                                                                          // 8
      React.createElement(                                                                                           // 9
        Col,                                                                                                         // 9
        {                                                                                                            // 9
          xs: 12                                                                                                     // 9
        },                                                                                                           // 9
        React.createElement(                                                                                         // 10
          "div",                                                                                                     // 10
          {                                                                                                          // 10
            className: "page-header clearfix"                                                                        // 10
          },                                                                                                         // 10
          React.createElement(                                                                                       // 11
            "h4",                                                                                                    // 11
            {                                                                                                        // 11
              className: "pull-left"                                                                                 // 11
            },                                                                                                       // 11
            "Documents"                                                                                              // 11
          ),                                                                                                         // 11
          React.createElement(                                                                                       // 12
            Link,                                                                                                    // 12
            {                                                                                                        // 12
              to: "/documents/new"                                                                                   // 12
            },                                                                                                       // 12
            React.createElement(                                                                                     // 13
              Button,                                                                                                // 13
              {                                                                                                      // 13
                bsStyle: "success",                                                                                  // 14
                className: "pull-right"                                                                              // 15
              },                                                                                                     // 13
              "New Document"                                                                                         // 13
            )                                                                                                        // 13
          )                                                                                                          // 12
        ),                                                                                                           // 10
        React.createElement(DocumentsList, null)                                                                     // 19
      )                                                                                                              // 9
    )                                                                                                                // 8
  );                                                                                                                 // 7
};                                                                                                                   // 6
                                                                                                                     //
module.export("default", exports.default = Documents);                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"EditDocument.js":["react","../components/DocumentEditor","./NotFound",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/EditDocument.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var DocumentEditor = void 0;                                                                                         // 1
module.import('../components/DocumentEditor', {                                                                      // 1
  "default": function (v) {                                                                                          // 1
    DocumentEditor = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var NotFound = void 0;                                                                                               // 1
module.import('./NotFound', {                                                                                        // 1
  "default": function (v) {                                                                                          // 1
    NotFound = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var EditDocument = function (_ref) {                                                                                 // 5
  var doc = _ref.doc;                                                                                                // 5
  return doc ? React.createElement(                                                                                  // 6
    "div",                                                                                                           // 7
    {                                                                                                                // 7
      className: "EditDocument"                                                                                      // 7
    },                                                                                                               // 7
    React.createElement(                                                                                             // 8
      "h4",                                                                                                          // 8
      {                                                                                                              // 8
        className: "page-header"                                                                                     // 8
      },                                                                                                             // 8
      "Editing \"",                                                                                                  // 8
      doc.title,                                                                                                     // 8
      "\""                                                                                                           // 8
    ),                                                                                                               // 8
    React.createElement(DocumentEditor, {                                                                            // 9
      doc: doc                                                                                                       // 9
    })                                                                                                               // 9
  ) : React.createElement(NotFound, null);                                                                           // 7
};                                                                                                                   // 12
                                                                                                                     //
EditDocument.propTypes = {                                                                                           // 14
  doc: React.PropTypes.object                                                                                        // 15
};                                                                                                                   // 14
module.export("default", exports.default = EditDocument);                                                            // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"Index.js":["react","react-bootstrap",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/Index.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Jumbotron = void 0;                                                                                              // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Jumbotron": function (v) {                                                                                        // 1
    Jumbotron = v;                                                                                                   // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
                                                                                                                     //
var Index = function () {                                                                                            // 4
  return React.createElement(                                                                                        // 4
    "div",                                                                                                           // 5
    {                                                                                                                // 5
      className: "Index"                                                                                             // 5
    },                                                                                                               // 5
    React.createElement(                                                                                             // 6
      Jumbotron,                                                                                                     // 6
      {                                                                                                              // 6
        className: "text-center"                                                                                     // 6
      },                                                                                                             // 6
      React.createElement(                                                                                           // 7
        "h2",                                                                                                        // 7
        null,                                                                                                        // 7
        "Base"                                                                                                       // 7
      ),                                                                                                             // 7
      React.createElement(                                                                                           // 8
        "p",                                                                                                         // 8
        null,                                                                                                        // 8
        "A starting point for Meteor applications."                                                                  // 8
      ),                                                                                                             // 8
      React.createElement(                                                                                           // 9
        "p",                                                                                                         // 9
        null,                                                                                                        // 9
        React.createElement(                                                                                         // 9
          "a",                                                                                                       // 9
          {                                                                                                          // 9
            className: "btn btn-success",                                                                            // 9
            href: "https://themeteorchef.com/base",                                                                  // 9
            role: "button"                                                                                           // 9
          },                                                                                                         // 9
          "Read the Documentation"                                                                                   // 9
        )                                                                                                            // 9
      ),                                                                                                             // 9
      React.createElement(                                                                                           // 10
        "p",                                                                                                         // 10
        {                                                                                                            // 10
          style: {                                                                                                   // 10
            fontSize: '16px',                                                                                        // 10
            color: '#aaa'                                                                                            // 10
          }                                                                                                          // 10
        },                                                                                                           // 10
        "Currently at v4.14.0"                                                                                       // 10
      )                                                                                                              // 10
    )                                                                                                                // 6
  );                                                                                                                 // 5
};                                                                                                                   // 4
                                                                                                                     //
module.export("default", exports.default = Index);                                                                   // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"Login.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-router","react-bootstrap","../../modules/login",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/Login.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return Login;                                                                                                    // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Link = void 0;                                                                                                   // 1
module.import('react-router', {                                                                                      // 1
  "Link": function (v) {                                                                                             // 1
    Link = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    FormGroup = void 0,                                                                                              // 1
    ControlLabel = void 0,                                                                                           // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Row": function (v) {                                                                                              // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "Col": function (v) {                                                                                              // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "FormGroup": function (v) {                                                                                        // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  "ControlLabel": function (v) {                                                                                     // 1
    ControlLabel = v;                                                                                                // 1
  },                                                                                                                 // 1
  "FormControl": function (v) {                                                                                      // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  "Button": function (v) {                                                                                           // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var handleLogin = void 0;                                                                                            // 1
module.import('../../modules/login', {                                                                               // 1
  "default": function (v) {                                                                                          // 1
    handleLogin = v;                                                                                                 // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var Login = function (_React$Component) {                                                                            //
  (0, _inherits3.default)(Login, _React$Component);                                                                  //
                                                                                                                     //
  function Login() {                                                                                                 //
    (0, _classCallCheck3.default)(this, Login);                                                                      //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  Login.prototype.componentDidMount = function () {                                                                  //
    function componentDidMount() {                                                                                   //
      handleLogin({                                                                                                  // 8
        component: this                                                                                              // 8
      });                                                                                                            // 8
    }                                                                                                                // 9
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  Login.prototype.handleSubmit = function () {                                                                       //
    function handleSubmit(event) {                                                                                   //
      event.preventDefault();                                                                                        // 12
    }                                                                                                                // 13
                                                                                                                     //
    return handleSubmit;                                                                                             //
  }();                                                                                                               //
                                                                                                                     //
  Login.prototype.render = function () {                                                                             //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 15
                                                                                                                     //
      return React.createElement(                                                                                    // 16
        "div",                                                                                                       // 17
        {                                                                                                            // 17
          className: "Login"                                                                                         // 17
        },                                                                                                           // 17
        React.createElement(                                                                                         // 18
          Row,                                                                                                       // 18
          null,                                                                                                      // 18
          React.createElement(                                                                                       // 19
            Col,                                                                                                     // 19
            {                                                                                                        // 19
              xs: 12,                                                                                                // 19
              sm: 6,                                                                                                 // 19
              md: 4                                                                                                  // 19
            },                                                                                                       // 19
            React.createElement(                                                                                     // 20
              "h4",                                                                                                  // 20
              {                                                                                                      // 20
                className: "page-header"                                                                             // 20
              },                                                                                                     // 20
              "Login"                                                                                                // 20
            ),                                                                                                       // 20
            React.createElement(                                                                                     // 21
              "form",                                                                                                // 21
              {                                                                                                      // 21
                ref: function (form) {                                                                               // 22
                  return _this2.loginForm = form;                                                                    // 22
                },                                                                                                   // 22
                className: "login",                                                                                  // 23
                onSubmit: this.handleSubmit                                                                          // 24
              },                                                                                                     // 21
              React.createElement(                                                                                   // 26
                FormGroup,                                                                                           // 26
                null,                                                                                                // 26
                React.createElement(                                                                                 // 27
                  ControlLabel,                                                                                      // 27
                  null,                                                                                              // 27
                  "Email Address"                                                                                    // 27
                ),                                                                                                   // 27
                React.createElement(FormControl, {                                                                   // 28
                  type: "email",                                                                                     // 29
                  ref: "emailAddress",                                                                               // 30
                  name: "emailAddress",                                                                              // 31
                  placeholder: "Email Address"                                                                       // 32
                })                                                                                                   // 28
              ),                                                                                                     // 26
              React.createElement(                                                                                   // 35
                FormGroup,                                                                                           // 35
                null,                                                                                                // 35
                React.createElement(                                                                                 // 36
                  ControlLabel,                                                                                      // 36
                  null,                                                                                              // 36
                  React.createElement(                                                                               // 37
                    "span",                                                                                          // 37
                    {                                                                                                // 37
                      className: "pull-left"                                                                         // 37
                    },                                                                                               // 37
                    "Password"                                                                                       // 37
                  ),                                                                                                 // 37
                  React.createElement(                                                                               // 38
                    Link,                                                                                            // 38
                    {                                                                                                // 38
                      className: "pull-right",                                                                       // 38
                      to: "/recover-password"                                                                        // 38
                    },                                                                                               // 38
                    "Forgot Password?"                                                                               // 38
                  )                                                                                                  // 38
                ),                                                                                                   // 36
                React.createElement(FormControl, {                                                                   // 40
                  type: "password",                                                                                  // 41
                  ref: "password",                                                                                   // 42
                  name: "password",                                                                                  // 43
                  placeholder: "Password"                                                                            // 44
                })                                                                                                   // 40
              ),                                                                                                     // 35
              React.createElement(                                                                                   // 47
                Button,                                                                                              // 47
                {                                                                                                    // 47
                  type: "submit",                                                                                    // 47
                  bsStyle: "success"                                                                                 // 47
                },                                                                                                   // 47
                "Login"                                                                                              // 47
              )                                                                                                      // 47
            )                                                                                                        // 21
          )                                                                                                          // 19
        )                                                                                                            // 18
      );                                                                                                             // 17
    }                                                                                                                // 53
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return Login;                                                                                                      //
}(React.Component);                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"NewDocument.js":["react","../components/DocumentEditor.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/NewDocument.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var DocumentEditor = void 0;                                                                                         // 1
module.import('../components/DocumentEditor.js', {                                                                   // 1
  "default": function (v) {                                                                                          // 1
    DocumentEditor = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
                                                                                                                     //
var NewDocument = function () {                                                                                      // 4
  return React.createElement(                                                                                        // 4
    "div",                                                                                                           // 5
    {                                                                                                                // 5
      className: "NewDocument"                                                                                       // 5
    },                                                                                                               // 5
    React.createElement(                                                                                             // 6
      "h4",                                                                                                          // 6
      {                                                                                                              // 6
        className: "page-header"                                                                                     // 6
      },                                                                                                             // 6
      "New Document"                                                                                                 // 6
    ),                                                                                                               // 6
    React.createElement(DocumentEditor, null)                                                                        // 7
  );                                                                                                                 // 5
};                                                                                                                   // 4
                                                                                                                     //
module.export("default", exports.default = NewDocument);                                                             // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"NotFound.js":["react","react-bootstrap",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/NotFound.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Alert = void 0;                                                                                                  // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Alert": function (v) {                                                                                            // 1
    Alert = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
                                                                                                                     //
var NotFound = function () {                                                                                         // 4
  return React.createElement(                                                                                        // 4
    "div",                                                                                                           // 5
    {                                                                                                                // 5
      className: "NotFound"                                                                                          // 5
    },                                                                                                               // 5
    React.createElement(                                                                                             // 6
      Alert,                                                                                                         // 6
      {                                                                                                              // 6
        bsStyle: "danger"                                                                                            // 6
      },                                                                                                             // 6
      React.createElement(                                                                                           // 7
        "p",                                                                                                         // 7
        null,                                                                                                        // 7
        React.createElement(                                                                                         // 7
          "strong",                                                                                                  // 7
          null,                                                                                                      // 7
          "Error [404]"                                                                                              // 7
        ),                                                                                                           // 7
        ": ",                                                                                                        // 7
        window.location.pathname,                                                                                    // 7
        " does not exist."                                                                                           // 7
      )                                                                                                              // 7
    )                                                                                                                // 6
  );                                                                                                                 // 5
};                                                                                                                   // 4
                                                                                                                     //
module.export("default", exports.default = NotFound);                                                                // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"RecoverPassword.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-bootstrap","../../modules/recover-password",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/RecoverPassword.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return RecoverPassword;                                                                                          // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Alert = void 0,                                                                                                  // 1
    FormGroup = void 0,                                                                                              // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Row": function (v) {                                                                                              // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "Col": function (v) {                                                                                              // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "Alert": function (v) {                                                                                            // 1
    Alert = v;                                                                                                       // 1
  },                                                                                                                 // 1
  "FormGroup": function (v) {                                                                                        // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  "FormControl": function (v) {                                                                                      // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  "Button": function (v) {                                                                                           // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var handleRecoverPassword = void 0;                                                                                  // 1
module.import('../../modules/recover-password', {                                                                    // 1
  "default": function (v) {                                                                                          // 1
    handleRecoverPassword = v;                                                                                       // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var RecoverPassword = function (_React$Component) {                                                                  //
  (0, _inherits3.default)(RecoverPassword, _React$Component);                                                        //
                                                                                                                     //
  function RecoverPassword() {                                                                                       //
    (0, _classCallCheck3.default)(this, RecoverPassword);                                                            //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  RecoverPassword.prototype.componentDidMount = function () {                                                        //
    function componentDidMount() {                                                                                   //
      handleRecoverPassword({                                                                                        // 7
        component: this                                                                                              // 7
      });                                                                                                            // 7
    }                                                                                                                // 8
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  RecoverPassword.prototype.handleSubmit = function () {                                                             //
    function handleSubmit(event) {                                                                                   //
      event.preventDefault();                                                                                        // 11
    }                                                                                                                // 12
                                                                                                                     //
    return handleSubmit;                                                                                             //
  }();                                                                                                               //
                                                                                                                     //
  RecoverPassword.prototype.render = function () {                                                                   //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 14
                                                                                                                     //
      return React.createElement(                                                                                    // 15
        "div",                                                                                                       // 16
        {                                                                                                            // 16
          className: "RecoverPassword"                                                                               // 16
        },                                                                                                           // 16
        React.createElement(                                                                                         // 17
          Row,                                                                                                       // 17
          null,                                                                                                      // 17
          React.createElement(                                                                                       // 18
            Col,                                                                                                     // 18
            {                                                                                                        // 18
              xs: 12,                                                                                                // 18
              sm: 6,                                                                                                 // 18
              md: 4                                                                                                  // 18
            },                                                                                                       // 18
            React.createElement(                                                                                     // 19
              "h4",                                                                                                  // 19
              {                                                                                                      // 19
                className: "page-header"                                                                             // 19
              },                                                                                                     // 19
              "Recover Password"                                                                                     // 19
            ),                                                                                                       // 19
            React.createElement(                                                                                     // 20
              Alert,                                                                                                 // 20
              {                                                                                                      // 20
                bsStyle: "info"                                                                                      // 20
              },                                                                                                     // 20
              "Enter your email address below to receive a link to reset your password."                             // 20
            ),                                                                                                       // 20
            React.createElement(                                                                                     // 23
              "form",                                                                                                // 23
              {                                                                                                      // 23
                ref: function (form) {                                                                               // 24
                  return _this2.recoverPasswordForm = form;                                                          // 24
                },                                                                                                   // 24
                className: "recover-password",                                                                       // 25
                onSubmit: this.handleSubmit                                                                          // 26
              },                                                                                                     // 23
              React.createElement(                                                                                   // 28
                FormGroup,                                                                                           // 28
                null,                                                                                                // 28
                React.createElement(FormControl, {                                                                   // 29
                  type: "email",                                                                                     // 30
                  ref: "emailAddress",                                                                               // 31
                  name: "emailAddress",                                                                              // 32
                  placeholder: "Email Address"                                                                       // 33
                })                                                                                                   // 29
              ),                                                                                                     // 28
              React.createElement(                                                                                   // 36
                Button,                                                                                              // 36
                {                                                                                                    // 36
                  type: "submit",                                                                                    // 36
                  bsStyle: "success"                                                                                 // 36
                },                                                                                                   // 36
                "Recover Password"                                                                                   // 36
              )                                                                                                      // 36
            )                                                                                                        // 23
          )                                                                                                          // 18
        )                                                                                                            // 17
      );                                                                                                             // 16
    }                                                                                                                // 42
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return RecoverPassword;                                                                                            //
}(React.Component);                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ResetPassword.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-bootstrap","../../modules/reset-password",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/ResetPassword.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return ResetPassword;                                                                                            // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Alert = void 0,                                                                                                  // 1
    FormGroup = void 0,                                                                                              // 1
    ControlLabel = void 0,                                                                                           // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Row": function (v) {                                                                                              // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "Col": function (v) {                                                                                              // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "Alert": function (v) {                                                                                            // 1
    Alert = v;                                                                                                       // 1
  },                                                                                                                 // 1
  "FormGroup": function (v) {                                                                                        // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  "ControlLabel": function (v) {                                                                                     // 1
    ControlLabel = v;                                                                                                // 1
  },                                                                                                                 // 1
  "FormControl": function (v) {                                                                                      // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  "Button": function (v) {                                                                                           // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var handleResetPassword = void 0;                                                                                    // 1
module.import('../../modules/reset-password', {                                                                      // 1
  "default": function (v) {                                                                                          // 1
    handleResetPassword = v;                                                                                         // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var ResetPassword = function (_React$Component) {                                                                    //
  (0, _inherits3.default)(ResetPassword, _React$Component);                                                          //
                                                                                                                     //
  function ResetPassword() {                                                                                         //
    (0, _classCallCheck3.default)(this, ResetPassword);                                                              //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  ResetPassword.prototype.componentDidMount = function () {                                                          //
    function componentDidMount() {                                                                                   //
      handleResetPassword({                                                                                          // 7
        component: this,                                                                                             // 7
        token: this.props.params.token                                                                               // 7
      });                                                                                                            // 7
    }                                                                                                                // 8
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  ResetPassword.prototype.handleSubmit = function () {                                                               //
    function handleSubmit(event) {                                                                                   //
      event.preventDefault();                                                                                        // 11
    }                                                                                                                // 12
                                                                                                                     //
    return handleSubmit;                                                                                             //
  }();                                                                                                               //
                                                                                                                     //
  ResetPassword.prototype.render = function () {                                                                     //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 14
                                                                                                                     //
      return React.createElement(                                                                                    // 15
        "div",                                                                                                       // 16
        {                                                                                                            // 16
          className: "ResetPassword"                                                                                 // 16
        },                                                                                                           // 16
        React.createElement(                                                                                         // 17
          Row,                                                                                                       // 17
          null,                                                                                                      // 17
          React.createElement(                                                                                       // 18
            Col,                                                                                                     // 18
            {                                                                                                        // 18
              xs: 12,                                                                                                // 18
              sm: 6,                                                                                                 // 18
              md: 4                                                                                                  // 18
            },                                                                                                       // 18
            React.createElement(                                                                                     // 19
              "h4",                                                                                                  // 19
              {                                                                                                      // 19
                className: "page-header"                                                                             // 19
              },                                                                                                     // 19
              "Reset Password"                                                                                       // 19
            ),                                                                                                       // 19
            React.createElement(                                                                                     // 20
              Alert,                                                                                                 // 20
              {                                                                                                      // 20
                bsStyle: "info"                                                                                      // 20
              },                                                                                                     // 20
              "To reset your password, enter a new one below. You will be logged in with your new password."         // 20
            ),                                                                                                       // 20
            React.createElement(                                                                                     // 24
              "form",                                                                                                // 24
              {                                                                                                      // 24
                ref: function (form) {                                                                               // 25
                  return _this2.resetPasswordForm = form;                                                            // 25
                },                                                                                                   // 25
                className: "reset-password",                                                                         // 26
                onSubmit: this.handleSubmit                                                                          // 27
              },                                                                                                     // 24
              React.createElement(                                                                                   // 29
                FormGroup,                                                                                           // 29
                null,                                                                                                // 29
                React.createElement(                                                                                 // 30
                  ControlLabel,                                                                                      // 30
                  null,                                                                                              // 30
                  "New Password"                                                                                     // 30
                ),                                                                                                   // 30
                React.createElement(FormControl, {                                                                   // 31
                  type: "password",                                                                                  // 32
                  ref: "newPassword",                                                                                // 33
                  name: "newPassword",                                                                               // 34
                  placeholder: "New Password"                                                                        // 35
                })                                                                                                   // 31
              ),                                                                                                     // 29
              React.createElement(                                                                                   // 38
                FormGroup,                                                                                           // 38
                null,                                                                                                // 38
                React.createElement(                                                                                 // 39
                  ControlLabel,                                                                                      // 39
                  null,                                                                                              // 39
                  "Repeat New Password"                                                                              // 39
                ),                                                                                                   // 39
                React.createElement(FormControl, {                                                                   // 40
                  type: "password",                                                                                  // 41
                  ref: "repeatNewPassword",                                                                          // 42
                  name: "repeatNewPassword",                                                                         // 43
                  placeholder: "Repeat New Password"                                                                 // 44
                })                                                                                                   // 40
              ),                                                                                                     // 38
              React.createElement(                                                                                   // 47
                Button,                                                                                              // 47
                {                                                                                                    // 47
                  type: "submit",                                                                                    // 47
                  bsStyle: "success"                                                                                 // 47
                },                                                                                                   // 47
                "Reset Password & Login"                                                                             // 47
              )                                                                                                      // 47
            )                                                                                                        // 24
          )                                                                                                          // 18
        )                                                                                                            // 17
      );                                                                                                             // 16
    }                                                                                                                // 53
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return ResetPassword;                                                                                              //
}(React.Component);                                                                                                  //
                                                                                                                     //
ResetPassword.propTypes = {                                                                                          // 56
  params: React.PropTypes.object                                                                                     // 57
};                                                                                                                   // 56
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"Signup.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-router","react-bootstrap","../../modules/signup",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/Signup.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return Signup;                                                                                                   // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Link = void 0;                                                                                                   // 1
module.import('react-router', {                                                                                      // 1
  "Link": function (v) {                                                                                             // 1
    Link = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    FormGroup = void 0,                                                                                              // 1
    ControlLabel = void 0,                                                                                           // 1
    FormControl = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.import('react-bootstrap', {                                                                                   // 1
  "Row": function (v) {                                                                                              // 1
    Row = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "Col": function (v) {                                                                                              // 1
    Col = v;                                                                                                         // 1
  },                                                                                                                 // 1
  "FormGroup": function (v) {                                                                                        // 1
    FormGroup = v;                                                                                                   // 1
  },                                                                                                                 // 1
  "ControlLabel": function (v) {                                                                                     // 1
    ControlLabel = v;                                                                                                // 1
  },                                                                                                                 // 1
  "FormControl": function (v) {                                                                                      // 1
    FormControl = v;                                                                                                 // 1
  },                                                                                                                 // 1
  "Button": function (v) {                                                                                           // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var handleSignup = void 0;                                                                                           // 1
module.import('../../modules/signup', {                                                                              // 1
  "default": function (v) {                                                                                          // 1
    handleSignup = v;                                                                                                // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var Signup = function (_React$Component) {                                                                           //
  (0, _inherits3.default)(Signup, _React$Component);                                                                 //
                                                                                                                     //
  function Signup() {                                                                                                //
    (0, _classCallCheck3.default)(this, Signup);                                                                     //
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));                  //
  }                                                                                                                  //
                                                                                                                     //
  Signup.prototype.componentDidMount = function () {                                                                 //
    function componentDidMount() {                                                                                   //
      handleSignup({                                                                                                 // 8
        component: this                                                                                              // 8
      });                                                                                                            // 8
    }                                                                                                                // 9
                                                                                                                     //
    return componentDidMount;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  Signup.prototype.handleSubmit = function () {                                                                      //
    function handleSubmit(event) {                                                                                   //
      event.preventDefault();                                                                                        // 12
    }                                                                                                                // 13
                                                                                                                     //
    return handleSubmit;                                                                                             //
  }();                                                                                                               //
                                                                                                                     //
  Signup.prototype.render = function () {                                                                            //
    function render() {                                                                                              //
      var _this2 = this;                                                                                             // 15
                                                                                                                     //
      return React.createElement(                                                                                    // 16
        "div",                                                                                                       // 17
        {                                                                                                            // 17
          className: "Signup"                                                                                        // 17
        },                                                                                                           // 17
        React.createElement(                                                                                         // 18
          Row,                                                                                                       // 18
          null,                                                                                                      // 18
          React.createElement(                                                                                       // 19
            Col,                                                                                                     // 19
            {                                                                                                        // 19
              xs: 12,                                                                                                // 19
              sm: 6,                                                                                                 // 19
              md: 4                                                                                                  // 19
            },                                                                                                       // 19
            React.createElement(                                                                                     // 20
              "h4",                                                                                                  // 20
              {                                                                                                      // 20
                className: "page-header"                                                                             // 20
              },                                                                                                     // 20
              "Sign Up"                                                                                              // 20
            ),                                                                                                       // 20
            React.createElement(                                                                                     // 21
              "form",                                                                                                // 21
              {                                                                                                      // 21
                ref: function (form) {                                                                               // 22
                  return _this2.signupForm = form;                                                                   // 22
                },                                                                                                   // 22
                onSubmit: this.handleSubmit                                                                          // 23
              },                                                                                                     // 21
              React.createElement(                                                                                   // 25
                Row,                                                                                                 // 25
                null,                                                                                                // 25
                React.createElement(                                                                                 // 26
                  Col,                                                                                               // 26
                  {                                                                                                  // 26
                    xs: 6,                                                                                           // 26
                    sm: 6                                                                                            // 26
                  },                                                                                                 // 26
                  React.createElement(                                                                               // 27
                    FormGroup,                                                                                       // 27
                    null,                                                                                            // 27
                    React.createElement(                                                                             // 28
                      ControlLabel,                                                                                  // 28
                      null,                                                                                          // 28
                      "First Name"                                                                                   // 28
                    ),                                                                                               // 28
                    React.createElement(FormControl, {                                                               // 29
                      type: "text",                                                                                  // 30
                      ref: "firstName",                                                                              // 31
                      name: "firstName",                                                                             // 32
                      placeholder: "First Name"                                                                      // 33
                    })                                                                                               // 29
                  )                                                                                                  // 27
                ),                                                                                                   // 26
                React.createElement(                                                                                 // 37
                  Col,                                                                                               // 37
                  {                                                                                                  // 37
                    xs: 6,                                                                                           // 37
                    sm: 6                                                                                            // 37
                  },                                                                                                 // 37
                  React.createElement(                                                                               // 38
                    FormGroup,                                                                                       // 38
                    null,                                                                                            // 38
                    React.createElement(                                                                             // 39
                      ControlLabel,                                                                                  // 39
                      null,                                                                                          // 39
                      "Last Name"                                                                                    // 39
                    ),                                                                                               // 39
                    React.createElement(FormControl, {                                                               // 40
                      type: "text",                                                                                  // 41
                      ref: "lastName",                                                                               // 42
                      name: "lastName",                                                                              // 43
                      placeholder: "Last Name"                                                                       // 44
                    })                                                                                               // 40
                  )                                                                                                  // 38
                )                                                                                                    // 37
              ),                                                                                                     // 25
              React.createElement(                                                                                   // 49
                FormGroup,                                                                                           // 49
                null,                                                                                                // 49
                React.createElement(                                                                                 // 50
                  ControlLabel,                                                                                      // 50
                  null,                                                                                              // 50
                  "Email Address"                                                                                    // 50
                ),                                                                                                   // 50
                React.createElement(FormControl, {                                                                   // 51
                  type: "text",                                                                                      // 52
                  ref: "emailAddress",                                                                               // 53
                  name: "emailAddress",                                                                              // 54
                  placeholder: "Email Address"                                                                       // 55
                })                                                                                                   // 51
              ),                                                                                                     // 49
              React.createElement(                                                                                   // 58
                FormGroup,                                                                                           // 58
                null,                                                                                                // 58
                React.createElement(                                                                                 // 59
                  ControlLabel,                                                                                      // 59
                  null,                                                                                              // 59
                  "Password"                                                                                         // 59
                ),                                                                                                   // 59
                React.createElement(FormControl, {                                                                   // 60
                  type: "password",                                                                                  // 61
                  ref: "password",                                                                                   // 62
                  name: "password",                                                                                  // 63
                  placeholder: "Password"                                                                            // 64
                })                                                                                                   // 60
              ),                                                                                                     // 58
              React.createElement(                                                                                   // 67
                Button,                                                                                              // 67
                {                                                                                                    // 67
                  type: "submit",                                                                                    // 67
                  bsStyle: "success"                                                                                 // 67
                },                                                                                                   // 67
                "Sign Up"                                                                                            // 67
              )                                                                                                      // 67
            ),                                                                                                       // 21
            React.createElement(                                                                                     // 69
              "p",                                                                                                   // 69
              null,                                                                                                  // 69
              "Already have an account? ",                                                                           // 69
              React.createElement(                                                                                   // 69
                Link,                                                                                                // 69
                {                                                                                                    // 69
                  to: "/login"                                                                                       // 69
                },                                                                                                   // 69
                "Log In"                                                                                             // 69
              ),                                                                                                     // 69
              "."                                                                                                    // 69
            )                                                                                                        // 69
          )                                                                                                          // 19
        )                                                                                                            // 18
      );                                                                                                             // 17
    }                                                                                                                // 74
                                                                                                                     //
    return render;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return Signup;                                                                                                     //
}(React.Component);                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ViewDocument.js":["react","react-bootstrap","react-router","meteor/themeteorchef:bert","../../api/documents/methods","./NotFound",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/pages/ViewDocument.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.import('react', {                                                                                             // 1
  "default": function (v) {                                                                                          // 1
    React = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var ButtonToolbar = void 0,                                                                                          // 1
    ButtonGroup = void 0,                                                                                            // 1
    Button = void 0;                                                                                                 // 1
module.import('react-bootstrap', {                                                                                   // 1
  "ButtonToolbar": function (v) {                                                                                    // 1
    ButtonToolbar = v;                                                                                               // 1
  },                                                                                                                 // 1
  "ButtonGroup": function (v) {                                                                                      // 1
    ButtonGroup = v;                                                                                                 // 1
  },                                                                                                                 // 1
  "Button": function (v) {                                                                                           // 1
    Button = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var browserHistory = void 0;                                                                                         // 1
module.import('react-router', {                                                                                      // 1
  "browserHistory": function (v) {                                                                                   // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.import('meteor/themeteorchef:bert', {                                                                         // 1
  "Bert": function (v) {                                                                                             // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 3);                                                                                                               // 1
var removeDocument = void 0;                                                                                         // 1
module.import('../../api/documents/methods', {                                                                       // 1
  "removeDocument": function (v) {                                                                                   // 1
    removeDocument = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 4);                                                                                                               // 1
var NotFound = void 0;                                                                                               // 1
module.import('./NotFound', {                                                                                        // 1
  "default": function (v) {                                                                                          // 1
    NotFound = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 5);                                                                                                               // 1
                                                                                                                     //
var handleEdit = function (_id) {                                                                                    // 8
  browserHistory.push("/documents/" + _id + "/edit");                                                                // 9
};                                                                                                                   // 10
                                                                                                                     //
var handleRemove = function (_id) {                                                                                  // 12
  if (confirm('Are you sure? This is permanent!')) {                                                                 // 13
    removeDocument.call({                                                                                            // 14
      _id: _id                                                                                                       // 14
    }, function (error) {                                                                                            // 14
      if (error) {                                                                                                   // 15
        Bert.alert(error.reason, 'danger');                                                                          // 16
      } else {                                                                                                       // 17
        Bert.alert('Document deleted!', 'success');                                                                  // 18
        browserHistory.push('/documents');                                                                           // 19
      }                                                                                                              // 20
    });                                                                                                              // 21
  }                                                                                                                  // 22
};                                                                                                                   // 23
                                                                                                                     //
var ViewDocument = function (_ref) {                                                                                 // 25
  var doc = _ref.doc;                                                                                                // 25
  return doc ? React.createElement(                                                                                  // 26
    "div",                                                                                                           // 27
    {                                                                                                                // 27
      className: "ViewDocument"                                                                                      // 27
    },                                                                                                               // 27
    React.createElement(                                                                                             // 28
      "div",                                                                                                         // 28
      {                                                                                                              // 28
        className: "page-header clearfix"                                                                            // 28
      },                                                                                                             // 28
      React.createElement(                                                                                           // 29
        "h4",                                                                                                        // 29
        {                                                                                                            // 29
          className: "pull-left"                                                                                     // 29
        },                                                                                                           // 29
        doc && doc.title                                                                                             // 29
      ),                                                                                                             // 29
      React.createElement(                                                                                           // 30
        ButtonToolbar,                                                                                               // 30
        {                                                                                                            // 30
          className: "pull-right"                                                                                    // 30
        },                                                                                                           // 30
        React.createElement(                                                                                         // 31
          ButtonGroup,                                                                                               // 31
          {                                                                                                          // 31
            bsSize: "small"                                                                                          // 31
          },                                                                                                         // 31
          React.createElement(                                                                                       // 32
            Button,                                                                                                  // 32
            {                                                                                                        // 32
              onClick: function () {                                                                                 // 32
                return handleEdit(doc._id);                                                                          // 32
              }                                                                                                      // 32
            },                                                                                                       // 32
            "Edit"                                                                                                   // 32
          ),                                                                                                         // 32
          React.createElement(                                                                                       // 33
            Button,                                                                                                  // 33
            {                                                                                                        // 33
              onClick: function () {                                                                                 // 33
                return handleRemove(doc._id);                                                                        // 33
              },                                                                                                     // 33
              className: "text-danger"                                                                               // 33
            },                                                                                                       // 33
            "Delete"                                                                                                 // 33
          )                                                                                                          // 33
        )                                                                                                            // 31
      )                                                                                                              // 30
    ),                                                                                                               // 28
    doc && doc.body                                                                                                  // 37
  ) : React.createElement(NotFound, null);                                                                           // 27
};                                                                                                                   // 40
                                                                                                                     //
ViewDocument.propTypes = {                                                                                           // 42
  doc: React.PropTypes.object                                                                                        // 43
};                                                                                                                   // 42
module.export("default", exports.default = ViewDocument);                                                            // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"modules":{"document-editor.js":["react-router","meteor/themeteorchef:bert","../api/documents/methods.js","./validation.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/document-editor.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return documentEditor;                                                                                           // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var browserHistory = void 0;                                                                                         // 1
module.import('react-router', {                                                                                      // 1
  "browserHistory": function (v) {                                                                                   // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.import('meteor/themeteorchef:bert', {                                                                         // 1
  "Bert": function (v) {                                                                                             // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var upsertDocument = void 0;                                                                                         // 1
module.import('../api/documents/methods.js', {                                                                       // 1
  "upsertDocument": function (v) {                                                                                   // 1
    upsertDocument = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
module.import('./validation.js');                                                                                    // 1
var component = void 0;                                                                                              // 8
                                                                                                                     //
var handleUpsert = function () {                                                                                     // 10
  var doc = component.props.doc;                                                                                     // 10
  var confirmation = doc && doc._id ? 'Document updated!' : 'Document added!';                                       // 12
  var upsert = {                                                                                                     // 13
    title: document.querySelector('[name="title"]').value.trim(),                                                    // 14
    body: document.querySelector('[name="body"]').value.trim()                                                       // 15
  };                                                                                                                 // 13
  if (doc && doc._id) upsert._id = doc._id;                                                                          // 18
  upsertDocument.call(upsert, function (error, response) {                                                           // 20
    if (error) {                                                                                                     // 21
      Bert.alert(error.reason, 'danger');                                                                            // 22
    } else {                                                                                                         // 23
      component.documentEditorForm.reset();                                                                          // 24
      Bert.alert(confirmation, 'success');                                                                           // 25
      browserHistory.push("/documents/" + (response.insertedId || doc._id));                                         // 26
    }                                                                                                                // 27
  });                                                                                                                // 28
};                                                                                                                   // 29
                                                                                                                     //
var validate = function () {                                                                                         // 31
  $(component.documentEditorForm).validate({                                                                         // 32
    rules: {                                                                                                         // 33
      title: {                                                                                                       // 34
        required: true                                                                                               // 35
      },                                                                                                             // 34
      body: {                                                                                                        // 37
        required: true                                                                                               // 38
      }                                                                                                              // 37
    },                                                                                                               // 33
    messages: {                                                                                                      // 41
      title: {                                                                                                       // 42
        required: 'Need a title in here, Seuss.'                                                                     // 43
      },                                                                                                             // 42
      body: {                                                                                                        // 45
        required: 'This thneeds a body, please.'                                                                     // 46
      }                                                                                                              // 45
    },                                                                                                               // 41
    submitHandler: function () {                                                                                     // 49
      handleUpsert();                                                                                                // 49
    }                                                                                                                // 49
  });                                                                                                                // 32
};                                                                                                                   // 51
                                                                                                                     //
function documentEditor(options) {                                                                                   // 53
  component = options.component;                                                                                     // 54
  validate();                                                                                                        // 55
}                                                                                                                    // 56
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"login.js":["react-router","meteor/meteor","meteor/themeteorchef:bert","./validation.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/login.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return handleLogin;                                                                                              // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var browserHistory = void 0;                                                                                         // 1
module.import('react-router', {                                                                                      // 1
  "browserHistory": function (v) {                                                                                   // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.import('meteor/meteor', {                                                                                     // 1
  "Meteor": function (v) {                                                                                           // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.import('meteor/themeteorchef:bert', {                                                                         // 1
  "Bert": function (v) {                                                                                             // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
module.import('./validation.js');                                                                                    // 1
var component = void 0;                                                                                              // 8
                                                                                                                     //
var login = function () {                                                                                            // 10
  var email = document.querySelector('[name="emailAddress"]').value;                                                 // 11
  var password = document.querySelector('[name="password"]').value;                                                  // 12
  Meteor.loginWithPassword(email, password, function (error) {                                                       // 14
    if (error) {                                                                                                     // 15
      Bert.alert(error.reason, 'warning');                                                                           // 16
    } else {                                                                                                         // 17
      Bert.alert('Logged in!', 'success');                                                                           // 18
      var location = component.props.location;                                                                       // 17
                                                                                                                     //
      if (location.state && location.state.nextPathname) {                                                           // 21
        browserHistory.push(location.state.nextPathname);                                                            // 22
      } else {                                                                                                       // 23
        browserHistory.push('/');                                                                                    // 24
      }                                                                                                              // 25
    }                                                                                                                // 26
  });                                                                                                                // 27
};                                                                                                                   // 28
                                                                                                                     //
var validate = function () {                                                                                         // 30
  $(component.loginForm).validate({                                                                                  // 31
    rules: {                                                                                                         // 32
      emailAddress: {                                                                                                // 33
        required: true,                                                                                              // 34
        email: true                                                                                                  // 35
      },                                                                                                             // 33
      password: {                                                                                                    // 37
        required: true                                                                                               // 38
      }                                                                                                              // 37
    },                                                                                                               // 32
    messages: {                                                                                                      // 41
      emailAddress: {                                                                                                // 42
        required: 'Need an email address here.',                                                                     // 43
        email: 'Is this email address legit?'                                                                        // 44
      },                                                                                                             // 42
      password: {                                                                                                    // 46
        required: 'Need a password here.'                                                                            // 47
      }                                                                                                              // 46
    },                                                                                                               // 41
    submitHandler: function () {                                                                                     // 50
      login();                                                                                                       // 50
    }                                                                                                                // 50
  });                                                                                                                // 31
};                                                                                                                   // 52
                                                                                                                     //
function handleLogin(options) {                                                                                      // 54
  component = options.component;                                                                                     // 55
  validate();                                                                                                        // 56
}                                                                                                                    // 57
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"rate-limit.js":["meteor/meteor","meteor/ddp-rate-limiter","meteor/underscore",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/rate-limit.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return rateLimit;                                                                                                // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var Meteor = void 0;                                                                                                 // 1
module.import('meteor/meteor', {                                                                                     // 1
  "Meteor": function (v) {                                                                                           // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var DDPRateLimiter = void 0;                                                                                         // 1
module.import('meteor/ddp-rate-limiter', {                                                                           // 1
  "DDPRateLimiter": function (v) {                                                                                   // 1
    DDPRateLimiter = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
                                                                                                                     //
var _ = void 0;                                                                                                      // 1
                                                                                                                     //
module.import('meteor/underscore', {                                                                                 // 1
  "_": function (v) {                                                                                                // 1
    _ = v;                                                                                                           // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
                                                                                                                     //
var fetchMethodNames = function (methods) {                                                                          // 5
  return _.pluck(methods, 'name');                                                                                   // 5
};                                                                                                                   // 5
                                                                                                                     //
var assignLimits = function (_ref) {                                                                                 // 7
  var methods = _ref.methods,                                                                                        // 7
      limit = _ref.limit,                                                                                            // 7
      timeRange = _ref.timeRange;                                                                                    // 7
  var methodNames = fetchMethodNames(methods);                                                                       // 8
                                                                                                                     //
  if (Meteor.isServer) {                                                                                             // 10
    DDPRateLimiter.addRule({                                                                                         // 11
      name: function (name) {                                                                                        // 12
        return _.contains(methodNames, name);                                                                        // 12
      },                                                                                                             // 12
      connectionId: function () {                                                                                    // 13
        return true;                                                                                                 // 13
      }                                                                                                              // 13
    }, limit, timeRange);                                                                                            // 11
  }                                                                                                                  // 15
};                                                                                                                   // 16
                                                                                                                     //
function rateLimit(options) {                                                                                        // 18
  return assignLimits(options);                                                                                      // 18
}                                                                                                                    // 18
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"recover-password.js":["meteor/accounts-base","meteor/themeteorchef:bert","./validation.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/recover-password.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return handleRecoverPassword;                                                                                    // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var Accounts = void 0;                                                                                               // 1
module.import('meteor/accounts-base', {                                                                              // 1
  "Accounts": function (v) {                                                                                         // 1
    Accounts = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.import('meteor/themeteorchef:bert', {                                                                         // 1
  "Bert": function (v) {                                                                                             // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
module.import('./validation.js');                                                                                    // 1
var component = void 0;                                                                                              // 7
                                                                                                                     //
var handleRecovery = function () {                                                                                   // 9
  Accounts.forgotPassword({                                                                                          // 10
    email: document.querySelector('[name="emailAddress"]').value                                                     // 11
  }, function (error) {                                                                                              // 10
    if (error) {                                                                                                     // 13
      Bert.alert(error.reason, 'warning');                                                                           // 14
    } else {                                                                                                         // 15
      Bert.alert('Check your inbox for a reset link!', 'success');                                                   // 16
    }                                                                                                                // 17
  });                                                                                                                // 18
};                                                                                                                   // 19
                                                                                                                     //
var validate = function () {                                                                                         // 21
  $(component.recoverPasswordForm).validate({                                                                        // 22
    rules: {                                                                                                         // 23
      emailAddress: {                                                                                                // 24
        required: true,                                                                                              // 25
        email: true                                                                                                  // 26
      }                                                                                                              // 24
    },                                                                                                               // 23
    messages: {                                                                                                      // 29
      emailAddress: {                                                                                                // 30
        required: 'Need an email address here.',                                                                     // 31
        email: 'Is this email address legit?'                                                                        // 32
      }                                                                                                              // 30
    },                                                                                                               // 29
    submitHandler: function () {                                                                                     // 35
      handleRecovery();                                                                                              // 35
    }                                                                                                                // 35
  });                                                                                                                // 22
};                                                                                                                   // 37
                                                                                                                     //
function handleRecoverPassword(options) {                                                                            // 39
  component = options.component;                                                                                     // 40
  validate();                                                                                                        // 41
}                                                                                                                    // 42
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"reset-password.js":["react-router","meteor/accounts-base","meteor/themeteorchef:bert","./validation.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/reset-password.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return handleResetPassword;                                                                                      // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var browserHistory = void 0;                                                                                         // 1
module.import('react-router', {                                                                                      // 1
  "browserHistory": function (v) {                                                                                   // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Accounts = void 0;                                                                                               // 1
module.import('meteor/accounts-base', {                                                                              // 1
  "Accounts": function (v) {                                                                                         // 1
    Accounts = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.import('meteor/themeteorchef:bert', {                                                                         // 1
  "Bert": function (v) {                                                                                             // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
module.import('./validation.js');                                                                                    // 1
var component = void 0;                                                                                              // 8
var token = void 0;                                                                                                  // 9
                                                                                                                     //
var handleReset = function () {                                                                                      // 11
  var password = document.querySelector('[name="newPassword"]').value;                                               // 12
  Accounts.resetPassword(token, password, function (error) {                                                         // 13
    if (error) {                                                                                                     // 14
      Bert.alert(error.reason, 'danger');                                                                            // 15
    } else {                                                                                                         // 16
      browserHistory.push('/');                                                                                      // 17
      Bert.alert('Password reset!', 'success');                                                                      // 18
    }                                                                                                                // 19
  });                                                                                                                // 20
};                                                                                                                   // 21
                                                                                                                     //
var validate = function () {                                                                                         // 23
  $(component.resetPasswordForm).validate({                                                                          // 24
    rules: {                                                                                                         // 25
      newPassword: {                                                                                                 // 26
        required: true,                                                                                              // 27
        minlength: 6                                                                                                 // 28
      },                                                                                                             // 26
      repeatNewPassword: {                                                                                           // 30
        required: true,                                                                                              // 31
        minlength: 6,                                                                                                // 32
        equalTo: '[name="newPassword"]'                                                                              // 33
      }                                                                                                              // 30
    },                                                                                                               // 25
    messages: {                                                                                                      // 36
      newPassword: {                                                                                                 // 37
        required: 'Enter a new password, please.',                                                                   // 38
        minlength: 'Use at least six characters, please.'                                                            // 39
      },                                                                                                             // 37
      repeatNewPassword: {                                                                                           // 41
        required: 'Repeat your new password, please.',                                                               // 42
        equalTo: 'Hmm, your passwords don\'t match. Try again?'                                                      // 43
      }                                                                                                              // 41
    },                                                                                                               // 36
    submitHandler: function () {                                                                                     // 46
      handleReset();                                                                                                 // 46
    }                                                                                                                // 46
  });                                                                                                                // 24
};                                                                                                                   // 48
                                                                                                                     //
function handleResetPassword(options) {                                                                              // 50
  component = options.component;                                                                                     // 51
  token = options.token;                                                                                             // 52
  validate();                                                                                                        // 53
}                                                                                                                    // 54
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"signup.js":["react-router","meteor/accounts-base","meteor/themeteorchef:bert","./validation.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/signup.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
  "default": function () {                                                                                           // 1
    return handleSignup;                                                                                             // 1
  }                                                                                                                  // 1
});                                                                                                                  // 1
var browserHistory = void 0;                                                                                         // 1
module.import('react-router', {                                                                                      // 1
  "browserHistory": function (v) {                                                                                   // 1
    browserHistory = v;                                                                                              // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Accounts = void 0;                                                                                               // 1
module.import('meteor/accounts-base', {                                                                              // 1
  "Accounts": function (v) {                                                                                         // 1
    Accounts = v;                                                                                                    // 1
  }                                                                                                                  // 1
}, 1);                                                                                                               // 1
var Bert = void 0;                                                                                                   // 1
module.import('meteor/themeteorchef:bert', {                                                                         // 1
  "Bert": function (v) {                                                                                             // 1
    Bert = v;                                                                                                        // 1
  }                                                                                                                  // 1
}, 2);                                                                                                               // 1
module.import('./validation.js');                                                                                    // 1
var component = void 0;                                                                                              // 8
                                                                                                                     //
var getUserData = function () {                                                                                      // 10
  return {                                                                                                           // 10
    email: document.querySelector('[name="emailAddress"]').value,                                                    // 11
    password: document.querySelector('[name="password"]').value,                                                     // 12
    profile: {                                                                                                       // 13
      name: {                                                                                                        // 14
        first: document.querySelector('[name="firstName"]').value,                                                   // 15
        last: document.querySelector('[name="lastName"]').value                                                      // 16
      }                                                                                                              // 14
    }                                                                                                                // 13
  };                                                                                                                 // 10
};                                                                                                                   // 10
                                                                                                                     //
var signup = function () {                                                                                           // 21
  var user = getUserData();                                                                                          // 22
  Accounts.createUser(user, function (error) {                                                                       // 24
    if (error) {                                                                                                     // 25
      Bert.alert(error.reason, 'danger');                                                                            // 26
    } else {                                                                                                         // 27
      browserHistory.push('/');                                                                                      // 28
      Bert.alert('Welcome!', 'success');                                                                             // 29
    }                                                                                                                // 30
  });                                                                                                                // 31
};                                                                                                                   // 32
                                                                                                                     //
var validate = function () {                                                                                         // 34
  $(component.signupForm).validate({                                                                                 // 35
    rules: {                                                                                                         // 36
      firstName: {                                                                                                   // 37
        required: true                                                                                               // 38
      },                                                                                                             // 37
      lastName: {                                                                                                    // 40
        required: true                                                                                               // 41
      },                                                                                                             // 40
      emailAddress: {                                                                                                // 43
        required: true,                                                                                              // 44
        email: true                                                                                                  // 45
      },                                                                                                             // 43
      password: {                                                                                                    // 47
        required: true,                                                                                              // 48
        minlength: 6                                                                                                 // 49
      }                                                                                                              // 47
    },                                                                                                               // 36
    messages: {                                                                                                      // 52
      firstName: {                                                                                                   // 53
        required: 'First name?'                                                                                      // 54
      },                                                                                                             // 53
      lastName: {                                                                                                    // 56
        required: 'Last name?'                                                                                       // 57
      },                                                                                                             // 56
      emailAddress: {                                                                                                // 59
        required: 'Need an email address here.',                                                                     // 60
        email: 'Is this email address legit?'                                                                        // 61
      },                                                                                                             // 59
      password: {                                                                                                    // 63
        required: 'Need a password here.',                                                                           // 64
        minlength: 'Use at least six characters, please.'                                                            // 65
      }                                                                                                              // 63
    },                                                                                                               // 52
    submitHandler: function () {                                                                                     // 68
      signup();                                                                                                      // 68
    }                                                                                                                // 68
  });                                                                                                                // 35
};                                                                                                                   // 70
                                                                                                                     //
function handleSignup(options) {                                                                                     // 72
  component = options.component;                                                                                     // 73
  validate();                                                                                                        // 74
}                                                                                                                    // 75
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"validation.js":["jquery","jquery-validation",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/modules/validation.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var $ = void 0;                                                                                                      // 1
module.import('jquery', {                                                                                            // 1
  "default": function (v) {                                                                                          // 1
    $ = v;                                                                                                           // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
module.import('jquery-validation');                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"client":{"main.js":["/imports/startup/client",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/main.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.import('/imports/startup/client');                                                                            // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".html",".scss"]});
require("./client/main.js");