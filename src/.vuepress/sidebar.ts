import { sidebar } from "vuepress-theme-hope";
import { index } from "./sidebar/index";
import { interview } from "./sidebar/interview";
import { project_recommend } from "./sidebar/project-recommend";

export default sidebar({
  "/project-recommend/": project_recommend,
  "/interview/": interview,
  "/": index
});
