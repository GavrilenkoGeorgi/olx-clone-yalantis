import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { func } from 'prop-types'
import { productType } from '../../propTypes'

import useOrigins from '../../../hooks/useOrigins'
import { selectIsFetching } from '../../../store/notifications/notificationsSlice'
import { productSchema, productShape } from './productSchema'

import { Input, Select, Button } from '../../UI'
import classes from './ProductForm.module.sass'

const ProductForm = ({ handleProduct, product }) => {

	const originsData = useOrigins()
	const fetching = useSelector(selectIsFetching)
	const [ origins, setOriginOptions ] = useState([ '' ])

	useEffect(() => {
		setOriginOptions([ ...originsData.map(origin => origin.value) ])
	}, [ originsData ])

	const formik = useFormik({
		initialValues: {
			...productShape(product)
		},
		validateOnBlur: true,
		validationSchema: productSchema(origins),
		onSubmit: (values, { resetForm }) => {
			handleProduct(values, resetForm)
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

ProductForm.propTypes = {
	product: productType,
	handleProduct: func.isRequired,
}

ProductForm.defaultProps = {
	product: null
}

export default ProductForm
