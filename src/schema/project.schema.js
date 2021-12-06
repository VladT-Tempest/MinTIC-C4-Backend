import { gql } from 'apollo-server';

const projectType = gql`
  # Project
  type Project {
    _id: ID!
    name: String!
    generalObjective: String!
    specificObjectives: [String]!
    budget: Float!
    startDate: String!
    endDate: String!
    leader_id: ID!
    status: ProjectStatus!
    phase: Phase
    leader: User!
    enrollments: [Enrollment]
  }
`;

const enums = gql`
  # Enum for status values
  enum ProjectStatus {
    ACTIVE
    INACTIVE
  }

  # Enum for phase values
  enum Phase {
    STARTED
    IN_PROGRESS
    ENDED
  }
`;

const queries = gql`
  # Query all projects
  type Query {
    allProjects: [Project]
  }

  type Query {
    project(_id: ID): Project
  }

  type Query {
    FindByleader(email: String!): Project
  }
`;

const mutations = gql`
  type Mutation {
    registerNewProject(input: RegisterNewProjectInput!): Project!
  }
`;

const inputs = gql`
  input RegisterNewProjectInput {
    name: String!
    generalObjective: String!
    specificObjectives: [String]!
    budget: Float!
    startDate: String!
    endDate: String!
    leader_id: ID!
    status: ProjectStatus!
  }
`;

export default [
  projectType,
  enums,
  queries,
  mutations,
  inputs,
];
