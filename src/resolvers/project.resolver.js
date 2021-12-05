// vendors
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// constants
import { USER_STATUS, ROLES } from '../constants/user.constants.js';
import { PHASE } from '../constants/project.constants.js';

// models
import Projects from "../models/projects.model.js";
import Users from "../models/users.model.js";
import Enrollements from "../models/enrollments.model.js";

// HU_006 Administrador --> ver la lista de proyectos
const allProjects = async (parent, args, { user, errorMessage }) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role != ROLES.ADMIN) {
    throw new Error('Access denied');
  }  
  const projects = await Projects.find();
  return projects;
};

// HU_008
const projectChangeStatus = async (parent, args, { user, errorMessage }) => {
  
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.ADMIN) {
    throw new Error('Access denied');
  }
  return await Projects.findOneAndUpdate({"name": args.name}, {"status": args.status }, {new: true} )
};

// HU_009
const projectChangePhase = async (parent, args, { user, errorMessage }) => {
  
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.ADMIN) {
    throw new Error('Access denied');
  }
  return await Projects.findOneAndUpdate({"name": args.name}, {"phase": args.phase }, {new: true} )
};

const project = async (parent, args) => {
  const user = await Projects.findById(args._id);
  return user;
};

const leader = async (parent) => {
  const user = await Users.findById(parent.leader_id);
  return user;
};

const enrollments = async (parent) => {
  const enrollments = await Enrollements.find({ project_id: parent._id.toString() });
  return enrollments;
}

export default {
  projectQueries: {
    allProjects,
    project,
  },

  projectMutations: {
    projectChangeStatus,
    projectChangePhase,
  },

  Project: {
    leader,
    enrollments,
  }
};
