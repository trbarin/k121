import { component as detail } from "./myDetail/myDetail";
import { component as footer } from "./myFooter/myFooter";
import { component as header } from "./myHeader/myHeader";
import { component as masterDetail } from "./myMasterDetail/myMasterDetail";
import { component as table } from "./myTable/myTable";

angular
  .module("framework")
  .component(detail.name, detail)
  .component(footer.name, footer)
  .component(header.name, header)
  .component(masterDetail.name, masterDetail)
  .component(table.name, table);
