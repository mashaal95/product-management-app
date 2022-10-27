import Button  from '@mui/material/Button'
import React from 'react'
import productManagementService from '../services/product-management-service'

const DeleteBookButton = ({isbn, setBooks, books}: {isbn:any, setBooks:any, books: any}) => {

    const deleteBook = (isbn: any) => {
        productManagementService
            .remove(isbn)
            .then((response: any) => {
                setBooks(books.filter((book: { isbn: any }) => book.isbn !== isbn))
            })
    }

    return (
        <Button onClick={() => deleteBook(isbn)}>
            Delete
        </Button>
    )
}

export default DeleteBookButton