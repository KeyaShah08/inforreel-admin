
function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      zIndex: 1000,
    }}>
      <div style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#333',
        fontFamily: "'Inter', sans-serif",
      }}>
        InforReel
      </div>
    </header>
  );
}

export default Header;