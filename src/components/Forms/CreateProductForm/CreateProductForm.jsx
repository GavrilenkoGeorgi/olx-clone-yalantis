import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import useOrigins from '../../../hooks/useOrigins'
import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'
import { selectIsFetching, messageAdded } from '../../../store/notifications/notificationsSlice'
import { productSchema, productShape } from './createProductSchema'

import { Input, Select, Button } from '../../UI'
import classes from './CreateProductForm.module.sass'

const CreateProductForm = () => {

	const dispatch = useDispatch()
	const originsData = useOrigins()
	const fetching = useSelector(selectIsFetching)
	const [ origins, setOriginOptions ] = useState([ '' ])

	useEffect(() => {
		setOriginOptions([ ...originsData.map(origin => origin.value) ])
	}, [ originsData ])

	const createProduct = async (product, resetForm) => {
		console.log('Sending this', product)
		const data = {
			product: {
				...product,
				price: Number(product.price)
			}
		}

		const response = await productsListApi.post(URIs.products, data)
		if (response) {
			resetForm()
			dispatch(messageAdded('Product saved!'))
		}
	}

	const formik = useFormik({
		initialValues: {
			...productShape
		},
		validateOnBlur: true,
		validationSchema: productSchema(origins),
		onSubmit: (values, { resetForm }) => {
			createProduct(values, resetForm)
		}
	})

	return (
		<fieldset
			className={classes.fieldset}
			disabled={fetching}>
			<form
				onSubmit={formik.handleSubmit}
				onReset={formik.handleReset}
			>
				<Input
					label="Name"
					id="name"
					name="name"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.name}
					onBlur={formik.handleBlur}
					isValid={formik.touched.name && !formik.errors.name}
					isInvalid={formik.touched.name && !!formik.errors.name}
					error={formik.errors.name}
				/>
				<Input
					label="Price"
					id="price"
					name="price"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.price}
					onBlur={formik.handleBlur}
					isValid={formik.touched.price && !formik.errors.price}
					isInvalid={formik.touched.price && !!formik.errors.price}
					error={formik.errors.price}
				/>
				<Select
					id="origin"
					name="origin"
					defaultOption="Origin"
					options={origins}
					value={formik.values.origin}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isValid={formik.touched.origin && !formik.errors.origin}
					isInvalid={formik.touched.origin && !!formik.errors.origin}
					error={formik.errors.origin}
				/>
				<div className={classes.buttonContainer}>
					<Button type="submit" label="Submit" />
					<Button type="reset" label="Clear" />
				</div>
			</form>
		</fieldset>
	)
}

export default CreateProductForm
