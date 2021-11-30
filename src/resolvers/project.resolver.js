import Projects from "../models/projects.model.js";
import Users from "../models/users.model.js";

const allProjects = async () => {
  const projects = await Projects.find();
  return projects;
};

const project = async (parent, args, context, info) => {
  const user = await Projects.findById(args._id);
  return user;
};

const leader = async (parent, args, context, info) => {
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
    }
  );
};

export default {
  projectQueries: {
    allProjects,
    project,
  },
  projectMutations: {
    update_project,
  },
  Project: {
    leader,
  }
};
