const { ROLE } = require("../data");

function canViewProject(user, project) {
  //ADMIN o projectoid es el mismo
  return user.role === ROLE.ADMIN || project.userId === user.id;
}

function scopedProjects(user, projects) {
  if (user.role == ROLE.ADMIN) {
    //send tje correctly project
    return projects;
  }
  return projects.filter((project) => project.userId == user.id);
}

function canDeleteProject(user, project) {
  return project.userId === user.id;
  //delete if it is your project
}

module.exports = {
  canViewProject,
  scopedProjects,
  canDeleteProject,
};
