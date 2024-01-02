function SocialImagesGrid() {
  const images = [
    { key: 1, icon: <img src='/socials/Facebook.svg' alt='facebook' style={styles.icon} />, url: 'https://www.facebook.com/climatemindorg' },
    { key: 2, icon: <img src='/socials/Instagram.svg' alt='instagram' style={styles.icon} />, url: 'https://www.instagram.com/climatemind/' },
    { key: 3, icon: <img src='/socials/Twitter.svg' alt='twitter' style={styles.icon} />, url: 'https://twitter.com/Climate_Mind' },
    { key: 4, icon: <img src='/socials/LinkedIn.svg' alt='linkedin' style={styles.icon} />, url: 'https://www.linkedin.com/company/climate-mind/' },
    { key: 5, icon: <img src='/socials/Github.svg' alt='github' style={styles.icon} />, url: '' },
    { key: 6, icon: <img src='/socials/Telegram.svg' alt='telegram' style={styles.icon} />, url: 'https://t.me/climatemind_chat' },
  ];

  return (
    <div style={styles.gridContainer}>
      {images.map((image) => (
        <a key={image.key} href={image.url} target="_blank" rel="noopener noreferrer" style={styles.gridItem}>
          {image.icon}
        </a>
      ))}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  icon: {
    width: 44,
    height: 44,
    color: '#39F5AD',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, min-content)',
    position: 'relative',
    left: -10,
    marginBottom: 30,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  },
};

export default SocialImagesGrid;
