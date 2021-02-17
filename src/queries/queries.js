import { gql } from "apollo-boost";

export const getAllJobs = gql`
  query {
    getAllJobs {
      _id
      datasetName
      link
      version
      mse
      standardDeviation
      status
      endTime
      datasetName
      algoName
      link
    }
  }
`;

export const getAllPrediction = gql`
  query {
    getAllPrediction {
      _id
      jobId
      prediction
      timeStamp
      datasetName
      algoName
      sex
      length
      diameter
      height
      wholeWeight
      shuckedWeight
      visceraWeight
      shellWeight
      version
    }
  }
`;

export const getAllDatasets = gql`
  query {
    getDataSets {
      _id
      datasetName
      inputs {
        label
        description
        inputType
        defaultValue
      }
    }
  }
`;
