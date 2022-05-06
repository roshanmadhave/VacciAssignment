const express = require('express')
require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const PatientModel = require('./src/Components/model/patient.model')
const cors = require('cors')
const {v4} = require('uuid');
const app = express();

app.use(cors());

const patients = [
    {id : "1011", name : 'kattappa', dob: new Date(1900,2,4), gender : "male", place : 'mahishmathi', bloodGroup : "O+", height : "168", weight : "90"}
]

const schema = buildSchema(`
    type Query {
        hello : String!
        patients(search : SearchPatientInput) : [Patient!]!
        patient(search : SearchPatientInput) : Patient!    
    }
    type Mutation {
        createPatient(data : CreatePatientInput) : Patient!
    }
    input SearchPatientInput{
        name : String
    }
    input CreatePatientInput {
        name : String!
        dob : String!
        place : String!
        bloodGroup : String
        gender : String!
        height : String
        weight : String
    }
    type Patient {
        id : ID!
        name : String!
        dob : String!
        place : String!
        bloodGroup : String
        gender : String!
        height : String
        weight : String
    }
`)

const rootValue = {
    hello : () => "world",
    patients : () => patients,
    createPatient: async (args) => {
        try{
            const newPatient = new PatientModel(args.data)
            const createdPatient = await newPatient.save()
            return { ...createdPatient._doc, id: createdPatient._id}
        }catch(error) {
            throw new Error(error)
        }
    }
}
app.use('/gq', graphqlHTTP({
    schema,
    rootValue,
    graphiql : true
}))

app.listen(9090, () => console.log("server started at port : 9090"))