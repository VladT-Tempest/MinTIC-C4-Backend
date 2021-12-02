import Advances from '../models/advances.model.js';
import Projects from '../models/projects.model.js';

const allAdvances = async () => {
    const advances = await Advances.find()
    return advances
};

const project = async (parent) => {
    const project = await Projects.findById(parent.project_id);
    return project;
};

const update_advance = async (parent, args) => {
    return Advances.findByIdAndUpdate(args._id,
      {observations: args.observations || undefined}
    );
  };

export default {
    advanceQueries: {
        allAdvances
    },
    advanceMutations: {
        update_advance,
    },
    Advance: {
        project,
    }
}