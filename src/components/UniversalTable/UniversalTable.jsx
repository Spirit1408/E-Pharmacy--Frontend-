import css from './UniversalTable.module.css'
import { useRef, useEffect, useState } from 'react'
import sprite from '/sprite.svg'

export const UniversalTable = ({ 
    type,            
    data,            
    pagination,
    onEdit,
    onDelete
}) => {
    const tableWrapperRef = useRef(null)
    const scrollbarWrapperRef = useRef(null)
    const scrollbarContentRef = useRef(null)
    const scrollbarThumbRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const tableTypes = {
        prod: {
            name: "All products",
            fields: ["Product info", "Category", "Stock", "Suppliers", "Price", "Action"]
        },
        sup: {
            name: "All suppliers",
            fields: ["Supplier info", "Address", "Company", "Delivery date", "Amount", "Status", "Action"]
        },
        cust: {
            name: "All customers",
            fields: ["User info", "Email", "Address", "Phone", "Register date"]
        },
        order: {
            name: "All orders",
            fields: ["User info", "Address", "Products", "Order date", "Price", "Status"]
        },
        recentCust: {
            name: "Recent customers",
            fields: ["Name", "Email", "Spent"]
        }
    }
    
    const tableConfig = tableTypes[type] || tableTypes.cust
    
    useEffect(() => {
        if (!tableWrapperRef.current || !scrollbarWrapperRef.current || !scrollbarThumbRef.current) return
        
        const tableWrapper = tableWrapperRef.current
        const scrollbarWrapper = scrollbarWrapperRef.current
        const scrollbarThumb = scrollbarThumbRef.current
        
        const updateScrollbarDimensions = () => {
            if (scrollbarContentRef.current && tableWrapper.scrollWidth) {
                scrollbarContentRef.current.style.width = `${tableWrapper.scrollWidth}px`
                
                const ratio = tableWrapper.clientWidth / tableWrapper.scrollWidth
                const maxThumbWidth = scrollbarWrapper.clientWidth
                const minThumbWidth = Math.min(20, maxThumbWidth * 0.1)
                const calculatedWidth = ratio * maxThumbWidth
                
                const thumbWidth = Math.min(maxThumbWidth, Math.max(minThumbWidth, calculatedWidth))
                scrollbarThumb.style.width = `${thumbWidth}px`
                
                updateThumbPosition()
            }
        }
        
        const updateThumbPosition = () => {
            if (!tableWrapper || !scrollbarWrapper || !scrollbarThumb) return
            
            const scrollRatio = tableWrapper.scrollLeft / (tableWrapper.scrollWidth - tableWrapper.clientWidth)
            const maxThumbPosition = scrollbarWrapper.clientWidth - scrollbarThumb.offsetWidth
            const thumbPosition = scrollRatio * maxThumbPosition
            
            scrollbarThumb.style.transform = `translateX(${thumbPosition}px)`
        }
        
        const handleTableScroll = () => {
            updateThumbPosition()
        }
        
        const handleMouseDown = (e) => {
            setIsDragging(true)
            setStartX(e.clientX)
            setScrollLeft(tableWrapper.scrollLeft)
            document.body.style.userSelect = 'none'
        }
        
        const handleMouseMove = (e) => {
            if (!isDragging) return
            
            const deltaX = e.clientX - startX
            const scrollbarTrackWidth = scrollbarWrapper.clientWidth - scrollbarThumb.offsetWidth
            const tableScrollWidth = tableWrapper.scrollWidth - tableWrapper.clientWidth
            
            const scrollRatio = deltaX / scrollbarTrackWidth
            const newScrollLeft = Math.max(0, Math.min(tableScrollWidth, scrollLeft + scrollRatio * tableScrollWidth))
            
            tableWrapper.scrollLeft = newScrollLeft
            updateThumbPosition()
        }
        
        const handleMouseUp = () => {
            setIsDragging(false)
            document.body.style.userSelect = ''
        }
        
        const handleResize = () => {
            updateScrollbarDimensions()
        }
        
        updateScrollbarDimensions()
        
        tableWrapper.addEventListener('scroll', handleTableScroll)
        scrollbarThumb.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('resize', handleResize)
        
        return () => {
            tableWrapper.removeEventListener('scroll', handleTableScroll)
            scrollbarThumb.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('resize', handleResize)
        }
    }, [isDragging, startX, scrollLeft])
    
    const defaultRenderRow = (item, index) => {
        switch(type) {
            case 'prod':
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.stock}</td>
                        <td>{item.suppliers}</td>
                        <td>{item.price}</td>
                        <td>{<div className={css.actionBtnWrapper}>
                            <button 
                                className={css.actionBtn + " " + css.edit}
                                onClick={() => onEdit && onEdit(item)}
                            >
                                <svg>
                                    <use href={`${sprite}#icon-edit`} />
                                </svg>
                            </button>
                            <button 
                                className={css.actionBtn + " " + css.delete}
                                onClick={() => onDelete && onDelete(item._id)}
                            >
                                <svg>
                                    <use href={`${sprite}#icon-trash`} />
                                </svg>
                            </button>
                        </div>}</td>
                    </tr>
                );
            case 'sup':
                return (
                    <tr key={index}>
                        <td>{item.supplierInfo}</td>
                        <td>{item.address}</td>
                        <td>{item.company}</td>
                        <td>{item.deliveryDate}</td>
                        <td>{item.amount}</td>
                        <td>{item.status}</td>
                        <td>{/* Action buttons */}</td>
                    </tr>
                );
            case 'cust':
                return (
                    <tr key={index}>
                        <td><img src={item.photo} alt="client" />{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.registerDate}</td>
                    </tr>
                );
            case 'order':
                return (
                    <tr key={index}>
                        <td><img src={item.photo} alt="client" />{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.products}</td>
                        <td>{item.order_date}</td>
                        <td>{item.price}</td>
                        <td><p className={css.status + " " + css[item.status.toLowerCase()] }>{item.status}</p></td>
                    </tr>
                );
            case 'recentCust':
                return (
                    <tr key={index}>
                        <td><img src={item.image} alt="customer" />{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.spent}</td>
                    </tr>
                );
            default:
                return <tr key={index}><td colSpan="5">Нет данных</td></tr>;
        }
    }

    const renderPaginationDots = () => {
        if (!pagination || !pagination.totalPages || pagination.totalPages <= 1) return null;
        
        const dots = [];
        for (let i = 1; i <= pagination.totalPages; i++) {
            dots.push(
                <button 
                    key={i}
                    className={`${css.paginationDot} ${i === pagination.currentPage ? css.activeDot : ''}`}
                    onClick={() => pagination.onPageChange(i)}
                    aria-label={`Page ${i}`}
                />
            );
        }
        
        return (
            <div className={css.paginationDots}>
                {dots}
            </div>
        );
    };
    
    return (
        <div className={css.tableContainer}>
            <div className={css.caption}>{tableConfig.name}</div>
            <div className={css.tableWrapper} ref={tableWrapperRef}>
                <table className={css.table}>
                    <thead>
                        <tr>
                            {tableConfig.fields.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => 
                                defaultRenderRow(item, index)
                            )
                        ) : (
                            <tr>
                                <td colSpan={tableConfig.fields.length} className={css.noData}>
                                    No data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {renderPaginationDots()}
            
            <div className={css.externalScrollbarContainer}>
                <div className={css.externalScrollbar} ref={scrollbarWrapperRef}>
                    <div className={css.scrollbarContent} ref={scrollbarContentRef}></div>
                    <div className={css.scrollbarThumb} ref={scrollbarThumbRef}></div>
                </div>
            </div>
        </div>
    )
}
