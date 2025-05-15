import css from './AddSupModal.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { useEffect, useRef } from 'react';
import sprite from '/sprite.svg';

const supSchema = yup.object({
  name: yup.string().required('Suppliers name is required'),
  address: yup.string().required('Address is required'),
  suppliers: yup.string().required('Suppliers is required'),
  amount: yup.string().required('Amount is required'),
  date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD').required('Date is required'),
  status: yup.string().oneOf(['Active', 'Deactive'], 'Invalid status').required('Status is required'),
});

export const AddSupModal = ({ onSubmit, onCancel, initialData, isEdit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(supSchema),
        defaultValues: initialData || {
            name: '',
            address: '',
            suppliers: '',
            amount: '',
            date: '',
            status: '',
        },
        mode: 'onChange',
    });
    
    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name || '',
                address: initialData.address || '',
                suppliers: initialData.suppliers || '',
                amount: initialData.amount || '',
                date: initialData.date || '',
                status: initialData.status || '',
                });
        }
    }, [initialData, reset]);
    
    const statusValue = watch('status');
    const dateInputRef = useRef(null);
    const dateValue = watch('date');
    
    const onFormSubmit = (data) => {
        const formattedData = {
            ...data,
            amount: formatAmount(data.amount)
        };
        
        onSubmit?.(formattedData);
        if (isEdit) {
            reset();
        }
    };
    
    const formatAmount = (amount) => {
        if (!amount) return amount;
        
        if (!amount.trim().startsWith('৳')) {
            return `৳ ${amount.trim()}`;
        }
        
        return amount;
    };
    
    const handleStatusChange = (event) => {
        setValue('status', event.target.value, { shouldValidate: true });
    };

    const statusOptions = [
        'Active',
        'Deactive',
    ];

    const openDatePicker = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

    return <>
        <h3>{isEdit ? 'Edit data' : 'Add a new supplier'}</h3>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className={css.inputs}>
                <div className={css.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Suppliers info" 
                        {...register('name')} 
                    />
                    {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
                </div>

                <div className={css.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Address" 
                        {...register('address')} 
                    />
                    {errors.address && <p className={css.errorText}>{errors.address.message}</p>}
                </div>
                
                <div className={css.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Company" 
                        {...register('suppliers')} 
                    />
                    {errors.suppliers && <p className={css.errorText}>{errors.suppliers.message}</p>}
                </div>
                
                <div className={`${css.inputWrapper} ${css.dateInputWrapper}`}>
                    <div className={css.dateFieldContainer}>
                        <input 
                            ref={dateInputRef}
                            type="text" 
                            onFocus={(e) => {
                                e.target.type = 'date';
                                e.target.showPicker && e.target.showPicker();
                            }}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    e.target.type = 'text';
                                }
                            }}
                            placeholder="Delivery date"
                            className={css.dateInput}
                            {...register('date')} 
                        />
                        <button 
                            type="button" 
                            className={css.calendarIcon} 
                            onClick={openDatePicker}
                        >
                            <svg className={css.dateIcon}>
                                <use href={`${sprite}#icon-date`} />
                            </svg>
                        </button>
                    </div>
                    {errors.date && <p className={css.errorText}>{errors.date.message}</p>}
                </div>
                
                <div className={css.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Amount" 
                        {...register('amount')} 
                    />
                    {errors.amount && <p className={css.errorText}>{errors.amount.message}</p>}
                </div>

                <div className={css.inputWrapper}>
                    <CustomSelect
                        options={statusOptions}
                        placeholder="Status"
                        value={statusValue}
                        onChange={handleStatusChange}
                        name="status"
                        error={errors.status?.message}
                    />
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