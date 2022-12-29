const { TECHNOLOGY_LIST } = require("../constants");
const EJS                 = require("ejs");
const PATH                = require("path");

module.exports = {
    /** 
    *   DOCU: Display the index page. <br>
    *   Triggered by sending GET request to / <br>
    *   Last updated at: December 29, 2022
    *   @author Jovic
    */
    index: async (request, response) => {
        response.render("index");
    },
    /** 
    *   DOCU: Scan string provided by user and return a breakdown of technologies (keywords and categories) mentioned in it. <br>
    *   Triggered by sending POST request to /get_technologies <br>
    *   Last updated at: December 29, 2022
    *   @param {object} post_data Requires: tech_string 
    *   @returns {object} response_data { status, error, result: { "keywords": {}, "categories": {} }
    *   @author Jovic
    */
    detect_technologies: async (request, response) => {
        let response_data = { "status": false, "result": {}, "error": null };

        try {
            /* Declare object result format */
            let detection_results = { "keywords": {}, "categories": {} };

            /* Convert string to lowercase */
            let tech_string = request.body.tech_string.toLowerCase();

            /*
                DOCU: Loop through keys and values in TECHNOLOGY_LIST object.
                Create custom regex for each. Some keywords/technologies that has special characters (e.g. c#, c++)
                will have a modified regex to get more accurate result.
            */
            for(let [category, technologies] of Object.entries(TECHNOLOGY_LIST)){
                /* Check if category has no # or ++ */
                if(!(category.includes("#")) && !(category.includes("++"))) {
                    /* Remove / and ++ from category string */
                    var category_string = `\\b${category.replace(/[/]/g,"\b|\b").replace(/[+]/g,"\\+")}\\b`;
                }
                else {
                    /* Remove / and ++ from category string */
                    var category_string = `\\b${category.replace(/[+]/g,"\\+")}`;
                }
                
                /* 
                    DOCU: Create regex using category and match it to tech_string provided by user.
                    If there is a match, add it to detection_results["categories"] and how many times did it occur.
                */
                let regex_string = new RegExp(category_string, 'gi');
                let check_match  = (tech_string.match(regex_string));
                
                if(check_match){
                    detection_results["categories"][category] = { "total_count": check_match.length, [`${category}`]: check_match.length };
                }

                /* 
                    DOCU: Loop through values in techlogies array.
                    Create custom regex for each. Some keywords/technologies that has special characters (e.g. c#, c++)
                    will have a modified regex to get more accurate result.
                */
                for(let technology of technologies){
                    /* Check if technology has no # or ++ */
                    if(!(technology.includes("#")) && !(technology.includes("++"))) {
                        /* Remove / and ++ from technology string */
                        var technology_string = `\\b${technology.replace(/[/]/g,"\b|\b").replace(/[+]/g,"\\+")}\\b`;
                    }
                    else {
                        /* Remove / and ++ from technology string */
                        var technology_string = `\\b${technology.replace(/[+]/g,"\\+")}`;
                    }

                    /* 
                        DOCU: Create regex using technology and match it to tech_string provided by user.
                        If there is a match, add it to detection_results["keywords"] and detection_results["categories"],
                        and how many times did it occur.
                    */
                    regex_string = new RegExp(technology_string, 'gi');
                    check_match = (tech_string.match(regex_string));

                    if(check_match){
                        detection_results["keywords"][technology] = check_match.length;
                        
                        /* Check if technology in technologies list of category */
                        if(technologies.includes(technology)){
                            if(category in detection_results["categories"]){
                                /* Only add technology count to category total_count if technology is not yet in the breakdown */
                                if(!(technology in detection_results["categories"][category])){
                                    detection_results["categories"][category]["total_count"] += check_match.length ;
                                }
                            }
                            else{
                                detection_results["categories"][category] = { "total_count": check_match.length };
                            }

                            /* Add technology in category breadown */
                            detection_results["categories"][category] = { 
                                ...detection_results["categories"][category],
                                [`${technology}`]: check_match.length 
                            };
                        }
                    }
                }
            }

            /* Render html to string for keyword and json results */
            let keyword_result = await EJS.renderFile(PATH.join(__dirname, "../views/partials/keyword_result.ejs"), { keywords: detection_results.keywords });
            let json_result    = await EJS.renderFile(PATH.join(__dirname, "../views/partials/json_result.ejs"), { categories: detection_results.categories });

            response_data["status"] = true;
            response_data["result"] = { keyword_result, json_result };
        } catch (error) {
            console.log(error);
            response_data["error"] = error;
        }

        response.json(response_data);
    }
}