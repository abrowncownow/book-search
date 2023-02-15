import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }


`;

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SavedBook($input: savedBook!) {
        saveBook(input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            bookCount
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }

`;