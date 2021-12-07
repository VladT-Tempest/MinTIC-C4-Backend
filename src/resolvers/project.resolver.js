import Projects from "../models/projects.model.js";
import Users from "../models/users.model.js";
import Enrollements from "../models/enrollments.model.js";
import { ROLES } from "../constants/user.constants.js";
import Advances from "../models/advances.model.js";

const allProjects = async () => {
  const projects = await Projects.find();
  return projects;
};
const allProjectsEstudiante019 = async (parent, args, { user, errorMessage }) => {
  if(!user){
    throw new Error(errorMessage);
  }
  if(user.role == ROLES.STUDENT){
    const projects = await Projects.find();
    return projects;
  }
};
const project = async (parent, args) => {
  const user = await Projects.findById(args._id);
  return user;
};

const advances = async (parent) => {
  const listAdvances = await Advances.find({ project_id: parent._id.toString() });
  return listAdvances;
}

const leader = async (parent) => {
  const user = await Users.findById(parent.leader_id);
  return user;
};

const update_project = async (parent, args, {user, errorMessage}) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  return Projects.findByIdAndUpdate(args._id,
    {name: args.input.name || undefined,
    generalObjective: args.input.generalObjective || undefined,
    "$push": {"specificObjectives": args.input.specificObjectives || undefined},
    budget: args.input.budget || undefined
    },
    {new: true}
  );
};
const enrollments = async (parent) => {
  const enrollments = await Enrollements.find({ project_id: parent._id.toString() });
  return enrollments;
}

export default {
  projectQueries: {
    allProjects,
    allProjectsEstudiante019,
    project,
  },
  projectMutations: {
    update_project,
  },
  Project: {
    leader,
    enrollments,
    advances,
  }
};
