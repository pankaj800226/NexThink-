import * as React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { Close, Login, Menu as MenuIcon } from "@mui/icons-material";

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Services', to: '/#services' },
    { label: 'Challanger', to: '/timechallaner' },
]

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const closeMenu = () => setMenuOpen(false);

    const email = localStorage.getItem('EMAIL')

    React.useEffect(() => {
        const id = location.hash.slice(1)
        if (!id) return
        let attempts = 0
        const timer = window.setInterval(() => {
            const target = document.getElementById(id)
            if (target) target.scrollIntoView({ behavior: 'smooth' })
            if (target || ++attempts >= 20) window.clearInterval(timer)
        }, 100)
        return () => window.clearInterval(timer)
    }, [location])

    React.useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        const onResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false)
        }
        window.addEventListener('resize', onResize)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('resize', onResize)
        }
    }, [menuOpen])

    const logOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    const isActive = (to: string) => {
        const [path, hash] = to.split('#')
        return location.pathname === path && (hash ? location.hash === `#${hash}` : !location.hash)
    }

    return (
        <header className={menuOpen ? 'menu_open' : ''}>
            <Link to={'/'} className='logo' onClick={closeMenu}>
                <span className='logo_icon'>N</span>
                <span className='logo_text'>Nex<span>Think</span></span>
            </Link>

            <nav className={menuOpen ? 'open' : ''}>
                <ul className='nav_links'>
                    {navLinks.map(link => (
                        <li key={link.label}>
                            <Link
                                to={link.to}
                                className={isActive(link.to) ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className='nav_actions'>
                    {email ? (
                        <>
                            <Button
                                id="basic-button"
                                className='avatar_btn'
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <p>{email.charAt(0).toUpperCase()}</p>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <Link to={'/dashboard'} onClick={closeMenu}>
                                    <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                                </Link>
                                <MenuItem onClick={logOut}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link to={'/login'} onClick={closeMenu}>
                            <Button className='login_btn' startIcon={<Login />}>
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>

            <button
                type='button'
                className='menu_toggle'
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(prev => !prev)}
            >
                {menuOpen ? <Close /> : <MenuIcon />}
            </button>

            {menuOpen && <div className='menu_backdrop' onClick={closeMenu} />}
        </header>
    )
}

export default Header
