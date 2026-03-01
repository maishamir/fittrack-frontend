import React from 'react'
import { Home, Calendar, Plus } from 'lucide-react'
import "./Footer.scss";
function Footer() {
    return (
        <footer className='footer'>
            <ul className='footer__list'>
                <li>
                    <div className="footer__item">
                        <Home className='footer__icon'/>
                        <small className='footer__label'>Home</small>
                    </div>
                </li>
                <li>
                    <div className="footer__item">
                        <Calendar className='footer__icon'/>
                        <small className='footer__label'>Calendar</small>
                    </div>
                </li>
                <li>
                    <div className="footer__item">
                        <Plus className='footer__icon'/>
                        <small className='footer__label'>Routines</small>
                    </div>
                </li>
            </ul>
        </footer>
    )
}

export default Footer