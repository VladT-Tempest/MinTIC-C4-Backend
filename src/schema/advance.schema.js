import { gql } from 'apollo-server';

const advanceType = gql`
    type Advance {
        _id: ID!
        project: Project!
        addDate: String
        description: String
        observations: String
    }
`;

const queries = gql`
    type Query {
        allAdvances: [Advance]
    }
`;

export default [
    advanceType,
    queries,
];