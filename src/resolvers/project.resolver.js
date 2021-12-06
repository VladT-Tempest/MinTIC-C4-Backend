import Projects from "../models/projects.model.js";
import Users from "../models/users.model.js";
import Enrollements from "../models/enrollments.model.js";

const allProjects = async () => {
  const projects = await Projects.find();
  return projects;
};

const project = async (parent, args) => {
  const user = await Projects.findById(args._id);
  return user;
};

const leader = async (parent) => {
  const user = await Users.findById(parent.leader_id);
  return user;
};

// HU_012 (LIDER) Crear un nuevo proyecto
const registerNewProject = async (parent, args) => { 
  const Projec = new Projects({
    ...args.input,
    name: args.input.name,
    generalObjective: args.input.generalObjective,
    specificObjectives:  args.input.specificObjectives ,
    budget: args.input.budget ,
    startDate: args.input.startDate ,
    endDate: args.input.endDate ,
    leader_id: args.input.leader_id ,
    status: args.input.status,
    });
  return Projec.save();
};
//
// HU_013 (LIDER) Listar los proyectos que tengo a cargo
const FindByleader = async (parent, args) => {
  const UserEmail = await Users.findOne({ email: args.email })._id;
  const leader =  Projects.find({leader_id : UserEmail});
  return leader
};
//

const enrollments = async (parent) => {
  const enrollments = await Enrollements.find({ project_id: parent._id.toString() });
  return enrollments;
}

export default {
  projectQueries: {
    allProjects,
    project,
    FindByleader,
  },
  Project: {
    leader,
    enrollments,
    
  },
  projectMutations: {
    registerNewProject, 
  }
}
