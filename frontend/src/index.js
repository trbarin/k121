import "angular";
import "restangular";

angular.module("framework", ["restangular"]);

require("./index.scss");
require("./app/components/index");
require("./app/configs/index");
require("./app/pages/index");
require("./app/services/index");
