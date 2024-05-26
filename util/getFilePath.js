export const getSkillImageDir = (skillName) =>
  `./images/skills/${skillName.replace(/\s+/g, "")}.svg`;

export const getProjectImageDir = (projectName) =>
  `./images/projects/${projectName.replace(/\s+/g, "")}.webp`;
