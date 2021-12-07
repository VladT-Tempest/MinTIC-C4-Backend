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
    advances: [Advance]
  }
  type ProjectE {
    _id: ID!,
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
    allProjectsEstudiante019: [ProjectE]
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

const mutations = gql`
  type Mutation {
    update_project(input: UpdateInfo!, _id: ID!): Project
  }
`;

const inputs = gql`
  input UpdateInfo {
    name: String
    generalObjective: String
    specificObjectives: String
    budget: Float
  }
`;

export default [
  projectType,
  enums,
  queries,
  mutations,
  inputs,
];
