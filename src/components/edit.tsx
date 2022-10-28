import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import React from 'react'
import { Product } from '../views/product-table'
import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from 'react-router-dom'


const EditBookButton = ({} : Product) => {
    return (
        <>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </>
        // <Link to={`/books/edit/${book.isbn}`}>
        //     <Button>
        //         Edit
        //     </Button>
        // </Link>
    )
}

export default EditBookButton