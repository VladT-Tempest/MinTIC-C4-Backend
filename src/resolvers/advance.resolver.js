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

export default {
    advanceQueries: {
        allAdvances
    },
    Advance: {
        project,
    }
}