// Declare libraries and variables
const express = require("express");
const port = 3001;

// Start Express App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set for Views
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Routes
app.get('/', (req, res) => {
    res.render("index");
});

app.post('/get_technologies', (req, res) => {
    const technology_list = { 
        "client side": [ 
            "bootstrap", "knockout", "xhtml", "preact", "patternfly", "dhtml", "postcss", "ajax", "vue", "scss", "responsive design", "material design", "angular", "haml", "mithril", "xpath",
            "json", "jquery", "less", "backbone", "react", "ember", "xml", "polymer", "api", "webrtc", "mean", "yui", "zeptojs", "dojo toolkit", "underscore.js", "angular.js", "cappuccino",
            "javascript mvc", "spice.js", "riot.js", "canjs", "handlebars", "dust.js", "gsap", "velocity.js", "bounce.js", "tweenjs", "move.js", "snap.svg", "rekapi", "favico.js", "textillate.js",
            "motio", "anima.js", "melonjs", "impactjs", "limejs", "crafty", "cocos2d-html5", "phaser", "goo", "lycheejs", "quintus", "kiwijs", "pandajs", "rot.js", "isogenic", "whitestormjs"
        ],
        "cloud infrastructure": [ "s3" ], 
        "databases": [ 
            "rdbms", "nosql", "mysql", "mssql", "postgres", "mariadb", "sqlite", "mongodb", "db2", "redis", "oracle", "hadoop", "cassandra", "hbase", "hive", "dynamodb", "couchbase", "database",
            "bigquery", "memcached", "t-sql", "mongoose", "javaserver faces", "hobbit", "graphql", "jooq", "etl", "localstorage", "protobuf", "doctrine", "mybatis", "ehcache", "pl/sql" 
        ],
        "others": [ 
            "selenium", "arkit", "webkit", "swiftui", "core animation", "homekit", "ios", "sirikit", "visionkit", "healthkit", "yourkit", "watchkit", "photokit", "core location", "avkit", "storekit",
            "rxswift", "cocoa", "foundation", "uikit", "eventkitui", "appkit", "cloudkit", "qtkit", "pushkit", "core graphics", "classkit", "glkit", "gamekit", "callkit", "eventkit", "mapkit", "cocoapods",
            "coredata", "react native", "xamarin", "firebase", "juce", "ultimate++", "ionic", "javafx", "unity", "storyboard", "bitbucket", "github", "svn", "git", "jira", "asana", "maven", "zend studio",
            "phpstorm", "phprunner", "komodo ide", "pycharm", "xcode", "intellij idea", "rpg maker", "corona sdk", "nativescript", "flutter", "codename one", "rhomobile suite", "coldfusion", "unreal engine",
            "lumberyard", "godot", "gamemaker", "appgamekit", "cryen1ine", "urho3d", "corona", "cocos2d ", "figma", "adobe xd", "balsamiq", "wireframes", "sketch", "invision", "adobe illustrator", "adobe photoshop",
            "axure", "craft", "proto.io", "aws codecommit", "gogs", "mercurial", "cvs", "workzone", "scoro", "wrike", "microsoft project", "clickup", "basecamp", "jdeveloper", "nodeclipse", "webstorm", "appcode",
            "aptana studio 3", "sublime", "notepad++", "atom", "visual studio code", "eclipse", "light table", "rj texted ", "rubymine", "androidstudio", "code blocks", "cordova", "cloud9 ide", "sourcelair", "phpedit", "bluej" 
        ],
        "server side": [ 
            "spring", "persistence.js", "pytest", "ruby on rails", "lamp", "phalcon", "django", "struts", "asp.net", "cppcms", "node", "ramaze", "laravel", "yii", "flask", ".net core", "silicon", "express",
            "padrino", "codeigniter", "kohana", "cherrypy", "spark", ".net", "treefrog", "sails.js", "hanami", "cakephp", "phpixie", "tornado", "apache sling", "nancyfx", "oat++", "koa", "plezi", "zend", "limonade",
            "grok", "appfuse", "mono", "drogon", "socket.io", "camping", "symfony", "hazaar", "grails", "vaadin", "service stack", "sinatra", "fuelphp", "li3", "pyramid", "micronaut", "nette", "lumen", "turbo gears",
            "zkoss", "slim", "silex", "sanic", "tapestry", "wicket", "easymock", "jest", "testng", "jmeter", "cppunit", "cucumber", "simpletest", "testflight", "spock", "storyplayer", "cypress", "protractor", "jwalk",
            "loadrunner", "codeception", "behat", "kahlan", "peridot", "nunit", "gtest/gmock", "phpspec", "xdebug", "boost.test", "qunit", "bazel", "arquillian", "capybara", "pytest-bdd", "chai", "nightwatch", "jtest",
            "cxxtest", "rspec", "mettle", "mocha", "tdd", "bdd", "atoum", "mockito", "jasmine", "xunit", "junit", "nsubstitute", "sonarqube", "trackjs", "pytorch", "dlib", "nltk" 
        ],
        "servers": [ 
            "loopback", "server", "http", "amazon aws", "google cloud", "redshift", "mongrel", "jetty", "tomcat", "https", "microsoft azure", "iis", "openstack", "ip", "wildfly", "apache tomee", "dns", "tcp", "aiohttp",
            "loki", "glassfish", "gunicorn", "nginx", "elasticsearch", "civetweb", "heroku", "java servlets", "blazix", "linux", "passenger", "jvm", "gae", "docker", "vagrant", "kubernetes", "chef", "gradle", "maven",
            "salt stack", "perforce", "cmake", "sinon", "ant", "urbancode", "mesos", "ansible", "octopus", "jenkins", "cloud foundry", "rollbar", "rackspace", "karma", "intern", "istanbul", "dexterjs", "ava" 
        ],
        "web development framework": [ 
            "mean", "node", "express", "sails.js", "koa", "socket.io", "ruby on rails", "ramaze", "padrino", "hanami", "plezi", "camping", "sinatra", "lamp", "laravel", "codeigniter", "cakephp", "zend", "symfony",
            "fuelphp", "nette", "slim", "phalcon", "yii", "kohana", "phpixie", "limonade", "hazaar", "li3", "lumen", "silex", "django", "flask", "cherrypy", "tornado", "giotto", "grails", "pyramid", "turbo gears",
            "sanic", "struts", "spring", "spark", "apache sling", "appfuse", "vaadin", "micronaut", "zkoss", "tapestry", "wicket", "asp.net", ".net core", ".net", "nancyfx", "mono", "service stack", "cppcms",
            "silicon", "treefrog", "oat++", "drogon" 
        ],
        "web front-end framework": [ "angular", "canjs", "crafty", "ember", "impactjs", "isogenic", "kiwijs", "limejs", "lycheejs", "mithril", "pandajs", "phaser", "preact", "react", "vue", "whitestormjs" ],
        "javascript": [ 
            "mongoose", "localstorage", "loopback", "sinon", "rollbar", "karma", "intern", "istanbul", "dexterjs", "ava", "persistence.js", "jest",
            "cypress", "protractor", "chai", "nightwatch", "mocha", "jasmine", "trackjs", "knockout", "preact", "vue", "angular", "mithril", "jquery", "backbone", "react", "ember", "polymer", "webrtc",
            "mean", "yui", "zeptojs", "dojo toolkit", "underscore.js", "angular.js", "cappuccino", "javascript mvc", "spice.js", "riot.js", "canjs", "handlebars", "dust.js", "gsap", "velocity.js",
            "bounce.js", "tweenjs", "move.js", "snap.svg", "rekapi", "favico.js", "textillate.js", "motio", "anima.js", "melonjs", "impactjs", "limejs", "crafty", "cocos2d-html5", "phaser", "goo",
            "lycheejs", "quintus", "kiwijs", "pandajs", "rot.js", "isogenic", "whitestormjs", "mean", "node", "express", "sails.js", "koa", "socket.io", "angular", "canjs", "crafty", "ember", "impactjs",
            "isogenic", "kiwijs", "limejs", "lycheejs", "mithril", "pandajs", "phaser", "preact", "react", "vue", "whitestormjs", "ionic", "nodeclipse", "webstorm", "bluej" 
        ],
        "python": [ 
            "aiohttp", "gunicorn", "pytest", "django", "flask", "cherrypy", "tornado", "grok", "pyramid", "turbo gears", "sanic", "pytest-bdd", "pytorch", "nltk", "django", "flask", "cherrypy", "tornado",
            "giotto", "pyramid", "turbo gears", "sanic", "pycharm", "python 2", "python 3" 
        ],
        "java": [ 
            "javaserver faces", "jooq", "mybatis", "ehcache", "jetty", "tomcat", "wildfly", "apache tomee", "glassfish", "java servlets", "blazix", "jvm", "maven", "ant", "spring", "struts", "spark", "apache sling",
            "appfuse", "grails", "vaadin", "micronaut", "zkoss", "tapestry", "wicket", "easymock", "testng", "spock", "jwalk", "loadrunner", "arquillian", "jtest", "mockito", "junit", "sonarqube", "grails", "struts",
            "spring", "spark", "apache sling", "appfuse", "vaadin", "micronaut", "zkoss", "tapestry", "wicket", "yourkit", "javafx", "intellij idea", "eclipse" 
        ],
        "ruby": [ 
            "hobbit", "mongrel", "ruby on rails", "ramaze", "padrino", "hanami", "plezi", "camping", "sinatra", "rspec", "ruby on rails", "ramaze", "padrino", "hanami", "plezi", "camping", "sinatra", "rubymine" 
        ],
        "php": [ 
            "doctrine", "octopus", "lamp", "phalcon", "laravel", "yii", "codeigniter", "kohana", "cakephp", "phpixie", "zend", "limonade", "symfony", "hazaar", "fuelphp", "li3", "nette", "lumen", "slim", "silex",
            "simpletest", "storyplayer", "codeception", "behat", "kahlan", "peridot", "phpspec", "xdebug", "atoum", "lamp", "laravel", "codeigniter", "cakephp", "zend", "symfony", "fuelphp", "nette", "slim", "phalcon",
            "yii", "kohana", "phpixie", "limonade", "hazaar", "li3", "lumen", "silex", "zend studio", "phpstorm", "phprunner", "komodo ide", "rj texted ", "phpedit" 
        ],
        "c#": [ 
            "asp.net", ".net core", ".net", "nancyfx", "mono", "service stack", "nunit", "xunit", "nsubstitute", "asp.net", ".net core", ".net", "nancyfx", "mono", "service stack", "xamarin", "unity" 
        ],
        "c++": [ 
            "loki", "civetweb", "cppcms", "silicon", "treefrog", "oat++", "drogon", "cppunit", "gtest/gmock", "boost.test", "cxxtest", "mettle", "dlib", "cppcms", "silicon", "treefrog", "oat++", "drogon", "juce", "ultimate++" 
        ],
        "html/css": [ 
            "bootstrap", "xhtml", "patternfly", "postcss", "scss", "responsive design", "material design", "haml", "xpath", "less" 
        ],
        "swift": [ 
            "graphql", "testflight", "arkit", "webkit", "swiftui", "core animation", "homekit", "ios", "sirikit", "visionkit", "healthkit", "watchkit", "photokit", "core location", "avkit", "storekit", "rxswift", "cocoa",
            "foundation", "uikit", "eventkitui", "appkit", "cloudkit", "qtkit", "pushkit", "core graphics", "classkit", "glkit", "gamekit", "callkit", "eventkit", "mapkit", "cocoapods", "coredata", "react native", "storyboard", "xcode" 
        ],
        "android": [ "androidstudio" ]
    }

    /* Declare object format */
    let result      = { "technology_keyword_count": {}, "total_per_tech_category": {} };

    /* Convert string to lowercase*/
    let tech_string = req.body.tech_string.toLowerCase();

    for(let [category, technologies] of Object.entries(technology_list)){
        /* Remove / and ++ from category string */
        let regex_string = new RegExp(`\\b${category.replace(/[/]/g,"|").replace(/[+]/g,"\\+")}\\b`, 'gi');
        /* Find category in string */
        let check_match = (tech_string.match(regex_string));

        /* Check if category is found in string */
        if(check_match){
            result["total_per_tech_category"][category] = { "total_count": check_match.length, "breakdown": { [`${category}`]: check_match.length }};
        }

        for(let technology of technologies){
            /* Remove / and ++ from technology string */
            regex_string = new RegExp(`\\b${technology.replace(/[/]/g,"|").replace(/[+]/g,"\\+")}\\b`, 'gi');
            /* Find technology in string */
            check_match = (tech_string.match(regex_string));

            /* Check if technology is found in string */
            if(check_match){
                result["technology_keyword_count"][technology] = check_match.length;
                
                /* Check if technology in technologies list of category */
                if(technologies.includes(technology)){
                    if(category in result["total_per_tech_category"]){
                        /* Only add technology count to category total_count if technology is not yet in the breakdown */
                        if(!(technology in result["total_per_tech_category"][category]["breakdown"])){
                            result["total_per_tech_category"][category]["total_count"] += check_match.length ;
                        }
                    }
                    else{
                        result["total_per_tech_category"][category] = { "total_count": check_match.length };
                    }

                    /* Add technology in category breadown */
                    result["total_per_tech_category"][category]["breakdown"] = { 
                        ...result["total_per_tech_category"][category]["breakdown"],
                        [`${technology}`]: check_match.length 
                    };
                }
            }
        }
    }

    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(result, null, 4));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});