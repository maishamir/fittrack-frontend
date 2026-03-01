import React from 'react'
import { Home, Plus, CalendarDays } from 'lucide-react'
import "./Footer.scss";
import { useNavigate } from 'react-router-dom';
function Footer() {
    const navigate = useNavigate();
    return (
        <footer className='footer'>
            <ul className='footer__list'>
                <li>
                    <div className="footer__item" onClick={() => navigate('/')}>
                        <Home className='footer__icon' />
                        <small className='footer__label'>Home</small>
                    </div>
                </li>
                <li>
                    <div className="footer__item" onClick={() => navigate('/calendar')}>
                        <CalendarDays className='footer__icon' />
                        <small className='footer__label'>Calendar</small>
                    </div>
                </li>
                <li>
                    <div className="footer__item">
                        <Plus className='footer__icon' />
                        <small className='footer__label'>Routines</small>
                    </div>
                </li>
            </ul>
        </footer>
    )
}

export default Footer