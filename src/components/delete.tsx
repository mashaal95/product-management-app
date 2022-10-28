import Button  from '@mui/material/Button'
import React from 'react'
import productManagementService from '../services/product-management-service'
import { Product } from '../views/product-table'

const DeleteBookButton = ({id, setProduct, products}: {id : string, setProduct : Product[], products: Product[]}) => {

    const deleteProduct = (id: string) => {
        productManagementService
            .removeProduct(id)
            .then((response: any) => {
                // setProduct([products.filter((product: { id : string }) => product.id !== id)])
            })
    }

    return (
        <Button onClick={() => deleteProduct(id)}>
            Delete
        </Button>
    )
}

export default DeleteBookButton