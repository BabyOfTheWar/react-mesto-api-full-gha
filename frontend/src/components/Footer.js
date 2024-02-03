function Footer() {
    let year = '2023';
    const currentYear = new Date().getFullYear();
    if (currentYear !== 2023) {
        year = `2023 - ${currentYear}`;
    }

    return (
        <footer className="footer">
            <h2 className="footer__text">© {year} Mesto Russia</h2>
        </footer>
    )
}

export default Footer;