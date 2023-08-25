// src/graphql/queries/UserQueries.ts
import { gql } from "@apollo/client";

// Definición de la consulta
export const GET_USER_DATA = gql`
  query GetUserData($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      // Otros campos del usuario que desees obtener
    }
  }
`;
