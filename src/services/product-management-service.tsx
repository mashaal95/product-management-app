import axios from 'axios'
const baseUrl = 'http://localhost:3001/books'

// getting all the books from json file
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response: { data: any }) => response.data)
}

// get specific book
const getBook = (isbn: any) => {
    const request = axios.get(`${baseUrl}/${isbn}`)
    return request.then((response: { data: any }) => response.data)
}

// deleting a book
const remove = (isbn: any) => {
    const request = axios.delete(`${baseUrl}/${isbn}`)
    return request
}

// creating a new book
const create = (newObject: any) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response: { data: any }) => response.data)
}

// updating a book 
const update = (isbn: any, newObject: any) => {
    const request = axios.put(`${baseUrl}/${isbn}`, newObject)
    return request.then((response: { data: any }) => response.data)
}


const productManagementService = {
    getAll,
    getBook,
    remove,
    create,
    update
}

export default productManagementService