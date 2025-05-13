import css from './Table.module.css'
import { useSelector } from 'react-redux'
import { useRef, useEffect, useState } from 'react'

export const Table = () => {
    const { latestCustomers } = useSelector(state => state.dashboard)
    const tableWrapperRef = useRef(null)
    const scrollbarWrapperRef = useRef(null)
    const scrollbarContentRef = useRef(null)
    const scrollbarThumbRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    
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
    
    return <div className={css.tableContainer}>
        <div className={css.caption}>Recent customers</div>
        <div className={css.tableWrapper} ref={tableWrapperRef}>
            <table className={css.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {latestCustomers.map((customer, index) => (
                        <tr key={index}>
                            <td><img src={customer.image} alt="customer" />{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.spent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <div className={css.externalScrollbarContainer}>
            <div className={css.externalScrollbar} ref={scrollbarWrapperRef}>
                <div className={css.scrollbarContent} ref={scrollbarContentRef}></div>
                <div className={css.scrollbarThumb} ref={scrollbarThumbRef}></div>
            </div>
        </div>
    </div>
}