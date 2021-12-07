// vendors
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// constants
import { USER_STATUS, ROLES } from '../constants/user.constants.js';

// models
import Users from "../models/users.model.js";
import Enrollements from '../models/enrollments.model.js';
//import { cloneObject } from 'apollo-server-core/dist/runHttpQuery';

// HU_004 administrador ver la información de los usuarios registrados en la plataforma
const allUsers = async (parent, args, { user, errorMessage }) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.ADMIN) {
    throw new Error('Access denied');
  }
  return await Users.find();
};


// HU_010 (LIDER) Ver la información de los estudiantes registrados en la plataforma
const userByRole = async (parent, args, { user, errorMessage }) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role == ROLES.STUDENT){
    const Students = await Users.find();
    return Students; 
  } 
};
//
// HU_011 (LIDER) Cambiar el estado del estudiante de “Pendiente” a “Autorizado”
const changeStatusLider = async (parent, args, { user, errorMessage }) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.ADMIN) {
    throw new Error('Access denied');
  }
  return await Users.findOneAndUpdate({"documentId": args.documentId}, {"status": args.status }, {new: true} )
};


const user = async (parent, args, { user, errorMessage }) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  return user;
};

const register = async (parent, args) => {
  const user = new Users({
    ...args.input,
    status: USER_STATUS.PENDING,
    fullName: `${args.input.name} ${args.input.lastName}`,
    password: await bcrypt.hash(args.input.password, 12),
  });
  return user.save();
};

const userByEmail = async (parent, args) => {
  const user = await Users.findOne({ email: args.email });
  return user;
};

const login = async (parent, args) => {
  const user = await Users.findOne({ email: args.email });
  if (!user) {
    throw new Error('User not found');
  }
  const isValid = await bcrypt.compare(args.password, user.password);
  if(!isValid) {
    throw new Error('Wrong password');
  }
  const token = await jwt.sign(
    { user },
    // eslint-disable-next-line no-undef
    process.env.SECRET,
    { expiresIn: '60m' }
  );
  return token;
};

const enrollments = async (parent) => {
  const enrollments = await Enrollements.find({ user_id: parent._id });
  return enrollments;
};

export default {
  userQueries: {
    allUsers,
    user,
    userByEmail,
    userByRole,
  },
  userMutations: {
    register,
    login,
    changeStatusLider
  },
  User: {
    enrollments,
  }
}