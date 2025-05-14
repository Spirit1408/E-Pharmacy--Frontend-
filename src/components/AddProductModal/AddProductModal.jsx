import css from './AddProductModal.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CustomSelect } from '../CustomSelect/CustomSelect';

const productSchema = yup.object({
  productInfo: yup.string().required('Product info is required'),
  category: yup.string().oneOf(['Medicine', 'Heart', 'Head', 'Hand', 'Leg', 'Dental care', 'Skin care'], 'Invalid category'),
  suppliers: yup.string().required('Suppliers is required'),
  stock: yup
    .string()
    .matches(/^[0-9]*$/, 'Stock must be a number')
    .required('Stock is required'),
  price: yup
    .string()
    .matches(/^[0-9]*$/, 'Price must be a number')
    .required('Price is required'),
});

export const AddProductModal = ({ onSubmit, onCancel, initialData, isEdit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(productSchema),
        defaultValues: initialData || {
            productInfo: '',
            suppliers: '',
            category: '',
            stock: '',
            price: '',
        },
        mode: 'onChange',
    });
    
    const categoryValue = watch('category');
    
    const onFormSubmit = (data) => {
        onSubmit?.(data);
        if (isEdit) {
            reset();
        }
    };
    
    const handleCategoryChange = (event) => {
        setValue('category', event.target.value, { shouldValidate: true });
    };

    const categoryOptions = [
        'Medicine',
        'Heart',
        'Head',
        'Hand',
        'Leg',
        'Dental care',
        'Skin care'
    ];

    return <>
        <h3>{isEdit ? 'Edit product' : 'Add a new product'}</h3>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className={css.inputs}>
                <div className={css.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Product info" 
                        {...register('productInfo')} 
                    />
                    {errors.productInfo && <p className={css.errorText}>{errors.productInfo.message}</p>}
                </div>
                
                <div className={css.inputWrapper}>
                    <CustomSelect
                        options={categoryOptions}
                        placeholder="Category"
                        value={categoryValue}
                        onChange={handleCategoryChange}
                        name="category"
                        error={errors.category?.message}
                    />
                </div>
                
                <div className={css.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Suppliers" 
                        {...register('suppliers')} 
                    />
                    {errors.suppliers && <p className={css.errorText}>{errors.suppliers.message}</p>}
                </div>
                
                <div className={css.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Stock" 
                        {...register('stock')} 
                    />
                    {errors.stock && <p className={css.errorText}>{errors.stock.message}</p>}
                </div>
                
                <div className={css.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Price" 
                        {...register('price')} 
                    />
                    {errors.price && <p className={css.errorText}>{errors.price.message}</p>}
                </div>
            </div>
            <div className={css.btns}>
                <button type="submit" className={css.addBtn} data-form>
                    {isEdit ? 'Save' : 'Add'}
                </button>
                <button 
                    type="button" 
                    className={`${css.cancelBtn} ${css.deactive}`} 
                    onClick={onCancel}
                    data-form
                >
                    Cancel
                </button>
            </div>
        </form>
    </>;
}