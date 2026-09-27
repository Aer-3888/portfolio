import { useTranslation } from "react-i18next";
import useProjects from "../../../hooks/useProjects";

const STORY_IDS = ["01", "09", "10", "03"];

export default function useStories() {
  const { t } = useTranslation("home");
  const projects = useProjects();
  return STORY_IDS.map((id) => ({
    story: { id, ...t(`projects.stories.${id}`, { returnObjects: true }) },
    project: projects.find((project) => project.id === id),
  })).filter(({ project }) => project);
}
